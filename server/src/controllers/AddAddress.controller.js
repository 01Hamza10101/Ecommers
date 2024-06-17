import mongoose from "mongoose";
import {Address} from "../models/address.model.js"

async function AddAddress(){
    const AddAddress = new Address({
        UserId:"667081c23dce96bbc72095be",
        Name:"Black",
        MobileNumber:8979484843,
        PinCode:812005,
        Locality:"semaria",
        Address:"semaria",
        City:"Bhagalpur",
        State:"Bihar",
        Landmark:"Discover public school",
        MobileNumberOpt:8969682448
    })
    AddAddress.save()
}

export default AddAddress;