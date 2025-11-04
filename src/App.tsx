import { useState, useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import Console, { type ConsoleMessage } from './components/Console';
import { templates } from './data/templates';
import type { CodeSnippet, Language, LayoutView, EditorSettings, Template } from './types';
import type { CodeError } from './services/CodeIntelligenceService';
import './App.css';

function App() {
  const [code, setCode] = useState<CodeSnippet>({
    html: templates[0].code.html,
    css: templates[0].code.css,
    javascript: templates[0].code.javascript
  });
  
  const [currentTemplate, setCurrentTemplate] = useState<string>(templates[0].id);
  const [layout, setLayout] = useState<LayoutView>('split');
  const [activeTab, setActiveTab] = useState<Language>('html');
  const [settings, setSettings] = useState<EditorSettings>({
    theme: 'vs-dark',
    fontSize: 14,
    wordWrap: 'off',
    minimap: true
  });
  
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [showConsole, setShowConsole] = useState(true);

  // Load code from URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedCode = urlParams.get('code');
    
    if (sharedCode) {
      try {
        const decodedCode = JSON.parse(atob(sharedCode));
        setCode(decodedCode);
      } catch (error) {
        console.error('Failed to load shared code:', error);
      }
    }
  }, []);

  const handleCodeChange = (language: Language, value: string) => {
    setCode(prev => ({
      ...prev,
      [language]: value
    }));
    
    // Clear console messages when code changes to avoid confusion
    if (language === 'javascript') {
      setConsoleMessages([]);
    }
  };

  const handleTemplateSelect = (template: Template) => {
    setCode(template.code);
    setCurrentTemplate(template.id);
    setConsoleMessages([]); // Clear console when loading new template
  };



  const handleConsoleMessage = (message: ConsoleMessage) => {
    setConsoleMessages(prev => {
      // Check if this is a duplicate message (for grouping)
      const lastMessage = prev[prev.length - 1];
      if (lastMessage && 
          lastMessage.message === message.message && 
          lastMessage.type === message.type) {
        // Update count of last message
        return prev.map((msg, index) => 
          index === prev.length - 1 
            ? { ...msg, count: (msg.count || 1) + 1 }
            : msg
        );
      }
      
      // Add new message
      return [...prev, message];
    });

    // Auto-show console if there are errors
    if (message.type === 'error' && !showConsole) {
      setShowConsole(true);
    }
  };

  const handleClearConsole = () => {
    setConsoleMessages([]);
  };

  const toggleConsole = () => {
    setShowConsole(!showConsole);
  };

  const handleShowErrorsInConsole = (errors: CodeError[]) => {
    // Convert code errors to console messages with cleaner formatting
    const errorMessages: ConsoleMessage[] = errors.map((error) => ({
      id: `clicked_error_${error.line}_${error.column}_${error.message.substring(0, 20)}`,
      type: error.severity === 'warning' ? 'warn' : 'error',
      message: `Line ${error.line}:${error.column} - ${error.message}`,
      timestamp: new Date()
    }));

    // Add only error and warning messages to console (no info messages)
    setConsoleMessages(prev => [...prev, ...errorMessages]);
    
    // Show console if it's hidden
    if (!showConsole) {
      setShowConsole(true);
    }
  };

  const handleErrorsChange = (errors: CodeError[]) => {
    // Remove old error/warning messages from console and add new ones
    setConsoleMessages(prev => {
      // Filter out all previous error and warning messages from code validation
      const nonCodeErrorMessages = prev.filter(msg => 
        (msg.type !== 'error' && msg.type !== 'warn') || 
        !msg.id.startsWith('code_error_')
      );
      
      // Convert new errors to console messages with consistent IDs
      const newErrorMessages: ConsoleMessage[] = errors.map((error) => ({
        id: `code_error_${error.line}_${error.column}_${error.message.substring(0, 20)}`,
        type: error.severity === 'warning' ? 'warn' : 'error',
        message: `Line ${error.line}:${error.column} - ${error.message}`,
        timestamp: new Date()
      }));

      // Return non-code-error messages plus new error messages
      return [...nonCodeErrorMessages, ...newErrorMessages];
    });
  };

  const handleExport = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Code</title>
    <style>
${code.css}
    </style>
</head>
<body>
${code.html}
    <script>
${code.javascript}
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-export.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    const encodedCode = btoa(JSON.stringify(code));
    const shareUrl = `${window.location.origin}${window.location.pathname}?code=${encodedCode}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Share URL copied to clipboard!');
    }).catch(() => {
      prompt('Copy this URL to share your code:', shareUrl);
    });
  };

  return (
    <div className={`app ${settings.theme}`}>
      <Toolbar
        layout={layout}
        onLayoutChange={setLayout}
        onTemplateSelect={handleTemplateSelect}
        onExport={handleExport}
        onShare={handleShare}
        settings={settings}
        onSettingsChange={setSettings}
        templates={templates}
      />
      
      <div className="main-content">
        {(layout === 'split' || layout === 'editor') && (
          <div className="editor-panel">
            <div className="editor-tabs">
              {(['html', 'css', 'javascript'] as Language[]).map(lang => (
                <button
                  key={lang}
                  className={`tab ${activeTab === lang ? 'active' : ''}`}
                  onClick={() => setActiveTab(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="editor-container">
              <CodeEditor
                language={activeTab}
                value={code[activeTab]}
                onChange={(value) => handleCodeChange(activeTab, value)}
                settings={settings}
                onErrorsChange={handleErrorsChange}
                onShowErrorsInConsole={handleShowErrorsInConsole}
                currentTemplate={currentTemplate}
                allCode={code}
              />
            </div>
          </div>
        )}
        
        {(layout === 'split' || layout === 'preview') && (
          <div className="preview-panel">
            <Preview 
              code={code} 
              onConsoleMessage={handleConsoleMessage}
            />
          </div>
        )}
      </div>
      
      <Console
        messages={consoleMessages}
        isVisible={showConsole}
        onToggle={toggleConsole}
        onClear={handleClearConsole}
      />
    </div>
  );
}

export default App;
