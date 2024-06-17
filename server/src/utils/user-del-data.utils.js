import { admin } from "../controllers/img-upload.controller.js";

const db = admin.firestore();

// Function to delete a user document from Firestore
export default async function deleteUser(userId) {
    try {
        // Reference to the document to be deleted
        const userRef = db.collection('users').doc(userId);

        // Delete the document
        await userRef.delete();

        console.log("Document deleted successfully");
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}
