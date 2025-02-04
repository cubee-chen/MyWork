import "../css/AboutUs.css";

function AboutUs() {
  const team = {
    CEO: [
      {
        name: "張鈞傑",
        role: "創辦人",
        dept: "農經二",
        image: "/team-members/junjie.png",
      },
    ],
    研發部: [
      {
        name: "陳宇禎",
        role: "技術長",
        dept: "大氣二",
        image: "/team-members/Cubee.png",
      },
      {
        name: "吳柏均",
        role: "全端工程師、模板開發",
        dept: "電機三",
        image: "/team-members/ddm.png",
      },
      {
        name: "蔡仁揚",
        role: "全端工程師、模板開發",
        dept: "電機四",
        image: "/team-members/yang.png",
      },
    ],
    營銷部: [
      {
        name: "陳秉宏",
        role: "營運長",
        dept: "心裡三",
        image: "/team-members/cookie.png",
      },
      {
        name: "停彭蓮香",
        role: "市場分析師、行銷企劃",
        dept: "生傳五",
        image: "/team-members/TP.png",
      },
      {
        name: "林祐萱",
        role: "UI/UX、設計思考",
        dept: "創新二",
        image: "/team-members/Xuan.png",
      },
    ],
  };

  return (
    <>
      {/* 標題 */}
      <div className="team-hero-container">
        <section className="team-hero">
          <img src="/team-members/team.jpg" alt="NTU CTC 團隊合照" />
          <div className="intro-overlay">
            <h1>大家好，我們是 NTU CTC！</h1>
            <p>
              我們是一支專注於 Notion
              模板與演算法驅動的生產力工具的創新團隊，
              我們致力於打造最智慧化的數位工具，提升使用者效率！
            </p>
          </div>
        </section>
      </div>
      <div className="about-us">
        {/* CEO */}
        <section className="team-section">
          <h2>執行長</h2>
          <div className="team-grid">
            {team.CEO.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.dept}</p>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
        {/* 研發部 */}
        <section className="team-section">
          <h2>研發部</h2>
          <div className="team-grid">
            {team.研發部.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.dept}</p>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
        {/* 營銷部 */}
        <section className="team-section">
          <h2>營銷部</h2>
          <div className="team-grid">
            {team.營銷部.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.dept}</p>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default AboutUs;
