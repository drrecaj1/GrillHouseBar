import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/styles/Form.module.css';

const ReservationForm = () => {
    const [startDate, setStartDate] = useState(null);
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [diningOption, setDiningOption] = useState('indoor');
    const [eventType, setEventType] = useState('birthday');
    const [specialRequests, setSpecialRequests] = useState('');

    const handleDateChange = (date) => setStartDate(date);

    return (
        <section className={styles.reservationForm} id="reservation">
            <form className={styles.form}>
                <h2 className={styles.formTitle}>MAKE A RESERVATION</h2>
                <div className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label>Full Name:</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>No. of Guests:</label>
                        <input
                            type="number"
                            placeholder="Guests"
                            value={numberOfGuests}
                            onChange={(e) => setNumberOfGuests(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Dining Option:</label>
                        <select
                            value={diningOption}
                            onChange={(e) => setDiningOption(e.target.value)}
                        >
                            <option value="byof">Bring Your Own Food</option>
                            <option value="menu1">Menu 1</option>
                            <option value="menu2">Menu 2</option>
                            <option value="menu3">Menu 3</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Date & Time:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            showTimeSelect
                            dateFormat="Pp"
                            placeholderText="Select a date and time"
                            className={styles.datePicker}
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
                            <option value="weeding">Wedding</option>
                            <option value="special">Special Occasion</option>
                        </select>
                    </div>

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label>Message:</label>
                        <textarea
                            placeholder="Any special requests?"
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
