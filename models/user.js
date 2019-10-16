import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    about: String,
    sex: String,
    state: String,
    city: String,
    email: { type: String, unique: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    image: {
        secure_url: { type: String, default: '/images/default-profile.jpg' },
        public_id: String
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    totalAmount: {
        type: Number,
        default: 0
    }
})
userSchema.plugin(passportLocalMongoose);
export default mongoose.model("User", userSchema);