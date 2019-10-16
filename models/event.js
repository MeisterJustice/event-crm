var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    title: String,
    description: String,
    country: String,
    city: String,
    venue: String,
    eventDate: String,
    eventTime: String,
    color: String,
    images: [{
        url: String,
        public_id: String
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        email: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "EventComment"
    }],

    ticketComment: String,
    regularAmount: Number,
    coupleAmount: Number,
    vipAmount: Number,
    totalEventAmount: {
        type: Number,
        default: 0
    },
    ticketsPurchased: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TicketPurchase"
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    },
})
eventSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Event", eventSchema);