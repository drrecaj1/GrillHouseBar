// ✅ /pages/api/contact.js
import connectMongo from '../../lib/connectMongo';
import Inquiry from '../../models/Inquiry';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        await connectMongo();

        await Inquiry.create({
            fullName,
            email,
            phone,
            message,
            createdAt: new Date(),
            resolved: false
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'grillhousebar2011@gmail.com',
            subject: `New Contact Inquiry from ${fullName}`,
            html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        <p>📩 Submitted on: ${new Date().toLocaleString()}</p>
      `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Inquiry received and email sent.' });
    } catch (error) {
        console.error('Contact API error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


