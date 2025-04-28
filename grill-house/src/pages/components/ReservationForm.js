import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReservationForm = () => {
    const [startDate, setStartDate] = useState(null); // State for selected date and time
    const [numberOfGuests, setNumberOfGuests] = useState(''); // State for number of guests
    const [fullName, setFullName] = useState(''); // State for full name
    const [email, setEmail] = useState(''); // State for email
    const [diningOption, setDiningOption] = useState('indoor'); // State for dining option
    const [eventType, setEventType] = useState('birthday'); // State for event type
    const [specialRequests, setSpecialRequests] = useState(''); // State for special requests

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    return (
        <section className="reservation-form">
            <h2>MAKE A RESERVATION</h2>
            <form>
                <div className="form-container">
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>No. of Guests:</label>
                        <input
                            type="number"
                            placeholder="Guests"
                            value={numberOfGuests}
                            onChange={(e) => setNumberOfGuests(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
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

                    <div className="form-group">
                        <label>Date & Time:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            showTimeSelect
                            dateFormat="Pp"
                            placeholderText="Select a date and time"
                        />
                    </div>

                    <div className="form-group">
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

                    <div className="form-group" style={{ flex: '1 1 100%' }}>
                        <label>Message:</label>
                        <textarea
                            placeholder="Any special requests?"
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                        />
                    </div>
                </div>

                <button type="submit">Reserve Now</button>
            </form>
        </section>
    );
};

export default ReservationForm;
