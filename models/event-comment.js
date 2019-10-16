var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventCommentSchema = new Schema({
    email: String,
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
})
module.exports = mongoose.model("EventComment", eventCommentSchema);