import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const App = () => {
  const [messages, setMessages] = useState(""); 
  const [translatedMessage, setTranslatedMessage] = useState("");
  const [detectedLang, setDetectedLang] = useState(""); 
  const [targetLang, setTargetLang] = useState("en"); 
  const [summaryMessage, setSummaryMessage] = useState(""); // ✅ State for summary

  return (
    <>
      <div className="app-container">
        <h1 className="header">AI-Powered Text Processing Interface</h1>
        <div className="shift">
          <ChatInput 
            setMessages={setMessages} 
            setTranslatedMessage={setTranslatedMessage} 
            messages={messages} 
            setDetectedLang={setDetectedLang}
            setTargetLang={setTargetLang} 
            targetLang={targetLang}
            setSummaryMessage={setSummaryMessage} // ✅ Pass summary state
          />
          <ChatMessage 
            messages={messages} 
            translatedMessage={translatedMessage} 
            detectedLang={detectedLang}
            targetLang={targetLang} 
            summaryMessage={summaryMessage} // ✅ Pass summary state
          />
        </div>
      </div>
    </>
  );
};

export default App;
