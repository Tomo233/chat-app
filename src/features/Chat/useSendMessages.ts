import { useMutation } from "@tanstack/react-query";
import { auth } from "../../firebaseConfig";
import { useParams } from "react-router-dom";
import { sendMessage as sendMessageApi } from "../../services/messages";

export const useSendMessages = () => {
  const { id: receiverId } = useParams<{ id: string }>();
  const senderId = auth.currentUser!.uid;

  const {
    mutate: sendMessage,
    isPending,
    reset,
  } = useMutation({
    mutationFn: (message: string) =>
      sendMessageApi(receiverId!, senderId, message),
    mutationKey: ["messages"],
    onSuccess: () => {
      reset();
    },
    onError: () => {
      console.error("Error sending message try again");
    },
  });

  return { sendMessage, isPending };
};
