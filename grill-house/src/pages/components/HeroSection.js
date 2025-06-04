import styles from '@/styles/HeroSection.module.css';

const HeroSection = () => {
    return (
        <section id="hero" className={styles.hero}>
            <div className={styles.bgOverlay}></div>
            <div className={styles.heroContent}>
                <h1 className={styles.heading}>PEOPLE WHO LOVE TO EAT</h1>
                <p className={styles.subheading}>ARE ALWAYS THE BEST PEOPLE.</p>
                <p className={styles.subtitle}>
                   "Perfect place to grill & chill"
                </p>
                <a href="#reservation">
                <button className={styles.reserveBtn}>Reserve Now</button>
                </a>

            </div>
        </section>
    );
};

export default HeroSection;