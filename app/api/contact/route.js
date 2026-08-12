import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'drvishalbadgujar.research@gmail.com', // The destination email requested by the user
      subject: `Portfolio Contact: ${subject || 'No Subject'}`,
      text: `
You have received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Subject: ${subject || 'N/A'}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
  <h2 style="color: #D4A845;">New Contact Form Submission</h2>
  <p>You have received a new message from your portfolio website.</p>
  <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 20px;">
    <tr><td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9; width: 120px;"><strong>Name</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${name}</td></tr>
    <tr><td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Email</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${email}</td></tr>
    <tr><td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Phone</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${phone || 'N/A'}</td></tr>
    <tr><td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Subject</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${subject || 'N/A'}</td></tr>
  </table>
  <h3 style="margin-top: 30px;">Message:</h3>
  <div style="padding: 15px; border-left: 4px solid #D4A845; background: #f9f9f9;">
    ${message.replace(/\n/g, '<br/>')}
  </div>
</div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email. Please check server logs.' }, { status: 500 });
  }
}
