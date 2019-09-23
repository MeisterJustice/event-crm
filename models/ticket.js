import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ticketSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    regularAmount: Number,
    coupleAmount: Number,
    vipAmount: Number,
    ticketsPurchased: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "TicketPurchase"
        }
    ],
    datePayed: {type: Date, default: Date.now}
});

export default mongoose.model("Ticket", ticketSchema);