# Expansion Intelligence — Build Specification for Antigravity

## What to build

A single-page React application called "Expansion Intelligence" — an AI-powered account expansion tool for B2B sales teams. It needs to be a **real deployable application** (Vite + React + Vercel), not a prototype.

The app lets a user (Client Partnership Manager) select an account, see white space (untapped departments), browse a ranked list of expansion prospects, and generate personalized outreach emails using a live Anthropic API call.

---

## Tech stack

- **Framework:** Vite + React (NOT Next.js — keep it simple, static SPA)
- **Styling:** Tailwind CSS (use the CDN approach or install via npm)
- **Fonts:** Georgia for headers/large text, Verdana for body text. Import via CSS.
- **AI API:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Hosting:** Vercel (static deploy from GitHub repo)
- **No backend needed.** The API key is handled via a Vercel serverless function (see API section below).

---

## File structure

```
expansion-intelligence/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .env.example              # VITE_API_URL=/api/generate
├── .gitignore
├── api/
│   └── generate.js           # Vercel serverless function for Anthropic API
├── public/
│   └── favicon.ico
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/
│   │   └── accounts.js       # All mock data (exported as JS, not JSON)
│   ├── components/
│   │   ├── Sidebar.jsx        # Account selector + stats + stakeholder cards
│   │   ├── ProspectList.jsx   # Ranked prospect cards (center, default view)
│   │   ├── WhiteSpaceMap.jsx  # Department grid visualization (center, tab)
│   │   ├── ProspectDetail.jsx # Right panel: signals, rationale, intro path
│   │   ├── OutreachGen.jsx    # Outreach generation with API call
│   │   ├── ScoreBadge.jsx     # Color-coded score pill
│   │   ├── PriorityTag.jsx    # Priority label component
│   │   └── IntroTag.jsx       # Warm/cold badge component
│   ├── services/
│   │   └── anthropic.js       # API call wrapper
│   └── styles/
│       └── theme.js           # Color tokens, design constants
└── docs/
    ├── REQUIREMENTS.md
    ├── DECISION_LOG.md
    └── README.md
```

---

## Design system

### Color palette (dark theme)
```js
const colors = {
  bg: "#0f1117",           // main background
  sidebar: "#161820",      // sidebar background
  card: "#1c1e27",         // card surfaces
  cardHover: "#22242f",    // card hover state
  border: "#2a2d3a",       // borders
  borderLight: "#353849",  // lighter borders
  text: "#e4e4e8",         // primary text
  textMuted: "#8b8d98",    // secondary text
  textDim: "#5f6170",      // dim/tertiary text
  accent: "#4f8cff",       // primary accent (blue)
  green: "#34c759",        // engaged/high score
  greenBg: "#0d2818",      // green background tint
  yellow: "#f0b429",       // cooling/medium
  yellowBg: "#2a2008",     // yellow background tint
  gray: "#3a3d4a",         // unmapped/low
  red: "#ff453a",          // alerts
  purple: "#a78bfa",       // background info
  coral: "#F87171",        // contrast data
};
```

### Typography
- Headers: Georgia, serif
- Body/labels: Verdana, sans-serif  
- Monospace labels: 'JetBrains Mono' or 'DM Mono' (import from Google Fonts)
- Score badges and data: monospace

### Layout
- Three-column layout: sidebar (260px fixed) | center (flex) | right panel (380px, slides in when prospect selected)
- Sidebar always visible
- Center has two tabs: "Prospect List" (default) and "White Space Map"
- Right panel appears only when a prospect is clicked

---

## Mock data

Use the data below. This is embedded in `src/data/accounts.js` as a JS export, not loaded from an API.

