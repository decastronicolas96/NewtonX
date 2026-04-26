# NewtonX AI Enablement POC — Decision Log

## Project Context
- **Role:** AI Enablement Director — Mini Exercise for interview
- **Prompt:** Select a single CPM process step and build an AI-powered POC
- **Interview format:** 30-minute presentation + discussion on expansion
- **Timeline:** Build by Sunday, practice Monday

---

## Assumptions

1. **We are NOT prioritizing operational efficiency of existing processes.** Optimizing how CPMs currently do admin work would require direct observation and interviews with the sales team to understand where time is actually wasted. Without that access, we'd be guessing. Instead, we focus on **creating new AI capabilities that improve the revenue pipeline and scale the CPM's ability to generate net-new business.**

2. Revenue Leverage assumes NewtonX's land & expand model where each new stakeholder = potential new project revenue. Time savings only score high if the time redirects to selling.

3. Adoption Ease assumes no mandate from leadership — the tool must be compelling enough that CPMs voluntarily use it.

4. We assume no existing CRM API access for the POC. Solutions that work with publicly available data score higher on Feasibility.

5. Scores reflect value for a **POC demonstration** in a 30-min interview — not a full production rollout.

---

## Phase 1: Workflow Decomposition & Scoring

### Evaluation Criteria
| Criterion | Definition |
|---|---|
| Revenue Leverage | Does the freed-up time or new capability convert directly to pipeline or expansion revenue? |
| Feasibility | Can we build with available data and current tools? Requires deep CRM integration or works standalone? |
| Adoption Ease | How much behavior change required? Will CPMs voluntarily use it? |
| Expansion Potential | Starts narrow but has a clear path to becoming a platform? |

### Scoring Results (1-5 per criterion, 20 max)

| Rank | Process Step | Revenue | Feasibility | Adoption | Expansion | Total |
|---|---|---|---|---|---|---|
| 1 | Prospect Research & Prioritization | 5 | 4 | 4 | 4 | **18** |
| 2 | Expansion Planning | 5 | 3 | 3 | 5 | **17** |
| 3 | Meeting Prep / Pre-Call Briefing | 4 | 4 | 5 | 4 | **17** |
| 4 | Outreach Execution | 4 | 5 | 4 | 3 | **16** |
| 5 | Stakeholder Relationship Mgmt | 4 | 3 | 3 | 4 | **16** |
| 6 | Project Debrief & Pattern Recognition | 4 | 2 | 2 | 4 | **14** |
| 7 | Proposal Tracking | 3 | 4 | 4 | 3 | **14** |
| 8 | Post-Meeting Follow-Up & CRM | 3 | 4 | 5 | 3 | **14** |
| 9 | Pipeline Forecasting & Reporting | 2 | 3 | 3 | 3 | **11** |
| 10 | Live Project Oversight | 2 | 3 | 3 | 2 | **10** |

### Top 3 Candidates for Deep Dive
1. **Prospect Research & Prioritization** — highest total, strong across all dimensions
2. **Expansion Planning** — highest revenue + expansion, core to NewtonX's growth model
3. **Meeting Prep / Pre-Call Briefing** — highest adoption, strong feasibility

### Key Insight
Candidates 1 and 2 (Prospect Research and Expansion Planning) are tightly coupled — you can't prioritize prospects without first mapping the expansion opportunity, and expansion planning is only actionable if you can prioritize who to pursue. This suggests a combined solution may be strongest.

---

## Phase 1 Decision: Selected Process Step

### Choice: Combined Expansion Planning + Prospect Research & Prioritization

**Why this combination:**
- These are two sides of the same coin. Expansion Planning asks "where is the white space?" and Prospect Research asks "who specifically should I pursue in that white space?" Together they tell a complete story.
- Directly maps to NewtonX's stated land & expand strategy — the core growth model. A single client like Microsoft has 200+ potential budget owners. This tool makes that opportunity visible and actionable.
- Scores highest on Revenue Leverage (5) and Expansion Potential (5) — the two criteria most aligned with what the role actually needs.
- Feasible for a POC using publicly available data (LinkedIn titles, company news, org structure) without requiring CRM API access.

