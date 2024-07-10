import { User } from "../models/user.model.js";
import { Address } from "../models/address.model.js";
async function UpdateProfile(req, res) {
  console.log('working', req.body);
  try {
    const updatedUser = await User.updateOne(
      { _id: req.user._id },
      { $set: req.body.formData }
    );
    const updateAddress = await Address.updateOne(
      {UserId:req.user._id},
      { $set:req.body.formAddress}
    );
    
    if (!updatedUser) {
      throw new Error(`User with ID ${req.user._id} not found.`);
    }

    if (!updateAddress) {
      throw new Error(`Address with ID ${req.user._id} not found.`);
    }

    console.log('Updated user:', updatedUser);
    console.log('Updated address:', updateAddress);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ msg: 'Profile update failed! DB ERROR', error });
  }
}

export default UpdateProfile;
