import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleTempRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/register-temp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      navigate(`/register-setup?email=${encodeURIComponent(email)}`);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>註冊</h2>
        <form className="login-form" onSubmit={handleTempRegister}>
          <input
            type="test"
            placeholder="用戶名稱"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="電子信箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-button" type="submit">
            下一步
          </button>
        </form>

        {/* Back to Login */}
        <div className="register-link">
          <span>已經有帳號了嗎？ </span>
          <Link to="/login">返回登入</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
