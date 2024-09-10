import LoginForm from "../features/Login/LoginForm";
import Logo from "../assets/logo.png";
import phone from "../assets/phone.png";
import Container from "../components/Container";

function LoginPage() {
  return (
    <div className="bg-primaryPurple h-screen ">
      <Container>
        <div className="border-buttonPurple">
          <div className="flex justify-center items-center">
            <div className="flex justify-between items-center">
              <img src={Logo} alt="Logo" className="h-28 " />
              <h1 className="text-white text-4xl font-bold text-center">
                Chat App
              </h1>
            </div>
          </div>
          <div className="flex justify-around items-center ">
            <div className="w-2/4">
              <img src={phone} alt="" className="" />
            </div>
            <LoginForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
