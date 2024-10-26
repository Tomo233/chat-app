// import { auth, db } from "../firebaseConfig";
// import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { storage } from "../firebaseConfig";
import { Inputs } from "../features/authentication/SignupForm";
// import { addDoc, collection } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const signupWithEmailPassword = async ({
  // email,
  // password,
  // firstName,
  // lastName,
  avatar,
}: Inputs): Promise<void> => {
  // }: Inputs): Promise<User> => {
  try {
    // const userCredential = await createUserWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // );

    const storageRef = ref(storage, `avatars/${avatar?.name}`);
    if (avatar) {
      const uploadTask = uploadBytesResumable(storageRef, avatar);
      uploadTask.on(
        "state_changed",

        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
          });
        }
      );
    }
    // // const docRef = await addDoc(collection(db, "users"), {
    // //   email,
    // //   password,
    // //   firstName,
    // //   lastName,
    // // });
    // console.log(docRef);

    // return userCredential.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Account with this email already exists!");
    } else {
      throw new Error("Something went wrong, try again later!");
    }
  }
};
