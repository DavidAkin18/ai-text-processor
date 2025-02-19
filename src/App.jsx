import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
const App = () => {
  const [messages, setMessages] = useState(""); // Store message as a string
  const [translatedMessage, setTranslatedMessage] = useState("")
  setTranslatedMessage
  return (
    <>
      <div className="app-container">
        <h1>
          AI-Powered Text Processing Interface
        </h1>
        <div>
            <ChatInput setMessages={setMessages} setTranslatedMessage={setTranslatedMessage} /> {/* ✅ Correctly pass setMessages */}
            <ChatMessage messages={messages} translatedMessage={translatedMessage} /> {/* ✅ Correctly pass message */}
        </div>
      </div>
      
    </>
  );
};

export default App;


// import  { useEffect, useState } from "react";
// // import ChatInput from "./component/ChatInput";
// // import ChatMessage from "./component/ChatMessage";
// // import LanguageDetector from "./component/LanguageDetector";
// // import Summarizer from "./components/Summarizer";
// // import Translator from "./components/Translator";
//  // Import global styles

// const App = () => {
//   // const [messages, setMessages] = useState([]);

//   // const handleSendMessage = async (text) => {
//   //   if (!text.trim()) return;

//   //   const newMessage = { id: Date.now(), text, type: "user" };
//   //   setMessages((prev) => [...prev, newMessage]);
//   // };
//   useEffect(()=>{
//     const script = document.createElement('script')
//     script.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
//     document.body.appendChild(script);

//    window.googleTranslateElementInit = () => {
//     new google.translate.TranslateElement(
//       { 
//         pageLanguage: 'en', 
//         includedLanguages:'en,es,fr,de,zh',
//         layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
//       }, 
//       'google_translate_element'
//     );
//    };
      
    
//   }, [])

//   return (
//     <>
//     <h1>My google translation website</h1>
//       <div id="google_translate_element">
//         {/* <div className="chat-window">
//           {messages.map((msg) => (
//             <ChatMessage key={msg.id} message={msg} />
//           ))}
//         </div>

//         <ChatInput onSend={handleSendMessage} /> */}


//       </div>
//     </>
//   );
// };

// export default App;
