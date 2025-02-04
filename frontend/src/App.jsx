import { Routes, Route, Navigate } from "react-router-dom";
import "./css/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDeliver from "./pages/ProductDeliver";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterFinal from "./pages/RegisterFinal";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/product-deliver"
            element={
              isAuthenticated ? <ProductDeliver /> : <Navigate to="/login" />
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-setup" element={<RegisterFinal />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
