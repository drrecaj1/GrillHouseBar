// ✅ pages/api/inquiries.js
import clientPromise from '../../../lib/mongo';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('grillhouse');
    const collection = db.collection('inquiries');

    if (req.method === 'GET') {
        try {
            const inquiries = await collection.find({}).sort({ createdAt: -1 }).toArray();
            res.status(200).json(inquiries);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
            res.status(500).json({ message: 'Failed to fetch inquiries' });
        }
    } else if (req.method === 'PATCH') {
        const { id } = req.query;
        const { resolved } = req.body;

        if (!id || typeof resolved !== 'boolean') {
            return res.status(400).json({ message: 'Missing or invalid parameters' });
        }

        try {
            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { resolved: resolved } }
            );

            if (result.modifiedCount === 1) {
                res.status(200).json({ message: 'Updated successfully' });
            } else {
                res.status(404).json({ message: 'Inquiry not found' });
            }
        } catch (error) {
            console.error('Error updating inquiry:', error);
            res.status(500).json({ message: 'Failed to update inquiry' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
