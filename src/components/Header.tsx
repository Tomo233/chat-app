import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Notifications from "./Notifications";

function Header() {
  return (
    <header className="pt-5 mb-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-20" />
          <h1 className="text-3xl text-white font-semibold">Chat App</h1>
        </div>
        <nav>
          <ul className="flex justify-between items-center  gap-10 font-semibold">
            <Link className="text-white" to={"/chat"}>
              Home
            </Link>
            <Link className="text-white" to={"/contacts"}>
              Contacts
            </Link>
            <Link className="text-white" to={"/settings"}>
              Settings
            </Link>
            <Notifications />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
