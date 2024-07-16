import mongoose from "mongoose";
import { SellerUser } from "../models/user.model.js";


async function SellerRegister(){
    const newUser = new SellerUser({
        FirstName: 'John',
        LastName: 'Doe',
        EmailAddress: 'johndoe@example.com',
        MobileNumber: '1234567890',
        Password: 'password123',
        ProfileImageId: 'https://example.com/profile.jpg',
    });
    newUser.save();
}

export default SellerRegister;