**Why NOT Meeting Prep (the safe play):**
- Meeting Prep scored highest on Adoption Ease (5) and is the lowest-risk option. But it is fundamentally a productivity play — optimizing a process CPMs already do. Per our core assumption, we are not prioritizing operational efficiency of current processes. We are building new capabilities that expand the revenue pipeline.

### Acknowledged Risk: Downstream Bottleneck

Expanding the top of the funnel (more qualified prospects, more expansion targets being pursued) will create downstream pressure on existing processes: meeting prep, outreach execution, proposal generation, CRM hygiene. If CPMs are now engaging 3x more prospects but their per-interaction workflow hasn't improved, the funnel will bottleneck.

### Sequencing Strategy

This is intentional and the correct order of operations:
1. **Phase 1 (this POC):** Expand pipeline capacity — give CPMs visibility into expansion opportunities and prioritized targets they didn't have before. Net-new revenue capability.
2. **Phase 2 (next move if successful):** Optimize interaction-level productivity — meeting prep automation, outreach drafting, post-meeting CRM updates. Support the increased volume Phase 1 creates.

This sequencing tells a strong interview story: "I started where the revenue impact is highest, and here's the roadmap for what comes next."

---

## Phase 2: Solution Design

### Product Hypothesis

If CPMs have an AI tool that automatically maps the white space at their accounts and generates a prioritized list of expansion targets with actionable rationale and ready-to-send outreach, they will systematically pursue more high-quality expansion opportunities — resulting in more net-new stakeholders added and more pipeline generated from existing accounts.

### Value Chain: Identify → Prioritize → Act

The tool covers the complete expansion workflow in three steps:
1. **Identify** — Map white space: which teams/departments at this account has NewtonX NOT penetrated yet?
2. **Prioritize** — Rank expansion targets: of all possible contacts in white space, who should the CPM pursue first and why?
3. **Act** — Generate outreach: draft personalized email + LinkedIn message using the intelligence already gathered.

Including outreach is critical because it makes the tool actionable, not just informational. The cost to add it is minimal since the outreach draft is a reformatting of intelligence we've already produced.

### Success Metrics

**Leading indicators (measurable in weeks):**
- Number of new stakeholders contacted per CPM per month
- Percentage of accounts with an active expansion plan (vs. near-zero today)

**Pipeline indicators (measurable in 1-2 months):**
- New opportunities created from expansion targets
- Response rate on expansion outreach vs. baseline cold outreach

**Revenue indicators (measurable in 3-6 months):**
- Revenue from expansion-sourced deals
- Average number of active stakeholders per account

### POC Scope

**IN for the demo:**
- Working interactive tool (React artifact)
- Account selection with simulated CRM data (current stakeholders, past projects)
- White space mapping showing penetrated vs. untapped teams
- AI-scored and ranked prospect list with written rationale
- Personalized outreach generation (email + LinkedIn) per prospect
- Live web search enrichment for real company news and signals
- Realistic fabricated data for 2-3 accounts

**OUT for the demo (discussed as expansion roadmap):**
- Real CRM integration (Salesforce/HubSpot)
- Live LinkedIn Sales Navigator API
- Automated outreach sending
- Multi-user access and permissions
- Historical tracking and performance analytics
- ML propensity models (requires historical conversion data)

---

## Architecture Decisions

### Technical Stack

| Layer | POC Implementation | Production Path |
|---|---|---|
| Frontend | React artifact — interactive dashboard | Full web app with auth and persistence |
| AI Layer | Anthropic API (Claude) called from artifact | Same, with fine-tuned prompts and evaluation pipeline |
| Enrichment | Anthropic API web search tool (live) | Web search + LinkedIn API + ZoomInfo/Apollo |
| Data — Internal | Mocked JSON (CRM history, stakeholders, projects) | CRM API (Salesforce/HubSpot) |
| Data — External | Live web search for company news, job postings | Sales Navigator + enrichment providers + web search |

