// src/renderer/App.tsx
import React from 'react';
import LogPanel from './components/LogPanel';
import EventPanel from './components/EventPanel';
import AIPanel from './components/AIPanel';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <LogPanel />
      <EventPanel />
      <AIPanel />
    </div>
  );
};

export default App;