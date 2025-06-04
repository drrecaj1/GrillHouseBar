import styles from '@/styles/RestaurantInfoSection.module.css';

const RestaurantInfoSection = () => {
    return (
        <section id="about" className={styles.infoSection}>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <div className={styles.restaurantStory}>
                        <h2 className={styles.storyTitle}>
                            GRILL HOUSE STORY – TRADITION MEETS FLAVOR SINCE 2011
                        </h2>
                        <p className={styles.storyText}>
                            At Grill House Bar, we offer a one-of-a-kind dining experience in the heart of Prishtina. Whether you're craving our curated set menus or prefer to bring your own food to grill, we provide the space, the fire, and the vibe.
                        </p>
                        <p className={styles.storyText}>
                            Since 2011, we've built a home for food lovers who value flavor, freedom, and good company. Now, with our new online booking system, reserving your perfect spot is just a click away.
                        </p>
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.logoSection}>
                        <h2 className={styles.logoText}><img className={styles.infoLogo} src={"/media/logo2.png"}/></h2>
                    </div>

                    <div className={styles.howto}>
                        <h2 className={styles.howtoTitle}>HOW IT WORKS</h2>
                        <p className={styles.howtoText}>
                            Bring your own food and we’ll get the grill going for you — just sit back and enjoy the outdoor vibe.
                        </p>
                        <p className={styles.howtoText}>
                            Not in the mood to prep? Choose one of our ready-to-go traditional set menus, made fresh and priced per person.
                        </p>
                        <p className={styles.howtoText}>
                            Cold drinks, cozy atmosphere, and great company — always included.
                        </p>
                        <a href="#reservation"> <button className={styles.reserveBtn}>Reserve Now</button> </a>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default RestaurantInfoSection;