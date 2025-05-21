import clientPromise from '../../../lib/mongo';
import bcrypt from 'bcryptjs';
import { parse } from 'cookie';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { oldPassword, newPassword } = req.body;
        const cookies = parse(req.headers.cookie || '');
        const username = cookies.adminUsername;

        if (!username || !oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Missing fields' });
        }

        const client = await clientPromise;
        const db = client.db('grillhouse');
        const collection = db.collection('admins');

        const admin = await collection.findOne({ username });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Old password incorrect' });

        const hashed = await bcrypt.hash(newPassword, 10);
        await collection.updateOne(
            { username },
            { $set: { password: hashed, firstLogin: false } }
        );

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}