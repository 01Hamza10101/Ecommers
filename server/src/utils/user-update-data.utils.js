import { admin } from "../controllers/img-upload.controllers.js";

const db = admin.firestore();

// Function to update a user document in Firestore
export default async function updateUser(userId, newData) {
    try {
        // Reference to the document to be updated
        const userRef = db.collection('users').doc(userId);

        // Update the document with new data
        await userRef.update(newData);
        console.log(userRef);
        console.log("Document updated successfully");
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}
