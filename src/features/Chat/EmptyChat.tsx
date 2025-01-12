import { useLocation } from "react-router-dom";

function EmptyChat() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  return (
    <div className="bg-primaryPurple rounded-2xl w-2/3 flex justify-center items-center">
      <h2 className="text-white font-semibold text-3xl text-center uppercase">
        {!id ? "No conversation is opened" : "This chat is empty"}
      </h2>
    </div>
  );
}

export default EmptyChat;
