import AdminSidebar from '@/pages/admin/AdminSidebar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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

function ReservationCard({ reservation, expanded, onToggle, onDelete, onStatusChange, onNotesChange }) {
    const [tempNotes, setTempNotes] = useState(reservation.notes || '');

    const handleSaveNotes = () => {
        onNotesChange(tempNotes);
        alert('Notes saved!');
    };

    return (
        <div
            onClick={onToggle}
            style={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3>{reservation.fullName}</h3>
                    <p>{reservation.startDate ? new Date(reservation.startDate).toLocaleString() : 'No date'}</p>
                    <p>Guests: {reservation.numberOfGuests}</p>
                    <p>Status: <strong>{reservation.status}</strong></p>
                </div>
                <button
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}
                >⋮</button>
            </div>

            {expanded && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                    <p><strong>Email:</strong> {reservation.email}</p>
                    <p><strong>Dining Option:</strong> {reservation.diningOption}</p>
                    <p><strong>Event Type:</strong> {reservation.eventType}</p>
                    <p><strong>Special Requests:</strong> {reservation.specialRequests}</p>
                    <div>
                        <label>Status: </label>
                        <select value={reservation.status} onChange={(e) => onStatusChange(e.target.value)} style={{ marginLeft: '0.5rem' }}>
                            <option value="pending">Pending</option>
                            <option value="confirm">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <label>Notes:</label>
                        <textarea
                            value={tempNotes}
                            onChange={(e) => setTempNotes(e.target.value)}
                            rows={3}
                            style={{ width: '100%', marginTop: '0.5rem' }}
                        />
                        <button onClick={handleSaveNotes} style={{ ...actionButton, marginTop: '0.5rem' }}>Save Notes</button>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <button onClick={onDelete} style={{ ...actionButton, backgroundColor: '#e74c3c' }}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AdminReservations() {
    const [reservations, setReservations] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [visibleCount, setVisibleCount] = useState(5);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        numberOfGuests: '',
        diningOption: '',
        eventType: '',
        specialRequests: '',
        startDate: '',
    });

    const router = useRouter();
    const urlFilter = router.query.filter;

    const fetchReservations = async () => {
        const res = await fetch('/api/reservations');
        if (res.ok) {
            const data = await res.json();
            setReservations(data.reservations);
        }
    };

    useEffect(() => { fetchReservations(); }, []);

    useEffect(() => {
        if (urlFilter === 'Upcoming') {
            const today = new Date();
            const nextWeek = new Date();
            nextWeek.setDate(today.getDate() + 7);
            setStatusFilter('All');
            setStartDate(today.toISOString().split('T')[0]);
            setEndDate(nextWeek.toISOString().split('T')[0]);
        } else if (urlFilter) {
            setStatusFilter(urlFilter);
            setStartDate('');
            setEndDate('');
        }
    }, [urlFilter]);

    const toggleExpand = (id) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this reservation?")) {
            setReservations(reservations.filter(r => r._id !== id));
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setReservations(prev => prev.map(r => r._id === id ? { ...r, status: newStatus } : r));
    };

    const handleNotesChange = (id, newNotes) => {
        setReservations(prev => prev.map(r => r._id === id ? { ...r, notes: newNotes } : r));
    };

    const resetFilters = () => {
        setStatusFilter('All');
        setSearchQuery('');
        setStartDate('');
        setEndDate('');
    };

    const filteredReservations = reservations
        .filter(reservation =>
            (statusFilter === 'All' || reservation.status === statusFilter) &&
            ((reservation.fullName && reservation.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (reservation.phone && reservation.phone.includes(searchQuery))) &&
            (!startDate || new Date(reservation.startDate) >= new Date(startDate)) &&
            (!endDate || new Date(reservation.startDate) <= new Date(endDate))
        )
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .slice(0, visibleCount);

    return (
        <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <main style={{ flex: 1, padding: '2rem' }}>
                <h1>All Reservations</h1>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
                    <input type="text" placeholder="Search by name or phone..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={inputStyle} />
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={inputStyle}>
                        <option value="All">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inputStyle} />
                    <button onClick={resetFilters} style={actionButton}>Reset Filters</button>
                    <button onClick={() => setShowForm(true)} style={actionButton}>+ Add Reservation</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredReservations.map(reservation => (
                        <ReservationCard
                            key={reservation._id}
                            reservation={reservation}
                            expanded={expandedId === reservation._id}
                            onToggle={() => toggleExpand(reservation._id)}
                            onDelete={() => handleDelete(reservation._id)}
                            onStatusChange={(newStatus) => handleStatusChange(reservation._id, newStatus.toLowerCase())}
                            onNotesChange={(newNotes) => handleNotesChange(reservation._id, newNotes)}
                        />
                    ))}
                </div>

                {visibleCount < reservations.length && (
                    <button onClick={() => setVisibleCount(visibleCount + 5)} style={{ ...actionButton, marginTop: '1rem' }}>
                        Load More
                    </button>
                )}

                {/* Add Reservation.js Modal */}
                {showForm && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{
                            backgroundColor: 'white', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '500px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                        }}>
                            <h2 style={{ marginBottom: '1rem' }}>Add Reservation</h2>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const res = await fetch('/api/reservations', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        ...formData,
                                        numberOfGuests: Number(formData.numberOfGuests)
                                    }),
                                });
                                if (res.ok) {
                                    alert('Reservation.js added!');
                                    setShowForm(false);
                                    setFormData({
                                        fullName: '', email: '', numberOfGuests: '',
                                        diningOption: '', eventType: '', specialRequests: '', startDate: ''
                                    });
                                    fetchReservations();
                                } else {
                                    alert('Error adding reservation');
                                }
                            }}>
                                {['fullName', 'email', 'numberOfGuests', 'diningOption', 'eventType', 'specialRequests', 'startDate'].map((field) => (
                                    <div key={field} style={{ marginBottom: '1rem' }}>
                                        {field === 'diningOption' ? (
                                            <select
                                                value={formData[field]}
                                                onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
                                            >
                                                <option value="byof">Bring Your Own Food</option>
                                                <option value="menu1">Menu 1</option>
                                                <option value="menu2">Menu 2</option>
                                                <option value="menu3">Menu 3</option>
                                            </select>
                                        ) : field === 'eventType' ? (
                                            <select
                                                value={formData[field]}
                                                onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
                                            >
                                                <option value="birthday">Birthday</option>
                                                <option value="business">Business Event</option>
                                                <option value="officeparty">Office Party</option>
                                                <option value="wedding">Wedding</option>
                                                <option value="special">Special Occasion</option>
                                            </select>
                                        ) : (
                                            <input
                                                type={field === 'startDate' ? 'datetime-local' : field === 'numberOfGuests' ? 'number' : 'text'}
                                                placeholder={field.replace(/([A-Z])/g, ' $1').replace(/\b\w/g, c => c.toUpperCase())}
                                                value={formData[field]}
                                                onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
                                            />
                                        )}
                                    </div>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button type="submit" style={{ ...actionButton, flex: 1, marginRight: '0.5rem' }}>Submit</button>
                                    <button onClick={() => setShowForm(false)} type="button" style={{ ...actionButton, backgroundColor: '#aaa', flex: 1 }}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}