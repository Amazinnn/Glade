import React, { useEffect, useRef, useState } from 'react';

type Message = {
  role: string;
  content: string;
};

const AIPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  const handleSend = async () => {
    const content = input.trim();
    if (!content || streaming) return;

    const userMessage = { role: 'user', content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setStreaming(true);

    try {
      const result = await window.api.ai.chat(nextMessages);
      setMessages((current) => [...current, { role: 'assistant', content: result }]);
    } catch (error: any) {
      setMessages((current) => [...current, { role: 'assistant', content: `暂时没有回应：${error.message}` }]);
    } finally {
      setStreaming(false);
    }
  };

  return (
    <aside className="garden-card whisper-card">
      <header className="card-header">
        <span className="card-kicker">轻声整理</span>
        <h2>树荫下的回声</h2>
      </header>

      <div className="quiet-note">
        <p>需要时再唤醒它。这里不催促，只帮你把散落的想法拢一拢。</p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && <p className="empty-text">可以问它：帮我把今天的记录整理成三句话。</p>}
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <span className="message-role">{message.role === 'user' ? '我' : 'AI'}</span>
            <p>{message.content}</p>
          </div>
        ))}
        {streaming && <div className="message assistant">正在安静地整理...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleSend();
          }}
          placeholder="轻声问一句"
        />
        <button onClick={handleSend} disabled={streaming || !input.trim()}>
          发送
        </button>
      </div>
    </aside>
  );
};

export default AIPanel;
