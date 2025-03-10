import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { transfromUser } from "../utils/transformUser";
import { LoginInputs } from "../features/authentication/LoginForm";
import { addUserToFirebase } from "../utils/addUserToFirestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { uploadAvatar } from "./uploadAvatar";
import { SignupAndProfileInputs } from "../features/authentication/SignupForm";

const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

export type UserInfo = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photoURL?: string | null;
  location?: string | null;
};

export const signupWithEmailPassword = async ({
  email,
  password,
  firstName,
  lastName,
  avatar,
  location,
}: SignupAndProfileInputs): Promise<UserInfo> => {
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

    if (avatar && avatar instanceof File) {
      const photoURL = await uploadAvatar(avatar);

      await updateProfile(user, {
        photoURL,
      });
    }

    // const userInfo = transfromUser(user);

    const userInfo: UserInfo = {
      id: user.uid,
      email,
      firstName,
      lastName,
      photoURL: user.photoURL,
      location,
    };

    await addUserToFirebase(userInfo);
    console.log(userInfo);
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
    const usersCollectionRef = collection(db, "users");

    const userQuery = query(usersCollectionRef, where("id", "==", userInfo.id));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      await addUserToFirebase(userInfo);
    }

    return userInfo;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
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

export const editUserInformation = async (data: SignupAndProfileInputs) => {
  try {
    const user = auth.currentUser!;
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data() as UserInfo;
    const photoURL = await uploadAvatar(data.avatar);

    const credential = EmailAuthProvider.credential(user.email!, data.password);
    await reauthenticateWithCredential(user, credential);

    if (credential) {
      await updateProfile(user, {
        displayName: `${data.firstName || userData.firstName} ${
          data.lastName || userData.lastName
        }`,
        photoURL: photoURL || user.photoURL,
      });

      if (data.email) {
        // Update the email after successful reauthentication`
        await updateEmail(user, data.email);
      }

      await updatePassword(user, data.confirmOrNewPassword);

      await updateDoc(userDocRef, {
        firstName: data.firstName || userData.firstName,
        lastName: data.lastName || userData.lastName,
        email: data.email || userData.email,
        photoURL: photoURL || userData.photoURL,
      });
    }
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getUserLocation = async (latitude: number, longitude: number) => {
  try {
    const res = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json&`
    );

    const { address } = await res.json();

    return `${address.city_district} ${address.country}`;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
