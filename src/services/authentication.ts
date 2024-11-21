import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { storage } from "../firebaseConfig";
import { Inputs } from "../features/authentication/SignupForm";
import { addDoc, collection } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const signupWithEmailPassword = async ({
  email,
  password,
  firstName,
  lastName,
  avatar,
}: Inputs): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const randomNumber = Math.random();
    if (avatar && avatar instanceof File) {
      const storageRef = ref(storage, `avatars/${avatar.name}-${randomNumber}`);
      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
        "state_changed",
        () => {}, // Progress handler
        (error) => {
          console.error("Upload error:", error); // Logging error for debugging
          throw new Error("Failed to upload avatar. Please try again."); // Custom error message
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Avatar URL:", url);
        }
      );
    }

    await addDoc(collection(db, "users"), {
      email,
      firstName,
      lastName,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Account with this email already exists!");
    }
    throw new Error("Something went wrong, try again later!");
  }
};

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async (): Promise<void> => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Something went wrong, please try again.");
    }
  }
};
