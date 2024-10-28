import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
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
}: Inputs): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const randomNumber = Math.random();
    const storageRef = ref(storage, `avatars/${avatar?.name}-${randomNumber}`);

    if (avatar && avatar instanceof File) {
      const uploadTask = uploadBytesResumable(storageRef, avatar);
      uploadTask.on(
        "state_changed",
        () => {},
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
          });
        }
      );
    }
    await addDoc(collection(db, "users"), {
      email,
      firstName,
      lastName,
    });

    return userCredential.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Account with this email already exists!");
    } else {
      throw new Error("Something went wrong, try again later!");
    }
  }
};
