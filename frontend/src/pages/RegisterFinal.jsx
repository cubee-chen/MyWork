import { useState } from "react";
import Authorization from "../components/Authorization";
import "../css/RegisterFinal.css";

function RegisterFinal() {
  const [step, setStep] = useState(1);

  return (
    <div className="notion-setup-container">
      <div className={`notion-box ${step === 1 ? "caution" : ""}`}>
        {/* Step 1: 注意事項 */}
        {step === 1 && (
          <div className="step-container">
            <h2 className="step-title">請閱讀並同意以下注意事項</h2>
            <ul className="step-list-caution">
              <li>本系統會請求您的 Notion API Token</li>
              <li>請確保授權的範圍足夠使用該模板</li>
              <li>我們不會儲存您的 Token</li>
            </ul>
            <button className="step-button" onClick={() => setStep(2)}>
              我同意，開始授權
            </button>
          </div>
        )}

        {/* Step 2: Notion 授權教學 + Token 輸入 */}
        {step === 2 && <Authorization />}

      </div>
    </div>
  );
}

export default RegisterFinal;
