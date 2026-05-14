import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String,required:true, unique: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true, minlength: 6 },
    fullName: { type: String, required: true },
    profilePicture: { type: String, default:"" }, // URL to profile picture
}, { timestamps: true });//createdAt & updatedAt

const User = mongoose.model('User', userSchema);
export default User;