import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const App = () => {
  const [messages, setMessages] = useState(""); 
  const [translatedMessage, setTranslatedMessage] = useState("");
  const [detectedLang, setDetectedLang] = useState(""); 
  const [targetLang, setTargetLang] = useState("en"); // ✅ Add state for target language

  return (
    <>
      <div className="app-container">
        <h1 className="header">AI-Powered Text Processing Interface</h1>
        <div className="shift">
          <div>
            <ChatInput 
              setMessages={setMessages} 
              setTranslatedMessage={setTranslatedMessage} 
              messages={messages} 
              setDetectedLang={setDetectedLang}
              setTargetLang={setTargetLang} // ✅ Pass setTargetLang to update the target language
              targetLang={targetLang} // ✅ Pass current target language
            />
          </div>
          <ChatMessage 
            messages={messages} 
            translatedMessage={translatedMessage} 
            detectedLang={detectedLang}
            targetLang={targetLang} // ✅ Pass target language
          />
        </div>
      </div>
    </>
  );
};

export default App;
