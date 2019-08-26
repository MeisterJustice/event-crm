import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    title: String,
    description: String,
    city: String,
    venue: String,
    lat: Number,
    lng: Number,
    mainImage: String,
    images: [{url: String, public_id: String}],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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