import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.firstLogin) {
                    router.push('/admin/change-password');
                } else {
                    router.push('/admin/dashboard');
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <form onSubmit={handleSubmit} style={{
                background: '#fff',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '300px'
            }}>
                <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                <button type="submit" style={{
                    padding: '0.75rem',
                    backgroundColor: '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Login
                </button>
            </form>
        </div>
    );
}