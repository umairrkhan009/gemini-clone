import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useContextAPI } from "../../context/Context";

function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContextAPI();

  async function loadPrompt(prompt) {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
        <div onClick={() => newChat()} className="newChat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={() => loadPrompt(item)} className="recentEntry">
                  <img src={assets.message_icon} alt="Message Icon" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottomItem recentEntry">
          <img src={assets.question_icon} alt="Question Icon" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottomItem recentEntry">
          <img src={assets.history_icon} alt="Question Icon" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottomItem recentEntry">
          <img src={assets.setting_icon} alt="Question Icon" />
          {extended && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
