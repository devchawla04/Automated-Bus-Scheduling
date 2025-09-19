# Delhi Transport Corporation - Bus Management System

A React.js frontend application for the Automated Bus Scheduling and Route Management System for Delhi Transport Corporation (DTC).

## Project Overview

This system provides a comprehensive solution for managing bus operations, including:

- **Bus Scheduling**: Manage bus schedules and assignments
- **Route Management**: Optimize and manage bus routes
- **Crew Management**: Handle driver and conductor assignments
- **Duty Scheduling**: Schedule crew duties and shifts
- **Route Visualization**: Visual representation of routes and real-time tracking
- **Dashboard**: Overview of system statistics and recent activities

## Features

### Current Implementation

1. **Dashboard**
   - Real-time statistics (Total Buses, Active Buses, Routes, Crews)
   - Recent activity feed
   - System overview

2. **Bus Scheduling**
   - Bus listing with status indicators
   - Driver and conductor assignments
   - Status management (Active, Maintenance, Idle)

3. **Navigation**
   - Responsive sidebar navigation
   - Route-based navigation with React Router

4. **User Interface**
   - Modern, clean design
   - Responsive layout
   - Status indicators and visual feedback

## Technology Stack

- **Frontend**: React 19+ with TypeScript
- **Build Tool**: Vite 5.4+
- **Routing**: React Router DOM
- **Styling**: Custom CSS with modern layout techniques
- **Development**: ESLint for code quality

## Getting Started

### Prerequisites

- Node.js 18.20+ (compatible with Vite 5.4)
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Main application header
│   ├── Header.css      # Header styles
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── Sidebar.css     # Sidebar styles
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Dashboard.css   # Dashboard styles
│   ├── BusScheduling.tsx     # Bus scheduling management
│   ├── BusScheduling.css     # Bus scheduling styles
│   ├── RouteManagement.tsx   # Route management (placeholder)
│   ├── CrewManagement.tsx    # Crew management (placeholder)
│   ├── DutyScheduling.tsx    # Duty scheduling (placeholder)
│   └── RouteVisualization.tsx # Route visualization (placeholder)
├── App.tsx             # Main application component
├── App.css             # Global application styles
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
