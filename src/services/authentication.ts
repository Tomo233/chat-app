import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { storage } from "../firebaseConfig";
import { SignupInputs } from "../features/authentication/SignupForm";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { transfromUser } from "../utils/transformUser";
import { LoginInputs } from "../features/authentication/LoginForm";

export type UserInfo = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photoURL: string | null;
};

export const signupWithEmailPassword = async ({
  email,
  password,
  firstName,
  lastName,
  avatar,
}: SignupInputs): Promise<UserInfo> => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    }).catch((error) => {
      console.log(`${error} ee`);
    });

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

          await updateProfile(user, {
            photoURL: url,
          }).catch((error) => {
            console.log(`error while setting photo`, error);
          });
        }
      );
    }
    const userInfo = transfromUser(user);

    return userInfo;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong, try again later!");
  }
};

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async (): Promise<UserInfo | undefined> => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    const userInfo = transfromUser(user);
    return userInfo;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Something went wrong, please try again.");
    }
  }
};

export const getCurrentUser = (): Promise<UserInfo | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          const userInfo = transfromUser(user);
          resolve(userInfo);
        } else {
          resolve(null); // No user logged in
        }
        unsubscribe();
      },
      (error) => {
        reject(error);
        unsubscribe();
      }
    );
  });
};

export const loginWithPassword = async ({ email, password }: LoginInputs) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userInfo = transfromUser(user);
    return userInfo;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Account with this email and password does not exist");
    }
  }
};
