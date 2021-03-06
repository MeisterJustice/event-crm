import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const blogCommentSchema = new Schema({
    email: String,
    name: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateCreated: {type: Date, default: Date.now}
})
export default mongoose.model("BlogComment", blogCommentSchema);