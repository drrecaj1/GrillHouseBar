import { useState } from 'react';
import styles from '@/styles/Header.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    <img src="/media/Grill House-2.png" alt="Grill House Logo" />
                </div>

                <nav className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
                    <a className={styles.link} href="#" onClick={() => setMenuOpen(false)}>Home</a>
                    <a className={styles.link} href="#about" onClick={() => setMenuOpen(false)}>About</a>
                    <a className={styles.link} href="#menu" onClick={() => setMenuOpen(false)}>Menus</a>
                    <a className={styles.link} href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
                    <a className={styles.link} href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                    <a className={styles.reservation} href="#reservation" onClick={() => setMenuOpen(false)}>Reservations</a>

                    <div className={styles.socialIcons}>
                        <a href="https://www.instagram.com/grillhouse.bar/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://www.facebook.com/GrillBarHouse" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                    </div>
                </nav>

                {/* Desktop social icons */}
                <div className={`${styles.socialIcons} ${styles.desktopSocial}`}>
                    <a href="https://www.instagram.com/grillhouse.bar/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://www.facebook.com/GrillBarHouse" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                    </a>
                    <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                </div>

                <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </header>
    );
}