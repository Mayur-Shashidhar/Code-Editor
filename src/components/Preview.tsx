import React, { useEffect, useRef } from 'react';
import type { CodeSnippet } from '../types';
import type { ConsoleMessage } from './Console';

interface PreviewProps {
  code: CodeSnippet;
  onConsoleMessage?: (message: ConsoleMessage) => void;
}

const Preview: React.FC<PreviewProps> = ({ code, onConsoleMessage }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const document = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (document) {
        const htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
            <style>
              ${code.css}
            </style>
          </head>
          <body>
            ${code.html.replace(/<head>[\s\S]*?<\/head>/gi, '').replace(/<\/?html[^>]*>/gi, '').replace(/<\/?body[^>]*>/gi, '')}
            <script>
              // Capture console output and send to parent
              (function() {
                const originalConsole = {
                  log: console.log,
                  error: console.error,
                  warn: console.warn,
                  info: console.info
                };

                function sendToParent(type, args) {
                  try {
                    const message = {
                      id: Date.now() + Math.random(),
                      type: type,
                      message: args.map(arg => 
                        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                      ).join(' '),
                      timestamp: new Date()
                    };
                    
                    // Send message to parent window
                    if (window.parent && window.parent !== window) {
                      window.parent.postMessage({ type: 'console', data: message }, '*');
                    } else if (window.top && window.top !== window) {
                      window.top.postMessage({ type: 'console', data: message }, '*');
                    }
                  } catch (e) {
                    // Fallback to original console if messaging fails
                    originalConsole[type].apply(console, args);
                  }
                }

                // Only capture errors and warnings, ignore logs and info
                console.log = function() {
                  // Don't send logs to parent console, but still log locally
                  originalConsole.log.apply(console, arguments);
                };

                console.error = function() {
                  sendToParent('error', Array.from(arguments));
                  originalConsole.error.apply(console, arguments);
                };

                console.warn = function() {
                  sendToParent('warn', Array.from(arguments));
                  originalConsole.warn.apply(console, arguments);
                };

                console.info = function() {
                  // Don't send info to parent console, but still log locally
                  originalConsole.info.apply(console, arguments);
                };

                // Capture unhandled errors
                window.onerror = function(message, source, lineno, colno, error) {
                  sendToParent('error', ['Uncaught Error:', message, 'at line', lineno]);
                  return false;
                };

                // Capture unhandled promise rejections
                window.addEventListener('unhandledrejection', function(event) {
                  sendToParent('error', ['Unhandled Promise Rejection:', event.reason]);
                });
              })();

              // Execute user code
              try {
                ${code.javascript}
              } catch (error) {
                console.error('JavaScript Error:', error.message);
              }
            </script>
          </body>
          </html>
        `;
        
        document.open();
        document.write(htmlContent);
        document.close();
      }
    }
  }, [code]);

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'console' && onConsoleMessage) {
        onConsoleMessage(event.data.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onConsoleMessage]);

  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-label">PREVIEW</span>
      </div>
      <iframe
        ref={iframeRef}
        title="Code Preview"
        className="preview-iframe"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default Preview;