### Account 1: Microsoft
```
- company: "Microsoft"
- industry: "Technology"  
- employees: 228,000
- revenue with NewtonX: $340K/year
- tier: "Enterprise"
- CPM: "Sarah Chen"
- since: March 2022
- projects completed: 8
- lifetime value: $920K
- departments engaged: 2 of 12 (17% penetration)

Stakeholders:
1. Michael Rivera — Director of Market Research, Cloud & AI
   - Relationship strength: 5/5
   - Last contact: April 18, 2026
   - 5 projects together
   - Acquisition: Inbound (GRIT report)
   - Referral potential: High
   - Projects: Azure AI Adoption ($85K), Cloud Migration ($45K), Competitive Positioning ($72K), Azure Dev Experience ($38K), Cloud Security ($32K)

2. Lisa Patel — Senior Research Manager, Devices & Creativity
   - Relationship strength: 3/5
   - Last contact: Jan 10, 2026
   - 3 projects together
   - Acquisition: Referral from Michael Rivera
   - Projects: Surface Enterprise ($55K), Hybrid Work ($38K), Copilot+ PC ($42K)

Prospects (ranked by score):
1. Raj Mehta — Director of Strategy, Azure Data & AI (Score: 95, Very High, Warm)
   - Previous: Principal, McKinsey & Company
   - Signals: Ex-McKinsey, Azure AI revenue grew 60%+ YoY, same division as Michael Rivera, competing with Snowflake/Databricks
   - Proximity: Same Microsoft Cloud division. Warm intro very likely.
   - Fit: Ex-consulting = values structured research. Strategy roles are core buyers.
   - Angle: Market sizing for Azure AI vs Snowflake/Databricks

2. Jennifer Walsh — VP of Product Marketing, M365 (Score: 90, Very High, Warm)
   - Previous: Dir. PMM, Salesforce
   - Signals: 3 PMM roles posted in 60 days, M365 Copilot vs Google Workspace, spoke at Enterprise Connect 2026
   - Proximity: Lisa Patel same division. Warm intro possible.
   - Angle: Competitive positioning of M365 Copilot vs Gemini

3. Amanda Torres — Head of Customer Insights, LinkedIn (Score: 88, High, Warm)
   - Previous: Director of Research, HubSpot
   - Signals: Independent P&L, Meta B2B competition, team of ~8, published on AI in B2B research
   - Proximity: Michael Rivera knows broader community. Possible warm intro.
   - Angle: B2B buyer persona research for LinkedIn Marketing Solutions

4. David Kim — Director of Competitive Intelligence, Gaming (Score: 85, High, Cold)
   - Previous: Sr. Manager Market Intel, Sony
   - Signals: Recently hired from Sony, building new CI function, Activision integration, posted CI Analyst role
   - Proximity: No connection. Cold outreach.
   - Angle: Competitive landscape study for new gaming intelligence function

5. Catherine Liu — Sr. Director PMM, Security (Score: 82, High, Warm)
   - Previous: Dir. PMM, CrowdStrike
   - Signals: $20B+ security business, intensely competitive market, CrowdStrike background
   - Proximity: Same Microsoft Cloud division as Rivera. Moderate connection.
   - Angle: CISO buyer journey — reference existing cloud security work

6. Marcus Johnson — VP Market Research, Advertising (Score: 72, Medium, Cold)
   - Previous: Director of Research, Verizon Media
   - Signals: Advertising growing with AI, retail media growth, long tenure = entrenched vendors
   - Proximity: No connection. Different division.
   - Angle: NewtonX advertising research strength

White space map:
- Engaged: Cloud & AI (active), Devices & Creativity (cooling)
- Targeted: Microsoft 365, Gaming & Xbox, LinkedIn, Azure Data & AI, Microsoft Security, Microsoft Advertising
- Unmapped: Teams Platform, GitHub, Dynamics 365, Azure Infrastructure
```

### Account 2: Airwallex
```
- company: "Airwallex"
- industry: "Fintech"
- employees: 1,800
- revenue: $85K/year
- tier: "Growth"
- CPM: "Sarah Chen"
- since: January 2025
- projects: 2
- LTV: $85K
- departments engaged: 1 of 5 (20% penetration)

Stakeholder:
1. Priya Sharma — Head of Product Marketing
   - Strength: 4/5, last contact March 22, 2026
   - 2 projects: SMB Payments Buyer Persona ($52K), Competitive vs Wise/Stripe ($33K)

Prospects:
1. Thomas Wright — VP Strategy & Corp Dev (Score: 93, Very High, Warm)
   - Previous: Director Strategy & M&A, Adyen
   - Signals: Raised $100M in 2024, ex-Adyen, expanding into Japan/Middle East
   - Angle: Market entry research for Japan/Middle East

2. Nina Kowalski — Director of Product, Platform (Score: 78, Medium-High, Warm)
   - Previous: Senior PM, Stripe Connect
   - Signals: Embedded finance growth, ex-Stripe, needs market validation
   - Angle: Developer experience benchmarking vs Stripe/Adyen/Wise

3. Sarah Mitchell — Head of Revenue Operations (Score: 65, Medium, Warm)
   - Previous: RevOps Manager, Brex
   - Signals: New role, building GTM infra, enterprise sales push
   - Angle: Enterprise buyer journey mapping for payment platforms

White space:
- Engaged: Product Marketing (active)
- Targeted: Strategy, Product — Platform, Revenue Operations
- Unmapped: Enterprise Sales, Compliance & Risk
```

---

## Component behavior

### Sidebar (always visible)
- Account selector: clickable buttons for Microsoft and Airwallex
- On selection: display account stats
  - Penetration: "X%" with "Y of Z depts engaged"
  - Lifetime value: "$XK" with "N projects completed"  
  - Annual revenue: "$XK" with "Since YYYY-MM"
  - Expansion targets: "N" with "X very high priority"
- Current stakeholders: card for each with name, title, department, relationship strength (visual 1-5 bar with "STR" label), last contact, project count

### Center — Prospect List (default tab)
- Header: "Expansion Targets — {Company}" with count and division count
- Cards sorted by score (highest first)
- Each card shows:
  - Name (bold), Priority tag (colored text), Intro tag (warm=green / cold=yellow pill)
  - Title, department
  - Previous role (dimmed)
  - Score badge (green ≥90, yellow ≥80, gray <80)
  - Top 2 signals as compact colored tags
