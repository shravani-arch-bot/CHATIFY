import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateToken } from "../lib/utils.js";
export const signup = async (req, res) => {
  const {fullName, username, email, password} = req.body;
  try{
    if(!fullName || !username || !email || !password){
      return res.status(400).json({message: "All fields are required"});
    }
    if(password.length < 6){
      return res.status(400).json({message: "Password must be at least 6 characters"});
    }
    //valid email : regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({message: "Please provide a valid email address"});
    }
    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({message: "User with this email already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword
    });
    if(newUser){
        generateToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({
        _id: newUser._id,fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        createdAt: newUser.createdAt
        }
        );
    }
// todo: send a welcome email to user
    else{
        res.status(400).json({message: "Error creating user"});
    }
    
  } catch (error) {
  console.log("Signup error:", error);
  res.status(500).json({ message: error.message });
}
};