import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function ChatBubble({ text, isUser }) {
  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'bot'}`}>
      <span>{text}</span>
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([
    { text: 'Hello! I’m NAAI, your personal AI assistant. How can I help you today?', isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, isUser: true }]);
    setLoading(true);
    setError('');
    const userMessage = input;
    setInput('');
    try {
      const res = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(msgs => [...msgs, { text: data.reply, isUser: false }]);
      } else {
        setError('No reply from NAAI.');
      }
    } catch (err) {
      setError('Error connecting to server.');
    }
    setLoading(false);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot-bg">
      <div className="chatbot-container">
        <h1 className="chatbot-title">NAAI Chatbot</h1>
        <div className="chat-window">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} text={msg.text} isUser={msg.isUser} />
          ))}
          {loading && <div className="chat-bubble bot loading"><span>...</span></div>}
          <div ref={chatEndRef} />
        </div>
        {error && <div className="error-msg">{error}</div>}
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
