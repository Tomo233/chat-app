import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signupWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unknown error", error);
    }
  }
};