import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/styles/Form.module.css';
import { FaInfoCircle } from 'react-icons/fa';


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

    // Menu prices per person
    const menuPrices = {
        byof: 0,        // Bring Your Own Food - no food cost
        menu1: 25,      // Basic menu - $25 per person
        menu2: 40,      // Standard menu - $40 per person
        menu3: 65       // Premium menu - $65 per person
    };

    // Calculate the estimated price whenever guests or dining option changes
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

        // Form validation
        if (!fullName || !email || !numberOfGuests || !startDate) {
            alert('Please fill in all required fields');
            return;
        }

        const reservationData = {
            fullName,
            email,
            numberOfGuests: parseInt(numberOfGuests),
            diningOption,
            startDate,
            eventType,
            specialRequests,
            estimatedPrice,
            status: 'pending' // Default status for new reservations
        };

        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });

            if (response.ok) {
                alert('Reservation.js submitted successfully!');
                // Reset form
                setFullName('');
                setEmail('');
                setNumberOfGuests('');
                setDiningOption('byof');
                setStartDate(null);
                setEventType('birthday');
                setSpecialRequests('');
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
                <h2 className={styles.formTitle}>MAKE A RESERVATION</h2>
                <div className={styles.formContainer}>
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
                            <option value="birthday">Birthday</option>
                            <option value="business">Business Event</option>
                            <option value="officeparty">Office Party</option>
                            <option value="wedding">Wedding</option>
                            <option value="special">Special Occasion</option>
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

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label>Special Requests:</label>
                        <textarea
                            placeholder="Any special requests or dietary requirements?"
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                        />
                    </div>
                </div>

                <button type="submit" className={styles.submitButton}>
                    Reserve Now
                </button>
            </form>
        </section>
    );
};

export default ReservationForm;