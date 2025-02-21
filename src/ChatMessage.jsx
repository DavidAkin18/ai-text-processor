// const languageMap = {
//     en: "English",
//     pt: "Portuguese",
//     es: "Spanish",
//     ru: "Russian",
//     tr: "Turkish",
//     fr: "French",
//   };
  
//   const ChatMessage = ({ messages, translatedMessage, detectedLang, targetLang }) => {
//     return ( 
//       <div className="chat-message">
//         <div className="chat-message-container">
//           <div className="message-section">
//             <h1>Post</h1>
//             <div className="chat-box message-box">
//               <p className="translation">{messages || "Enter a message to display here..."}</p>
//               <p className="detected-language">
//                 <strong>Detected Language:</strong> {detectedLang || "Unknown"}
//               </p> 
//             </div>
//           </div>
          
//           <i className="ri-arrow-left-right-line"></i>
//           <i className="ri-arrow-up-down-fill"></i>
          
//           <div className="message-section">
//             <h1>Translation</h1>
//             <div className="chat-box translation-box">
//               <p className="translation">{translatedMessage || "Translation will appear here..."}</p>
//               <p className="detected-language">
//                 <strong>Translated To:</strong> {targetLang ? languageMap[targetLang] : "Unknown"}
//               </p> 
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default ChatMessage;
  

//   AotMQvLXTL0ucD/cCeHvdUnJ7UZUfASOXKnMg5Eqwt9f/9GFzTbtfsT7wVbdjWbRNEOsRly10BrzkUFC13YboAMAAAB/eyJvcmlnaW4iOiJodHRwczovL2FpLXRleHQtcHJvY2Vzc29yLXRhbi52ZXJjZWwuYXBwOjQ0MyIsImZlYXR1cmUiOiJBSVN1bW1hcml6YXRpb25BUEkiLCJleHBpcnkiOjE3NTMxNDI0MDAsImlzU3ViZG9tYWluIjp0cnVlfQ==

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
            <div className="message-section">
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
  