// components/Header.js
import Link from 'next/link';
import styles from '@/styles/Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <ul className={styles.navLinks}>
                    <li><Link href="/" className={styles.navLink}>HOME</Link></li>
                    <li><Link href="/#about" className={styles.navLink}>ABOUT US</Link></li>
                    <li><Link href="/#menu" className={styles.navLink}>MENU</Link></li>
                    <li className={styles.logo}>
                        <Link href="/">
                            <img
                                src="/media/Grill House Logo.png"  // Adjust the path as needed
                                alt="Company Logo"
                                className={styles.logoImage}
                            />
                        </Link>
                    </li>
                    <li><Link href="/#reservation" className={styles.navLink}>Reserve</Link></li>
                    <li><Link href="/#gallery" className={styles.navLink}>PHOTO GALLERY</Link></li>
                    <li><Link href="/#contact" className={styles.navLink}>CONTACT</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;