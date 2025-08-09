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
│       ├── lulu-hero.png
│       └── The Buffet Way_3000x3000.jpeg
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── AppsSection.tsx    # Applications section
│   │   ├── ArticleDetailPage.tsx # Research article detail page (route: /research-analysis/:slug)
│   │   ├── Footer.tsx         # Site footer
│   │   ├── Header.tsx         # Site header
│   │   ├── Hero.tsx           # Hero section
│   │   ├── HomePage.tsx       # Main homepage component (route: /)
│   │   ├── LoginPage.tsx      # User login page (route: /login)
│   │   ├── MarkdownRenderer.tsx # Markdown content renderer
│   │   ├── Newsletter.tsx     # Newsletter subscription
│   │   ├── PodcastSection.tsx # Podcast section
│   │   ├── ResearchAnalysisPage.tsx # Research analysis listing page (route: /research-analysis)
│   │   ├── ResearchSection.tsx# Research content section
│   │   ├── TestPage.tsx       # Test page component
│   │   └── YouTubeSection.tsx # YouTube content section
│   ├── hooks/                 # Custom React hooks
│   │   └── useResearchArticles.ts # Hook for research articles data
│   ├── services/              # API and service modules
│   │   ├── api.ts             # General API service
│   │   ├── articleService.ts  # Research article service
│   │   ├── contentService.ts  # Content fetching service
│   │   └── dynamoDbClient.ts  # DynamoDB client
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts           # Common type definitions
│   ├── utils/                 # Utility functions
│   │   └── constants.ts       # Application constants
│   ├── __tests__/             # Test files
│   │   ├── Header.test.tsx    # Header component tests
│   │   └── setup.ts           # Test setup configuration
│   ├── App.tsx                # Main application component with routing
│   ├── aws-config.ts          # AWS configuration
│   ├── main.tsx               # Application entry point
│   └── vite-env.d.ts          # Vite environment types
├── .github/                   # GitHub configuration
├── .gitignore                 # Git ignore rules
├── CLAUDE.md                  # Claude configuration file
├── architecture-diagram.md    # System architecture documentation
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

## Routes

- `/` - Homepage with hero section, research overview, and other content sections
- `/login` - User authentication page  
- `/research-analysis` - Research articles listing page (requires authentication)
- `/research-analysis/:slug` - Individual research article detail page (uses ArticleDetailPage component)
