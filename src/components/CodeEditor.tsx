import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Wand2, Check } from 'lucide-react';
import type { Language, EditorSettings, CodeSnippet } from '../types';
import { CodeIntelligenceService, type CodeError } from '../services/CodeIntelligenceService';
import { configureMonacoEditor } from '../config/monacoConfig';

interface CodeEditorProps {
  language: Language;
  value: string;
  onChange: (value: string) => void;
  settings: EditorSettings;
  onErrorsChange?: (errors: CodeError[]) => void;
  onShowErrorsInConsole?: (errors: CodeError[]) => void;
  currentTemplate?: string;
  allCode?: CodeSnippet;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  onChange,
  settings,
  onErrorsChange,
  onShowErrorsInConsole,
  currentTemplate,
  allCode
}) => {
  const [isFormatting, setIsFormatting] = useState(false);
  const [errors, setErrors] = useState<CodeError[]>([]);
  const codeIntelligence = CodeIntelligenceService.getInstance();

  const handleEditorChange = (newValue: string | undefined) => {
    const code = newValue || '';
    onChange(code);

    // Validate code and update errors
    validateCode(code);
  };

  const validateCode = (code: string) => {
    let codeErrors: CodeError[] = [];

    // Language-specific validation
    switch (language) {
      case 'html':
        codeErrors = codeIntelligence.validateHTML(code);
        break;
      case 'css':
        codeErrors = codeIntelligence.validateCSS(code);
        break;
      case 'javascript':
        codeErrors = codeIntelligence.validateJavaScript(code);
        break;
    }

    // Template-specific validation (only on the active language tab)
    if (currentTemplate && allCode) {
      const templateErrors = codeIntelligence.validateTemplate(currentTemplate, allCode);
      // Filter template errors to only show relevant ones for current language
      const relevantTemplateErrors = templateErrors.filter(error => {
        if (language === 'html' && error.source.includes('template')) return true;
        if (language === 'css' && (error.source.includes('flexbox') || error.source.includes('css') || error.source.includes('responsive'))) return true;
        if (language === 'javascript' && (error.source.includes('form') || error.source.includes('validation'))) return true;
        return error.source.includes('template-accessibility') || error.source.includes('template-seo');
      });
      codeErrors.push(...relevantTemplateErrors);
    }

    setErrors(codeErrors);
    onErrorsChange?.(codeErrors);
  };

  const formatCode = async () => {
    setIsFormatting(true);
    try {
      const formattedCode = await codeIntelligence.formatCode(value, language);
      onChange(formattedCode);
    } catch (error) {
      console.error('Formatting failed:', error);
    } finally {
      setIsFormatting(false);
    }
  };

  const handleShowErrorsInConsole = () => {
    if (onShowErrorsInConsole && errors.length > 0) {
      onShowErrorsInConsole(errors);
      
      // Visual feedback - briefly change the button appearance
      const button = document.querySelector('.status-indicator.error.clickable') as HTMLElement;
      if (button) {
        button.style.background = '#28a745';
        button.innerHTML = '✓';
        setTimeout(() => {
          button.style.background = '#dc3545';
          button.innerHTML = `${errors.length}<span class="error-arrow">›</span>`;
        }, 800);
      }
    }
  };

  useEffect(() => {
    // Configure Monaco Editor on mount
    configureMonacoEditor();
  }, []);

  useEffect(() => {
    // Validate initial code
    validateCode(value);
  }, [value, language]);

  return (
    <div className="code-editor">
      <div className="editor-header">
        <span className="language-label">{language.toUpperCase()}</span>
        <div className="editor-actions">
          <button 
            className="format-button"
            onClick={formatCode}
            disabled={isFormatting}
            title="Format Code (Prettier)"
          >
            {isFormatting ? (
              <div className="spinner" />
            ) : (
              <Wand2 size={16} />
            )}
          </button>
          {errors.length === 0 && value.trim() && (
            <div className="status-indicator success" title="No errors">
              <Check size={16} />
            </div>
          )}
          {errors.length > 0 && (
            <button 
              className="status-indicator error clickable" 
              title={`${errors.length} error(s) - Click to show in console`}
              onClick={() => handleShowErrorsInConsole()}
            >
              {errors.length}
              <span className="error-arrow">›</span>
            </button>
          )}
        </div>
      </div>
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={handleEditorChange}
        theme={settings.theme}
        options={{
          fontSize: settings.fontSize,
          wordWrap: settings.wordWrap,
          minimap: { enabled: settings.minimap },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          folding: true,
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          tabSize: 2,
          insertSpaces: true,
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showFunctions: true,
            showConstructors: true,
            showFields: true,
            showVariables: true,
            showClasses: true,
            showStructs: true,
            showInterfaces: true,
            showModules: true,
            showProperties: true,
            showEvents: true,
            showOperators: true,
            showUnits: true,
            showValues: true,
            showConstants: true,
            showEnums: true,
            showEnumMembers: true,
            showMethods: true
          },
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true
          },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          acceptSuggestionOnCommitCharacter: true,
          snippetSuggestions: 'inline',
          wordBasedSuggestions: 'currentDocument'
        }}
      />
    </div>
  );
};

export default CodeEditor;