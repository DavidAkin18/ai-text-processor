import { useState } from "react";
import axios from "axios";

const ChatInput = ({ setMessages, setTranslatedMessage }) => {
    const [textMessage, setTextMessage] = useState('');
    const [language, setLanguage] = useState('en'); // default to English

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessages(textMessage); // Send text to parent
        setTextMessage(""); // Clear textarea after submit
    };

    const handleTranslate = (e) => {
        e.preventDefault();
    
        const API_KEY = 'AIzaSyCNBGTwzFU7ZtlsFkK-4xMc2kzZk043eRQ'; // Replace with your API key
        const url = `https://translation.googleapis.com/language/translate/v2`;
    
        axios
            .post(url, {
                q: textMessage,
                target: language,
                key: API_KEY,
            })
            .then((response) => {
                console.log("time" + " " +response);
                
                // Extract translated text from the API response
                const translatedText = response.data.data.translations[0].translatedText;
                console.log(translatedText);
                
                setTranslatedMessage(translatedText); // Send translated text to parent
            })
            .catch((error) => {
                console.error("Translation API error:", error);
            });
    };
    

    return (
        <>
            <div className="chat-input">
                <form onSubmit={handleSubmit}> {/* Attach onSubmit to form */}
                    <div className="chat">
                        <textarea
                            rows={6}
                            cols={40}
                            value={textMessage}
                            onChange={(e) => setTextMessage(e.target.value)}
                        ></textarea>
                        <div className="buttons-select">
                            <div className="buttons">
                                <select className="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                                    <option value="en">English</option>
                                    <option value="pt">Portuguese</option>
                                    <option value="es">Spanish</option>
                                    <option value="ru">Russian</option>
                                    <option value="tr">Turkish</option>
                                    <option value="fr">French</option>
                                </select>
                                <button type="button" onClick={handleTranslate}>Translate</button> 
                            </div>
                            <div className="buttons">
                                <button type="submit">Send</button> {/* Send message */}
                                <button>Summarize</button>
                            </div>
                            <p>{textMessage}</p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ChatInput;
