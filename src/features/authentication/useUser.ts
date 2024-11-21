import { getAuth } from "firebase/auth";

type UserInfo = {
  id: string;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | null;
  photoURL: string | null;
};

export const useUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user !== null) {
    const [firstName, lastName] = user.displayName?.split(" ") || [
      undefined,
      undefined,
    ];
    const userProfile: UserInfo = {
      id: user.uid,
      firstName,
      lastName,
      email: user.email,
      photoURL: user.photoURL,
    };
    return userProfile;
  }
  return null;
};
