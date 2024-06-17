import mongoose from "mongoose";
import { User } from "../models/user.model.js";


async function Register(){
    const newUser = new User({
        FirstName: 'John',
        LastName: 'Doe',
        EmailAddress: 'johndoe@example.com',
        MobileNumber: '1234567890',
        Password: 'password123',
        ProfileImageId: 'https://example.com/profile.jpg',
    });
    newUser.save().then(()=>{
        console.log("User is Registerd");
    })
}

export default Register;