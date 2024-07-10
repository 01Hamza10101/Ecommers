import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.model.js';
import {JWT_SECRET} from '../constants.js';

async function Login(req, res) {
    try {
        // Find user by email address
        const user = await User.findOne({ EmailAddress: req.body?.EmailAddress });

        if (!user) {
            return res.status(404).json({ msg: "User Not Registered" });
        };

        const isMatch = await bcrypt.compare(req.body.Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid Passowrd" });
        };

        if (user.EmailAddress == req.body.EmailAddress) {
            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

            // Return success message along with token
            return res.status(200).json({ msg: "User Logged In", token });
        } else {
            return res.status(401).json({ msg: "Unauthorized" });
        }

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal server error" }); // Handle error response
    }
}

export default Login;
