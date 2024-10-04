import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, User } from "firebase/auth";

export const signupWithEmailPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User | null> => {
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
    return null;
  }
};
