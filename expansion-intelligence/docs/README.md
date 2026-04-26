# Expansion Intelligence — NewtonX POC

## What this is

An AI-powered account expansion tool for Client Partnership Managers (CPMs) at NewtonX. It helps CPMs identify white space opportunities within their existing accounts, prioritize expansion prospects, and generate personalized outreach using the Anthropic Claude API.

Built for a job interview presentation at NewtonX.

## Tech Stack

- **Frontend:** Vite + React (SPA)
- **Styling:** Tailwind CSS v4 + inline styles using design tokens
- **Fonts:** DM Sans (body), DM Mono (data/labels)
- **AI:** Anthropic Claude `claude-sonnet-4-20250514` via Vercel serverless function
- **Hosting:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- A valid Anthropic API key
- Vercel CLI (`npm i -g vercel`)

### Local Development

```bash
npm install
vercel dev
```

The app will be available at `http://localhost:3000`.

> **Note:** Use `vercel dev` (not `npm run dev`) to run the serverless function locally. Standard `npm run dev` won't serve the `/api/generate` endpoint.

### Environment Variables

Create a `.env` file in the project root (never commit this):

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Production Deployment

1. Push to GitHub
2. Import project in Vercel
3. Add `ANTHROPIC_API_KEY` in Vercel → Project Settings → Environment Variables
4. Deploy

## Features

- **Account selector** — switch between Microsoft (Enterprise) and Airwallex (Growth)
- **Penetration stats** — see how much of the account is covered
- **Prospect list** — ranked by fit score (LLM-based signals, not ML)
- **White space map** — department grid showing engaged/cooling/targeted/unmapped
- **Prospect detail panel** — signals, intro path, fit rationale, suggested angle
- **Live outreach generation** — email and LinkedIn message via Claude API

## Project Structure

```
expansion-intelligence/
├── api/generate.js         # Vercel serverless function (Anthropic proxy)
├── src/
│   ├── data/accounts.js    # Static mock data (2 accounts, 9 prospects)
│   ├── components/         # React components
│   ├── services/           # API wrapper
│   └── styles/theme.js     # Color tokens
└── vercel.json             # Routing config
```
