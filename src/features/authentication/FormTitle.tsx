import Logo from "../../assets/logo.png";

type FormTitleProps = {
  title: string;
  paragraph: string;
  linkText: string;
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
          <span className="text-[#7b7092] font-bold underline pl-3">
            {linkText}
          </span>
        </p>
      </div>
    </div>
  );
}

export default FormTitle;
