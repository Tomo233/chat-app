import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

type FormTitleProps = {
  title: string;
  paragraph: string;
  linkText: "Login" | "SignUp";
};

function FormTitle({ title, paragraph, linkText }: FormTitleProps) {
  return (
    <div>
      <div>
        <h2 className="text-white text-3xl text-center flex items-center justify-center">
          <img src={Logo} alt="Logo" className="h-20" />
          <span>{title}</span>
          <img src={Logo} alt="Logo" className="h-20" />
        </h2>
        <p className="text-white text-center pb-3">
          {paragraph}
          <Link
            className="text-[#7b7092] font-bold underline pl-3"
            to={linkText === "Login" ? "/login" : "/signup"}
          >
            {linkText}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FormTitle;
