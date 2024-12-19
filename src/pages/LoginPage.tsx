import { useLocation, useNavigate } from "react-router-dom";
import phone from "../assets/phone.png";
import Container from "../components/Container";
import Loader from "../components/Loader";
import LoginForm from "../features/authentication/LoginForm";
import LoginPageHeader from "../features/authentication/LoginPageHeader";
import SignUpForm from "../features/authentication/SignupForm";
import { useUser } from "../features/authentication/useUser";

function LoginPage() {
  const { pathname } = useLocation();
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  if (user) navigate("/");

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
