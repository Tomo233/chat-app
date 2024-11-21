import { ReactNode, useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useUser();
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/");
  }, [user, navigate]);

  return <div>{children}</div>;
}

export default ProtectedRoute;
