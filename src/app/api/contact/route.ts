import { NextResponse } from "next/server";
import { sendEmail, sendWhatsApp } from "@/lib/notifications";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, email y mensaje son obligatorios" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.CONTACT_EMAIL || "jf.termenon@gmail.com";

    const emailHtml = `
      <h2>Nuevo lead desde Costa Blanca Leads</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nombre</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
        ${phone ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Teléfono</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>` : ""}
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Mensaje</td><td style="padding:8px;border:1px solid #ddd">${message}</td></tr>
      </table>
    `;

    const emailResult = await sendEmail({
      to: adminEmail,
      subject: `Nuevo lead: ${name} - ${email}`,
      html: emailHtml,
    });

    const whatsappMessage = `Nuevo lead Costa Blanca Leads\n\nNombre: ${name}\nEmail: ${email}${phone ? `\nTeléfono: ${phone}` : ""}\nMensaje: ${message}`;

    const whatsappResult = await sendWhatsApp({
      to: adminEmail,
      body: whatsappMessage,
    });

    return NextResponse.json({
      success: true,
      email: emailResult,
      whatsapp: whatsappResult,
    });
  } catch (error) {
    console.error("Error en contacto:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
