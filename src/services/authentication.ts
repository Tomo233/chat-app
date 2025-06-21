import { auth, db, storage } from "../firebaseConfig";
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
import { SignupAndProfileInputs } from "../features/authentication/SignupForm";
import { getUserCoords } from "../utils/getUserCoords";
import { uploadFile } from "./uploadFile";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

export type UserInfo = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photoURL?: string | null;
  location?: string | null;
  status: "Online" | "Offline";
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
      const photoURL = await uploadFile(avatar);

      await updateProfile(user, {
        photoURL,
      });
    }

    const userInfo: UserInfo = {
      id: user.uid,
      email,
      firstName,
      lastName,
      photoURL: user.photoURL,
      location,
      status: "Online",
    };

    await addUserToFirebase(userInfo);

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

    const userInfo2 = transfromUser(user, "Online");

    const usersCollectionRef = collection(db, "users");
    const userQuery = query(
      usersCollectionRef,
      where("id", "==", userInfo2.id)
    );
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      const coords = await getUserCoords();
      const location = await getUserLocation(coords);
      let url;
      if (userInfo2.photoURL) {
        try {
          const res = await fetch(userInfo2.photoURL);

          if (!res.ok) throw new Error("Failed to fetch photoURL");

          const blob = await res.blob();
          const avatarStorageRef = ref(
            storage,
            `avatars/googleImage-${userInfo2.id}.jpg`
          );

          const snapshot = await uploadBytes(avatarStorageRef, blob);
          url = await getDownloadURL(snapshot.ref);
        } catch (error: any) {
          url = null;
          toast.error(error.message);
        }
      }

      const userInfo: UserInfo = {
        ...userInfo2,
        location,
        photoURL: url,
        status: "Online",
      };
      await addUserToFirebase(userInfo);
      return userInfo;
    }

    await updateDoc(doc(db, "users", user.uid), {
      status: "Online",
    });

    querySnapshot.forEach((q) => {
      return q.data() as UserInfo;
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getCurrentUser = async (id: string | undefined | null) => {
  if (!id) return null;
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  const userInfo = docSnap.data() as UserInfo;

  return userInfo;
};

export const loginWithPassword = async ({ email, password }: LoginInputs) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userInfo = transfromUser(user, "Online");

    await updateDoc(doc(db, "users", user.uid), {
      status: "Online",
    });

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
    const photoURL = await uploadFile(data.avatar);

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

export const getUserLocation = async (coords: string) => {
  if (coords === "not-allowed") return null;

  const [latitude, longitude] = coords.split(" ");

  try {
    const res = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`
    );

    const { address } = await res.json();
    return `${address.city_district} ${address.country}`;
  } catch (error: unknown) {
    return null;
  }
};
