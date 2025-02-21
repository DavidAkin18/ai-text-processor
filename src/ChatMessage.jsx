const languageMap = {
    en: "English",
    pt: "Portuguese",
    es: "Spanish",
    ru: "Russian",
    tr: "Turkish",
    fr: "French",
  };
const ChatMessage = ({ messages, translatedMessage, detectedLang, targetLang, summaryMessage }) => {
    return ( 
      <div className="chat-message">
        <div className="chat-message-container">
          <div className="message-section">
            <h1>Post</h1>
            <div className="chat-box message-box">
              <p className="translation">{messages || "Enter a message to display here..."}</p>
              <p className="detected-language">
                <strong>Detected Language:</strong> {detectedLang || "Unknown"}
              </p> 
            </div>
          </div>
  
          <div className="message-section">
            <h1>Translation</h1>
            <div className="chat-box translation-box">
              <p className="translation">{translatedMessage || "Translation will appear here..."}</p>
              <p className="detected-language">
                <strong>Translated To:</strong> {targetLang ? languageMap[targetLang] : "Unknown"}
              </p> 
            </div>
          </div>
        </div>
        {summaryMessage && (
            <div className="message-sum">
              <h1>Summary</h1>
              <div className="chat-box summary-box">
                <p className="translation">{summaryMessage}</p>
              </div>
            </div>
          )}
      </div>
    );
  };
  
  export default ChatMessage;
  