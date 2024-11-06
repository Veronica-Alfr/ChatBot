import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import { useAuth } from "./utils/useAuth";
// import Messages from "./pages/Message";

const queryClient = new QueryClient();

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<ProtectedRoute element={<Contacts />} />}
          />
          {/* <Route path="/contact/:contactId" element={<Messages />} /> */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
