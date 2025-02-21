import { useEffect, useState } from "react";
import axios from "axios";

const languageMap = {
  en: "English",
  pt: "Portuguese",
  es: "Spanish",
  ru: "Russian",
  tr: "Turkish",
  fr: "French",
};

const ChatInput = ({ setMessages, setTranslatedMessage, setSummaryMessage, setDetectedLang, setTargetLang, targetLang, messages }) => {
  const [textMessage, setTextMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [summarizerAvailable, setSummarizerAvailable] = useState(false);

  const API_KEY = "AIzaSyD-Zjbfq2jpi9Vr1X_epT1zYkEt550Xrro"; 

  useEffect(() => {
    // ✅ Feature detection: Check if Summarizer API is available
    if ("ai" in self && "summarizer" in self.ai) {
      setSummarizerAvailable(true);
    } else {
      setSummarizerAvailable(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textMessage.trim()){
      setErrorMessage("Please enter text to translate."); // ✅ Show error if input is empty
      return;
    } else{
      setErrorMessage('')
    }

    setMessages(textMessage); // ✅ Update "Post" section
    setTextMessage(""); // ✅ Clear input

    try {
      // Detect Language
      const detectResponse = await axios.post(
        `https://translation.googleapis.com/language/translate/v2/detect?key=${API_KEY}`,
        { q: textMessage },
        { headers: { "Content-Type": "application/json" } }
      );

      const detectedLangCode = detectResponse.data.data.detections[0][0].language;
      const detectedLangName = languageMap[detectedLangCode] || "Unknown Language";

      setDetectedLang(detectedLangName);

      // Translate to Initial Target Language
      handleTranslate(textMessage, targetLang);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };

  const handleTranslate = async (text = messages, target = targetLang) => {
    if (!text.trim()) return; // ✅ Use messages instead of textMessage

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        { q: text, target },
        { headers: { "Content-Type": "application/json" } }
      );

      const translatedText = response.data.data.translations[0].translatedText;
      setTranslatedMessage(translatedText); // ✅ Update "Translation" section text
    } catch (error) {
      console.error("Translation API error:", error);
    }
  };

const handleSummarize = async () => {
  if (!messages || messages.length < 150) {
    setSummaryMessage("Text is too short to summarize.");
    return;
  }

  try {
    console.log("Checking Summarizer API capabilities...");

    const capabilities = await self.ai.summarizer.capabilities();
    console.log("Summarizer Capabilities:", capabilities);

    if (capabilities.available === "no") {
      throw new Error("Summarizer API is not available in this environment.");
    }

    console.log("Creating summarizer instance...");

    const summarizer = await self.ai.summarizer.create({
      type: "key-points",
      format: "plain-text",
      length: "medium",
    });

    console.log("Summarizer Instance:", summarizer);

    if (typeof summarizer.summarize !== "function") {
      throw new Error("Summarizer instance does not have a summarize() function.");
    }

    const response = await summarizer.summarize(messages, {
      context: "Summarize this conversation.",
    });

    setSummaryMessage(response.summary || "No summary available.");
  } catch (error) {
    console.error("Summarization API error:", error);
    setSummaryMessage("Error summarizing text. Please try again.");
  }
};

  return (
    <div className="chat-input">
      <div className="form-list">
        <form onSubmit={handleSubmit}>
          <div className="chat">
            <label htmlFor="message-input" className="visually-hidden">
              Enter text to translate
            </label>
            <textarea
              className="input-box"
              rows={6}
              cols={40}
              placeholder="Type or paste your text here..."
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              aria-label="Enter text to translate"
            ></textarea>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* ✅ Display error */}

          </div>

          <div className="action-buttons">
            <div >
              <label htmlFor="language-select" className="visually-hidden-button">
                  Select translation language
              </label>
              <div className="action-button">
                <div className="action-button-select">
                  <select 
                    className="language-select" 
                    value={targetLang} 
                    onChange={(e) => setTargetLang(e.target.value)} 
                    aria-label="Select translation language"
                  >
                    {Object.entries(languageMap).map(([code, name]) => (
                      <option key={code} value={code}>{name}</option>
                    ))}
                  </select>
                  <button 
                    className="translate-btn" 
                    type="button" 
                    onClick={() => handleTranslate(messages, targetLang)}
                    aria-label="Translate text"
                  >
                    Translate
                  </button>
                  {messages.length > 150 && summarizerAvailable && ( 
                  <button 
                    className="summarize-btn" 
                    type="button" 
                    onClick={handleSummarize} 
                    aria-label="Summarize text"
                  >
                    Summarize
                  </button> )}
                </div>
                <button className="send-btn" type="submit" aria-label="Send message">
                  <i className="ri-send-plane-2-fill" role="button" tabIndex="0"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;






// import { useState, useEffect } from "react";
// import axios from "axios";

// const languageMap = {
//   en: "English",
//   pt: "Portuguese",
//   es: "Spanish",
//   ru: "Russian",
//   tr: "Turkish",
//   fr: "French",
// };

// const ChatInput = ({ setMessages, setTranslatedMessage, setDetectedLang, setTargetLang, targetLang, messages }) => {
//   const [textMessage, setTextMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const API_KEY = "AIzaSyD-Zjbfq2jpi9Vr1X_epT1zYkEt550Xrro"; 


//   const [summarizerAvailable, setSummarizerAvailable] = useState(false); // ✅ Store API support
//   useEffect(() => {
//     if ("ai" in self && "summarizer" in self.ai) {
//       setSummarizerAvailable(true);
//     } else {
//       setSummarizerAvailable(false);
//     }
//   }, []);

//   const handleSummarize = async () => {
//     if (!messages || messages.length < 150) return; // Only summarize if text is long enough
  
//     try {
//       const response = await self.ai.summarizer.summarize(messages); // Call Chrome AI Summarizer
//       setTranslatedMessage(response.summary); // Display summary
//     } catch (error) {
//       console.error("Summarization API error:", error);
//       setTranslatedMessage("Error summarizing text. Please try again.");
//     }
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!textMessage.trim()) {
//       setErrorMessage("Please enter text to translate.");
//       return;
//     } else {
//       setErrorMessage("");
//     }

//     setMessages(textMessage);
//     setTextMessage("");

//     try {
//       // Detect Language
//       const detectResponse = await axios.post(
//         `https://translation.googleapis.com/language/translate/v2/detect?key=${API_KEY}`,
//         { q: textMessage },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       const detectedLangCode = detectResponse.data.data.detections[0][0].language;
//       const detectedLangName = languageMap[detectedLangCode] || "Unknown Language";

//       setDetectedLang(detectedLangName);

//       // Translate
//       handleTranslate(textMessage, targetLang);
//     } catch (error) {
//       console.error("Error processing message:", error);
//     }
//   };

//   const handleTranslate = async (text = messages, target = targetLang) => {
//     if (!text.trim()) return;

//     try {
//       const response = await axios.post(
//         `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
//         { q: text, target },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       const translatedText = response.data.data.translations[0].translatedText;
//       setTranslatedMessage(translatedText);
//     } catch (error) {
//       console.error("Translation API error:", error);
//     }
//   };

//   return (
//     <div className="chat-input">
//       <div className="form-list">
//         <form onSubmit={handleSubmit}>
//           <div className="chat">
//             <label htmlFor="message-input" className="visually-hidden">
//               Enter text to translate
//             </label>
//             <textarea
//               className="input-box"
//               rows={6}
//               cols={40}
//               placeholder="Type or paste your text here..."
//               value={textMessage}
//               onChange={(e) => setTextMessage(e.target.value)}
//               aria-label="Enter text to translate"
//             ></textarea>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//           </div>

//           <div className="action-buttons">
//             <div>
//               <label htmlFor="language-select" className="visually-hidden-button">
//                 Select translation language
//               </label>
//               <div className="action-button">
//                 <div className="action-button-select">
//                   <select
//                     className="language-select"
//                     value={targetLang}
//                     onChange={(e) => setTargetLang(e.target.value)}
//                     aria-label="Select translation language"
//                   >
//                     {Object.entries(languageMap).map(([code, name]) => (
//                       <option key={code} value={code}>{name}</option>
//                     ))}
//                   </select>
//                   <button
//                     className="translate-btn"
//                     type="button"
//                     onClick={() => handleTranslate(messages, targetLang)}
//                     aria-label="Translate text"
//                   >
//                     Translate
//                   </button>

//                   {/* ✅ Conditionally show Summarize button */}
//                   {summarizerAvailable && textMessage.length > 150 && (
//                     <button
//                       className="translate-btn"
//                       type="button"
//                       aria-label="Summarize text"
//                       onClick={handleSummarize}
//                     >
//                       Summarize
//                     </button>
//                   )}
//                 </div>
//                 <button className="send-btn" type="submit" aria-label="Send message">
//                   <i className="ri-send-plane-2-fill" role="button" tabIndex="0"></i>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatInput;



// import { useState, useEffect } from "react";
// import axios from "axios";

// const languageMap = {
//   en: "English",
//   pt: "Portuguese",
//   es: "Spanish",
//   ru: "Russian",
//   tr: "Turkish",
//   fr: "French",
// };

// const ChatInput = ({ setMessages, setTranslatedMessage, setDetectedLang, setTargetLang, targetLang, messages, setSummaryMessage }) => {
//   const [textMessage, setTextMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState(""); 
//   const [summarizerAvailable, setSummarizerAvailable] = useState(false); // ✅ Check if Summarizer API is available

//   const API_KEY = "AIzaSyD-Zjbfq2jpi9Vr1X_epT1zYkEt550Xrro"; 

//   useEffect(() => {
//     // ✅ Feature detection: Check if Summarizer API is available
//     if ("ai" in self && "summarizer" in self.ai) {
//       setSummarizerAvailable(true);
//     } else {
//       setSummarizerAvailable(false);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!textMessage.trim()){
//       setErrorMessage("Please enter text to translate."); // ✅ Show error if input is empty
//       return;
//     } else{
//       setErrorMessage('')
//     }

//     setMessages(textMessage); 
//     setTextMessage(""); 

//     try {
//       // Detect Language
//       const detectResponse = await axios.post(
//         `https://translation.googleapis.com/language/translate/v2/detect?key=${API_KEY}`,
//         { q: textMessage },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       const detectedLangCode = detectResponse.data.data.detections[0][0].language;
//       const detectedLangName = languageMap[detectedLangCode] || "Unknown Language";

//       setDetectedLang(detectedLangName);

//       handleTranslate(textMessage, targetLang);
//     } catch (error) {
//       console.error("Error processing message:", error);
//     }
//   };

//   const handleTranslate = async (text = messages, target = targetLang) => {
//     if (!text.trim()) return;

//     try {
//       const response = await axios.post(
//         `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
//         { q: text, target },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       const translatedText = response.data.data.translations[0].translatedText;
//       setTranslatedMessage(translatedText);
//     } catch (error) {
//       console.error("Translation API error:", error);
//     }
//   };

// //   const handleSummarize = async () => {
// //     if (!messages || messages.length < 150) {
// //       setSummaryMessage("Text is too short to summarize.");
// //       return;
// //     }
  
// //     try {
// //       console.log("Checking Summarizer API capabilities...");
  
// //       const capabilities = await self.ai.summarizer.capabilities();
// //       console.log("Summarizer Capabilities:", capabilities);
  
// //       if (capabilities.available === "no") {
// //         throw new Error("Summarizer API is not available in this environment.");
// //       }
  
// //       console.log("Creating summarizer instance...");
  
// //       const summarizer = await self.ai.summarizer.create({
// //         type: "key-points",
// //         format: "plain-text",
// //         length: "medium",
// //       });
  
// //       console.log("Summarizer Instance:", summarizer);
  
// //       if (typeof summarizer.summarize !== "function") {
// //         throw new Error("Summarizer instance does not have a summarize() function.");
// //       }
  
// //       const response = await summarizer.summarize(messages, {
// //         context: "Summarize this conversation.",
// //       });
  
// //       setSummaryMessage(response.summary || "No summary available.");
// //     } catch (error) {
// //       console.error("Summarization API error:", error);
// //       setSummaryMessage("Error summarizing text. Please try again.");
// //     }
// //   };
  
  
  
  

// //   return (
// //     <div className="chat-input">
// //       <div className="form-list">
// //         <form onSubmit={handleSubmit}>
// //           <div className="chat">
// //             <label htmlFor="message-input" className="visually-hidden">
// //               Enter text to translate
// //             </label>
// //             <textarea
// //               id="message-input"
// //               className="input-box"
// //               rows={6}
// //               cols={40}
// //               placeholder="Type or paste your text here..."
// //               value={textMessage}
// //               onChange={(e) => setTextMessage(e.target.value)}
// //               aria-label="Enter text to translate"
// //             ></textarea>
// //             {errorMessage && <p className="error-message">{errorMessage}</p>} {/* ✅ Display error */}
// //           </div>

// //           <div className="action-buttons">
// //             <div className="action-button">
// //               <label htmlFor="language-select" className="visually-hidden">
// //                 Select translation language
// //               </label>
//               <select
//                 id="language-select"
//                 className="language-select"
//                 value={targetLang}
//                 onChange={(e) => setTargetLang(e.target.value)}
//                 aria-label="Select translation language"
//               >
//                 {Object.entries(languageMap).map(([code, name]) => (
//                   <option key={code} value={code}>{name}</option>
//                 ))}
//               </select>

//               <button 
//                 className="translate-btn" 
//                 type="button" 
//                 onClick={() => handleTranslate(messages, targetLang)}
//                 aria-label="Translate text"
//               >
//                 Translate
//               </button>

//               {messages.length > 150 && summarizerAvailable && ( 
//                 <button 
//                   className="summarize-btn" 
//                   type="button" 
//                   onClick={handleSummarize} 
//                   aria-label="Summarize text"
//                 >
//                   Summarize
//                 </button>
//               )}
//             </div>

//             <button className="send-btn" type="submit" aria-label="Send message">
//               <i className="ri-send-plane-2-fill" role="button" tabIndex="0"></i>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatInput;