- Clicking a card opens the right panel for that prospect

### Center — White Space Map (second tab)
- Penetration bar showing percentage
- Legend: Engaged (green), Cooling (yellow), Target (blue), Unmapped (gray)
- Grid of department cards, each colored by status
- Clicking a "targeted" department switches to Prospect List and selects that prospect

### Right Panel (slides in on prospect click)
- Header: name, title, department, division + close button
- Score badge + priority tag + intro tag
- SIGNALS section: bulleted list of all signals
- INTRO PATH section: prose in a distinct card
- FIT RATIONALE section: prose text
- SUGGESTED ANGLE section: one line, accent colored
- OUTREACH GENERATION section:
  - Toggle: Email / LinkedIn
  - "Draft Email" or "Draft LinkedIn" button
  - Loading state while API calls
  - Generated output in styled container
- BACKGROUND section: previous role + tenure

---

## API integration — Anthropic via Vercel serverless function

### Why a serverless function
The API key cannot be in client-side code. Vercel serverless functions run server-side and keep the key secure.

### `api/generate.js` (Vercel serverless function)
```js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { systemPrompt, userPrompt } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    const data = await response.json();
    const text = data.content?.map(b => b.text || '').join('\n') || 'Error generating outreach.';
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate outreach' });
  }
}
```

### `src/services/anthropic.js` (client-side wrapper)
```js
export async function generateOutreach({ type, prospect, account, stakeholder }) {
  const systemPrompt = `You are a sales outreach expert for NewtonX, a B2B research company. Write a ${type === 'email' ? 'professional email' : 'LinkedIn connection message (under 280 characters)'} for a Client Partnership Manager to send to a new expansion prospect.

Rules:
- Be concise and specific. No fluff.
- Reference the existing relationship at the company naturally.
- Lead with relevance to THEIR challenges, not NewtonX capabilities.
- ${type === 'email' ? "Include subject line on first line prefixed with 'Subject: '. Body under 150 words." : 'Under 280 characters. Direct and personal.'}
- Sound like a smart human, not a bot. No "I hope this finds you well."
- No exclamation marks.`;

  const userPrompt = `Company: ${account.company}
Prospect: ${prospect.name}, ${prospect.title}, ${prospect.dept}
Previous role: ${prospect.prevRole}
Key signals: ${prospect.signals.join('; ')}
Suggested angle: ${prospect.angle}
Intro type: ${prospect.intro}
${prospect.intro === 'warm' ? `Warm intro path: ${prospect.proximity}` : 'Cold outreach — no existing connection.'}
Existing stakeholder: ${stakeholder.name}, ${stakeholder.title} (${stakeholder.projects} projects completed)
CPM name: ${account.cpm}
NewtonX value prop: We connect enterprise clients with verified industry experts for surveys, interviews, and consulting. 1.1 billion professional network, 100% ID-verified.`;

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, userPrompt }),
  });

  const data = await response.json();
  return data.text;
}
```

### `vercel.json`
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}
```

### Environment variable on Vercel
Set `ANTHROPIC_API_KEY` in Vercel project settings → Environment Variables. Never commit this to the repo.

### `.env.example`
```
ANTHROPIC_API_KEY=your_key_here
```

---

## Deployment instructions

1. Push to GitHub
2. Connect repo to Vercel (vercel.com → Import Project)
3. Set environment variable: ANTHROPIC_API_KEY
4. Deploy — Vercel auto-detects Vite and builds
5. The app is live at `expansion-intelligence.vercel.app` (or custom domain)

---

## Design quality requirements

This is for a job interview presentation. It must look production-grade, not like a hackathon project.

- Dark theme throughout. No white backgrounds.
- Consistent spacing. Use 8px grid.
- Smooth transitions when panels slide in/out.
- Loading state on outreach generation (spinner or skeleton).
- Error state if API fails (graceful message, not a crash).
- Responsive enough for 1280px+ desktop. Mobile is not required.
- No clipart, no generic icons. Typography and spacing ARE the design.
- Monospace font for data labels, scores, and section headers (use JetBrains Mono or DM Mono from Google Fonts).

---

## What NOT to build

- No auth/login
- No database
- No real CRM integration
- No multi-user support
- No settings page
- No onboarding flow
- Keep it to ONE page with the three-panel layout

---

## Quality checklist before submitting

- [ ] App runs locally with `npm run dev`
- [ ] Deploys to Vercel without errors
- [ ] Both accounts (Microsoft, Airwallex) render correctly
- [ ] Account switching resets prospect selection
- [ ] White space map clicking navigates to prospect
- [ ] Outreach generation calls the API and returns a result
- [ ] Error handling works when API is unavailable
- [ ] No console errors
- [ ] All prospect data renders without overflow or cutoff
- [ ] Score colors are correct (green ≥90, yellow ≥80, gray <80)
- [ ] Warm/cold tags display correctly
- [ ] Relationship strength bars have "STR" label
