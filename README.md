# Podcast Planner

An AI-powered podcast planning application built with Next.js that helps web developers create comprehensive podcast content including outlines, titles, and social media posts.

## Features

- **AI-Powered Content Generation**: Uses OpenAI's GPT-4o-mini to generate podcast content
- **Podcast Outlines**: Creates structured episode outlines with 6-12 segments including intro, main content, and outro
- **Title Generation**: Generates 5-8 distinct, SEO-friendly episode titles (≤70 characters)
- **Social Media Posts**: Creates promotional content for Twitter/X and LinkedIn
- **Web Developer Focus**: Specifically designed for React and JavaScript developers
- **Structured Content**: Supports different podcast formats (host, guest, panel discussions)

## Tech Stack

- **Framework**: Next.js 15.5.5 with App Router
- **AI Integration**: Vercel AI SDK with OpenAI
- **Validation**: Zod for schema validation
- **Runtime**: React 19

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd podcast-planner
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
AI_GATEWAY_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### `/api/agents`

Main AI agent endpoint that provides tools for:
- `generate-outline`: Creates podcast episode outlines
- `generate-titles`: Generates episode title options
- `generate-social-media`: Creates promotional social media posts
- `generate-assets`: Generates all content types in parallel

## Project Structure

```
src/
├── app/
│   ├── api/agents/          # AI agent API routes
│   │   ├── functions/       # Core AI generation functions
│   │   ├── tools/          # Tool definitions for AI agent
│   │   └── route.ts        # Main API endpoint
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
└── lib/
    └── constants.ts       # App constants
```

## Usage

The application provides AI-powered tools to help podcast creators:

1. **Generate Episode Outlines**: Create structured content plans with segments, notes, and talking points
2. **Create Episode Titles**: Generate multiple title options optimized for SEO and engagement
3. **Plan Social Media**: Create promotional posts for Twitter/X and LinkedIn
4. **Batch Content Generation**: Generate all assets simultaneously for efficiency

## Development

### Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Dependencies

- `ai` - Vercel AI SDK for LLM integration
- `zod` - Schema validation
- `next` - React framework
- `tailwindcss` - CSS framework

## Deployment

Deploy easily on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/podcast-planner)

## License

Private project - All rights reserved.
