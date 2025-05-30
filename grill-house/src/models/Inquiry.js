import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false }
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
