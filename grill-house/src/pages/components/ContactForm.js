import { useState } from 'react';
import styles from '@/styles/Contact.module.css';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            alert('Your message has been sent!');
            setFormData({ fullName: '', email: '', phone: '', message: '' });
        } else {
            alert('There was an error. Please try again.');
        }
    };

    return (
        <section className={styles.contactSection}>
            <h2 className={styles.heading}>Any more questions?</h2>
            <p className={styles.subtitle}>
                Write down your information and we will get back to you to answer any questions you may have.
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        name="fullName"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        name="message"
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Send Message
                </button>
            </form>
        </section>
    );
}
