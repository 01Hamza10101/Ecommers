import {admin} from "../controllers/img-upload.controller.js";

const db = admin.firestore();
const userData = {
    username: "example",
    email: "example@example.com",
    password: "examplepassword"
};

// Add the data to Firestore
export default async function SetupUser(){
    const usersCollection = db.collection('users');
    usersCollection.add(userData)
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
});
};