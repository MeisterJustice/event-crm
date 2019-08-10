import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    title: String,
    description: String,
    city: String,
    venue: String,
    images: [String],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateCreated: {type: Date, default: Date.now},
})
export default mongoose.model("Event", eventSchema);