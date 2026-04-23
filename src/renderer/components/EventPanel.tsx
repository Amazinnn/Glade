// src/renderer/components/EventPanel.tsx
import React, { useState, useEffect } from 'react';

const EventPanel: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'expense', content: '', amount: '' });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const types = ['expense', 'workout', 'sleep', 'task'];
    const all = await Promise.all(types.map(t => window.api.event.list(t)));
    setEvents((all.flat() ?? []).sort((a: any, b: any) => b.createdAt - a.createdAt));
  };

  const handleSubmit = async () => {
    const metadata: any = {};
    if (form.amount) metadata.amount = parseFloat(form.amount);
    await window.api.event.add(form.type, form.content, metadata);
    setForm({ type: 'expense', content: '', amount: '' });
    setShowForm(false);
    loadEvents();
  };

  return (
    <div className="panel">
      <div className="panel-header">事件</div>
      <div className="panel-content">
        <div className="input-row">
          <button onClick={() => setShowForm(!showForm)}>+ 添加事件</button>
        </div>
        {showForm && (
          <div className="event-form">
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="expense">消费</option>
              <option value="workout">健身</option>
              <option value="sleep">睡眠</option>
              <option value="task">任务</option>
            </select>
            <input
              placeholder="内容"
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
            />
            {form.type === 'expense' && (
              <input
                placeholder="金额"
                type="number"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
              />
            )}
            <button onClick={handleSubmit}>保存</button>
          </div>
        )}
        <div className="event-list">
          {events.map((ev: any) => (
            <div key={ev.id} className="event-item">
              <span className="event-type">[{ev.type}]</span>
              <span className="event-content">{ev.content}</span>
              {ev.metadata?.amount && <span className="event-amount">¥{ev.metadata.amount}</span>}
              <span className="event-time">{new Date(ev.createdAt).toLocaleDateString('zh-CN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPanel;