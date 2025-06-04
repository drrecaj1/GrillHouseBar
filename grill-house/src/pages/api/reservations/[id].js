import { ObjectId } from "mongodb";
import connectMongo from '../../../lib/connectMongo';
import Reservation from '../../../models/Reservation';

export default async function handler(req, res) {
    await connectMongo();

    const { id } = req.query;

    if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid reservation ID" });
    }

    try {
        if (req.method === "GET") {
            const reservation = await Reservation.findById(id);
            if (!reservation) {
                return res.status(404).json({ message: "Reservation not found" });
            }
            res.status(200).json({ reservation });

        } else if (req.method === "PATCH") {
            // Update reservation (status or notes)
            const updates = {};

            if (req.body.status !== undefined) {
                updates.status = req.body.status;
            }

            if (req.body.notes !== undefined) {
                updates.notes = req.body.notes;
            }

            if (Object.keys(updates).length === 0) {
                return res.status(400).json({ message: "No valid fields to update" });
            }

            const reservation = await Reservation.findByIdAndUpdate(
                id,
                { $set: updates },
                { new: true, runValidators: true }
            );

            if (!reservation) {
                return res.status(404).json({ message: "Reservation not found" });
            }

            res.status(200).json({
                message: "Reservation updated successfully",
                reservation
            });

        } else if (req.method === "DELETE") {
            // Delete reservation
            const reservation = await Reservation.findByIdAndDelete(id);

            if (!reservation) {
                return res.status(404).json({ message: "Reservation not found" });
            }

            res.status(200).json({ message: "Reservation deleted successfully" });

        } else {
            res.status(405).json({ message: "Method not allowed" });
        }

    } catch (error) {
        console.error("Reservation API error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}