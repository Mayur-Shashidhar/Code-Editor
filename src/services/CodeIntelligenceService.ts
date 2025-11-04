import * as prettier from 'prettier';
import parserHtml from 'prettier/parser-html';
import parserCss from 'prettier/parser-postcss';
import parserBabel from 'prettier/parser-babel';

export interface CodeError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
  source: string;
}

export class CodeIntelligenceService {
  private static instance: CodeIntelligenceService;
  
  public static getInstance(): CodeIntelligenceService {
    if (!CodeIntelligenceService.instance) {
      CodeIntelligenceService.instance = new CodeIntelligenceService();
    }
    return CodeIntelligenceService.instance;
  }

  // Format code using Prettier
  async formatCode(code: string, language: 'html' | 'css' | 'javascript'): Promise<string> {
    try {
      let parser: string;
      let plugins: any[];

      switch (language) {
        case 'html':
          parser = 'html';
          plugins = [parserHtml];
          break;
        case 'css':
          parser = 'css';
          plugins = [parserCss];
          break;
        case 'javascript':
          parser = 'babel';
          plugins = [parserBabel];
          break;
        default:
          return code;
      }

      const formatted = await prettier.format(code, {
        parser,
        plugins,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        trailingComma: 'es5',
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'avoid',
        htmlWhitespaceSensitivity: 'css',
      });

      return formatted;
    } catch (error) {
      console.error('Formatting error:', error);
      return code; // Return original code if formatting fails
    }
  }

