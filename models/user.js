import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    sex: String,
    email: String,

    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    }
})
userSchema.plugin(passportLocalMongoose);
export default mongoose.model("User", userSchema);