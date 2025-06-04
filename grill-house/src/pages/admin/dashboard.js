import AdminSidebar from '@/pages/admin/AdminSidebar';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import StatCard from '@/pages/admin/StatCard';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { parse } from 'cookie';
import ChartDataLabels from 'chartjs-plugin-datalabels';



Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

export async function getServerSideProps({ req }) {
    const cookies = parse(req.headers.cookie || '');
    if (cookies.adminAuth?.toLowerCase() !== 'true') {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        };
    }
    return { props: {} };
}

export default function AdminDashboard() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        async function fetchReservations() {
            const res = await fetch('/api/reservations');
            if (res.ok) {
                const data = await res.json();
                setReservations(data.reservations);
            }
        }
        fetchReservations();
    }, []);

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const total = reservations.length;
    const pending = reservations.filter(r => r.status === 'pending').length;
    const confirmed = reservations.filter(r => r.status === 'confirmed').length;
    const cancelled = reservations.filter(r => r.status === 'cancelled').length;

    const upcomingList = reservations
        .filter(r => {
            const date = new Date(r.startDate);
            return date >= today && date <= nextWeek;
        })
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        .slice(0, 5);

    const chartData = {
        labels: ['Pending', 'Confirmed', 'Cancelled'],
        datasets: [
            {
                data: [pending, confirmed, cancelled],
                backgroundColor: ['#facc15', '#10b981', '#ef4444'],
                borderWidth: 1,
                borderRadius: 8,

            },
        ],
    };


    const chartOptions = {
        plugins: {
            legend: { position: 'bottom' },
        },
        maintainAspectRatio: false,
    };


    const monthlyCounts = Array(12).fill(0);
    reservations.forEach(res => {
        if (res.status === 'confirmed') {
            const month = new Date(res.startDate).getMonth();
            monthlyCounts[month]++;
        }
    });

    const barChartData = {
        labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [{
            label: 'Reservations per Month',
            data: monthlyCounts,
            backgroundColor: '#ef4444'
        }]
    };

    const barChartOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Monthly Reservations',
                font: {
                    size: 25,
                    weight: 'bold',
                    family: "'Copperplate', 'Arial', sans-serif"
                },
                color: '#111',
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            datalabels: {
                display: (ctx) => ctx.dataset.data[ctx.dataIndex] !== 0,
                anchor: 'end',
                align: 'end',
                offset: 8,
                font: {
                    weight: 'bold',
                    size: 14
                },
                color: '#111'
            },
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 20,
                ticks: {
                    stepSize: 5,
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
        maintainAspectRatio: false,
    };



    return (
        <div style={{ display: 'flex', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <AdminSidebar />
            <main style={{ flex: 1, padding: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Dashboard</h1>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                    <StatCard title="Total Reservations" value={total} link="/admin/reservations" />
                    <StatCard title="Pending" value={pending} link="/admin/reservations?filter=pending" />
                    <StatCard title="Confirmed" value={confirmed} link="/admin/reservations?filter=confirmed" />
                    <StatCard title="Cancelled" value={cancelled} link="/admin/reservations?filter=cancelled" />
                    <StatCard title="Upcoming (7d)" value={upcomingList.length} link="/admin/reservations?filter=Upcoming" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Upcoming Reservations (Next 7 Days)</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {upcomingList.map(r => (
                                <div key={r._id} style={{
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
                                    <div>{r.fullName} — {r.startDate && new Date(r.startDate).toLocaleString()}</div>
                                    <div>{r.numberOfGuests} guests</div>
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
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                            >See All Reservations</button>
                        </Link>
                    </div>

                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Reservation Status Overview</h2>
                        <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', height: '300px' }}>
                            <Doughnut data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        marginTop: '3rem',
                        backgroundColor: '#fff',
                        padding: '2rem',
                        borderRadius: '24px',
                        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                        height: '450px',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Bar data={barChartData} options={barChartOptions} plugins={[ChartDataLabels]} />
                </div>
            </main>
        </div>
    );
}

