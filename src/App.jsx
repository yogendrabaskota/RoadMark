import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PotholeDetails from "./pages/PotholeDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastContainer from "react-hot-toast";
import About from "./pages/about/About";
import Feedback from "./pages/feedback/Feedback";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/potholes/:id" element={<PotholeDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/feedback" element={<Feedback />} />

              {/* Private Routes */}
              <Route
                path="/report"
                element={
                  <PrivateRoute>
                    <Report />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
