import TokenInput from "../components/TokenInputSubmit";
import { useState } from "react";

function Authorization() {
  const [notionToken, setNotionToken] = useState("");

  return (
    <div className="step-container">
      <h2 className="step-title">如何授權 Notion API？</h2>
      <p className="step-text">按照以下步驟來授權：</p>
      <ol className="step-list">
        <li>
          前往{" "}
          <a
            href="https://www.notion.so/my-integrations"
            target="_blank"
            className="step-link"
          >
            Notion Integration
          </a>
        </li>
        <li>
          創建新的 Integration！
          <img
            src="/images/integration-tutorial-1.png"
            alt="Notion API 設定教學"
            className="step-image"
          />
        </li>
        <li>
          輸入以下資訊後，點擊右下角的「Save」，系統會自動進到下一頁設定。
          <img
            src="/images/integration-tutorial-2.png"
            alt="Notion API 設定教學"
            className="step-image"
          />
          <img
            src="/images/integration-tutorial-3.png"
            alt="Notion API 設定教學"
            className="step-image"
          />
        </li>
        <li>
          點擊「Show」、「Copy」以複製你的API Token。
          <img
            src="/images/integration-tutorial-4.png"
            alt="Notion API 設定教學"
            className="step-image"
          />
          <img
            src="/images/integration-tutorial-5.png"
            alt="Notion API 設定教學"
            className="step-image"
          />
        </li>
        <li>
          下滑頁面，勾選 **Comment Capabilities**
          的「Read」和「Insert」，最後右下角「Save」以儲存。
          <img
            src="/images/integration-tutorial-6.png"
            alt="Notion API 設定教學"
            className="step-image"
          />
        </li>
        <li>請貼上您剛才複製的 API Token</li>
      </ol>
      <TokenInput notionToken={notionToken} setNotionToken={setNotionToken} />
    </div>
  );
}

export default Authorization;
