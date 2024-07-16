import mongoose from "mongoose";
import {Address} from "../models/address.model.js"

async function AddAddress(id){
    
    const AddAddress = new Address({
        UserId:id,
        Name:'example',
        MobileNumber:123456789,
        PinCode:1111,
        Locality:'example',
        Address:'example',
        City:'example',
        State:'example',
        Landmark:'example',
        MobileNumberOpt:1234567890
    })
    AddAddress.save();
}

export default AddAddress;