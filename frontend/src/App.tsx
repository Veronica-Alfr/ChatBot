import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import Messages from "./pages/Message";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Contacts />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/contact/:contactId" element={<Messages />} />
      </Routes>
    </Router>
  );
}

export default App;
