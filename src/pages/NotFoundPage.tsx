import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") navigate("/chat");
  }, [pathname, navigate]);

  return (
    <div className="flex flex-col bg-backgroundColor items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
      <p className="text-lg mt-4 text-white">
        Sorry, the page you are looking for doesn't exist.
      </p>
    </div>
  );
}
