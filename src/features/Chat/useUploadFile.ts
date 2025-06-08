import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { uploadFile as uploadFileApi } from "../../services/uploadFile";
import { FileType } from "./SendMessage";

export const useUploadFile = () => {
  const { id: receiverId } = useParams<{ id: string }>();

  const { mutate: uploadFile, isPending: isUploading } = useMutation({
    mutationFn: (files: FileType) => uploadFileApi(files, receiverId),
    mutationKey: ["messages"],
    onSuccess: () => {
      toast.success("File is uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { uploadFile, isUploading };
};
