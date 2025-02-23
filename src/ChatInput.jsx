import {  useState } from "react";
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
  const [apiError, setApiError] = useState("");

  const API_KEY = "AIzaSyD-Zjbfq2jpi9Vr1X_epT1zYkEt550Xrro";

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); // Clear previous errors

    if (!textMessage.trim()) {
      setErrorMessage("⚠️ Please enter text to translate.");
      return;
    } else {
      setErrorMessage("");
    }

    setMessages(textMessage);
    setTextMessage("");

    try {
      const detectResponse = await axios.post(
        `https://translation.googleapis.com/language/translate/v2/detect?key=${API_KEY}`,
        { q: textMessage },
        { headers: { "Content-Type": "application/json" } }
      );

      const detectedLangCode = detectResponse.data.data.detections[0][0].language;
      const detectedLangName = languageMap[detectedLangCode] || "Unknown Language";
      setDetectedLang(detectedLangName);

      handleTranslate(textMessage, targetLang);
    } catch (error) {
      setApiError(`❌ Failed to detect language. Please try again later. ${error}`);
    }
  };



  const handleTranslate = async (text = messages, target = targetLang) => {
    if (!text.trim()) return;

    setApiError(""); // Clear previous errors

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        { q: text, target },
        { headers: { "Content-Type": "application/json" } }
      );

      const translatedText = response.data.data.translations[0].translatedText;
      setTranslatedMessage(translatedText);
    } catch (error) {
      console.error("Translation API Error:", error);

      if (!navigator.onLine) {
        setApiError("⚠️ No internet connection. Please check your network.");
      } else {
        setApiError("❌ Service Unavailable Please try again later.");
      }
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {apiError && <p className="error-message">{apiError}</p>}
          </div>

          <div className="action-buttons">
            <div>
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


