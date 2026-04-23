// src/renderer/components/LogPanel.tsx
import React, { useState, useEffect } from 'react';

declare global {
  interface Window { api: any; }
}

const LogPanel: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [newContent, setNewContent] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const result = await window.api.log.list();
    setLogs(result ?? []);
  };

  const handleNew = async () => {
    if (!newContent.trim()) return;
    await window.api.log.new(newContent);
    setNewContent('');
    loadLogs();
  };

  const handleDelete = async (id: string) => {
    await window.api.log.delete(id);
    loadLogs();
  };

  return (
    <div className="panel">
      <div className="panel-header">日志</div>
      <div className="panel-content">
        <div className="input-row">
          <textarea
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            placeholder="记录今天的想法..."
            rows={3}
          />
          <button onClick={handleNew}>记录</button>
        </div>
        <div className="log-list">
          {logs.map(log => (
            <div
              key={log.id}
              className={`log-item ${selected === log.id ? 'selected' : ''}`}
              onClick={() => setSelected(log.id)}
            >
              <div className="log-content">{log.content}</div>
              <div className="log-time">
                {new Date(log.createdAt).toLocaleString('zh-CN')}
              </div>
              <button className="delete-btn" onClick={() => handleDelete(log.id)}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogPanel;