import { createContext, useState } from "react";
import { generateContent } from "../config/gemini";

export const geminiContext = createContext();

export const GeminiProvider = ({ children }) => {
  const [inputPrompt, setInputPrompt] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [geminiResp, setGeminiResp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const onSend = async (prompt = inputPrompt, repeat = false) => {
    setGeminiResp("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    if (!repeat) setPrevPrompts((prev) => [...prev, prompt]);
    const response = await generateContent(prompt);
    setGeminiResp(response);
    setLoading(false);
    setInputPrompt("");
  };
  const resetChat = () => {
    setLoading(false);
    setShowResult(false);
  };
  const contextValue = {
    inputPrompt,
    setInputPrompt,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    geminiResp,
    setGeminiResp,
    loading,
    setLoading,
    showResult,
    setShowResult,
    onSend,
    resetChat,
  };
  return (
    <geminiContext.Provider value={contextValue}>
      {children}
    </geminiContext.Provider>
  );
};