### Decision: No Pre-Built Agents in POC

**Rationale:** Adding agent integrations (Claude MCP connectors, Google agents, etc.) introduces connection dependencies that can break during a live demo. A failed API call during the interview is unrecoverable. The Anthropic API with web search already serves as our agent layer — it searches, synthesizes, and reasons.

**Production expansion path (to discuss in interview):**
- CRM agent (Salesforce/HubSpot MCP) → replace mocked account data with live CRM
- Email/calendar agent (Gmail/Outlook) → passive relationship signal tracking ("when did the CPM last contact this person?")
- Slack agent → surface internal mentions ("has anyone else at NewtonX discussed this account?")
- LinkedIn Sales Navigator API → real prospect enrichment replacing mocked profiles

The interview story: "I built this with mocked internal data and live web search. In production, you plug in CRM and email agents and the same architecture works on real data."

### Decision: LLM Scoring, Not ML Models

**Rationale:** KNN, gradient boosted trees, or any supervised ML model requires historical labeled training data — "these prospects converted, these didn't." We are fabricating our data, so training a model would mean learning patterns from fake data. The output would look sophisticated but mean nothing. An interviewer with data science background would see through it.

**What we do instead:** The LLM scores prospects based on explicit, interpretable signals:
- Role fit (does this title typically buy B2B research?)
- Tenure recency (recently hired = building a team = more likely to need external research)
- Department growth signals (job postings, team expansion)
- Proximity to existing stakeholders (can someone make a warm intro?)

Each score comes with a written rationale. This is more valuable for a sales tool than a black-box number — a CPM won't act on "this prospect scored 0.87" but will act on "this person just joined as VP of Product Strategy, their team has 3 open research-related job postings, and your existing stakeholder reports to the same division head."

**Where ML fits in the roadmap:** After 6-12 months of conversion data, train a propensity model (likely gradient boosted trees — small tabular feature set, not deep learning). The model learns patterns like "prospects with X title who join Y department within Z months convert at 3x base rate." Then the ML score and LLM rationale work together — the model ranks, the LLM explains. This is a strong interview moment: it shows judgment about when ML adds value (real data) vs. when it doesn't (fabricated POC data).

---

## Phase 3: UI Design & Taskflows

### User Mental Model — Three Sequential Questions

The CPM opens the tool asking three questions in order. Each maps to a UI view:

1. **"Where's my opportunity?"** → Account Dashboard with penetration gap visualization
   - Aha-moment: seeing "you've penetrated 17% of Microsoft" creates urgency
   
2. **"Who should I go after first?"** → Ranked Prospect List with signals and fit rationale
   - Aha-moment: "I would never have found this person, and now I know exactly why to reach out"
   
3. **"What do I say?"** → Generated Outreach (email + LinkedIn) personalized to signals
   - Aha-moment: went from "I should expand this account" to "ready-to-send email" in 60 seconds

### UI Layout — Single Page, Three Columns

- **Left column (narrow):** Account selector + account summary stats (penetration %, revenue, projects, stakeholders). Always visible.
- **Center (main workspace):** Tabs between White Space Map (department grid: green/yellow/gray) and Prospect List (ranked cards with scores). Clicking a department on the map jumps to that prospect.
- **Right panel (detail/action):** Slides in when a prospect is selected. Shows full intelligence brief (signals, proximity, fit rationale) and generated outreach below.

### Live AI vs. Pre-Computed

- **Pre-computed:** Prospect data, scores, signals, rationale (from mock JSON)
- **Live AI (Anthropic API):** Outreach generation — drafts personalized email + LinkedIn message in real time. This is the "wow" moment showing it's not a mockup.

### Demo Flow for Interview (2-3 minutes)

