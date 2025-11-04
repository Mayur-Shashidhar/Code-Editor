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

## 📚 Top 50 Web Development Interview Questions & Answers

### HTML & Semantic Elements

**1. What is the difference between id and class in HTML?**
- **id**: Unique identifier for a single element, used for JavaScript targeting and CSS specificity. Only one per page.
- **class**: Can be applied to multiple elements, used for styling groups of elements with CSS.

**2. How do HTML5 semantic elements improve SEO and accessibility?**
- Semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`) provide meaning to content structure
- Screen readers understand content hierarchy better
- Search engines can better index and rank content
- Improves code readability and maintainability

### CSS Fundamentals

**3. What is the box model in CSS?**
The CSS box model consists of:
- **Content**: The actual content area
- **Padding**: Space between content and border
- **Border**: The border around padding
- **Margin**: Space outside the border

**4. How do you center a div using Flexbox?**
```css
.container {
  display: flex;
  justify-content: center; /* horizontal centering */
  align-items: center;     /* vertical centering */
  height: 100vh;          /* full viewport height */
}
```

**5. What's the difference between relative, absolute, and fixed positioning?**
- **Relative**: Positioned relative to its normal position
- **Absolute**: Positioned relative to the nearest positioned ancestor
- **Fixed**: Positioned relative to the viewport, stays in place when scrolling

**6. What is specificity in CSS and how is it calculated?**
CSS specificity determines which styles apply when multiple rules target the same element:
- Inline styles: 1000 points
- IDs: 100 points each
- Classes/attributes/pseudo-classes: 10 points each
- Elements/pseudo-elements: 1 point each

**7. What are media queries? Give an example.**
Media queries apply CSS based on device characteristics:
```css
@media screen and (max-width: 768px) {
  .container { width: 100%; }
}
@media print {
  .no-print { display: none; }
}
```

**8. What is the difference between em, rem, px, and % units?**
- **px**: Absolute unit, fixed size
- **em**: Relative to parent element's font size
- **rem**: Relative to root element's font size
- **%**: Relative to parent element's size

**9. How does z-index work in CSS?**
Z-index controls stacking order of positioned elements:
- Higher values appear on top
- Only works on positioned elements (relative, absolute, fixed, sticky)
- Creates stacking contexts

**10. What are pseudo-elements and pseudo-classes in CSS?**
- **Pseudo-classes**: Target element states (`:hover`, `:focus`, `:nth-child`)
- **Pseudo-elements**: Style parts of elements (`::before`, `::after`, `::first-line`)

### JavaScript Core Concepts

**11. What is hoisting in JavaScript?**
Hoisting moves variable and function declarations to the top of their scope:
```javascript
console.log(x); // undefined (not error)
var x = 5;

// Function declarations are fully hoisted
sayHello(); // Works!
function sayHello() { console.log('Hello'); }
```

**12. Explain the difference between == and ===.**
- **==**: Loose equality, performs type coercion
- **===**: Strict equality, no type coercion
```javascript
'5' == 5   // true (coercion)
'5' === 5  // false (different types)
```

**13. What is a closure? Provide an example.**
A closure gives access to an outer function's scope from an inner function:
```javascript
function outer(x) {
  return function inner(y) {
    return x + y; // inner has access to x
  };
}
const addFive = outer(5);
console.log(addFive(3)); // 8
```

**14. What are var, let, and const? Differences?**
- **var**: Function-scoped, hoisted, can be redeclared
- **let**: Block-scoped, not hoisted, can be reassigned
- **const**: Block-scoped, not hoisted, cannot be reassigned

**15. What is the event loop in JavaScript?**
The event loop manages asynchronous operations:
1. Call stack executes synchronous code
2. Web APIs handle async operations
3. Callback queue holds completed async callbacks
4. Event loop moves callbacks to call stack when empty

**16. Explain how 'this' keyword behaves in different contexts.**
- **Global context**: Window object (browser) or global (Node.js)
- **Method**: The object owning the method
- **Constructor**: The new instance being created
- **Arrow functions**: Inherit 'this' from enclosing scope

**17. What is the difference between synchronous and asynchronous code?**
- **Synchronous**: Blocks execution until complete
- **Asynchronous**: Non-blocking, uses callbacks, promises, or async/await

**18. What are promises and async/await?**
Promises handle asynchronous operations:
```javascript
// Promise
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));

// Async/await
async function getData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}
```

**19. What is debouncing and throttling?**
- **Debouncing**: Delays function execution until after a period of inactivity
- **Throttling**: Limits function execution to once per specified interval

**20. What is the difference between null and undefined?**
- **undefined**: Variable declared but not assigned a value
- **null**: Intentional absence of value, represents "no value"

### React Fundamentals

**21. What are React hooks? Name a few and their uses.**
Hooks let you use state and lifecycle in functional components:
- **useState**: Manages local component state
- **useEffect**: Handles side effects and lifecycle
- **useContext**: Consumes React context
- **useReducer**: Complex state management
- **useMemo**: Performance optimization with memoization

**22. Explain the difference between controlled and uncontrolled components.**
- **Controlled**: Form data handled by React state
- **Uncontrolled**: Form data handled by DOM, accessed via refs

**23. What is the virtual DOM and how does React use it?**
Virtual DOM is a JavaScript representation of the real DOM:
- React creates virtual DOM tree in memory
- Compares (diffs) new virtual DOM with previous version
- Updates only changed parts in real DOM (reconciliation)

**24. What are props and state in React?**
- **Props**: Read-only data passed from parent to child components
- **State**: Mutable data managed within a component

**25. How does lifting state up work in React?**
Move shared state to the closest common parent component:
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Child1 count={count} />
      <Child2 setCount={setCount} />
    </div>
  );
}
```

