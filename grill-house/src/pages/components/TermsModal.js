import Modal from 'react-modal';
import styles from '@/styles/Terms.module.css';

Modal.setAppElement('#__next');

const TermsModal = ({ isOpen, onRequestClose, onAccept }) => {
    const handleAccept = () => {
        onAccept();
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Terms and Conditions"
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <div className={styles.contentBox}>
                <h2 className={styles.title}>Terms and Conditions</h2>
                <div className={styles.scrollArea}>
                    <p>This website complies with Kosovo’s <strong>Law No. 06/L-082 on the Protection of Personal Data</strong>, ensuring that any personal information you share with us is processed lawfully, fairly, and transparently.</p>
                    <h3>11.1 What Information We Collect</h3>
                    <ul>
                        <li>Your full name</li>
                        <li>Your phone number</li>
                        <li>Your email address</li>
                        <li>Reservation details (e.g., date, time, number of people)</li>
                        <li>Any message you send through the contact form</li>
                    </ul>
                    <h3>11.2 Why We Collect It</h3>
                    <ul>
                        <li>Book and manage your reservations</li>
                        <li>Respond to your questions or requests</li>
                        <li>Send you confirmations or updates about your booking</li>
                        <li>Analyze general usage trends (in anonymized form only)</li>
                    </ul>
                    <p><strong>We do not</strong> use your data for advertising, profiling, or any unrelated purposes.</p>
                    <h3>11.3 Legal Basis for Data Use</h3>
                    <ul>
                        <li>Your consent, which you give when submitting a form</li>
                        <li>Our legitimate interest in running our restaurant and responding to your inquiries</li>
                    </ul>
                    <h3>11.4 How Your Data Is Stored and Used</h3>
                    <ul>
                        <li>Your personal data is stored securely and accessed only by authorized personnel</li>
                        <li>Once no longer needed for reservation or communication purposes, it may be anonymized and retained for general statistical analysis</li>
                        <li>Anonymized data cannot be linked back to any individual and is used solely to improve our services</li>
                    </ul>
                    <h3>11.5 Your Rights</h3>
                    <ul>
                        <li>Request access to your data</li>
                        <li>Request correction or deletion of your data</li>
                        <li>Object to data processing</li>
                        <li>Withdraw consent at any time</li>
                    </ul>
                    <h3>11.6 Third-Party Access</h3>
                    <p>Your data is not shared with any third parties. Emails are sent using a secure and non-retentive email system.</p>
                    <h3>11.7 Withdrawing Consent</h3>
                    <p>You may withdraw your consent at any time by contacting us directly. Upon request, we will delete your data unless retention is required by law.</p>
                </div>
                <button className={styles.acceptButton} onClick={handleAccept}>
                    ACCEPT
                </button>
            </div>
        </Modal>
    );
};

export default TermsModal;