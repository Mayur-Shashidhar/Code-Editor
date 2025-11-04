import * as monaco from 'monaco-editor';

// Simple and effective Monaco Editor configuration
export const configureMonacoEditor = () => {
  // Configure HTML language defaults
  monaco.languages.html.htmlDefaults.setOptions({
    format: {
      tabSize: 2,
      insertSpaces: true,
      wrapLineLength: 120,
      unformatted: 'default"',
      contentUnformatted: 'pre,code,textarea',
      indentInnerHtml: false,
      preserveNewLines: true,
      maxPreserveNewLines: undefined,
      indentHandlebars: false,
      endWithNewline: false,
      extraLiners: 'head, body, /html',
      wrapAttributes: 'auto'
    },
    suggest: {
      html5: true,
      angular1: false,
      ionic: false
    }
  });

  // Configure CSS language defaults with enhanced linting
  monaco.languages.css.cssDefaults.setOptions({
    validate: true,
    lint: {
      compatibleVendorPrefixes: 'warning',
      vendorPrefix: 'warning',
      duplicateProperties: 'warning',
      emptyRules: 'warning',
      importStatement: 'warning',
      boxModel: 'warning',
      universalSelector: 'ignore',
      zeroUnits: 'warning',
      fontFaceProperties: 'warning',
      hexColorLength: 'warning',
      argumentsInColorFunction: 'warning',
      unknownProperties: 'warning',
      ieHack: 'warning',
      unknownVendorSpecificProperties: 'ignore',
      propertyIgnoredDueToDisplay: 'warning',
      important: 'ignore',
      float: 'ignore',
      idSelector: 'ignore'
    }
  });

  // Configure JavaScript/TypeScript compiler options
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: 'React',
    allowJs: true,
    typeRoots: ['node_modules/@types']
  });

  // Enhanced diagnostics for JavaScript
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    noSuggestionDiagnostics: false
  });

  // Add extra libraries for enhanced IntelliSense
  monaco.languages.typescript.javascriptDefaults.addExtraLib(`
    declare var console: {
      log(...args: any[]): void;
      error(...args: any[]): void;
      warn(...args: any[]): void;
      info(...args: any[]): void;
    };
    
    declare var document: {
      getElementById(id: string): HTMLElement | null;
      querySelector(selector: string): Element | null;
      querySelectorAll(selector: string): NodeListOf<Element>;
      createElement(tagName: string): HTMLElement;
      addEventListener(type: string, listener: EventListener): void;
      removeEventListener(type: string, listener: EventListener): void;
    };
    
    declare var window: {
      addEventListener(type: string, listener: EventListener): void;
      removeEventListener(type: string, listener: EventListener): void;
      setTimeout(callback: Function, delay: number): number;
      clearTimeout(id: number): void;
      setInterval(callback: Function, delay: number): number;
      clearInterval(id: number): void;
    };
    
    declare function fetch(url: string, options?: any): Promise<Response>;
    
    interface Response {
      json(): Promise<any>;
      text(): Promise<string>;
      ok: boolean;
      status: number;
    }
  `, 'ts:lib.dom.d.ts');

  console.log('Monaco Editor configured successfully');
};

export default configureMonacoEditor;
