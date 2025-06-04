import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    numberOfGuests: { type: Number, required: true },
    diningOption: { type: String, default: 'Bring Your Own Food' },
    eventType: { type: String, default: 'N/A' },
    specialRequests: { type: String, default: 'None' },
    startDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    notes: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);