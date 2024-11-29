import { ReactNode, useEffect, useState } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.user instanceof Error) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [user, navigate]);

  if (isLoading)
    return (
      <div className="bg-backgroundColor h-screen flex justify-center items-center">
        <p className="text-white text-5xl">Loading...</p>
        <Loader />
      </div>
    );

  return <div>{children}</div>;
}

export default ProtectedRoute;
