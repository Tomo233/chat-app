import { Timestamp } from "firebase/firestore";

export const getCurrentTime = () => Timestamp.fromDate(new Date());
