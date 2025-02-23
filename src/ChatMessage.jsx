import { useState } from "react";

const languageMap = {
  en: "English",
  pt: "Portuguese",
  es: "Spanish",
  ru: "Russian",
  tr: "Turkish",
  fr: "French",
};

const ChatMessage = ({ messages, translatedMessage, detectedLang, targetLang }) => {
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false)

  const toggleSummary = () => {
    if (!showSummary) {
      handleSummarize(); // Call summarization when showing for the first time
    }
    setShowSummary((prev) => !prev);
  };

  const handleSummarize = async () => {
    if (!messages || messages.length < 150) {
      setSummary("❌ Text is too short to summarize.");
      return;
    }
  
    if (detectedLang !== "English") {
      setSummary("❌ Summarization is only available for English text.");
      return;
    }
  
    setLoadingSummary(true);
    setSummary(""); // Reset previous summary
  
    try {
      if (!("ai" in self) || !("summarizer" in self.ai)) {
        throw new Error("Summarizer API is not supported in this browser.");
      }
  
      const summarizer = await self.ai.summarizer.create({
        type: "key-points",
        format: "plain-text",
        length: "medium",
      });
  
      console.log("Summarizer instance created:", summarizer);
  
      const response = await summarizer.summarize(messages);
  
      console.log("Summarization response:", response);
  
      if (!response) {
        throw new Error("No summary received from API.");
      }
  
      setSummary(response);
    } catch (error) {
      console.error("Summarization API Error:", error);
      setSummary(`❌ Unable to summarize text. Please try again later. Error: ${error.message}`);
    } finally {
      setLoadingSummary(false);
    }
  };
  
  
  
  

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

      {messages.length > 150 && (
        <div className="message-sum">
          <button className="summarize-btn" onClick={toggleSummary} disabled={loadingSummary}>
            {loadingSummary ? "Summarizing..." : showSummary ? "Hide Summary" : "Summarize"}
          </button>

          {showSummary && summary && (
            <div className="chat-box summary-box">
              <h1>Summary</h1>
              <p className="translation">{summary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;

  