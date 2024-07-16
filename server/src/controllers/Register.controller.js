import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import AddAddress from './Add-Address.controller.js';
import {User} from '../models/user.model.js';

async function Register(req, res) {
    try {
        const userAlv = await User.findOne({ EmailAddress: req.body?.EmailAddress });

        if (userAlv?.EmailAddress === req.body.EmailAddress) {
            return res.status(200).json({msg: "User already Registered" });
        }
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);

        const newUser = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Gender: req.body?.Gender || 'Male',
            EmailAddress: req.body.EmailAddress,
            MobileNumber: req.body?.MobileNumber || '123456789', // Default mobile number
            Password: hashedPassword,
            ProfileImageId: 'https://example.com/profile.jpg',
        });
        
        await newUser.save().then(()=>{
            AddAddress(newUser._id);
            res.status(200).json({ data:newUser , msg: "New User Registered" });
        })

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" }); // Handle error response
    }
}

export default Register;
