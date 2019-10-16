var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const emailSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    dateCreated: {type: Date, default: Date.now},
})
module.exports = mongoose.model("Email", emailSchema);