1. Open Microsoft account → show 17% penetration visual
2. Show ranked prospect list → click Raj Mehta (highest priority)
3. See signals + rationale → click generate outreach
4. Watch AI draft personalized email live → reference existing Cloud + AI relationship
5. Switch to Airwallex → show different account scale, same value

---

## Decisions Made
- [x] Evaluation framework defined: Revenue Leverage, Feasibility, Adoption Ease, Expansion Potential
- [x] Full CPM workflow decomposed into 10 discrete steps
- [x] Scored and ranked all 10 steps
- [x] Identified top 3 candidates for deep dive
- [x] Selected process step: Combined Expansion Planning + Prospect Research & Prioritization
- [x] Documented risk (downstream bottleneck) and sequencing strategy
- [x] Defined product hypothesis and success metrics
- [x] Designed POC scope (in vs. out)
- [x] Decided to include outreach generation as "last mile" of the same flow
- [x] Architecture: React + Anthropic API + web search, no external agents in POC
- [x] Scoring: LLM-based with interpretable rationale, no ML models (no training data)
- [x] Documented production expansion path for agents and ML
- [x] Mock data schema defined and built (2 accounts, 9 prospects, full project history)
- [x] UI taskflows and layout defined (3-column, question-driven flow)
- [x] Live AI vs pre-computed decision (outreach = live, scoring = pre-computed)
- [x] Built POC (React artifact with live Anthropic API outreach generation)
- [x] Structured presentation narrative (6-slide → 8-slide structure)
- [x] Architecture diagram created (SVG, multiple iterations)
- [x] Metrics cascade defined (objective → drivers → funnel → attribution)
- [x] Risk framework with mitigation strategies
- [x] Presentation design direction selected (Clean Editorial)
- [x] Font pairing: Georgia (headers) + Verdana (body)
- [x] Full 8-slide deck built in editorial style
- [x] Speaking script completed for all slides + demo + Q&A prep
- [x] Antigravity build spec created for deployable Vite+React app
- [x] Hosting decision: Vercel with serverless API route for key security

---

## Phase 4: Presentation Design & Iteration

### Design Direction Decision

Evaluated three directions for slide design:
1. Dark & Premium (VC pitch deck aesthetic)
2. Clean Editorial (McKinsey/Economist — chosen)
3. Modern SaaS (Stripe/Linear)

**Selected: Clean Editorial.** White backgrounds, Georgia serif for headlines, thick black rules, three-column newspaper layouts. Data speaks for itself through large serif numbers and structured content.

**Rationale:** Audience has consulting backgrounds (McKinsey/BCG). Editorial style signals analytical rigor without trying to look like a tech startup. Every slide follows the pattern: section label → thesis header (2 lines max) → structured proof.

### Slide Structure Evolution

Original plan was 6 slides. Expanded to 8 based on iterative feedback:

| # | Section | Content |
|---|---|---|
| 1 | Title | Expansion Intelligence — Nicolás De Castro |
| 2 | Problem & Context | 60-70% vs 5-20% conversion, 200+ budget owners, three gaps |
| 3 | Prioritization | 10 steps decomposed, 2x2 impact vs adoption chart, decision rationale |
| 4 | User Empathy | Three CPM questions: opportunity / who first / what to say |
| 5 | Solution & Architecture | Value chain (Identify→Prioritize→Act) + 5-layer architecture + tech decisions |
| 6 | Live Demo | Walk through Microsoft and Airwallex accounts |
| 7 | Measuring Success | Metrics cascade: objective → drivers → revenue funnel → attribution |
| 8 | Risks & Roadmap | Five risks by severity + four-phase product evolution |

### Key Design Decisions

**Slide 3 — Prioritization:** Replaced numerical scoring table with a 2x2 positioning chart (Impact vs. Adoption). The table gave false precision to a qualitative exercise. The 2x2 visually communicates the tradeoff: "I chose impact over adoption." Left side shows the 10-step decomposition list with the two selected steps highlighted.

