import { useNavigate } from "react-router-dom";
import "../css/ProductCard.css";

function ProductCard({ product, isReversed }) {
  const navigate = useNavigate();

  const handleBuyClick = (e) => {
    e.preventDefault();
    const isAuthenticate = !!localStorage.getItem("token");

    if (isAuthenticate) {
      navigate(`/product-deliver?templatename=${product.name}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={`product-card ${isReversed ? "reversed" : ""}`}>
      <div className="product-demo">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price-tag">NT: {product.price}</div>
        <button className="buy-button" onClick={handleBuyClick}>
          Get it for free now!
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
