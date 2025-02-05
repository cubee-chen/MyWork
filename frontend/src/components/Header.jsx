import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../store/slices/authSlice";
import "../css/Header.css";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [showSearch, setShowSearch] = useState(false);
  const [queryselect, setQueryselect] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    alert("登出成功");
    // user is now null in redux store
  };

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

  if (
    location.pathname === "/login" ||
    location.pathname === "/signup-first" ||
    location.pathname === "/signup-second"
  )
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
          {/* If user is logged in, show "登出"; otherwise show "登入" */}
          {user ? (
            <button onClick={handleLogout}>登出</button>
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
