import connectMongo from '../../lib/connectMongo';
import Admin from '../../models/Admin';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    await connectMongo();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Missing username or password' });
    }

    try {
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Set cookies: secure auth + readable firstLogin + username
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
            serialize('firstLogin', String(admin.firstLogin), {
                httpOnly: false,
                path: '/',
                maxAge: 60 * 60 * 8
            })
        ]);

        return res.status(200).json({
            message: 'Login successful',
            firstLogin: admin.firstLogin
        });

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}