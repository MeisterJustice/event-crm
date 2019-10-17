import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const emailSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    dateCreated: {type: Date, default: Date.now},
})
export default mongoose.model("Email", emailSchema);