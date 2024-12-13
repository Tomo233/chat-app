import Logo from "../../assets/logo.png";

function LoginPageHeader() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between items-center">
        <img src={Logo} alt="Logo" className="h-28 " />
        <h1 className="text-white text-4xl font-bold text-center">Chat App</h1>
        <img src={Logo} alt="Logo" className="h-28 " />
      </div>
    </div>
  );
}

export default LoginPageHeader;
