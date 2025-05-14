import AdminSidebar from '@/pages/admin/AdminSidebar';
import Link from 'next/link';
import { useState } from 'react';
import StatCard from '@/pages/admin/StatCard';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
    const [reservations] = useState([
        { id: 1, name: 'John Doe', phone: '123456789', date: '2025-05-20', time: '19:00', guests: 2, status: 'Pending' },
        { id: 2, name: 'Jane Smith', phone: '987654321', date: '2025-05-21', time: '20:30', guests: 4, status: 'Confirmed' },
        { id: 3, name: 'Alice Brown', phone: '456789123', date: '2025-05-18', time: '18:00', guests: 3, status: 'Cancelled' },
        { id: 4, name: 'Bob White', phone: '333222111', date: '2025-05-22', time: '17:00', guests: 5, status: 'Pending' },
        { id: 5, name: 'Eve Green', phone: '777888999', date: '2025-05-19', time: '20:00', guests: 2, status: 'Confirmed' },
        { id: 6, name: 'Chris Black', phone: '555666777', date: '2025-05-23', time: '19:30', guests: 3, status: 'Pending' }
    ]);

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const total = reservations.length;
    const pending = reservations.filter(r => r.status === 'Pending').length;
    const confirmed = reservations.filter(r => r.status === 'Confirmed').length;
    const cancelled = reservations.filter(r => r.status === 'Cancelled').length;
    const upcoming = reservations.filter(r => {
        const date = new Date(r.date);
        return date >= today && date <= nextWeek;
    }).length;

    const upcomingList = reservations
        .filter(r => {
            const date = new Date(r.date);
            return date >= today && date <= nextWeek;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);

    const chartData = {
        labels: ['Pending', 'Confirmed', 'Cancelled'],
        datasets: [
            {
                data: [pending, confirmed, cancelled],
                backgroundColor: ['#facc15', '#10b981', '#ef4444'],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: { position: 'bottom' },
        },
        maintainAspectRatio: false,
    };

    return (
        <div style={{ display: 'flex', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <AdminSidebar />
            <main style={{ flex: 1, padding: '2rem' }}>
                <h1 style={{  fontSize: '1.75rem', fontWeight: '700' }}>Dashboard</h1>

                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                    <StatCard title="Total Reservations" value={total} link="/admin/reservations" />
                    <StatCard title="Pending" value={pending} link="/admin/reservations?filter=Pending" />
                    <StatCard title="Confirmed" value={confirmed} link="/admin/reservations?filter=Confirmed" />
                    <StatCard title="Cancelled" value={cancelled} link="/admin/reservations?filter=Cancelled" />
                    <StatCard title="Upcoming (7d)" value={upcoming} link="/admin/reservations?filter=Upcoming" />
                </div>

                {/* 2 Column Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
                    {/* Upcoming Reservations */}
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Upcoming Reservations (Next 7 Days)</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {upcomingList.map(r => (
                                <div key={r.id} style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '24px',
                                    padding: '1rem 1.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                                    fontWeight: '600',
                                    fontSize: '0.95rem'
                                }}>
                                    <div>{r.name} — {r.date} at {r.time}</div>
                                    <div>{r.guests} guests</div>
                                </div>
                            ))}
                        </div>
                        <Link href="/admin/reservations">
                            <button style={{
                                marginTop: '1.5rem',
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                backgroundColor: '#333',
                                color: 'white',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                            >See All Reservations</button>
                        </Link>
                    </div>

                    {/* Chart */}
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Reservation Status Overview</h2>
                        <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', height: '300px' }}>
                            <Doughnut data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
