import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "../css/Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        console.log("Fetching templates...");
        
        const response = await fetch("http://localhost:5000/api/template/get");

        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log("Templates received:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);


  // const products = [{
  //   "_id": "60a7d9d5d5",
  //   "name": "Pinecraft",
  //   "description": "智慧運算、效能進化",
  //   "price": 1999,
  // }];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Pinecraft</h1>
          <h3>智慧運算、效能進化</h3>
          <blockquote>Crafting Your Notion Experience</blockquote>
        </div>
      </section>
      {/*Our vision section*/}
      <section className="intro-section">
        <h2>打造屬於你的生產力套件</h2>
        <p>
          Pinecraft致力於打造Notion模板，並結合後端伺服器的演算法驅動，提供最佳的生產力工具。
        </p>
      </section>
      {/* products demo */}
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
