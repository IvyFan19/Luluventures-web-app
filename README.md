# Lulu Web App

A modern web application built with React + TypeScript + Vite.

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- ESLint

## System Requirements

- Node.js 16.0 or higher
- npm 7.0 or higher

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd Lulu-web-app
```

2. Install dependencies:
```bash
npm install
```

## Running the Project

### Development Environment

Start the development server:
```bash
npm run dev
```
The development server will start at http://localhost:5173.

### Production Environment

1. Build the project:
```bash
npm run build
```

2. Preview the build:
```bash
npm run preview
```

## Other Commands

- Run code linting:
```bash
npm run lint
```

## Project Structure

```
Lulu-web-app/
├── public/                    # Static assets
│   └── images/                # Image assets
│       ├── business-first-principles.jpeg
│       ├── company-analysis.jpeg
│       ├── modern-philosopher.jpeg
│       └── The Buffet Way_3000x3000.jpeg
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── AppsSection.tsx    # Applications section
│   │   ├── Footer.tsx         # Site footer
│   │   ├── Header.tsx         # Site header
│   │   ├── Hero.tsx           # Hero section
│   │   ├── LoginForm.tsx      # User login form
│   │   ├── Newsletter.tsx     # Newsletter subscription
│   │   ├── PodcastSection.tsx # Podcast section
│   │   ├── ResearchSection.tsx# Research content
│   │   ├── SignInModal.tsx    # Sign in modal
│   │   ├── TestPage.tsx       # Test page component
│   │   └── YouTubeSection.tsx # YouTube content section
│   ├── context/               # React context providers
│   │   └── AuthContext.tsx    # Authentication context
│   ├── App.tsx                # Main application component
│   ├── index.css              # Global styles
│   ├── main.tsx               # Application entry point
│   └── vite-env.d.ts          # Vite environment types
├── .github/                   # GitHub configuration
├── .gitignore                 # Git ignore rules
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry file
├── package.json               # Project dependencies and scripts
├── package-lock.json          # Locked dependencies
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.app.json          # TypeScript app configuration
├── tsconfig.json              # TypeScript base configuration
├── tsconfig.node.json         # TypeScript Node.js configuration
└── vite.config.ts             # Vite configuration
```
