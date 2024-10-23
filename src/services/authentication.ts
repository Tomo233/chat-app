import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { Inputs } from "../features/authentication/SignupForm";
import { addDoc, collection } from "firebase/firestore/lite";

export const signupWithEmailPassword = async ({
  email,
  password,
  firstName,
  lastName,
}: Inputs): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docRef = await addDoc(collection(db, "users"), {
      email,
      password,
      firstName,
      lastName,
    });
    console.log(docRef);
    return userCredential.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Account with this email already exists!");
    } else {
      throw new Error("Something went wrong, try again later!");
    }
  }
};
