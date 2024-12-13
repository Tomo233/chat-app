import phone from "../assets/phone.png";
import Container from "../components/Container";
import LoginForm from "../features/authentication/LoginForm";
import LoginPageHeader from "../features/authentication/LoginPageHeader";
// import SignUpForm from "../features/authentication/SignupForm";

function LoginPage() {
  return (
    <div className="bg-backgroundColor h-screen">
      <Container>
        <LoginPageHeader />
        <div className="border-buttonPurple">
          <div className="flex justify-around items-center ">
            <div className="w-2/4">
              <img src={phone} alt="Phone Image" />
            </div>
            <LoginForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
