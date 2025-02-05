import { useNavigate } from "react-router-dom";
import "../css/TemplateCard.css";

function TemplateCard({ template, isReversed }) {
  const navigate = useNavigate();

  const handleBuyClick = async (e) => {
    e.preventDefault();

    navigate(`/template-deliver?templatename=${template.name}`);
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
