import { useEffect, useState } from 'react';
import AdminSidebar from '@/pages/admin/AdminSidebar';

const inputStyle = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
};

const actionButton = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: '#333',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
};

export default function AdminInquiries() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resolvedFilter, setResolvedFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');
    const [visibleCount, setVisibleCount] = useState(10);

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

    const resetFilters = () => {
        setResolvedFilter('All');
        setSearchQuery('');
        setSortOrder('newest');
        setVisibleCount(10);
    };

    const filteredInquiries = inquiries
        .filter(inquiry => {
            const matchesResolved = resolvedFilter === 'All' ||
                (resolvedFilter === 'resolved' && inquiry.resolved) ||
                (resolvedFilter === 'not-resolved' && !inquiry.resolved);

            const matchesSearch = !searchQuery ||
                (inquiry.fullName && inquiry.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (inquiry.email && inquiry.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (inquiry.message && inquiry.message.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (inquiry.phone && inquiry.phone.includes(searchQuery));

            return matchesResolved && matchesSearch;
        })
        .sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            if (sortOrder === 'newest') {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        })
        .slice(0, visibleCount);

    return (
        <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <main style={{ flex: 1, padding: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Inquiries</h1>

                {/* Filters Section */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    marginTop: '1rem'
                }}>
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or message..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{...inputStyle, minWidth: '300px'}}
                    />

                    <select
                        value={resolvedFilter}
                        onChange={(e) => setResolvedFilter(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="All">All Inquiries</option>
                        <option value="resolved">Resolved</option>
                        <option value="not-resolved">Not Resolved</option>
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="newest">Newest to Oldest</option>
                        <option value="oldest">Oldest to Newest</option>
                    </select>

                    <button onClick={resetFilters} style={actionButton}>
                        Reset Filters
                    </button>
                </div>

                {/* Results Summary */}
                <div style={{ marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
                    Showing {filteredInquiries.length} of {inquiries.length} inquiries
                    {searchQuery && ` matching "${searchQuery}"`}
                    {resolvedFilter !== 'All' && ` (${resolvedFilter.replace('-', ' ')})`}
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : filteredInquiries.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '2rem',
                        color: '#666',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '12px'
                    }}>
                        {inquiries.length === 0 ?
                            'No inquiries found.' :
                            'No inquiries match your current filters.'
                        }
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {filteredInquiries.map(inq => (
                            <div key={inq._id} style={{
                                background: '#fff',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                                 onMouseEnter={(e) => {
                                     e.currentTarget.style.transform = 'scale(1.01)';
                                     e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                                 }}
                                 onMouseLeave={(e) => {
                                     e.currentTarget.style.transform = 'scale(1)';
                                     e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                                 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{inq.fullName}</h3>
                                        <p style={{ margin: '0.25rem 0' }}><strong>Email:</strong> {inq.email}</p>
                                        <p style={{ margin: '0.25rem 0' }}><strong>Phone:</strong> {inq.phone || 'N/A'}</p>
                                    </div>
                                    <div style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        backgroundColor: inq.resolved ? '#dcfce7' : '#fef3c7',
                                        color: inq.resolved ? '#166534' : '#92400e'
                                    }}>
                                        {inq.resolved ? 'Resolved' : 'Pending'}
                                    </div>
                                </div>

                                <p style={{ margin: '1rem 0', lineHeight: '1.5' }}>
                                    <strong>Message:</strong> {inq.message}
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                                        <strong>Submitted:</strong> {new Date(inq.createdAt).toLocaleString()}
                                    </p>

                                    <button
                                        onClick={() => toggleResolved(inq._id, inq.resolved)}
                                        style={{
                                            padding: '0.4rem 1rem',
                                            border: 'none',
                                            borderRadius: '12px',
                                            backgroundColor: inq.resolved ? '#10b981' : '#facc15',
                                            color: inq.resolved ? 'white' : '#000',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }}
                                    >
                                        {inq.resolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Load More Button */}
                {visibleCount < inquiries.filter(inquiry => {
                    const matchesResolved = resolvedFilter === 'All' ||
                        (resolvedFilter === 'resolved' && inquiry.resolved) ||
                        (resolvedFilter === 'not-resolved' && !inquiry.resolved);
                    const matchesSearch = !searchQuery ||
                        (inquiry.fullName && inquiry.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (inquiry.email && inquiry.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (inquiry.message && inquiry.message.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (inquiry.phone && inquiry.phone.includes(searchQuery));
                    return matchesResolved && matchesSearch;
                }).length && (
                    <button
                        onClick={() => setVisibleCount(visibleCount + 10)}
                        style={{ ...actionButton, marginTop: '1.5rem', width: '100%' }}
                    >
                        Load More ({inquiries.filter(inquiry => {
                        const matchesResolved = resolvedFilter === 'All' ||
                            (resolvedFilter === 'resolved' && inquiry.resolved) ||
                            (resolvedFilter === 'not-resolved' && !inquiry.resolved);
                        const matchesSearch = !searchQuery ||
                            (inquiry.fullName && inquiry.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (inquiry.email && inquiry.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (inquiry.message && inquiry.message.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (inquiry.phone && inquiry.phone.includes(searchQuery));
                        return matchesResolved && matchesSearch;
                    }).length - visibleCount} remaining)
                    </button>
                )}
            </main>
        </div>
    );
}