import React, { useState } from "react";

function WebChat() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message, sender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { message, sender, timestamp: new Date().toISOString() },
    ]);
  };

  const sendMessage = () => {
    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if (message) {
      addMessage(message, "user-message");
      input.value = "";
      sendToBotpress(message); // Call Botpress API directly
    }
  };

  const sendToBotpress = async (message) => {
    try {
      const response = await fetch("/api/message", { // This should be the endpoint for Botpress in your setup
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });
      const data = await response.json();
      if (data && data.text) {
        addMessage(data.text, "bot-message");
      } else {
        addMessage("Sorry, I didn't understand that.", "bot-message");
      }
    } catch (error) {
      console.error("Error sending message to Botpress:", error);
      addMessage("Sorry, something went wrong.", "bot-message");
    }
  };

  return (
    <div>
      <div id="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.message}
          </div>
        ))}
      </div>
      <input type="text" id="userInput" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default WebChat;