**Slide 4 — User Empathy:** Framing corrected from "CPMs are overwhelmed" (leads to productivity solution) to "CPMs lack the tools to act on expansion" (leads to capability augmentation). Text trimmed to one sentence per section.

**Slide 5 — Architecture:** Left side shows business value chain (Identify→Prioritize→Act) with tech annotations in colored italic. Right side shows compact 5-layer architecture with external services and phase tags. Infrastructure bar (Vercel, Next.js, Anthropic API, Postgres) signals production readiness.

**Slide 7 — Metrics:** Restructured from flat list to visual MECE cascade. Operational metrics follow a revenue funnel: Reach outs × Response % × Conversion % × Avg. value. Attribution metrics measure the tool's causal impact: Reach (adoption), Quality (AI evals — edit distance, score calibration, signal accuracy), Impact (AI vs. manual A/B comparison). No baseline target numbers — framework designed to be populated with real data.

**Slide 8 — Risks:** Added "AI credibility" as highest-severity risk (wrong signal → CPM looks uninformed → damages client trust). Risks ordered by severity with color-coded bars. Two-column format: "What goes wrong" / "How we prevent it." Roadmap focuses solely on this product's evolution (P1→P4), not other tools.

---

## Phase 5: Deployable Application

### Hosting Decision: Vercel

Selected Vercel over Railway/Render because:
- Industry standard for React apps (Stripe, Linear, Notion use it)
- Deploys directly from GitHub repo
- Serverless API routes proxy the Anthropic API key server-side (never exposed to client)
- Free tier sufficient for demo purposes

### Architecture for Deployment

- **Frontend:** Vite + React (static SPA, not Next.js — simpler for this use case)
- **Styling:** Tailwind CSS
- **API key security:** Vercel serverless function at `/api/generate.js` handles Anthropic API calls. Client sends prompt, server adds the API key and forwards to Anthropic.
- **Data:** All mock data embedded as JS exports, no database required

### Build Spec

Created comprehensive Antigravity build specification (ANTIGRAVITY_BUILD_SPEC.md) containing:
- Complete file structure
- Full design system with color codes
- All mock data for both accounts
- Component-by-component behavior specs
- Working code for serverless API function
- Deployment instructions
- Quality checklist

---

## All Decisions Made

- [x] Evaluation framework: Revenue Leverage, Feasibility, Adoption Ease, Expansion Potential
- [x] CPM workflow decomposed into 10 steps
- [x] Selected: Combined Expansion Planning + Prospect Research
- [x] Documented downstream bottleneck risk and sequencing strategy
- [x] Product hypothesis: systematic expansion through white space visibility + prospect prioritization + outreach generation
- [x] Value chain: Identify → Prioritize → Act
- [x] Outreach included as "last mile" of the same flow
- [x] LLM scoring (not ML — no training data)
- [x] No external agents in POC (demo reliability)
- [x] Mock data: 2 accounts (Microsoft Enterprise, Airwallex Growth), 9 prospects
- [x] 3-column UI layout mirroring CPM's three questions
- [x] Live AI for outreach, pre-computed for scoring
- [x] Presentation: Clean Editorial design, Georgia + Verdana fonts
- [x] Slide structure: 8 slides (problem → prioritization → empathy → solution → demo → metrics → risks → roadmap)
- [x] Framing: capability augmentation, NOT productivity optimization
- [x] Metrics cascade: objective → drivers (volume × precision) → revenue funnel (#×%×%×$) → attribution (reach/quality/impact)
- [x] AI evals in attribution: edit distance, score calibration, signal accuracy, A/B vs manual
- [x] Top risk: AI credibility (bad recommendation damages client trust)
- [x] Roadmap: single product evolution P1→P4 (not portfolio of tools)
- [x] Hosting: Vercel with serverless API route
- [x] Build spec created for Antigravity
- [x] Speaking script completed with Q&A preparation
