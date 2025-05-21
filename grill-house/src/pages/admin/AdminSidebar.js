import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, ClipboardList, LogOut, Mail, Menu } from 'lucide-react';
import { useRouter } from 'next/router';

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/admin-logout');        // ✅ clear cookie
        router.push('/admin/login');             // ✅ go to login page
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{
                width: isOpen ? '200px' : '60px',
                backgroundColor: '#333',
                color: '#fff',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'width 0.3s ease'
            }}>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ cursor: 'pointer', padding: '1rem' }}
                >
                    <Menu color="#fff" />
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem', width: '100%', alignItems: 'center' }}>
                    <Link href="/admin/dashboard" style={linkStyle}>
                        <LayoutDashboard size={24} />
                        {isOpen && <span style={textStyle}>Dashboard</span>}
                    </Link>
                    <Link href="/admin/reservations" style={linkStyle}>
                        <ClipboardList size={24} />
                        {isOpen && <span style={textStyle}>Reservations</span>}
                    </Link>
                    <Link href="/admin/inquiries" style={linkStyle}>
                        <Mail size={24} />
                        {isOpen && <span style={textStyle}>Inquiries</span>}
                    </Link>
                    <div onClick={handleLogout} style={{ ...linkStyle, cursor: 'pointer' }}>
                        <LogOut size={24} />
                        {isOpen && <span style={textStyle}>Logout</span>}
                    </div>
                </nav>
            </div>
        </div>
    );
}

const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#fff',
    textDecoration: 'none'
};

const textStyle = {
    fontSize: '1rem'
};
