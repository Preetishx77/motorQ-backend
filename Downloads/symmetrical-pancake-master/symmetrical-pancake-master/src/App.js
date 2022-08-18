
import { Routes, Route,BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/userAuthContext";
import Landing from "./pages/Landing/Landing";
import AdminLanding from "./pages/Admin/AdminLanding";



function App() {
  return (
          <UserAuthContextProvider>
            <Router>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLanding />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Landing/>} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            </Router>
           
          </UserAuthContextProvider>
  );
}

export default App;
