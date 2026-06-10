import { Resend } from "resend";

export interface SendWhatsAppParams {
  to: string;
  body: string;
}

export interface SendWhatsAppResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "").replace(/^00/, "+");
}

export async function sendWhatsApp({
  to,
  body,
}: SendWhatsAppParams): Promise<SendWhatsAppResult> {
  const phone = normalizePhone(to);

  if (process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phone.replace("+", ""),
          type: "text",
          text: { body },
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error?.message ?? "WhatsApp API error" };
    }
    return { success: true, messageId: data.messages?.[0]?.id };
  }

  if (
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_WHATSAPP_FROM
  ) {
    const auth = Buffer.from(
      `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
    ).toString("base64");

    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: process.env.TWILIO_WHATSAPP_FROM,
          To: `whatsapp:${phone}`,
          Body: body,
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.message ?? "Twilio error" };
    }
    return { success: true, messageId: data.sid };
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[WhatsApp DEV] To: ${phone}\n${body}`);
    return { success: true, messageId: `dev_${Date.now()}` };
  }

  return { success: false, error: "WhatsApp no configurado" };
}

let resend: Resend | null = null;
function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const r = getResend();
  if (!r) {
    console.log(`[Email DEV] To: ${to}\nSubject: ${subject}\n${html}`);
    return { success: true, messageId: `dev_${Date.now()}` };
  }

  const { data, error } = await r.emails.send({
    from: "Costa Blanca Leads <onboarding@resend.dev>",
    to,
    subject,
    html,
  });

  if (error) return { success: false, error: error.message };
  return { success: true, messageId: data?.id };
}
