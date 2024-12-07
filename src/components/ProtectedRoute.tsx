import { ReactNode, useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
// import toast from "react-hot-toast";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      console.log("user is loading or user is not authenticated");
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  // if (!user) {
  //   toast.error("You are not logged in");
  // }

  if (isLoading || !user)
    return (
      <div className="bg-backgroundColor h-screen flex justify-center items-center">
        <p className="text-white text-5xl">Loading...</p>
        <Loader />
      </div>
    );
  return <div>{children}</div>;
}

export default ProtectedRoute;
