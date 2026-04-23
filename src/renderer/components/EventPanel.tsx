import React, { useEffect, useMemo, useState } from 'react';

type EventEntry = {
  id: string;
  kind?: string;
  type?: string;
  eventType?: string;
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: number;
};

const eventTypes = [
  { value: 'task', label: '任务' },
  { value: 'health', label: '健康' },
  { value: 'study', label: '学习' },
  { value: 'expense', label: '花费' },
  { value: 'custom', label: '其他' },
];

const typeLabel = (type: string | undefined) =>
  eventTypes.find((item) => item.value === type)?.label ?? '记录';

const EventPanel: React.FC = () => {
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [form, setForm] = useState({ type: 'task', content: '', amount: '' });
  const [query, setQuery] = useState('');
  const [saving, setSaving] = useState(false);

  const loadEvents = async () => {
    const result = await window.api.record.listTimeline({ type: 'event', limit: 24 });
    setEvents(result ?? []);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return events.slice(0, 8);
    return events
      .filter((event) => `${event.content} ${event.eventType ?? event.type ?? ''}`.toLowerCase().includes(text))
      .slice(0, 8);
  }, [events, query]);

  const handleSubmit = async () => {
    const content = form.content.trim();
    if (!content || saving) return;

    const metadata: Record<string, unknown> = {};
    if (form.type === 'expense' && form.amount) {
      metadata.amount = Number(form.amount);
    }

    setSaving(true);
    try {
      await window.api.record.createEvent(form.type, content, metadata);
      setForm({ type: 'task', content: '', amount: '' });
      await loadEvents();
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="garden-card rhythm-card">
      <header className="card-header">
        <span className="card-kicker">时间线</span>
        <h2>今天经过的小径</h2>
      </header>

      <div className="event-composer">
        <div className="segmented-control" aria-label="事件类型">
          {eventTypes.map((item) => (
            <button
              key={item.value}
              className={form.type === item.value ? 'active' : ''}
              onClick={() => setForm((current) => ({ ...current, type: item.value }))}
            >
              {item.label}
            </button>
          ))}
        </div>

        <input
          value={form.content}
          onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
          placeholder="添一件要记得的事。"
        />

        {form.type === 'expense' && (
          <input
            value={form.amount}
            type="number"
            onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))}
            placeholder="金额"
          />
        )}

        <button className="secondary-action" onClick={handleSubmit} disabled={saving || !form.content.trim()}>
          {saving ? '保存中' : '记下'}
        </button>
      </div>

      <div className="search-strip">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="在今天的小径里找一找" />
      </div>

      <div className="event-list">
        {filteredEvents.length === 0 && <p className="empty-text">还没有事件经过这里。</p>}
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-item">
            <span className="event-type">{typeLabel(event.eventType ?? event.type)}</span>
            <span className="event-content">{event.content}</span>
            {typeof event.metadata?.amount === 'number' && <span className="event-amount">¥{event.metadata.amount}</span>}
            <span className="event-time">
              {new Date(event.createdAt).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default EventPanel;
