import Link from 'next/link';

const colors = {
    "Total Reservations": "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)",
    "Pending": "linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)",
    "Confirmed": "linear-gradient(135deg, #A7F3D0 0%, #10B981 100%)",
    "Cancelled": "linear-gradient(135deg, #FCA5A5 0%, #EF4444 100%)",
    "Upcoming (7d)": "linear-gradient(135deg, #C4B5FD 0%, #8B5CF6 100%)"
};

export default function StatCard({ title, value, link }) {
    return (
        <Link href={link} style={{ textDecoration: 'none', color: 'inherit', flex: '1', minWidth: '160px' }}>
            <div style={{
                background: colors[title],
                borderRadius: '20px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                textAlign: 'center'
            }}
                 onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                 onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{title}</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{value}</div>
            </div>
        </Link>
    );
}
