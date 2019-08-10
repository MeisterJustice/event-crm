import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title: String,
    description: String,
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateCreated: {type: Date, default: Date.now},
})
export default mongoose.model("Blog", blogSchema);