import clientPromise from "../../../lib/mongo";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { id } = req.query;
            if (!id) return res.status(400).json({ message: "Missing reservation id" });

            const client = await clientPromise;
            const db = client.db("grillhouse");
            const collection = db.collection("reservations");

            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { status: "cancelled" } }
            );

            if (result.modifiedCount === 1) {
                // Redirect to a confirmation page (optional)
                res.writeHead(302, { Location: "/" });
                res.end();
            } else {
                res.status(404).send("Reservation.js not found or already cancelled.");
            }
        } catch (error) {
            console.error("Cancel Error:", error);
            res.status(500).send("Error cancelling reservation.");
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
