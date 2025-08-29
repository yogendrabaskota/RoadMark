import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastContainer from "react-hot-toast";
import About from "./pages/about/About";
import Feedback from "./pages/feedback/Feedback";
import Contact from "./pages/contact/Contact";
import PotholeDetails from "./pages/potholeDetails/PotholeDetails";
import Report from "./pages/report/Report";
// import Potholes from "./pages/potholePage/Potholes";
import { Provider } from "react-redux";
import store from "./store/store";
import AllPotholes from "./pages/allPotholes/AllPotholes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/pothole/:id" element={<PotholeDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/potholes" element={<AllPotholes />} />

              {/* Private Routes */}
              <Route path="/report" element={<Report />} />
              <Route path="/dashboard" element={<Dashboard />} />
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
    </Provider>
  );
}

export default App;
