import phone from "../assets/phone.png";
import Container from "../components/Container";
import LoginHeader from "../features/authentication/LoginHeader";
import SignUpForm from "../features/authentication/SignupForm";

function LoginPage() {
  return (
    <div className="bg-backgroundColor h-screen">
      <Container>
        <LoginHeader />
        <div className="border-buttonPurple">
          <div className="flex justify-around items-center ">
            <div className="w-2/4">
              <img src={phone} alt="Phone Image" />
            </div>
            <SignUpForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
