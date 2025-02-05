import { useNavigate } from "react-router-dom";
import "../css/TemplateCard.css";

function TemplateCard({ template, isReversed }) {
  const navigate = useNavigate();

  const handleBuyClick = async (e) => {
    e.preventDefault();
    
    try {
      // Check if user is logged in by hitting /profile
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        credentials: "include", // Important for sending the cookie
      });

      if (response.ok) {
        // We have a valid token cookie -> user is logged in
        navigate(`/template-deliver?templatename=${template.name}`);
      } else {
        // Not logged in -> redirect to /login
        navigate("/login");
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      // If there's an error, assume user is not logged in
      navigate("/login");
    }
  };

  return (
    <div className={`product-card ${isReversed ? "reversed" : ""}`}>
      <div className="product-demo">
        {/* <img src={template.image} alt={template.name} /> */}
      </div>
      <div className="template-info">
        <h3>{template.name}</h3>
        <p>{template.description}</p>
        <div className="price-tag">NT: {template.price}</div>
        <button className="buy-button" onClick={handleBuyClick}>
          Get it for free now!
        </button>
      </div>
    </div>
  );
}

export default TemplateCard;
