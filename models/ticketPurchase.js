import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ticketPurchaseSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    reference: {
        type: String,
        required: true
    },
    datePayed: {type: Date, default: Date.now}
});

export default mongoose.model("TicketPurchase", ticketPurchaseSchema);