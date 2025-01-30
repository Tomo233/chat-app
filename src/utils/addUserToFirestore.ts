import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserInfo } from "../services/authentication";

export const addUserToFirebase = async (user: UserInfo) => {
  try {
    await setDoc(doc(db, "users", user.id), {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photoURL: user.photoURL,
    });
  } catch (error) {
    console.error("Error adding user to Firebase:", error);
    throw new Error("Failed to add user to Firebase.");
  }
};
