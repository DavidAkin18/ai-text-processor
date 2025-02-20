// // const ChatMessage = ({ messages, translatedMessage, detectedLang }) => {
// //     return ( 
// //         <div className="chat-message">
// //            <div className="chat-message-container">
// //             <div className="message-section">
// //                     <h1>Post</h1>
// //                     <div className="chat-box message-box">
// //                         <p  className="translation">{messages || "Enter a message to display here..."}</p>
// //                         <p className="detected-language">
// //                             <strong>Detected Language:</strong> {detectedLang || "Unknown"}
// //                         </p> 
// //                     </div>
// //                 </div>
// //                 <i className="ri-arrow-left-right-line"></i>
// //                 <i className="ri-arrow-up-down-fill"></i>
// //                 <div className="message-section">
// //                     <h1>Translation</h1>
// //                     <div className="chat-box translation-box">
// //                         <p className="translation">{translatedMessage || "Enter a message to display here..."}</p>
// //                         <p className="detected-language">
// //                             <strong>Detected Language:</strong> {detectedLang || "Unknown"}
// //                         </p> 
// //                     </div>
// //                 </div>
// //            </div>
// //         </div>
// //     );
// // }
 
// // export default ChatMessage;
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
//               <p className="translation">{translatedMessage || "Enter a message to display here..."}</p>
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
  
  
const languageMap = {
    en: "English",
    pt: "Portuguese",
    es: "Spanish",
    ru: "Russian",
    tr: "Turkish",
    fr: "French",
  };
  
  const ChatMessage = ({ messages, translatedMessage, detectedLang, targetLang }) => {
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
          
          <i className="ri-arrow-left-right-line"></i>
          <i className="ri-arrow-up-down-fill"></i>
          
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
      </div>
    );
  };
  
  export default ChatMessage;
  