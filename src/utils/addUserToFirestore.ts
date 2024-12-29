import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { UserInfo } from "../services/authentication";

export const addUserToFirebase = async (user: UserInfo) => {
  await addDoc(collection(db, "users"), {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    photoURL: user.photoURL,
  });
};
