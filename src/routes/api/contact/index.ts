import type { RequestHandler } from '@builder.io/qwik-city';
import nodemailer from 'nodemailer';

export const onPost: RequestHandler = async ({ request, json, headers }) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  headers.set('Access-Control-Allow-Origin', allowedOrigin);
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');

  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      json(400, { error: 'Missing required fields' });
      return;
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipient = process.env.CONTACT_RECIPIENT || 'timnewlink@gmail.com';

    if (!smtpHost || !smtpUser || !smtpPass) {
      json(500, { error: 'SMTP configuration missing' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: smtpUser,
      to: recipient,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    json(200, { success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    json(500, { error: message });
  }
};

export const onOptions: RequestHandler = async ({ headers }) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  headers.set('Access-Control-Allow-Origin', allowedOrigin);
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
};
