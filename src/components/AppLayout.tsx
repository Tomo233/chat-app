import ChatPage from "../pages/ChatPage";
import Container from "./Container";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="bg-[#2b2738] h-screen">
      <Container>
        <Header />
        <ChatPage />
      </Container>
    </div>
  );
}

export default AppLayout;
