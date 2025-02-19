const ChatMessage = ({messages, translatedMessage}) => {
    return ( 
        <div className="chat-message">
            <div >
                <h1>Post</h1>
               <div className="chat-input-message">
                <p>{messages || "Enter a message to display here..."}</p>
               </div>
            </div>
            <i className="ri-arrow-left-right-fill"></i>
            <i className="ri-arrow-up-down-fill"></i>
            <div >
                <h1>Translation</h1>
                <div className="chat-input-translation">
                    <p>
                       {translatedMessage || "Enter a message to display here..."}
                    </p>
                </div>
            </div>
        </div>
        // AIzaSyCNBGTwzFU7ZtlsFkK-4xMc2kzZk043eRQ
    );
}
 
export default ChatMessage;