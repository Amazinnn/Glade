// src/renderer/components/AIPanel.tsx
import React, { useState, useRef, useEffect } from 'react';

const AIPanel: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || streaming) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStreaming(true);

    try {
      const allMessages = messages.concat(userMsg);
      const result = await window.api.ai.chat(allMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: result }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `错误: ${err.message}` }]);
    }
    setStreaming(false);
  };

  return (
    <div className="panel">
      <div className="panel-header">AI 对话</div>
      <div className="panel-content">
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              <div className="message-role">{m.role === 'user' ? '我' : 'AI'}</div>
              <div className="message-content">{m.content}</div>
            </div>
          ))}
          {streaming && <div className="message assistant">AI 思考中...</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="输入消息，Enter 发送..."
          />
          <button onClick={handleSend} disabled={streaming}>发送</button>
        </div>
      </div>
    </div>
  );
};

export default AIPanel;