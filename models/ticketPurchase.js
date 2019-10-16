var mongoose = require('mongoose');
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
    token: String,
    eventId: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }
    },
    datePayed: {type: Date, default: Date.now}
});

module.exports = mongoose.model("TicketPurchase", ticketPurchaseSchema);