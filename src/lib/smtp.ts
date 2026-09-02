import nodemailer from "nodemailer";

const smtpConfigured =
  process.env.SMTP_USER &&
  process.env.SMTP_APP_PASSWORD &&
  process.env.CONTACT_RECEIVER_EMAIL;

function createTransporter() {
  if (!smtpConfigured) return null;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_APP_PASSWORD,
    },
  });
}

export function isSMTPConfigured(): boolean {
  return Boolean(smtpConfigured);
}

export async function sendInquiryNotification(data: {
  type: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  service?: string;
  budget?: string;
  selectedTalentName?: string;
  timeline?: string;
  message: string;
}): Promise<boolean> {
  const transporter = createTransporter();
  if (!transporter) return false;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #73258B;">New ${data.type} Inquiry — Crystal Media</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.fullName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Role</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.role}</td></tr>
        ${data.service ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.service}</td></tr>` : ""}
        ${data.budget ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Budget</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.budget}</td></tr>` : ""}
        ${data.selectedTalentName ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Selected Creator</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.selectedTalentName}</td></tr>` : ""}
        ${data.timeline ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Timeline</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.timeline}</td></tr>` : ""}
      </table>
      <h3 style="color: #73258B; margin-top: 24px;">Message</h3>
      <p style="line-height: 1.6;">${data.message}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Crystal Media" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    subject: `New ${data.type} inquiry from ${data.fullName}`,
    html,
    replyTo: data.email,
  });

  return true;
}

export async function sendAcknowledgementEmail(data: {
  fullName: string;
  email: string;
}): Promise<boolean> {
  const transporter = createTransporter();
  if (!transporter) return false;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #73258B;">Thank you, ${data.fullName}</h2>
      <p style="line-height: 1.6; color: #333;">
        We have received your inquiry at Crystal Media. Our team will review your brief and respond within 24–48 business hours.
      </p>
      <p style="line-height: 1.6; color: #333;">
        In the meantime, follow us on Instagram for campaign highlights and creator spotlights.
      </p>
      <p style="color: #A33AD1; font-weight: bold;">— Crystal Media Team</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Crystal Media" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: "We received your inquiry — Crystal Media",
    html,
  });

  return true;
}
