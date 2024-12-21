import { useLocation, useNavigate } from "react-router-dom";
import phone from "../assets/phone.png";
import Container from "../components/Container";
import Loader from "../components/Loader";
import LoginForm from "../features/authentication/LoginForm";
import LoginPageHeader from "../features/authentication/LoginPageHeader";
import SignUpForm from "../features/authentication/SignupForm";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import { useEffect } from "react";

function LoginPage() {
  const { pathname } = useLocation();
  const { user, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="bg-backgroundColor h-screen">
      <Container>
        <LoginPageHeader />
        <div className="border-buttonPurple">
          <div className="flex justify-around items-center ">
            <div className="w-2/4">
              <img src={phone} alt="Phone Image" />
            </div>
            {pathname === "/signup" ? <SignUpForm /> : <LoginForm />}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
