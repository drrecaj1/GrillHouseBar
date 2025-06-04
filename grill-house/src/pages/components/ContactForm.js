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

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            setSuccessMessage('Message sent! We’ll get back to you shortly.');
            setFormData({ fullName: '', email: '', phone: '', message: '' });

            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
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

            {successMessage && (
                <div className={styles.successBanner}>
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <input
                        name="fullName"
                        id="fullName"
                        required
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <input
                        name="email"
                        type="email"
                        id="email"
                        required
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <input
                        name="phone"
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{7,15}"
                        maxLength={15}
                        required
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        onInvalid={(e) => e.target.setCustomValidity('Only numbers allowed. No spaces or letters.')}
                        onInput={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <textarea
                        name="message"
                        id="message"
                        rows={4}
                        required
                        placeholder="Your Message"
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