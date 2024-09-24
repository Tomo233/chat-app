import Contacts from "../features/Contacts/Contacts";
import Container from "./Container";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="bg-[#2b2738] h-screen">
      <Container>
        <Header />
        <Contacts />
      </Container>
    </div>
  );
}

export default AppLayout;
