// ✅ /pages/admin/inquiries.js
import { useEffect, useState } from 'react';
import AdminSidebar from '@/pages/admin/AdminSidebar';

export default function AdminInquiries() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInquiries() {
            try {
                const res = await fetch('/api/inquiries');
                const data = await res.json();
                setInquiries(data);
            } catch (err) {
                console.error('Error fetching inquiries:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchInquiries();
    }, []);

    const toggleResolved = async (id, currentState) => {
        try {
            const res = await fetch(`/api/inquiries?id=${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resolved: !currentState })
            });
            if (res.ok) {
                setInquiries(prev =>
                    prev.map(inq =>
                        inq._id === id ? { ...inq, resolved: !currentState } : inq
                    )
                );
            }
        } catch (err) {
            console.error('Failed to update inquiry:', err);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <main style={{ flex: 1, padding: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Inquiries</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : inquiries.length === 0 ? (
                    <p>No inquiries found.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                        {inquiries.map(inq => (
                            <div key={inq._id} style={{
                                background: '#fff',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                            }}>
                                <h3>{inq.fullName}</h3>
                                <p><strong>Email:</strong> {inq.email}</p>
                                <p><strong>Phone:</strong> {inq.phone || 'N/A'}</p>
                                <p><strong>Message:</strong> {inq.message}</p>
                                <p><strong>Submitted:</strong> {new Date(inq.createdAt).toLocaleString()}</p>
                                <button
                                    onClick={() => toggleResolved(inq._id, inq.resolved)}
                                    style={{
                                        marginTop: '0.5rem',
                                        padding: '0.4rem 1rem',
                                        border: 'none',
                                        borderRadius: '12px',
                                        backgroundColor: inq.resolved ? '#10b981' : '#facc15',
                                        color: '#000',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {inq.resolved ? 'Resolved' : 'Mark as Resolved'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
