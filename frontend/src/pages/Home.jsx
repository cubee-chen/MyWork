import { useState, useEffect } from "react";
import TemplateCard from "../components/TemplateCard";
import "../css/Home.css";

function Home() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      for (let i = 0; i < 3; i++) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/template/get"
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setTemplates(data);
          return; // Exit once successful
        } catch (error) {
          console.error("Error fetching templates:", error);
          // Optional: Wait a second before retrying
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    };

    fetchTemplates();
  }, []);

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
          PINECRAFT 致力於開發 Notion 模板，並且整合後端伺服器與 AI 驅動，提供最佳的生產力工具。
        </p>
      </section>
      {/* products demo */}
      <div className="products-grid">
        {templates.map((template, index) => (
          <TemplateCard
            key={template._id}
            template={template}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
