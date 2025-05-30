import connectMongo from '../../lib/connectMongo';
import Admin from '../../models/Admin';
import bcrypt from 'bcryptjs';
import { parse } from 'cookie';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    await connectMongo();
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

        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Old password incorrect' });

        const hashed = await bcrypt.hash(newPassword, 10);
        await Admin.updateOne(
            { username },
            { $set: { password: hashed, firstLogin: false } }
        );

        // Set cookies again to keep the user logged in after password change
        res.setHeader('Set-Cookie', [
            serialize('adminAuth', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60 * 8
            }),
            serialize('adminUsername', username, {
                httpOnly: false,
                path: '/',
                maxAge: 60 * 60 * 8
            }),
            serialize('firstLogin', 'false', {
                httpOnly: false,
                path: '/',
                maxAge: 60 * 60 * 8
            })
        ]);

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}