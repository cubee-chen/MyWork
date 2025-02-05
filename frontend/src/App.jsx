import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TemplateDeliver from "./pages/TemplateDeliver";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SignupSecond from "./pages/SignupSecond";
import SignupFirst from "./pages/SignupFirst";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup-first" element={<SignupFirst />} />
          <Route path="/signup-second" element={<SignupSecond />} />
          <Route
            path="/template-deliver"
            element={
              <ProtectedRoute>
                <TemplateDeliver />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
