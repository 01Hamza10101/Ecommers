import mongoose from "mongoose";
import {MONGODB_URI , DB_NAME } from "../constants.js";
 


export let client = null;

const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`,);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
export default connectDB;