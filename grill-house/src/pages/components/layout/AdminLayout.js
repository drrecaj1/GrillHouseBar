import {useEffect, useState} from 'react';
import {signOut, useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import styles from '@/styles/AdminLayout.module.css';

export default function AdminLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Protect admin routes
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (!session) {
        return null; // Don't render anything while redirecting
    }

    const isOwner = session.user.role === 'owner';

    return (
        <div className={styles.adminContainer}>
            {/* Mobile Header */}
            <header className={styles.mobileHeader}>
                <button
                    className={styles.menuButton}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    ☰ Menu
                </button>
                <h1 className={styles.mobileTitle}>Admin Portal</h1>
            </header>

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.sidebarHeader}>
                    <h2>Admin Portal</h2>
                    <button
                        className={styles.closeSidebar}
                        onClick={() => setSidebarOpen(false)}
                    >
                        ×
                    </button>
                </div>

                <div className={styles.userInfo}>
                    <p className={styles.userName}>{session.user.name}</p>
                    <p className={styles.userRole}>{session.user.role}</p>
                </div>

                <nav className={styles.sidebarNav}>
                    <Link
                        href="/admin/dashboard"
                        className={router.pathname === '/admin/dashboard' ? styles.activeLink : ''}
                        onClick={() => setSidebarOpen(false)}
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/admin/reservations"
                        className={router.pathname.startsWith('/admin/reservations') ? styles.activeLink : ''}
                        onClick={() => setSidebarOpen(false)}
                    >
                        Reservations
                    </Link>

                    {isOwner && (
                        <Link
                            href="/admin/users"
                            className={router.pathname.startsWith('/admin/users') ? styles.activeLink : ''}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Manage Users
                        </Link>
                    )}

                    <Link
                        href="/admin/settings"
                        className={router.pathname === '/admin/settings' ? styles.activeLink : ''}
                        onClick={() => setSidebarOpen(false)}
                    >
                        Settings
                    </Link>

                    <button
                        onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                        className={styles.signOutButton}
                    >
                        Sign Out
                    </button>
                </nav>
            </aside>

            {/* Main content */}
            <main className={styles.mainContent}>
                {children}
            </main>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}