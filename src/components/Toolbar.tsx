import React from 'react';
import { 
  PanelLeftClose, 
  Monitor, 
  Code, 
  Download, 
  Share, 
  Sun,
  Moon 
} from 'lucide-react';
import type { LayoutView, EditorSettings, Template } from '../types';

interface ToolbarProps {
  layout: LayoutView;
  onLayoutChange: (layout: LayoutView) => void;
  onTemplateSelect: (template: Template) => void;
  onExport: () => void;
  onShare: () => void;
  settings: EditorSettings;
  onSettingsChange: (settings: EditorSettings) => void;
  templates: Template[];
}

const Toolbar: React.FC<ToolbarProps> = ({
  layout,
  onLayoutChange,
  onTemplateSelect,
  onExport,
  onShare,
  settings,
  onSettingsChange,
  templates
}) => {
  const toggleTheme = () => {
    onSettingsChange({
      ...settings,
      theme: settings.theme === 'vs-light' ? 'vs-dark' : 'vs-light'
    });
  };

  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <h1 className="toolbar-title">Code Editor</h1>
      </div>
      
      <div className="toolbar-section">
        <select 
          className="template-select"
          onChange={(e) => {
            const template = templates.find(t => t.id === e.target.value);
            if (template) onTemplateSelect(template);
          }}
        >
          <option value="">Select Template</option>
          {templates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      <div className="toolbar-section">
        <div className="layout-controls">
          <button 
            className={`toolbar-btn ${layout === 'split' ? 'active' : ''}`}
            onClick={() => onLayoutChange('split')}
            title="Split View"
          >
            <PanelLeftClose size={20} />
          </button>
          <button 
            className={`toolbar-btn ${layout === 'preview' ? 'active' : ''}`}
            onClick={() => onLayoutChange('preview')}
            title="Preview Only"
          >
            <Monitor size={20} />
          </button>
          <button 
            className={`toolbar-btn ${layout === 'editor' ? 'active' : ''}`}
            onClick={() => onLayoutChange('editor')}
            title="Editor Only"
          >
            <Code size={20} />
          </button>
        </div>
      </div>

      <div className="toolbar-section">
        <button 
          className="toolbar-btn"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {settings.theme === 'vs-light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button 
          className="toolbar-btn"
          onClick={onExport}
          title="Export Code"
        >
          <Download size={20} />
        </button>
        <button 
          className="toolbar-btn"
          onClick={onShare}
          title="Share Code"
        >
          <Share size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;