import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfileThunk } from "../store/slices/authSlice";
import "../css/TemplateDeliver.css";

function TemplateDeliver() {
  const [isPurchased, setIsPurchased] = useState(false);
  const [notionTemplateUrl, setNotionTemplateUrl] = useState(""); // Store template URL
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateName = searchParams.get("templatename");

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlePurchase = async () => {
    console.log("button-clicked");

    if (!user || !templateName) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          templateName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsPurchased(true);
        setNotionTemplateUrl(data.notionUrl);
        // Refresh user in Redux so purchased history is updated immediately
        dispatch(fetchUserProfileThunk());

      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error purchasing template:", error);
    }
  };

  return (
    <div className="product-deliver-container">
      <h2 className="title">您已選擇 {templateName} 模板！</h2>
      <div className="content-box">
        {user ? (
          <>
            <h3 className="subtitle">模板連結將會寄送到以下 Email 信箱：</h3>
            <p className="email">{user.email}</p>
            {!isPurchased ? (
              <button className="purchase-button" onClick={handlePurchase}>
                購買並發送到 Email
              </button>
            ) : (
              <div className="purchased-message">
                <div className="success-message">✅ 模板已發送！</div>
                <a
                  href={notionTemplateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="notion-link"
                >
                  點擊此處開啟您的 Notion 模板
                </a>
              </div>
            )}
          </>
        ) : (
          <h3 className="login-message">請先登入以繼續...</h3>
        )}
      </div>
    </div>
  );
}

export default TemplateDeliver;
