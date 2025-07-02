import { createContext, useContext, useState } from "react";
import main from "../config/gemini";

const Context = createContext();

function ContextProvider({ children }) {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  function delayPara(index, next) {
    setTimeout(() => {
      setResultData((prev) => prev + next);
    }, 75 * index);
  }

  function newChat() {
    setLoading(false);
    setShowResult(false);
  }

  async function onSent(prompt) {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await main(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await main(input);
    }

    const responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const next = newResponseArray[i];
      delayPara(i, next + " ");
    }
    setLoading(false);
    setInput("");
  }

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export function useContextAPI() {
  const context = useContext(Context);
  if (context === undefined)
    throw new Error("ContextOverview is being used outside of ContextProvider");
  return context;
}

export default ContextProvider;
