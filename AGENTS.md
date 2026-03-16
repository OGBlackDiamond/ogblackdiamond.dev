# Agent Guidelines for ogblackdiamond.dev

This document provides coding agents with essential information about this React + Vite project.

## Project Overview

- **Type**: React 19 web application with Motion animations
- **Build Tool**: Vite 7.1.2
- **Language**: JavaScript (JSX)
- **Animation**: Motion 12.23.12 (successor to Framer Motion)
- **Routing**: React Router DOM 7.8.2 (available but not currently used)

## Commands

### Development
```bash
npm run dev          # Start dev server (default: http://localhost:5173)
npm run build        # Production build (outputs to dist/)
npm run preview      # Preview production build
npm run lint         # Run ESLint on all JS/JSX files
```

### Testing
**No testing framework is currently configured.** Consider adding Vitest if tests are needed:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Running Single Files
For quick tests of individual components, you can:
1. Import and render the component in `main.jsx`
2. Use the dev server hot reload to see changes instantly
3. No separate test runner is configured

## Code Style Guidelines

### Language & Formatting

- **No semicolons** - this project consistently omits semicolons
- **Double quotes** for strings (`"hello"` not `'hello'`)
- **4-space indentation** (not tabs)
- **ES6+ syntax**: arrow functions, destructuring, spread operators
- **ESLint**: v9 flat config (eslint.config.js)
  - ECMAScript 2020 target
  - Browser globals enabled

### Imports

**Order and style:**
```javascript
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion } from "motion/react"
import App from './App.jsx'
import SnakeBody from './Components/SnakeBody.jsx'
```

**Rules:**
- React imports first, then third-party libraries, then local components
- Always include `.jsx` extension for local component imports
- Named imports use curly braces: `{ useState }`
- Default imports without braces: `import App from './App.jsx'`
- Motion library: import from `"motion/react"` (not `"framer-motion"`)

### Components

**Structure:**
```javascript
function ComponentName({prop1, prop2, ...props}) {
    const [state, setState] = useState(initialValue)
    
    return (
        <div>
            {/* JSX content */}
        </div>
    )
}

export default ComponentName
```

**Conventions:**
- Use **function components only** (no class components)
- **PascalCase** for component names: `App`, `Button`, `SnakeBody`
- **PascalCase** for component filenames: `App.jsx`, `SnakeBody.jsx`
- Props destructuring in function parameters with rest spread when needed
- Export default at end of file

### Naming Conventions

- **Components**: PascalCase (`App`, `SnakeBody`)
- **Files**: PascalCase.jsx for components
- **Variables**: camelCase (`apps`, `updateApps`, `xi`, `yi`)
- **Constants**: camelCase (UPPER_CASE not currently used)
- **Functions**: camelCase (`setX`, `setY`)
- **Directories**: PascalCase for component folders (`Components/`)

### State Management

Use React hooks:
```javascript
const [value, setValue] = useState(initialValue)
```

**Naming pattern:** `[noun, setNoun]` or `[noun, updateNoun]`
- Prefer `set` prefix: `setX`, `setY`
- Alternative `update` prefix: `updateApps`

### Styling

**Inline styles with JavaScript objects:**
```javascript
<motion.div 
    style={{
        width: "100px",
        height: "100px",
        backgroundColor: "darkgreen",
        x: xi,
        y: yi,
        borderRadius: "20%"
    }}
/>
```

**CSS property format:**
- Use camelCase: `backgroundColor` not `background-color`
- String values with units: `"100px"`, `"20%"`
- No external CSS files in this project
- Motion-specific props (x, y) can be in style object

### Motion/Animation Patterns

**Import motion:**
```javascript
import { motion } from "motion/react"
```

**Common patterns:**
```javascript
<motion.div
    initial={{ y: 10 }}              // Starting state
    animate={{ x: x, y: y }}         // Animated state
    whileHover={{ scale: 1.1 }}      // Hover effects
    whileTap={{ scale: 0.9 }}        // Click effects
    transition={{ duration: 2, ease: "linear" }}
/>
```

### Props and Types

**No TypeScript** - this project uses JavaScript only.

**Props destructuring:**
```javascript
function Component({xi, yi, ...props}) {
    // Use xi, yi directly
    // Spread remaining props if needed: {...props}
}
```

### Error Handling

No specific error handling patterns are established yet. Standard React error boundaries should be used for production:
```javascript
// Add error boundaries when needed for production
```

### Keys in Lists

**CRITICAL:** Use stable, unique keys - never `Math.random()`:
```javascript
// BAD (currently in codebase - needs fixing):
{apps.map(app => <SnakeBody key={Math.random()} />)}

// GOOD:
{apps.map((app, index) => <SnakeBody key={`snake-${index}`} />)}
// Or better with unique IDs:
{apps.map(app => <SnakeBody key={app.id} />)}
```

### ESLint Rules

- `no-unused-vars`: Error, but allows unused variables starting with uppercase or underscore (`^[A-Z_]`)
- React Hooks rules: `recommended-latest` config
- React Refresh: Vite config for fast refresh

### Git Commits

Current style is informal and lowercase:
```
added lots of cool stuff
created project
```

For better practices, consider:
- Lowercase, present tense: "add feature" not "Added feature"
- Brief but descriptive: what and why
- Keep under 72 characters for first line

## Project Structure

```
ogblackdiamond.dev/
├── src/
│   ├── Components/     # React components (organized)
│   ├── assets/         # Static assets (images, fonts)
│   ├── App.jsx         # Example component (not currently used)
│   └── main.jsx        # Entry point
├── public/             # Public static files
├── dist/               # Build output (gitignored)
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
├── eslint.config.js    # ESLint v9 flat config
└── package.json        # Dependencies and scripts
```

## Important Notes

1. **React 19**: This project uses the latest React version - ensure compatibility
2. **Motion library**: Import from `"motion/react"` not `"framer-motion"`
3. **No TypeScript**: This is a JavaScript-only project
4. **Minimal config**: Uses mostly Vite/React defaults
5. **No tests**: Testing framework not yet configured
6. **Early stage**: Experimental/learning project - be pragmatic

## When Making Changes

- Always import `motion` from `"motion/react"` in components using animations
- Include `.jsx` extension in local imports
- Use stable keys in `.map()` operations
- Follow 4-space indentation
- No semicolons
- Double quotes for strings
- Run `npm run lint` before committing
