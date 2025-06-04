import React from 'react';
import styles from '@/styles/ContactSection.module.css';

const ContactSection = () => {
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d556.4826176721575!2d21.126943960309056!3d42.594925505342914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549d08f8e19fe1%3A0xfd19870cb1f77712!2sGrill%20House!5e0!3m2!1sen!2scz!4v1746298127300!5m2!1sen!2scz";

    return (
        <section id="contact" className={styles.contactSection}>
            <div className={styles.contactInfo}>
                <h2 className={styles.sectionTitle}>Find Us Here</h2>

                <div className={styles.contactGrid}>
                    <div className={styles.contactItem}>
                        <div className={styles.contactLabel}>Address</div>
                        <div className={styles.contactValue}>
                            <span className={styles.icon}>{/* icon */}</span>
                            Prishtina, Kosovo 10000
                        </div>
                    </div>

                    <div className={styles.contactItem}>
                        <div className={styles.contactLabel}>Contact Number</div>
                        <div className={styles.contactValue}>
                            <span className={styles.icon}>{/* icon */}</span>
                            +383 49 655 977
                        </div>
                    </div>

                    <div className={styles.contactItem}>
                        <div className={styles.contactLabel}>Email</div>
                        <div className={styles.contactValue}>
                            <span className={styles.icon}>{/* icon */}</span>
                            girllhouse@gmail.com
                        </div>
                    </div>

                    <div className={styles.contactItem}>
                        <div className={styles.contactLabel}>Facebook</div>
                        <div className={styles.contactValue}>
                            <span className={styles.icon}>{/* icon */}</span>
                            Grill House Bar
                        </div>
                    </div>
                </div>

                <img
                    src="/media/Grill House-12.png"
                    alt="Interior of Grill House"
                    className={styles.contactImage}
                />
            </div>

            <div className={styles.mapContainer}>
                <iframe
                    src={mapSrc}
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                ></iframe>
            </div>
</section>
    );
};

export default ContactSection;


