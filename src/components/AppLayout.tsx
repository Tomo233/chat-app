import Container from "./Container";
import Header from "./Header";
// import Settings from "../features/Settings/Settings";
import ChatPage from "../pages/ChatPage";

function AppLayout() {
  return (
    <div className="bg-[#2b2738] h-screen">
      <Container>
        <Header />
        <ChatPage />
        {/* <Settings /> */}
      </Container>
    </div>
  );
}

export default AppLayout;
