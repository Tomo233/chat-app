import { type User } from "firebase/auth";
import { UserInfo } from "../services/authentication";

export const transfromUser = (user: User) => {
  const userInfo: UserInfo = {
    id: user.uid,
    email: user.email!,
    firstName: user.displayName!.split(" ")[0],
    lastName: user.displayName!.split(" ")[1],
    photoURL: user.photoURL ?? null,
  };
  return userInfo;
};
