import Logo from "../assets/logo.png";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
function Header() {
  return (
    <header className="pt-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-20" />
          <h1 className="text-3xl text-white font-semibold">Chat App</h1>
        </div>
        <nav>
          <ul className="flex justify-between items-center  gap-10 font-semibold">
            <li className="text-white">Chat</li>
            <li className="text-white">Contacts</li>
            <li className="text-white">Settings</li>
            <NotificationsNoneOutlinedIcon
              sx={{ fontSize: 35, color: "#fff" }}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
