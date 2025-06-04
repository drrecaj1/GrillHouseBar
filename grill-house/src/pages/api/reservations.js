import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";
import connectMongo from '../../lib/connectMongo';
import Reservation from '../../models/Reservation';

const capitalizeWords = (str) => {
    if (!str) return '';

    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_-]/g, ' ')
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};


export default async function handler(req, res) {
    await connectMongo();
    if (req.method === "POST") {
        try {
            const {
                fullName,
                email,
                numberOfGuests,
                diningOption,
                eventType,
                specialRequests,
                startDate,
            } = req.body;

            if (!fullName || !email || !numberOfGuests || !startDate) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Format data for storage
            const formattedReservation = {
                fullName: capitalizeWords(fullName),
                email: email.toLowerCase(),
                numberOfGuests,
                diningOption,
                eventType,
                specialRequests: specialRequests || 'None',
                startDate,
                status: 'pending',
                notes: '',
                createdAt: new Date(),
            };


            console.log("🚀 Received reservation data:", formattedReservation);
            const reservation = await Reservation.create(formattedReservation);
            const reservationId = reservation._id;

            // Send confirmation email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const baseUrl = req.headers.origin || 'http://localhost:3000';
            const confirmUrl = `${baseUrl}/api/reservations?id=${reservationId}&action=confirm`;
            const cancelUrl = `${baseUrl}/api/reservations?id=${reservationId}&action=cancel`;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your Reservation at GrillHouse – Confirmation',
                html: `
          <p>Dear ${formattedReservation.fullName},</p>
          <p>Thank you for your reservation at GrillHouse! We are pleased to confirm the following details:</p>
          <ul>
              <li><strong>Name:</strong> ${formattedReservation.fullName}</li>
              <li><strong>Date:</strong> ${new Date(startDate).toLocaleDateString()}</li>
              <li><strong>Number of Guests:</strong> ${numberOfGuests}</li>
              <li><strong>Dining Option:</strong> ${formattedReservation.diningOption}</li>
              <li><strong>Event Type:</strong> ${formattedReservation.eventType}</li>
              <li><strong>Special Requests:</strong> ${formattedReservation.specialRequests}</li>
          </ul>
          <p>Please confirm or cancel your reservation:</p>
          <p><a href="${confirmUrl}">✅ Confirm Reservation</a> | <a href="${cancelUrl}">❌ Cancel Reservation</a></p>
          <p>We look forward to welcoming you!</p>
          <p>Best regards,<br/>GrillHouse Team</p>
        `
            };

            await transporter.sendMail(mailOptions);

            res.status(201).json({ message: "Reservation saved! Confirmation email sent." });
        } catch (error) {
            console.error("Reservation API error:", error);
            res.status(500).json({ message: "Error saving reservation", error: error.message });
        }
    } else if (req.method === "GET") {

        try {
            const { id, action } = req.query;

            if (!id) {
                const reservations = await Reservation.find({});
                return res.status(200).json({ reservations });
            }

            const newStatus = action === "cancel" ? "cancelled" : "confirmed";

            const result = await Reservation.updateOne(
                { _id: new ObjectId(id) },
                { $set: { status: newStatus } }
            );

            if (result.modifiedCount === 1) {
                res.writeHead(302, { Location: "/" });
                res.end();
            } else {
                res.status(404).send("Reservation not found or already updated.");
            }
        } catch (error) {
            res.status(500).send("Error updating reservation.");
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}