**26. What are keys in React and why are they important?**
Keys help React identify which items have changed:
- Must be unique among siblings
- Help React optimize re-rendering
- Should be stable and predictable

**27. What is the difference between useEffect and useLayoutEffect?**
- **useEffect**: Runs after DOM mutations, asynchronous
- **useLayoutEffect**: Runs synchronously after all DOM mutations

**28. How does React handle reconciliation and re-rendering?**
React uses a diffing algorithm:
1. Compares new virtual DOM with previous version
2. Identifies minimum changes needed
3. Updates only changed components and their children
4. Uses keys and component types for optimization

**29. What is context API and when would you use it?**
Context provides a way to pass data through component tree without props drilling:
```javascript
const ThemeContext = createContext();
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
    </ThemeContext.Provider>
  );
}
```

**30. What are higher-order components (HOC)?**
HOCs are functions that take a component and return an enhanced component:
```javascript
function withLoading(Component) {
  return function WithLoadingComponent(props) {
    if (props.loading) return <div>Loading...</div>;
    return <Component {...props} />;
  };
}
```

### Node.js & Backend

**31. What is Node.js and how is it different from the browser environment?**
Node.js is a JavaScript runtime for server-side development:
- Uses V8 engine but runs outside browser
- Has access to file system, networking, OS APIs
- No DOM, window object, or browser-specific APIs
- Uses CommonJS modules (require/exports)

**32. What are middleware functions in Express.js?**
Functions that execute during request-response cycle:
```javascript
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next(); // Pass control to next middleware
});
```

**33. How does the event-driven model work in Node.js?**
Node.js uses an event-driven, non-blocking I/O model:
- Single-threaded event loop
- Callbacks handle asynchronous operations
- Events trigger registered listeners
- Efficient for I/O-intensive applications

**34. What are the benefits of using Express.js?**
- Minimal and flexible Node.js web framework
- Robust routing system
- Middleware support
- Template engine integration
- Static file serving
- HTTP utility methods

**35. How do you handle errors in Node.js?**
```javascript
// Try-catch for synchronous errors
try {
  const data = JSON.parse(invalidJSON);
} catch (error) {
  console.error(error);
}

// Error-first callbacks
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Promise rejection
promise.catch(error => console.error(error));
```

**36. What is the role of package.json?**
Manifest file for Node.js projects:
- Lists dependencies and devDependencies
- Defines scripts (start, test, build)
- Contains project metadata
- Specifies Node.js version compatibility

**37. What are the different types of HTTP methods and their use cases?**
- **GET**: Retrieve data (idempotent, cacheable)
- **POST**: Create new resources
- **PUT**: Update/replace entire resource
- **PATCH**: Partial resource updates
- **DELETE**: Remove resources
- **HEAD**: Get headers only
- **OPTIONS**: Check allowed methods

**38. What are streams in Node.js?**
Streams handle data in chunks rather than loading everything into memory:
- **Readable**: Read data (fs.createReadStream)
- **Writable**: Write data (fs.createWriteStream)
- **Duplex**: Both readable and writable
- **Transform**: Modify data as it passes through

**39. What is the difference between require and import?**
- **require**: CommonJS syntax, synchronous loading
- **import**: ES6 modules, supports tree-shaking, static analysis

**40. How do you manage environment variables in Node.js?**
```javascript
// Using dotenv package
require('dotenv').config();
const dbUrl = process.env.DATABASE_URL;

// Direct access
const port = process.env.PORT || 3000;
```

### Database & API Concepts

**41. What is the difference between SQL and NoSQL databases?**
- **SQL**: Structured, ACID compliance, schema-based (MySQL, PostgreSQL)
- **NoSQL**: Flexible schema, horizontal scaling, various types (MongoDB, Redis)

**42. What are CRUD operations?**
- **Create**: Add new records (INSERT, POST)
- **Read**: Retrieve data (SELECT, GET)
- **Update**: Modify existing records (UPDATE, PUT/PATCH)
- **Delete**: Remove records (DELETE)

**43. What is REST and what are its key principles?**
Representational State Transfer architecture:
- Stateless communication
- Uniform interface
- Client-server separation
- Cacheable responses
- Layered system
- Resource-based URLs

**44. What is the difference between PUT and PATCH methods?**
- **PUT**: Replaces entire resource (idempotent)
- **PATCH**: Partial updates to resource

**45. What are status codes in HTTP and what do 200, 404, 500 mean?**
- **200**: OK - Request successful
- **404**: Not Found - Resource doesn't exist
- **500**: Internal Server Error - Server-side error
- **201**: Created, **401**: Unauthorized, **403**: Forbidden

**46. How do you secure a REST API?**
- Authentication (JWT, OAuth)
- HTTPS encryption
- Input validation and sanitization
- Rate limiting
- CORS configuration
- API versioning

**47. What is CORS and how do you handle it?**
Cross-Origin Resource Sharing allows controlled access to resources:
```javascript
app.use(cors({
  origin: 'https://myapp.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
```

**48. What is indexing in databases and why is it important?**
Database indexes improve query performance:
- Create data structure for fast lookups
- Trade storage space for query speed
- Crucial for WHERE, ORDER BY, JOIN operations
- Should be used strategically (not on every column)

**49. What is JWT and how does it work for authentication?**
JSON Web Token for stateless authentication:
- Header: Algorithm and token type
- Payload: Claims/data
- Signature: Verification hash
- Self-contained, no server-side storage needed

**50. How do you structure a RESTful API?**
```
GET    /api/users          # Get all users
GET    /api/users/:id      # Get specific user
POST   /api/users          # Create user
PUT    /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user
```

---

Built with ❤️ using React, Monaco Editor, and modern web technologies.
