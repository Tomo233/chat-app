import { Outlet } from "react-router-dom";
import Container from "./Container";
import Header from "./Header";
import { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import Loader from "./Loader";

function AppLayout() {
  const { user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!user) return;

    const handleLoad = async () => {
      if (navigator.onLine) {
        await updateDoc(doc(db, "users", user.id), {
          status: "Online",
        });
      } else {
        updateDoc(doc(db, "users", user.id), {
          status: "Offline",
        });
      }
    };

    const handleUnload = () => {
      updateDoc(doc(db, "users", user.id), {
        status: "Offline",
      });
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("unload", handleUnload);
    };
  }, [user]);

  if (isLoading) return <Loader />;

  return (
    <div className="h-screen">
      <Container>
        <Header />
        <Outlet />
      </Container>
    </div>
  );
}

export default AppLayout;
