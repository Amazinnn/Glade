import React, { useEffect, useState } from 'react';

type LogEntry = {
  id: string;
  content: string;
  createdAt: number;
};

const formatTime = (value: number) =>
  new Date(value).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

const LogPanel: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [newContent, setNewContent] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [opening, setOpening] = useState(false);

  const loadLogs = async () => {
    const result = await window.api.record.listLogs({ limit: 12 });
    setLogs((result ?? []).slice(0, 12));
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleNew = async () => {
    const content = newContent.trim();
    if (!content || saving) return;

    setSaving(true);
    try {
      await window.api.record.createLog(content);
      setNewContent('');
      await loadLogs();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await window.api.record.delete(id);
    await loadLogs();
  };

  const handleOpenToday = async () => {
    setOpening(true);
    try {
      await window.api.record.openDailyMarkdown();
    } finally {
      setOpening(false);
    }
  };

  return (
    <article className="garden-card capture-card">
      <header className="card-header">
        <span className="card-kicker">随手记录</span>
        <h2>草坪上的一小块空地</h2>
      </header>

      <div className="capture-box">
        <textarea
          value={newContent}
          onChange={(event) => setNewContent(event.target.value)}
          placeholder="写下一朵花、一个念头，或此刻的心情。"
          rows={6}
        />
        <div className="capture-actions">
          <span>{newContent.trim().length > 0 ? `${newContent.trim().length} 字` : '自然一点，慢慢写。'}</span>
          <div className="capture-buttons">
            <button className="quiet-action" onClick={handleOpenToday} disabled={opening}>
              {opening ? '打开中' : '今日 Markdown'}
            </button>
            <button onClick={handleNew} disabled={saving || !newContent.trim()}>
              {saving ? '保存中' : '放进花园'}
            </button>
          </div>
        </div>
      </div>

      <div className="timeline-list" aria-label="最近记录">
        {logs.length === 0 && <p className="empty-text">这里还很安静，等第一阵风吹来。</p>}
        {logs.map((log) => (
          <div
            key={log.id}
            className={`timeline-item ${selected === log.id ? 'selected' : ''}`}
            onClick={() => setSelected(log.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setSelected(log.id);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <span className="timeline-dot" />
            <span className="timeline-body">
              <span className="timeline-content">{log.content}</span>
              <span className="timeline-meta">{formatTime(log.createdAt)}</span>
            </span>
            <button
              className="item-delete"
              onClick={(event) => {
                event.stopPropagation();
                handleDelete(log.id);
              }}
              aria-label="删除这条记录"
            >
              删除
            </button>
          </div>
        ))}
      </div>
    </article>
  );
};

export default LogPanel;
