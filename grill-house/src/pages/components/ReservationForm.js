import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/styles/Form.module.css';
import { FaInfoCircle } from 'react-icons/fa';
import TermsModal from './TermsModal';



const ReservationForm = () => {
    const [startDate, setStartDate] = useState(null);
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [diningOption, setDiningOption] = useState('byof');
    const [eventType, setEventType] = useState('birthday');
    const [specialRequests, setSpecialRequests] = useState('');
    const [estimatedPrice, setEstimatedPrice] = useState(0);
    const [showPriceEstimate, setShowPriceEstimate] = useState(false);

    const [successMessage, setSuccessMessage] = useState('');
    const successRef = useRef(null);


    const [showTermsModal, setShowTermsModal] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const generateTimes = () => {
        const times = [];
        const now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);

        for (let hour = 8; hour <= 23; hour++) {
            const base = new Date(now);
            base.setHours(hour, 0);
            times.push(new Date(base));
            base.setMinutes(30);
            times.push(new Date(base));
        }


        const midnight = new Date(now);
        midnight.setDate(midnight.getDate() + 1);
        midnight.setHours(0, 0);
        times.push(new Date(midnight));

        return times;
    };


    const menuPrices = {
        byof: 0,
        menu1: 23,
        menu2: 28,
        menu3: 35
    };

    useEffect(() => {
        if (numberOfGuests && diningOption !== 'byof') {
            const basePrice = menuPrices[diningOption] * parseInt(numberOfGuests);
            setEstimatedPrice(basePrice);
            setShowPriceEstimate(true);
        } else {
            setShowPriceEstimate(false);
        }
    }, [numberOfGuests, diningOption]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !numberOfGuests || !startDate) {
            alert('Please fill in all required fields');
            return;
        }

        if (!termsAccepted) {
            alert('You must agree to the Terms and Conditions.');
            return;
        }

        const reservationData = {
            fullName,
            email,
            numberOfGuests: parseInt(numberOfGuests),
            diningOption,
            startDate: new Date(startDate),
            eventType,
            specialRequests,
            estimatedPrice,
            status: 'pending'
        };

        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservationData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.message);


                if (successRef.current) {
                    successRef.current.scrollIntoView({ behavior: 'smooth' });
                }

                setTimeout(() => {
                    setSuccessMessage('');
                    setFullName('');
                    setEmail('');
                    setNumberOfGuests('');
                    setDiningOption('byof');
                    setEventType('birthday');
                    setSpecialRequests('');
                    setStartDate(null);
                    setEstimatedPrice(0);
                    setShowPriceEstimate(false);
                    setTermsAccepted(false);
                }, 5000);
            } else {
                alert('Failed to submit reservation. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting reservation:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <section className={styles.reservationForm} id="reservation">
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={`${styles.formTitle} formTitle`}>MAKE A RESERVATION</h2>
                <div className={styles.formContainer}>
                    {successMessage && (
                        <div ref={successRef} className={styles.successMessage}>
                            {successMessage}
                        </div>
                    )}
                    <div className={styles.formGroup}>
                        <label>Full Name:*</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email:*</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>No. of Guests:*</label>
                        <input
                            type="number"
                            placeholder="Guests"
                            value={numberOfGuests}
                            onChange={(e) => setNumberOfGuests(e.target.value)}
                            min="1"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Dining Option:*</label>
                        <select
                            value={diningOption}
                            onChange={(e) => setDiningOption(e.target.value)}
                            required
                        >
                            <option value="byof">Bring Your Own Food</option>
                            <option value="menu1">Menu 1</option>
                            <option value="menu2">Menu 2</option>
                            <option value="menu3">Menu 3</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Date & Time:*</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeIntervals={30}
                            includeTimes={generateTimes()}
                            dateFormat="Pp"
                            placeholderText="Select a date and time"
                            className={styles.datePicker}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Event Type:</label>
                        <select
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                        >
                            <option value="Birthday">Birthday</option>
                            <option value="Business Event">Business Event</option>
                            <option value="Office Party">Office Party</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Special Occasion">Special Occasion</option>
                        </select>
                    </div>

                    {showPriceEstimate && (
                        <div className={styles.priceEstimate}>
                            <div className={styles.priceRow}>
                                <FaInfoCircle
                                    title="This is an approximate value and may change based on final details."
                                    className={styles.infoIcon}
                                />
                                <p className={styles.priceText}>
                                    Estimated Price: <span>${estimatedPrice}</span>
                                </p>
                            </div>
                            <small>
                                This is an approximate value. Final pricing may vary based on
                                number of guests and specific requirements. Please contact us
                                for a personalized quote.
                            </small>
                        </div>
                    )}
                    <div className={styles.fullRow}>
                        <div className={styles.formGroup}>
                            <label>Special Requests:</label>
                            <textarea
                                placeholder="Any special requests or dietary requirements?"
                                value={specialRequests}
                                onChange={(e) => setSpecialRequests(e.target.value)}
                            />
                        </div>

                        <div className={styles.fullRow}>
                            <div className={styles.termsRow}>
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={termsAccepted}
                                    onChange={() => setTermsAccepted(!termsAccepted)}
                                    required
                                />
                                <label htmlFor="terms">
                                    I agree to the{' '}
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowTermsModal(true);
                                        }}
                                        className={styles.termsLink}
                                    >
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>

                            <div className={styles.submitContainer}>
                                <a href="#reservation">
                                    <button type="submit" className={styles.submitButton}>
                                        Reserve Now
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Modal trigger */}
            <TermsModal
                isOpen={showTermsModal}
                onRequestClose={() => setShowTermsModal(false)}
                onAccept={() => setTermsAccepted(true)}
            />
        </section>
    );
};

export default ReservationForm;