  // Enhanced HTML validation
  validateHTML(code: string): CodeError[] {
    const errors: CodeError[] = [];
    const lines = code.split('\n');

    // Check for basic HTML structure
    if (!code.includes('<!DOCTYPE html>')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Missing DOCTYPE declaration - add <!DOCTYPE html>',
        severity: 'warning',
        source: 'html-validator'
      });
    }

    // Check for HTML5 structure
    const hasHtml = code.includes('<html');
    const hasHead = code.includes('<head');
    const hasBody = code.includes('<body');
    
    if (!hasHtml) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Missing <html> element',
        severity: 'error',
        source: 'html-structure'
      });
    }
    
    if (!hasHead) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Missing <head> element',
        severity: 'error',
        source: 'html-structure'
      });
    }
    
    if (!hasBody) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Missing <body> element',
        severity: 'error',
        source: 'html-structure'
      });
    }

    // Check for meta viewport (mobile responsiveness)
    if (!code.includes('name="viewport"')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Missing viewport meta tag for mobile responsiveness',
        severity: 'info',
        source: 'html-best-practices'
      });
    }

    // Check for charset declaration
    if (!code.includes('charset=')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Missing charset declaration',
        severity: 'warning',
        source: 'html-best-practices'
      });
    }

    // Check for title tag
    if (!code.includes('<title>')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Missing <title> element',
        severity: 'warning',
        source: 'html-seo'
      });
    }

    // Enhanced tag validation
    const tagStack: Array<{ tag: string; line: number }> = [];
    const selfClosingTags = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr']);
    const deprecatedTags = new Set(['center', 'font', 'marquee', 'blink', 'big', 'small', 'tt']);
    const requiredAttributes = {
      'img': ['src', 'alt'],
      'a': ['href'],
      'input': ['type'],
      'label': ['for'],
      'form': ['action']
    };

    lines.forEach((line, lineIndex) => {
      const trimmedLine = line.trim();
      
      // Check for inline styles (suggest CSS instead)
      if (trimmedLine.includes('style=')) {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf('style=') + 1,
          message: 'Consider using CSS classes instead of inline styles',
          severity: 'info',
          source: 'html-best-practices'
        });
      }

      // Check for deprecated attributes
      if (trimmedLine.includes('align=') || trimmedLine.includes('bgcolor=') || trimmedLine.includes('border=')) {
        errors.push({
          line: lineIndex + 1,
          column: 1,
          message: 'Deprecated HTML attribute detected - use CSS instead',
          severity: 'warning',
          source: 'html-deprecated'
        });
      }

      const tagMatches = line.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g);
      
      for (const match of tagMatches) {
        const fullTag = match[0];
        const tagName = match[1].toLowerCase();
        
        // Check for deprecated tags
        if (deprecatedTags.has(tagName)) {
          errors.push({
            line: lineIndex + 1,
            column: match.index! + 1,
            message: `Deprecated HTML tag <${tagName}> - consider modern alternatives`,
            severity: 'warning',
            source: 'html-deprecated'
          });
        }

        // Check required attributes
        if (requiredAttributes[tagName as keyof typeof requiredAttributes] && !fullTag.startsWith('</')) {
          const required = requiredAttributes[tagName as keyof typeof requiredAttributes];
          required.forEach(attr => {
            if (!fullTag.includes(`${attr}=`)) {
              errors.push({
                line: lineIndex + 1,
                column: match.index! + 1,
                message: `Missing required attribute '${attr}' for <${tagName}> tag`,
                severity: 'error',
                source: 'html-accessibility'
              });
            }
          });
        }

        // Tag matching logic
        if (fullTag.startsWith('</')) {
          const lastOpenTag = tagStack.pop();
          if (!lastOpenTag || lastOpenTag.tag !== tagName) {
            errors.push({
              line: lineIndex + 1,
              column: match.index! + 1,
              message: `Unexpected closing tag </${tagName}>`,
              severity: 'error',
              source: 'html-validator'
            });
          }
        } else if (!selfClosingTags.has(tagName) && !fullTag.endsWith('/>')) {
          tagStack.push({ tag: tagName, line: lineIndex + 1 });
        }
      }

      // Check for accessibility issues
      if (trimmedLine.includes('<img') && !trimmedLine.includes('alt=')) {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf('<img') + 1,
          message: 'Image missing alt attribute for accessibility',
          severity: 'warning',
          source: 'html-accessibility'
        });
      }

      // Check for empty links
      if (trimmedLine.includes('<a') && !trimmedLine.includes('href=')) {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf('<a') + 1,
          message: 'Link missing href attribute',
          severity: 'warning',
          source: 'html-accessibility'
        });
      }
    });

    // Report unclosed tags
    tagStack.forEach(({ tag, line }) => {
      errors.push({
        line,
        column: 1,
        message: `Unclosed tag <${tag}>`,
        severity: 'error',
        source: 'html-validator'
      });
    });

    return errors;
  }

  // Enhanced CSS validation
  validateCSS(code: string): CodeError[] {
    const errors: CodeError[] = [];
    const lines = code.split('\n');

    let braceCount = 0;
    let inSelector = false;
    
    // CSS properties that commonly cause issues
    const deprecatedProperties = new Set(['filter', '-webkit-filter', '-moz-filter']);
    const vendorPrefixes = ['-webkit-', '-moz-', '-ms-', '-o-'];
    
    lines.forEach((line, lineIndex) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('/*')) {
        return;
      }

      // Check for // comments (not valid in CSS)
      if (trimmedLine.includes('//')) {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf('//') + 1,
          message: 'Use /* */ for CSS comments, not //',
          severity: 'error',
          source: 'css-syntax'
        });
      }

      // Count braces
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      
      braceCount += openBraces - closeBraces;

      // Property validation
      if (braceCount > 0 && !inSelector && trimmedLine.includes(':')) {
        const colonIndex = trimmedLine.indexOf(':');
        const property = trimmedLine.substring(0, colonIndex).trim();
        const value = trimmedLine.substring(colonIndex + 1).replace(';', '').trim();

        // Check for missing semicolon
        if (!trimmedLine.endsWith(';') && !trimmedLine.endsWith('{') && !trimmedLine.endsWith('}')) {
          errors.push({
            line: lineIndex + 1,
            column: line.length,
            message: 'Missing semicolon',
            severity: 'warning',
            source: 'css-syntax'
          });
        }

        // Check for deprecated properties
        if (deprecatedProperties.has(property)) {
          errors.push({
            line: lineIndex + 1,
            column: 1,
            message: `Property '${property}' is deprecated`,
            severity: 'warning',
            source: 'css-deprecated'
          });
        }

        // Check for vendor prefixes without standard property
        const hasVendorPrefix = vendorPrefixes.some(prefix => property.startsWith(prefix));
        if (hasVendorPrefix) {
          const standardProperty = property.replace(/^-\w+-/, '');
          const hasStandard = lines.some(l => l.includes(`${standardProperty}:`));
          if (!hasStandard) {
            errors.push({
              line: lineIndex + 1,
              column: 1,
              message: `Consider adding standard property '${standardProperty}' after vendor prefix`,
              severity: 'info',
              source: 'css-best-practices'
            });
          }
        }

        // Value validation
        if (value) {
          // Check for invalid color values
          if (property.includes('color') || property.includes('background')) {
            if (value.startsWith('#') && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
              errors.push({
                line: lineIndex + 1,
                column: colonIndex + 2,
                message: 'Invalid hex color format',
                severity: 'error',
                source: 'css-validator'
              });
            }
          }

          // Check for missing units on numeric values
          const numericValue = value.match(/^\d+$/);
          if (numericValue && !['0', 'z-index', 'opacity', 'font-weight', 'line-height', 'flex'].some(prop => 
            property.includes(prop))) {
            errors.push({
              line: lineIndex + 1,
              column: colonIndex + 2,
              message: 'Numeric value should include a unit (px, em, %, etc.)',
              severity: 'warning',
              source: 'css-best-practices'
            });
          }

          // Check for performance issues
          if (property === 'position' && value === 'absolute') {
            errors.push({
              line: lineIndex + 1,
              column: 1,
              message: 'Consider using flexbox or grid instead of absolute positioning when possible',
              severity: 'info',
              source: 'css-performance'
            });
          }

          // Check for accessibility issues
          if (property === 'font-size' && value.includes('px') && parseInt(value) < 12) {
            errors.push({
              line: lineIndex + 1,
              column: colonIndex + 2,
              message: 'Font size below 12px may cause accessibility issues',
              severity: 'warning',
              source: 'css-accessibility'
            });
          }
        }
      }

      // Check for selector best practices
      if (trimmedLine.endsWith('{') && braceCount === 1) {
        const selector = trimmedLine.replace('{', '').trim();
        
        // Warn about overly specific selectors
        const selectorComplexity = (selector.match(/[ >+~]/g) || []).length;
        if (selectorComplexity > 3) {
          errors.push({
            line: lineIndex + 1,
            column: 1,
            message: 'Overly complex selector - consider simplifying',
            severity: 'info',
            source: 'css-best-practices'
          });
        }

        // Check for universal selector
        if (selector.includes('*')) {
          errors.push({
            line: lineIndex + 1,
            column: selector.indexOf('*') + 1,
            message: 'Universal selector (*) can impact performance',
            severity: 'info',
            source: 'css-performance'
          });
        }

        // Check for !important
        if (selector.includes('!important')) {
          errors.push({
            line: lineIndex + 1,
            column: selector.indexOf('!important') + 1,
            message: 'Avoid using !important - restructure CSS instead',
            severity: 'warning',
            source: 'css-best-practices'
          });
        }
      }

      if (openBraces > 0) inSelector = false;
      if (closeBraces > 0) inSelector = true;
    });

    // Check for unmatched braces
    if (braceCount !== 0) {
      errors.push({
        line: lines.length,
        column: 1,
        message: 'Unmatched braces in CSS',
        severity: 'error',
        source: 'css-validator'
      });
    }

    // Check for missing CSS reset or normalize
    if (!code.includes('box-sizing') && !code.includes('margin: 0') && !code.includes('padding: 0')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Consider adding CSS reset or normalize.css for cross-browser consistency',
        severity: 'info',
        source: 'css-best-practices'
      });
    }

    return errors;
  }

  // Enhanced JavaScript validation and linting
  validateJavaScript(code: string): CodeError[] {
    const errors: CodeError[] = [];
    const lines = code.split('\n');
    
    // Basic syntax checking first
    try {
      new Function(code);
    } catch (error: any) {
      const errorMessage = error.message;
      let line = 1;
      let column = 1;

      // Try to extract line number from error message
      const lineMatch = errorMessage.match(/line (\d+)/);
      if (lineMatch) {
        line = parseInt(lineMatch[1]);
      }

      errors.push({
        line,
        column,
        message: errorMessage,
        severity: 'error',
        source: 'js-syntax'
      });
    }

    // Enhanced linting checks
    lines.forEach((line, lineIndex) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('//') || trimmedLine.startsWith('/*')) {
        return;
      }

      // Check for var usage (suggest let/const)
      if (trimmedLine.includes('var ')) {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf('var ') + 1,
          message: 'Use "let" or "const" instead of "var" for better scoping',
          severity: 'warning',
          source: 'js-best-practices'
        });
      }

      // Check for == instead of ===
      if (trimmedLine.includes('==') && !trimmedLine.includes('===') && !trimmedLine.includes('!==')) {
        const eqIndex = line.indexOf('==');
        if (eqIndex > -1 && line[eqIndex - 1] !== '!' && line[eqIndex + 2] !== '=') {
          errors.push({
            line: lineIndex + 1,
            column: eqIndex + 1,
            message: 'Use "===" for strict equality comparison',
            severity: 'warning',
            source: 'js-best-practices'
          });
        }
      }

      // Check for console.log in production code
      if (trimmedLine.includes('console.log')) {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf('console.log') + 1,
          message: 'Remove console.log statements before production',
          severity: 'info',
          source: 'js-production'
        });
      }

      // Check for eval usage (security risk)
      if (trimmedLine.includes('eval(')) {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf('eval(') + 1,
          message: 'Avoid using eval() - it poses security risks',
          severity: 'error',
          source: 'js-security'
        });
      }

      // Check for global variables
      if (trimmedLine.match(/^(let|const|var)\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*=/) && 
          !code.includes('function') && !code.includes('{')) {
        errors.push({
          line: lineIndex + 1,
          column: 1,
          message: 'Avoid global variables - use modules or IIFE',
          severity: 'warning',
          source: 'js-best-practices'
        });
      }

      // Check for missing semicolons
      if (trimmedLine.length > 0 && 
          !trimmedLine.endsWith(';') && 
          !trimmedLine.endsWith('{') && 
          !trimmedLine.endsWith('}') && 
          !trimmedLine.startsWith('if') &&
          !trimmedLine.startsWith('for') &&
          !trimmedLine.startsWith('while') &&
          !trimmedLine.startsWith('function') &&
          !trimmedLine.startsWith('class') &&
          !trimmedLine.includes('//') &&
          trimmedLine.includes('=')) {
        errors.push({
          line: lineIndex + 1,
          column: line.length,
          message: 'Missing semicolon',
          severity: 'warning',
          source: 'js-syntax'
        });
      }

      // Check for function declarations vs expressions
      if (trimmedLine.startsWith('function ')) {
        errors.push({
          line: lineIndex + 1,
          column: 1,
          message: 'Consider using arrow functions or const function expressions',
          severity: 'info',
          source: 'js-modern'
        });
      }

      // Check for jQuery usage
      if (trimmedLine.includes('$') || trimmedLine.includes('jQuery')) {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf('$') || line.indexOf('jQuery'),
          message: 'Consider using modern DOM APIs instead of jQuery',
          severity: 'info',
          source: 'js-modern'
        });
      }

      // Check for deprecated DOM methods
      if (trimmedLine.includes('.innerHTML =')) {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf('.innerHTML') + 1,
          message: 'Consider using textContent or modern DOM methods for security',
          severity: 'warning',
          source: 'js-security'
        });
      }

      // Check for missing error handling in async operations
      if (trimmedLine.includes('fetch(') || trimmedLine.includes('.then(')) {
        if (!code.includes('.catch(') && !code.includes('try')) {
          errors.push({
            line: lineIndex + 1,
            column: 1,
            message: 'Add error handling for async operations',
            severity: 'warning',
            source: 'js-error-handling'
          });
        }
      }

      // Check for performance issues
      if (trimmedLine.includes('document.getElementById') && 
          lines.filter(l => l.includes('document.getElementById')).length > 3) {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf('document.getElementById') + 1,
          message: 'Consider caching DOM queries for better performance',
          severity: 'info',
          source: 'js-performance'
        });
      }

      // Check for accessibility issues
      if (trimmedLine.includes('.onclick =') || trimmedLine.includes('onclick=')) {
        errors.push({
          line: lineIndex + 1,
          column: 1,
          message: 'Use addEventListener instead of onclick for better accessibility',
          severity: 'warning',
          source: 'js-accessibility'
        });
      }

      // Check for missing const/let declarations
      const assignmentMatch = trimmedLine.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/);
      if (assignmentMatch && 
          !trimmedLine.includes('let ') && 
          !trimmedLine.includes('const ') && 
          !trimmedLine.includes('var ') &&
          !trimmedLine.includes('.') &&
          !assignmentMatch[1].includes('this.')) {
        errors.push({
          line: lineIndex + 1,
          column: 1,
          message: `Variable "${assignmentMatch[1]}" should be declared with let, const, or var`,
          severity: 'error',
          source: 'js-variables'
        });
      }
    });

    // Check for unused variables (simple detection)
    const declarations = code.match(/(let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
    if (declarations) {
      declarations.forEach(decl => {
        const varName = decl.split(/\s+/)[1];
        const usageCount = (code.match(new RegExp(`\\b${varName}\\b`, 'g')) || []).length;
        if (usageCount === 1) { // Only declaration, no usage
          const lineIndex = lines.findIndex(line => line.includes(decl));
          if (lineIndex !== -1) {
            errors.push({
              line: lineIndex + 1,
              column: 1,
              message: `Unused variable: ${varName}`,
              severity: 'warning',
              source: 'js-unused'
            });
          }
        }
      });
    }

    return errors;
  }

  // Template-specific validation
  validateTemplate(templateType: string, code: { html: string; css: string; javascript: string }): CodeError[] {
    const errors: CodeError[] = [];

    switch (templateType) {
      case 'flexbox-layout':
        errors.push(...this.validateFlexboxTemplate(code));
        break;
      case 'interactive-form':
        errors.push(...this.validateFormTemplate(code));
        break;
      case 'blank':
        errors.push(...this.validateBlankTemplate(code));
        break;
      default:
        // Generic validation for custom templates
        errors.push(...this.validateGenericTemplate(code));
    }

    return errors;
  }

  private validateFlexboxTemplate(code: { html: string; css: string; javascript: string }): CodeError[] {
    const errors: CodeError[] = [];

    // Check if CSS contains flexbox properties
    if (!code.css.includes('display: flex') && !code.css.includes('display:flex')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Flexbox template should use "display: flex"',
        severity: 'warning',
        source: 'template-flexbox'
      });
    }

    // Check for responsive design
    if (!code.css.includes('@media')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Consider adding media queries for responsive design',
        severity: 'info',
        source: 'template-responsive'
      });
    }

    // Check for flex properties
    const flexProperties = ['justify-content', 'align-items', 'flex-direction', 'flex-wrap'];
    const missingProperties = flexProperties.filter(prop => !code.css.includes(prop));
    
    if (missingProperties.length > 0) {
      errors.push({
        line: 1,
        column: 1,
        message: `Consider using flexbox properties: ${missingProperties.join(', ')}`,
        severity: 'info',
        source: 'template-flexbox'
      });
    }

    return errors;
  }

  private validateFormTemplate(code: { html: string; css: string; javascript: string }): CodeError[] {
    const errors: CodeError[] = [];

    // Check for form element
    if (!code.html.includes('<form')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Form template should contain a <form> element',
        severity: 'error',
        source: 'template-form'
      });
    }

    // Check for form validation
    if (!code.javascript.includes('addEventListener') && !code.javascript.includes('onsubmit')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Form should have JavaScript validation',
        severity: 'warning',
        source: 'template-form'
      });
    }

    // Check for accessibility labels
    if (code.html.includes('<input') && !code.html.includes('<label')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Form inputs should have associated labels for accessibility',
        severity: 'warning',
        source: 'template-accessibility'
      });
    }

    // Check for required attributes
    if (code.html.includes('<input') && !code.html.includes('required')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Consider adding "required" attribute to mandatory form fields',
        severity: 'info',
        source: 'template-form'
      });
    }

    return errors;
  }

  private validateBlankTemplate(code: { html: string; css: string; javascript: string }): CodeError[] {
    const errors: CodeError[] = [];

    // Check for basic HTML structure in blank template
    if (!code.html.includes('<!DOCTYPE html>')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Add HTML5 DOCTYPE declaration',
        severity: 'warning',
        source: 'template-structure'
      });
    }

    // Suggest adding viewport meta tag
    if (!code.html.includes('viewport')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Add viewport meta tag for mobile responsiveness',
        severity: 'info',
        source: 'template-mobile'
      });
    }

    // Basic CSS suggestions
    if (code.css.trim().length < 50) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Consider adding CSS reset (margin: 0, padding: 0, box-sizing: border-box)',
        severity: 'info',
        source: 'template-css'
      });
    }

    return errors;
  }

  private validateGenericTemplate(code: { html: string; css: string; javascript: string }): CodeError[] {
    const errors: CodeError[] = [];

    // SEO checks
    if (!code.html.includes('<title>') || code.html.includes('<title></title>')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Add a descriptive title for SEO',
        severity: 'warning',
        source: 'template-seo'
      });
    }

    // Performance checks
    if (code.css.length > 5000) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Large CSS file - consider splitting or minifying',
        severity: 'info',
        source: 'template-performance'
      });
    }

    if (code.javascript.length > 10000) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Large JavaScript file - consider modularization',
        severity: 'info',
        source: 'template-performance'
      });
    }

    // Modern web standards
    if (!code.html.includes('lang=')) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Add lang attribute to html element for accessibility',
        severity: 'warning',
        source: 'template-accessibility'
      });
    }

    return errors;
  }

  // Get enhanced auto-completion suggestions
  getCompletionItems(language: 'html' | 'css' | 'javascript', context: string): any[] {
    const suggestions: any[] = [];

    switch (language) {
      case 'html':
        return this.getHTMLCompletions(context);
      case 'css':
        return this.getCSSCompletions(context);
      case 'javascript':
        return this.getJSCompletions(context);
      default:
        return suggestions;
    }
  }

  private getHTMLCompletions(_context: string): any[] {
    const htmlTags = [
      'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'header', 'nav', 'main', 'section', 'article', 'aside', 'footer',
      'ul', 'ol', 'li', 'dl', 'dt', 'dd',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'form', 'input', 'textarea', 'select', 'option', 'button', 'label',
      'img', 'figure', 'figcaption', 'picture', 'source',
      'a', 'strong', 'em', 'mark', 'small', 'del', 'ins', 'sub', 'sup'
    ];

    return htmlTags.map(tag => ({
      label: tag,
      kind: 1, // CompletionItemKind.Text
      insertText: `<${tag}>$0</${tag}>`,
      insertTextRules: 4, // InsertTextRule.InsertAsSnippet
      documentation: `HTML ${tag} element`
    }));
  }

  private getCSSCompletions(_context: string): any[] {
    const cssProperties = [
      'display', 'position', 'top', 'right', 'bottom', 'left',
      'width', 'height', 'max-width', 'min-width', 'max-height', 'min-height',
      'margin', 'padding', 'border', 'border-radius',
      'background', 'background-color', 'background-image', 'background-size',
      'color', 'font-family', 'font-size', 'font-weight', 'line-height',
      'text-align', 'text-decoration', 'text-transform',
      'flex', 'flex-direction', 'justify-content', 'align-items', 'gap',
      'grid', 'grid-template-columns', 'grid-template-rows', 'grid-gap',
      'transition', 'transform', 'animation', 'opacity', 'z-index'
    ];

    return cssProperties.map(property => ({
      label: property,
      kind: 10, // CompletionItemKind.Property
      insertText: `${property}: $0;`,
      insertTextRules: 4,
      documentation: `CSS ${property} property`
    }));
  }

  private getJSCompletions(_context: string): any[] {
    const jsKeywords = [
      'console.log', 'document.getElementById', 'document.querySelector',
      'document.querySelectorAll', 'addEventListener', 'removeEventListener',
      'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
      'fetch', 'async', 'await', 'Promise', 'Array', 'Object',
      'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'switch'
    ];

    return jsKeywords.map(keyword => ({
      label: keyword,
      kind: 14, // CompletionItemKind.Keyword
      insertText: keyword.includes('(') ? `${keyword}($0)` : keyword,
      insertTextRules: 4,
      documentation: `JavaScript ${keyword}`
    }));
  }
}