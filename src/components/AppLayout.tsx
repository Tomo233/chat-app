import { Outlet } from "react-router-dom";
import Container from "./Container";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="h-screen">
      <Container>
        <Header />
        <Outlet />
      </Container>
    </div>
  );
}

export default AppLayout;
