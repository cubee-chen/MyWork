import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TemplateDeliver from "./pages/TemplateDeliver";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterFinal from "./pages/RegisterFinal";

function App() {

  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-setup" element={<RegisterFinal />} />
          <Route path="/template-deliver" element={<TemplateDeliver />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
