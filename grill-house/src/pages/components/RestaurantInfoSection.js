// components/RestaurantInfoSection.js
import styles from '@/styles/RestaurantInfoSection.module.css';

const RestaurantInfoSection = () => {
    return (
        <section id="about" className={styles.infoSection}>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <div className={styles.restaurantStory}>
                        <h2 className={styles.storyTitle}>
                            GRILL HOUSE STORY- A NEW RESTAURANT WITH AMAZING FLAVORS
                        </h2>
                        <p className={styles.storyText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua.
                        </p>
                        <p className={styles.storyText}>
                            Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.logoSection}>
                        <h2 className={styles.logoText}><img className={styles.infoLogo} src={"/media/logo2.png"}/></h2>
                    </div>

                    <div className={styles.openingHours}>
                        <h2 className={styles.hoursTitle}>OPENING HOURS</h2>
                        <p className={styles.hoursText}>Every day: 11:00 - 22:00</p>
                        <p className={styles.hoursText}>Kitchen open everyday until 20:00</p>
                        <button className={styles.reserveBtn}>Reserve Now</button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default RestaurantInfoSection;