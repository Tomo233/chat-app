import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import Loader from "./Loader";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
      toast.error("You are not logged in");
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user)
    return (
      <div className="flex justify-center items-center h-screen bg-backgroundColor">
        <Loader />
      </div>
    );

  return <div className="bg-backgroundColor">{children}</div>;
}

export default ProtectedRoute;
