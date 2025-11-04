import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Trash2, ChevronUp, ChevronDown, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface ConsoleMessage {
  id: string;
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: Date;
  count?: number;
}

interface ConsoleProps {
  messages: ConsoleMessage[];
  isVisible: boolean;
  onToggle: () => void;
  onClear: () => void;
}

const Console: React.FC<ConsoleProps> = ({
  messages,
  isVisible,
  onToggle,
  onClear
}) => {
  const [filter, setFilter] = useState<string>('error');
  const consoleRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle size={16} className="console-icon error" />;
      case 'warn':
        return <AlertTriangle size={16} className="console-icon warn" />;
      case 'info':
        return <Info size={16} className="console-icon info" />;
      default:
        return <span className="console-icon log">›</span>;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const filteredMessages = messages.filter(message => {
    return message.type === filter;
  });

  const errorCount = messages.filter(m => m.type === 'error').length;
  const warnCount = messages.filter(m => m.type === 'warn').length;

  if (!isVisible) {
    return (
      <div className="console-minimized">
        <button className="console-toggle" onClick={onToggle} title="Show Console">
          <Terminal size={16} />
          <span>Console</span>
          {(errorCount > 0 || warnCount > 0) && (
            <div className="console-badge">
              {errorCount > 0 && <span className="error-badge">{errorCount}</span>}
              {warnCount > 0 && <span className="warn-badge">{warnCount}</span>}
            </div>
          )}
          <ChevronUp size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="console-panel">
      <div className="console-header">
        <div className="console-title">
          <Terminal size={16} />
          <span>Console</span>
          {messages.length > 0 && (
            <span className="message-count">({filteredMessages.length})</span>
          )}
        </div>
        
        <div className="console-controls">
          <div className="console-filters">
            <button 
              className={`filter-btn ${filter === 'error' ? 'active' : ''}`}
              onClick={() => setFilter('error')}
            >
              Errors ({errorCount})
            </button>
            <button 
              className={`filter-btn ${filter === 'warn' ? 'active' : ''}`}
              onClick={() => setFilter('warn')}
            >
              Warnings ({warnCount})
            </button>
          </div>
          
          <div className="console-actions">
            <button 
              className="console-action-btn"
              onClick={onClear}
              title="Clear Console"
            >
              <Trash2 size={16} />
            </button>
            <button 
              className="console-action-btn"
              onClick={onToggle}
              title="Hide Console"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="console-content" ref={consoleRef}>
        {filteredMessages.length === 0 ? (
          <div className="console-empty">
            No {filter} messages
          </div>
        ) : (
          <div className="console-messages">
            {filteredMessages.map((message) => (
              <div key={message.id} className={`console-message ${message.type}`}>
                <div className="message-meta">
                  {getMessageIcon(message.type)}
                  <span className="message-timestamp">
                    {formatTimestamp(message.timestamp)}
                  </span>
                  {message.count && message.count > 1 && (
                    <span className="message-count-badge">{message.count}</span>
                  )}
                </div>
                <div className="message-content">
                  <pre>{message.message}</pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Console;