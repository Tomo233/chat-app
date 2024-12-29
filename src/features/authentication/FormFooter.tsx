import { useLoginWithGoogle } from "./useLoginWithGoogle";

function FormFooter() {
  const { loginWithGoogle } = useLoginWithGoogle();
  const handleSignUpWithGoogle = () => {
    loginWithGoogle();
  };

  return (
    <div className="flex justify-center gap-12 pt-5">
      <button
        className="bg-secondaryPurple px-12 py-2 rounded-md"
        onClick={handleSignUpWithGoogle}
      >
        <span className="text-white">Google</span>
      </button>
      <button className="bg-secondaryPurple text-white  px-12 py-2 rounded-md ">
        <span>Apple</span>
      </button>
    </div>
  );
}

export default FormFooter;
