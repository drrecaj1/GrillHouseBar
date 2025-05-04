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
              <span className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
                            Prishtina, Kosovo 10000
                        </div>
                    </div>

                    <div className={styles.contactItem}>
                        <div className={styles.contactLabel}>Contact Number</div>
                        <div className={styles.contactValue}>
              <span className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </span>
                           +383 49 655 977
                        </div>
                    </div>

                    <div className={styles.contactItem}>
                        <div className={styles.contactLabel}>Email</div>
                        <div className={styles.contactValue}>
              <span className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </span>
                            girllhouse@gmail.com
                        </div>
                    </div>

                    <div className={styles.contactItem}>
                        <div className={styles.contactLabel}>Facebook</div>
                        <div className={styles.contactValue}>
              <span className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </span>
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