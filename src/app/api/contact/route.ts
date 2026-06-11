import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sendWhatsApp } from "@/lib/notifications";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, preferred_time } = body;

    if (!name || !email || !phone || !preferred_time) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.CONTACT_EMAIL || "jf.termenon@gmail.com";

    const resend = new Resend(process.env.RESEND_API_KEY || "");

    const { data, error } = await resend.emails.send({
      from: "Costa Blanca Leads <onboarding@resend.dev>",
      to: adminEmail,
      subject: `Demo: ${name} - ${phone}`,
      html: `
        <h2>Solicitud de demo · Costa Blanca Leads</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nombre</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefono</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Prefiere</td><td style="padding:8px;border:1px solid #ddd">${preferred_time}</td></tr>
        </table>
        <p style="margin-top:16px;color:#666;">Agenda la videollamada de 15 min y cierra la venta</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Error al enviar el email" }, { status: 500 });
    }

    let whatsappResult = null;
    if (
      process.env.WHATSAPP_ACCESS_TOKEN ||
      process.env.TWILIO_ACCOUNT_SID ||
      process.env.NODE_ENV === "development"
    ) {
      const whatsappMessage = `Solicitud de demo\n\nNombre: ${name}\nEmail: ${email}\nTelefono: ${phone}\nPrefiere: ${preferred_time}\n\nAgenda la llamada y cierra la venta`;

      whatsappResult = await sendWhatsApp({
        to: adminEmail,
        body: whatsappMessage,
      });
    }

    return NextResponse.json({
      success: true,
      email: { id: data?.id },
      whatsapp: whatsappResult,
    });
  } catch (error) {
    console.error("Error en contacto:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
