import React from 'react';
import LogPanel from './components/LogPanel';
import EventPanel from './components/EventPanel';
import AIPanel from './components/AIPanel';
import './styles.css';

type ApiLog = {
  id: string;
  content: string;
  createdAt: number;
  metadata?: Record<string, unknown>;
  type?: string;
};

declare global {
  interface Window {
    api: {
      record: {
        createLog: (content: string, tags?: string[]) => Promise<ApiLog>;
        listLogs: (query?: object) => Promise<ApiLog[]>;
        createEvent: (type: string, content: string, metadata?: object, tags?: string[]) => Promise<ApiLog>;
        listTimeline: (query?: object) => Promise<ApiLog[]>;
        search: (query: object) => Promise<unknown[]>;
        getDailyMarkdown: (date?: string) => Promise<{ date: string; filePath: string; content: string }>;
        openDailyMarkdown: (date?: string) => Promise<{ ok: boolean; filePath: string; error: string }>;
        delete: (id: string) => Promise<{ ok: boolean }>;
      };
      ai: {
        chat: (messages: { role: string; content: string }[]) => Promise<string>;
      };
    };
  }
}

const App: React.FC = () => {
  return (
    <main className="garden-app">
      <section className="garden-hero" aria-label="Glade 首页">
        <div className="hero-copy">
          <p className="eyebrow">Glade</p>
          <h1>后花园</h1>
          <p className="hero-line">把今天的微光、念头和待办轻轻放下。</p>
        </div>
        <div className="sun-panel">
          <span>今日</span>
          <strong>{new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}</strong>
        </div>
      </section>

      <section className="garden-grid" aria-label="生活记录工作区">
        <LogPanel />
        <EventPanel />
        <AIPanel />
      </section>
    </main>
  );
};

export default App;
