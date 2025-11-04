# Online Code Editor with Live Preview

A modern, browser-based IDE for HTML, CSS, and JavaScript with real-time preview capabilities, enhanced with intelligent debugging and advanced code intelligence features.

## ✅ Core Features (Completed)

### 🎨 **Embedded Monaco Editor**
- ✅ **Monaco Editor embedded** for professional code input experience
- ✅ Full-featured code editor with syntax highlighting  
- ✅ Support for HTML, CSS, and JavaScript
- ✅ IntelliSense and auto-completion
- ✅ Multiple themes (light/dark)

### 🖥️ **Live Preview in iframe**
- ✅ **Code rendered inside secure iframe** for live preview
- ✅ Real-time code execution with instant updates
- ✅ Isolated execution environment  
- ✅ No page refresh needed
- ✅ Responsive preview pane

### 🎯 **Templates & Code Sharing**
- ✅ **Pre-built templates** for quick start (blank, flexbox, form examples)
- ✅ **Code sharing via URL** - shareable links with encoded code
- ✅ **Database-ready structure** for future cloud storage integration
- ✅ Easy template switching and management

### 📱 **Multiple Layout Views**
- ✅ **Side-by-side layout** (split view with editor + preview)
- ✅ **Full preview mode** for presentation and testing
- ✅ **Editor-only mode** for focused coding sessions
- ✅ Responsive design for mobile devices

### ☁️ **Cloud Storage Ready**
- ✅ **URL-based code persistence** (current implementation)
- ✅ **Export functionality** for downloading complete HTML files
- ✅ **Structured for cloud integration** (optional future enhancement)
- ✅ Shareable link generation with base64 encoding

### ⚙️ **Enhanced User Experience**
- ✅ Theme toggle (light/dark)
- ✅ Adjustable editor settings
- ✅ Responsive toolbar and interface
- ✅ Clean, modern design

## 🚀 Enhanced Features (Additional Implementation)

### 🧠 **Advanced Code Intelligence**
- ✅ **Real-time error detection and validation** for HTML, CSS, and JavaScript
- ✅ **Prettier code formatting** with one-click beautification
- ✅ **Enhanced IntelliSense** with DOM APIs and best practices
- ✅ **Template-specific validation** with contextual error checking
- ✅ **Comprehensive syntax validation** across all languages

### 🐛 **Intelligent Debugging Console**
- ✅ **Terminal-style console** for error and warning display
- ✅ **Error/Warning filtering** - separate views for different message types
- ✅ **Clickable error indicators** - click error badge to show issues in console
- ✅ **Auto-remove corrected errors** - console updates dynamically as you fix issues
- ✅ **Real-time console capture** from iframe preview
- ✅ **Timestamped messages** with severity icons

### 🎯 **Enhanced Error Management**  
- ✅ **Visual error indicators** in editor with error counts
- ✅ **Line-specific error reporting** with precise location details
- ✅ **Severity classification** - errors vs warnings vs info
- ✅ **Source attribution** - know which validator found each issue
- ✅ **Clean error presentation** - no popup panels, integrated console experience

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## 💡 Usage Guide

### **Basic Workflow**
1. **Select a template** from the dropdown or start with a blank canvas
2. **Choose your layout** using the toolbar buttons:
   - Split view for side-by-side editing and preview
   - Preview only for full-screen result viewing
   - Editor only for focused coding sessions
3. **Switch between tabs** (HTML, CSS, JavaScript) to edit different code sections
4. **See live results** in the preview pane with real-time updates

### **Advanced Debugging**
5. **Monitor errors** via the error indicator badge (shows count with ✓ when clean)
6. **Click error badge** to populate console with current issues
7. **Filter console output** between "Errors" and "Warnings" views  
8. **Watch console auto-update** as you fix issues in real-time
9. **Use formatting** (wand icon) to clean up code structure

### **Sharing & Export**
10. **Share your code** using the share button to generate shareable URLs
11. **Export your work** as a complete, standalone HTML file

## Project Structure

```
src/
├── components/
│   ├── CodeEditor.tsx    # Enhanced Monaco Editor with intelligence & error detection
│   ├── Preview.tsx       # Live preview iframe with console message capture
│   ├── Toolbar.tsx       # Navigation and layout controls
│   └── Console.tsx       # Terminal-style debugging console with filtering
├── config/
│   └── monacoConfig.ts   # Monaco Editor configuration with enhanced IntelliSense
├── services/
│   └── CodeIntelligenceService.ts # Comprehensive code validation and formatting
├── data/
│   └── templates.ts      # Pre-built code templates with examples
├── types/
│   └── index.ts         # TypeScript interfaces and type definitions
├── App.tsx              # Main application orchestrating all components
├── App.css              # Application styles with console and editor theming
└── main.tsx             # Application entry point
```

## 🛣️ Future Roadmap

### 📋 **Planned Enhancements**
- [ ] **Accessibility Validation** - WCAG compliance checking and suggestions  
- [ ] **SEO Optimization** - Meta tags, semantic HTML, and SEO best practices
- [ ] **Performance Warnings** - Bundle size analysis and optimization suggestions
- [ ] **Advanced Templates** - More complex examples (React components, API integration)
- [ ] **Multi-file Projects** - File explorer and project management
- [ ] **Version Control** - Git integration and history tracking

## 🛠️ Technologies Used

- **React 19** - Modern UI framework with hooks and context
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Lightning-fast build tool and development server
- **Monaco Editor** - VS Code's editor engine as a React component
- **Prettier** - Intelligent code formatting and beautification
- **ESLint** - Advanced code quality and error detection
- **Lucide React** - Beautiful, customizable SVG icon library
- **CSS3** - Modern styling with flexbox, grid, and custom properties

<img width="1512" height="982" alt="Screenshot 2025-11-04 at 9 30 17 PM" src="https://github.com/user-attachments/assets/6c7a3fae-f1fd-4e61-85d4-dd1d22f9a2a5" />
<img width="1512" height="982" alt="Screenshot 2025-11-04 at 9 30 32 PM" src="https://github.com/user-attachments/assets/92840360-c2e1-4c2d-93a3-7e3b4e921b0b" />
<img width="1512" height="982" alt="Screenshot 2025-11-04 at 9 30 41 PM" src="https://github.com/user-attachments/assets/491a03a9-8077-4740-aacd-29f7332e6c08" />
<img width="1512" height="982" alt="Screenshot 2025-11-04 at 9 30 49 PM" src="https://github.com/user-attachments/assets/2f66b52f-315e-40fb-9431-b8ed4a48a17e" />


## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

---

Built with ❤️ using React, Monaco Editor, and modern web technologies.
