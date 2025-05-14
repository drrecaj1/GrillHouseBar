import AdminSidebar from '@/pages/admin/AdminSidebar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminReservations() {
    const [reservations, setReservations] = useState([
        { id: 1, name: 'John Doe', phone: '123456789', date: '2025-05-20', time: '19:00', guests: 2, status: 'Pending', notes: '' },
        { id: 2, name: 'Jane Smith', phone: '987654321', date: '2025-05-21', time: '20:30', guests: 4, status: 'Confirmed', notes: '' },
        { id: 3, name: 'Alice Brown', phone: '456789123', date: '2025-05-18', time: '18:00', guests: 3, status: 'Cancelled', notes: '' },
        { id: 4, name: 'Bob White', phone: '333222111', date: '2025-05-22', time: '17:00', guests: 5, status: 'Pending', notes: '' },
        { id: 5, name: 'Eve Green', phone: '777888999', date: '2025-05-19', time: '20:00', guests: 2, status: 'Confirmed', notes: '' },
        { id: 6, name: 'Chris Black', phone: '555666777', date: '2025-05-23', time: '19:30', guests: 3, status: 'Pending', notes: '' }
    ]);

    const [expandedId, setExpandedId] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [visibleCount, setVisibleCount] = useState(5);

    const router = useRouter();
    const urlFilter = router.query.filter;

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
            setReservations(reservations.filter(r => r.id !== id));
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    };

    const handleNotesChange = (id, newNotes) => {
        setReservations(prev => prev.map(r => r.id === id ? { ...r, notes: newNotes } : r));
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
            (reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                reservation.phone.includes(searchQuery)) &&
            (!startDate || new Date(reservation.date) >= new Date(startDate)) &&
            (!endDate || new Date(reservation.date) <= new Date(endDate))
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, visibleCount);

    return (
        <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <main style={{ flex: 1, padding: '2rem' }}>
                <h1>All Reservations</h1>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Search by name or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={inputStyle}
                    />
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={inputStyle}>
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={inputStyle}
                    />
                    <button onClick={resetFilters} style={actionButton}>Reset Filters</button>
                </div>

                {/* Reservation List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredReservations.map(reservation => (
                        <ReservationCard
                            key={reservation.id}
                            reservation={reservation}
                            expanded={expandedId === reservation.id}
                            onToggle={() => toggleExpand(reservation.id)}
                            onDelete={() => handleDelete(reservation.id)}
                            onStatusChange={(newStatus) => handleStatusChange(reservation.id, newStatus)}
                            onNotesChange={(newNotes) => handleNotesChange(reservation.id, newNotes)}
                        />
                    ))}
                </div>

                {/* Load More */}
                {visibleCount < reservations.length && (
                    <button onClick={() => setVisibleCount(visibleCount + 5)} style={{ ...actionButton, marginTop: '1rem' }}>
                        Load More
                    </button>
                )}
            </main>
        </div>
    );
}

function ReservationCard({ reservation, expanded, onToggle, onDelete, onStatusChange, onNotesChange }) {
    const [tempNotes, setTempNotes] = useState(reservation.notes);

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
                    <h3>{reservation.name}</h3>
                    <p>{reservation.date} at {reservation.time}</p>
                    <p>Guests: {reservation.guests}</p>
                    <p>Status: <strong>{reservation.status}</strong></p>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();  // prevents parent expand
                        // Later: open menu here
                    }}
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
                    <p><strong>Phone:</strong> {reservation.phone}</p>
                    <div>
                        <label>Status: </label>
                        <select value={reservation.status} onChange={(e) => onStatusChange(e.target.value)} style={{ marginLeft: '0.5rem' }}>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
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
