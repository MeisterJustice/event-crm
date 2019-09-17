import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const donateSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    reference: {
        type: String,
        required: true
    }
});

export default mongoose.model("Donate", donateSchema);