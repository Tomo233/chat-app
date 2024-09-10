import LoginForm from "../features/Login/LoginForm";
import phone from "../assets/phone.png";
import Container from "../components/Container";
import LoginHeader from "../features/Login/LoginHeader";

function LoginPage() {
  return (
    <div className="bg-primaryPurple h-screen ">
      <Container>
        <LoginHeader />
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
