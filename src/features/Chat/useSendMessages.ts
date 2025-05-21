import { useMutation } from "@tanstack/react-query";
import { auth } from "../../firebaseConfig";
import { useParams } from "react-router-dom";
import { sendMessage as sendMessageApi } from "../../services/messages";
import toast from "react-hot-toast";

type SendMessageProps = {
  message: string;
  forwardedToUserId?: string;
};

export const useSendMessage = () => {
  const { id: receiverId } = useParams<{ id: string }>();
  const senderId = auth.currentUser!.uid;

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: ({ message, forwardedToUserId }: SendMessageProps) =>
      sendMessageApi(forwardedToUserId || receiverId!, senderId, message),
    mutationKey: ["messages"],
    onSuccess: () => {},
    onError: () => {
      toast.error("Error while sending message try again!");
    },
  });

  return { sendMessage, isPending };
};
