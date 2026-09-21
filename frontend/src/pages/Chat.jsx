
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Chat() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("knowme-chat");
    return saved
      ? JSON.parse(saved)
      : [
          {
            role: "assistant",
            content:
              "Hi! I'm KnowMe AI. Ask me anything about Garvit.",
          },
        ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("knowme-chat", JSON.stringify(messages));
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const question = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://knowme-ai-mp1e.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the KnowMe AI backend.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  function clearChat() {
    localStorage.removeItem("knowme-chat");

    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm KnowMe AI. Ask me anything about Garvit.",
      },
    ]);
  }

  return (
    <div className="chat-page">

      <div className="chat-header">
      <div>
        <h2>KnowMe AI</h2>
        <p>Ask me anything about Garvit</p>
      </div>

      <div>
        <Link to="/">
          <button>Home</button>
        </Link>

        <button onClick={clearChat}>
          Clear
        </button>
      </div>
    </div>


      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role}`}
          >
            {message.content}
          </div>
        ))}

        {loading && (
          <div className="message assistant">
            Thinking...
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask something about Garvit..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>

    </div>
  );
}

export default Chat;