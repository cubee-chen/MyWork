import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Header.css";

function Header() {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [queryselect, setQueryselect] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You searched for ${queryselect}!`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


const isAuthenticated = !!localStorage.getItem("token");
const user = localStorage.getItem("username");


  if (location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/register-setup")
    return (
      <nav className="header-simplified">
        <div className="logo">
          <Link to="/">Pinecraft</Link>
        </div>
      </nav>
    );

  return (
    <nav className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">Pinecraft</Link>
        </div>
        <div className="nav-links">
          {/* 如果已登入，顯示大頭像 + username，否則顯示 Login */}
          {isAuthenticated ? (
            <div className="profile-container">
              <img
                src="/images/avatar.png"
                alt="Profile"
                className="profile-pic"
              />
              <span className="username">{user}</span>
            </div>
          ) : (
            <Link to="/login">登入</Link>
          )}

          <Link to="/about-us">關於我們</Link>
          <button
            className="search-icon"
            onClick={() => setShowSearch(!showSearch)}
          >
            🔍
          </button>
        </div>
      </div>

      {/* Search bar (shown when clicked) */}
      {showSearch && (
        <div className="search-form-popup">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="search-bar"
              placeholder="Search ..."
              value={queryselect}
              onChange={(e) => setQueryselect(e.target.value)}
            />
            <button type="submit" className="search-button">
              🔍
            </button>
            <button
              className="close-search"
              onClick={() => setShowSearch(false)}
            >
              ❌
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}

export default Header;
