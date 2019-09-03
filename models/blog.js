import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title: String,
    description: String,
    image: String,
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
           ref: "BlogComment"
        }
    ],
    dateCreated: {type: Date, default: Date.now},
});

blogSchema.plugin(mongoosePaginate);

export default mongoose.model("Blog", blogSchema);