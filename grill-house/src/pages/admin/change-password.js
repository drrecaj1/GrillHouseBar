import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError("New passwords don't match");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        const res = await fetch('/api/admin-change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldPassword, newPassword })
        });

        const data = await res.json();

        if (res.ok) {
            setSuccess(data.message);
            setTimeout(() => router.push('/admin/dashboard'), 1500);
        } else {
            setError(data.message || 'Error updating password');
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
                <h2 style={{ textAlign: 'center' }}>Change Password</h2>

                <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    required
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />

                {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                {success && <div style={{ color: 'green', textAlign: 'center' }}>{success}</div>}

                <button type="submit" style={{
                    padding: '0.75rem',
                    backgroundColor: '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Update Password
                </button>
            </form>
        </div>
    );
}