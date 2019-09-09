import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    title: String,
    description: String,
    country: String,
    city: String,
    venue: String,
    eventDate: String,
    eventTime: String,
    images: [{url: String, public_id: String}],
    author: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
        username: String
     },
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "EventComment"
        }
    ],
    dateCreated: {type: Date, default: Date.now},
})
export default mongoose.model("Event", eventSchema);