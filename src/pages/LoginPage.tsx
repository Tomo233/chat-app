import LoginForm from "../features/Login/LoginForm";
import Logo from "../assets/logo.png";
import phone from "../assets/phone.png";
import Container from "../components/Container";

function LoginPage() {
  return (
    <div className="bg-primaryPurple h-screen">
      <Container>
        <div className="flex justify-between items-center">
          <img src={Logo} alt="Logo" className="h-24 " />
          <h1 className="text-white text-3xl font-bold text-center">
            Chat App
          </h1>
          <button className=" bg-[#9477e2] text-white py-3 px-28 rounded  focus:outline-none">
            Contact
          </button>
        </div>
        <div className="relative">
          <div className="absolute z-0">
            <img src={phone} alt="" className="h-full" />
          </div>
          <LoginForm />
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
