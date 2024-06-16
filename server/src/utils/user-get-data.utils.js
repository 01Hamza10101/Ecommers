import { admin } from "../controllers/img-upload.controllers.js";

const db = admin.firestore();

// Function to update a user document in Firestore
export default async function getdata(userId) {
    try {
        // Reference to the document to be updated
        const userRef = db.collection('users').doc(userId);

        // Get the existing user data
        const snapshot = await userRef.get();
        if (!snapshot.exists) {
            console.error("Document does not exist");
            return;
        }

        // Merge existing data with new data
        const userData = snapshot.data();
        // const updatedData = { ...userData, ...newData };
        console.log(userData);
        // Update the document with merged data
        // await userRef.update(updatedData);

        console.log("Document updated successfully");
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}
