import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.header}>
                <div className={styles.navContainer}>
                    <div className={styles.logo}>
                        <img src="/media/Grill House-2.png" />
                    </div>

                    <nav className={styles.navLinks}>
                        <a className={styles.link} href="#">Home</a>
                        <a className={styles.link} href="#about">About</a>
                        <a className={styles.link} href="#menu">Menus</a>
                        <a className={styles.link} href="#gallery">Gallery</a>
                        <a className={styles.link} href="#contact">Contact</a>
                        <a className={styles.reservation} href="#reservation">Reservations</a>
                    </nav>

                    <div className={styles.socialIcons}>
                        <FaInstagram />
                        <FaFacebookF />
                        <FaTwitter />
                    </div>
                </div>
            </div>
        </header>
    );
}