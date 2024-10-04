import { SignUpProps } from "../features/Login/useSignUp";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, User } from "firebase/auth";

export const signupWithEmailPassword = async ({
  email,
  password,
}: SignUpProps): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Account with this email already exist!");
    } else {
      throw new Error("Something went wrong try again later!");
    }
  }
};
