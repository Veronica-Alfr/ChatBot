import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import Messages from "./pages/Message";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<Contacts />}
          />
          <Route path="/contact/:contactId" element={<Messages />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
