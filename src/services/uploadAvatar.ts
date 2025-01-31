import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export const uploadAvatar = async (avatar: File | null, user?: User | null) => {
  if (!avatar) {
    return null;
  }

  const randomNumber = Math.random();
  const storageRef = ref(storage, `avatars/${avatar.name}-${randomNumber}`);

  const photoURL = await new Promise<string>((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, avatar);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.error("Upload error:", error);
        reject(new Error("Failed to upload avatar. Please try again."));
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
  if (user) {
    await updateProfile(user, {
      photoURL,
    });

    await updateDoc(doc(db, "users", user.uid), {
      photoURL,
    });
  }

  return photoURL;
};
