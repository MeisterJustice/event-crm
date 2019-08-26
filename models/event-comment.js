import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const eventCommentSchema = new Schema({
    email: String,
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
})
export default mongoose.model("EventComment", eventCommentSchema);