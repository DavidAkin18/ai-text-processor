import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import logo from './assets/favicon.webp'

const App = () => {
  const [messages, setMessages] = useState(""); 
  const [translatedMessage, setTranslatedMessage] = useState("");
  const [detectedLang, setDetectedLang] = useState(""); 
  const [targetLang, setTargetLang] = useState("en"); 
  const [summaryMessage, setSummaryMessage] = useState(""); 

  return (
    <>
      <div className="app-container">
        <div><img src={logo} alt="logo" className="logo"/></div>
        <h1 className="header">AI-Powered Text Processing Interface</h1>
        <div className="shift">
          <ChatInput 
            setMessages={setMessages} 
            setTranslatedMessage={setTranslatedMessage} 
            messages={messages} 
            setDetectedLang={setDetectedLang}
            setTargetLang={setTargetLang} 
            targetLang={targetLang}
            setSummaryMessage={setSummaryMessage} 
          />
          <ChatMessage 
            messages={messages} 
            translatedMessage={translatedMessage} 
            detectedLang={detectedLang}
            targetLang={targetLang} 
            summaryMessage={summaryMessage} 
          />
        </div>
      </div>
    </>
  );
};

export default App;
