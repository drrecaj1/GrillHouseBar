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
                { $set: { status: "confirmed" } }

            );
            if (result.modifiedCount === 1) {
                // Redirect to main page after confirmation
                res.writeHead(302, { Location: "/" });
                res.end();
            } else {
                res.status(404).send("Reservation not found or already confirmed.");
            }
        } catch (error) {
            res.status(500).send("Error confirming reservation.");
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
