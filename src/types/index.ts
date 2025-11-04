export interface CodeSnippet {
  html: string;
  css: string;
  javascript: string;
}

export type Language = 'html' | 'css' | 'javascript';

export type LayoutView = 'split' | 'preview' | 'editor';

export interface Template {
  id: string;
  name: string;
  description: string;
  code: CodeSnippet;
}

export interface EditorSettings {
  theme: 'vs-light' | 'vs-dark';
  fontSize: number;
  wordWrap: 'off' | 'on';
  minimap: boolean;
}