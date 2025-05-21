import { serialize } from 'cookie';

export default function handler(req, res) {
    res.setHeader('Set-Cookie', serialize('adminAuth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0
    }));
    res.status(200).json({ message: 'Logged out' });
}
