import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import AppLayout from "./components/AppLayout";
import ContactsPage from "./pages/ContactsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/contacts",
        element: <ContactsPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
