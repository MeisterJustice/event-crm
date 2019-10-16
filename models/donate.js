var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const donateSchema = new Schema({
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

module.exports = mongoose.model("Donate", donateSchema);