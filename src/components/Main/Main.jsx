import { assets } from "../../assets/assets";
import "./Main.css";
import { useContextAPI } from "../../context/Context";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContextAPI();

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>

      <div className="mainContainer">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Umair.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest beatiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Compass" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Compass" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Compass" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="resultTitle">
              <img src={assets.user_icon} alt="User icon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="resultData">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading && (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              )}
              <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            </div>
          </div>
        )}

        <div className="mainBottom">
          <div className="searchBox">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input !== "" && (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="Send Icon"
                />
              )}
            </div>
          </div>

          <p className="bottomInfo">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
