# Expansion Intelligence — Full Speaking Script

## Total time: ~14-15 minutes presenting, ~15 minutes discussion

---

## SLIDE 1 — TITLE (15 seconds)

"Thank you for having me. I'm going to walk you through a POC I built for the mini exercise. I called it Expansion Intelligence — an AI tool that helps CPMs systematically find and pursue expansion opportunities within their existing accounts.

I'll cover the problem I chose, why I chose it, what I built, and how I'd measure success."

---

## SLIDE 2 — PROBLEM & CONTEXT (2 minutes)

*[Eyes go to left column — 60-70% in teal]*

"Let me start with why I focused on expansion.

The probability of selling to an existing customer is 60 to 70 percent. Compare that to a new prospect — 5 to 20 percent. That's a 3x difference.

*[Eyes move to center column — 65%]*

And this shows up in the revenue mix. 65 percent of most companies' revenue comes from their existing customer base.

*[Eyes move down to 200+]*

Now apply that to NewtonX. A single client like Microsoft has over 200 potential budget owners. Product Marketing, Strategy, Competitive Intelligence, Research — all buying B2B research independently. That's the size of the opportunity.

*[Eyes move to right column — THE GAP]*

But here's the gap. NewtonX's growth model is land and expand — you win one team, then grow across the organization. That's the strategy. In practice, though, expansion is opportunistic. A CPM hears from a contact that another team might need research, and they follow up. There's no proactive identification of targets, no prioritization, and no visibility into which departments are untapped.

So the growth engine depends on expansion, but there's no system behind it. That's the problem I chose to solve."

---

## SLIDE 3 — PRIORITIZATION (2 minutes)

*[Point to left — 10 steps list]*

"I started by decomposing the CPM workflow into 10 discrete steps — everything from proposal tracking to pipeline forecasting.

Then I evaluated each one on four criteria: revenue leverage, feasibility, adoption ease, and expansion potential.

*[Point to center — 2x2 chart]*

The two that rose to the top were prospect research and expansion planning. I combined them because they're two sides of the same coin — you can't prioritize targets without first mapping the white space.

Now look at this tradeoff. Meeting Prep sits here — easy to adopt, moderate impact. It's the safe play. Expansion targeting sits here — highest revenue impact, but requires a new capability rather than optimizing an existing process.

*[Point to right — the decision]*

I chose impact over adoption. Meeting Prep optimizes something CPMs already do. It doesn't create new pipeline. Expansion targeting creates net-new revenue opportunities that didn't exist before.

I want to be transparent — this scoring is qualitative. To validate it properly, we'd need to sit with CPMs and look at real CRM data."

---

## SLIDE 4 — USER EMPATHY (2 minutes)

*[Point to column 1]*

"So what does a CPM actually need? Three questions, answered in sequence.

First — where is my opportunity? Today, a CPM works with 2 of 12 departments at Microsoft. They know the others exist but have no map. They need a penetration gap visual. Seeing '17% covered' creates urgency.

*[Point to column 2]*

Second — who should I go after first? There are 200 potential contacts. No way to know who has budget or timing. They need a ranked list with reasoning — this person, because of these signals, with this approach angle.

*[Point to column 3]*

Third — what do I say? Writing a personalized message takes 15 to 20 minutes per contact. Doesn't scale. They need a ready-to-send draft built from the intelligence we already gathered.

*[Point to bottom line]*

Any tool that doesn't answer all three in sequence won't get used."

---

## SLIDE 5 — SOLUTION & ARCHITECTURE (2 minutes)

*[Point to left — value chain]*

"The solution follows three steps — identify, prioritize, act.

Identify maps the white space by department. Which teams are engaged, which have targets, which are unmapped. This pulls CRM data and enriches with live web search.

Prioritize ranks every prospect on real signals — role fit, tenure, growth, proximity to existing stakeholders. This runs through the Anthropic API using LLM scoring. I chose LLM over ML because there's no training data for a supervised model yet.

Act generates a personalized email and LinkedIn message. This is live API generation — not pre-written.

*[Point to right — architecture]*

On the architecture. Five layers, top to bottom. Input loads account context from CRM. Enrichment combines internal data with live web search — and in production, email and calendar signals. The AI engine scores and generates rationale. Generation produces the outreach. Output is the CPM dashboard.

*[Point to phase tags]*

Everything tagged P1 is live in the POC today. P3 items — LinkedIn enrichment, CRM sync, email send — plug in for production. ML scoring comes in P4 once we have conversion data.

*[Point to infrastructure bar]*

The whole thing runs on Vercel with Next.js. This is deployable, not a prototype."

---

## SLIDE 6 — LIVE DEMO (4-5 minutes)

*[Switch to the live application]*

"Let me show you how it works. I'll walk through Microsoft — this is what Sarah Chen, a CPM managing this account, would see.

*[Click Microsoft in sidebar]*

She's working with two teams: Cloud & AI and Devices. Look at the penetration number — 17 percent. Two out of twelve relevant departments. That's the white space.

*[Click White Space Map tab]*

Here's the department map. Green means we're engaged, blue means we've identified a target, gray is unmapped. She can immediately see where the opportunity is.

*[Switch back to Prospect List tab]*

The prospect list ranks six expansion targets. They're sorted by fit score. Each card shows the person, their signals, whether there's a warm introduction path.

*[Click on Raj Mehta]*

Let me click into Raj Mehta — Director of Strategy in Azure Data & AI. He scored 95. Why? He's ex-McKinsey, so he values structured research. He's in the same division as our existing contact Michael Rivera, so a warm intro is likely. And Azure AI revenue is growing 60 percent year over year — his team has expanding budget.

Look at the signals, the intro path, the suggested angle. A CPM would never assemble this intelligence manually across 35 accounts.

*[Click Draft Email button]*

Now watch — I'll generate an outreach email. This is a live API call to Claude. The system uses everything we know about this prospect: the signals, the existing relationship, the suggested angle.

*[Email appears]*

The CPM reads it, makes any edits, and sends. From 'I should probably expand this account' to 'here's a ready email' in under 60 seconds.

*[Switch to Airwallex]*

Let me quickly show you a different account. Airwallex — Growth tier, smaller company, 1,800 employees. One stakeholder, three targets. Same tool, different scale. Thomas Wright, VP of Strategy, ex-Adyen — the system identifies him as the highest-priority target with a warm intro path through the existing contact.

The point is: this works whether the account has 200 potential contacts or 20."

*[Switch back to slides]*

---

## SLIDE 7 — MEASURING SUCCESS (2-3 minutes)

*[Point to objective at top]*

"How do we know this works? I structured the metrics as a cascade from one objective down to attribution metrics.

The objective is simple: increase expansion revenue from existing accounts. Each new stakeholder is worth roughly 50K in annual project value.

*[Point to drivers]*

That objective is driven by two things: volume — more targets pursued — and precision — better target selection leading to higher conversion.

*[Point to revenue funnel]*

These decompose into a revenue funnel. Reach outs times response rate times pipeline conversion times average contract value. Each stage is independently improvable. The tool touches all four — more reach outs from white space visibility, better response rates from personalized outreach, higher conversion from signal-based targeting, and contract value maintained through better-fit prospects.

*[Point to attribution metrics]*

At the bottom is the attribution layer. This answers: is the tool actually driving the funnel, or is it just a nice interface?

Reach — are CPMs using it? Percentage of weekly active sessions and accounts with expansion plans.

Quality — is the AI output trustworthy? I'd track outreach edit distance — how much does the CPM change the draft before sending? If they rewrite 90 percent of it, the model needs work. Score calibration — do higher-scored prospects actually convert more? Signal accuracy — are the signals the AI identifies confirmed as relevant?

Impact — is it causing funnel lift? The critical test: AI-sourced outreach response rate versus manual baseline. Tool-assisted pipeline conversion versus non-tool pipeline. This is the A/B comparison that proves causation.

I deliberately left out target numbers. We don't have a baseline. Setting targets requires CPM interviews and CRM data. The framework is designed to be populated with real data."

---

## SLIDE 8 — RISKS & ROADMAP (2 minutes)

*[Point to left — risks, top to bottom]*

"Five risks, ordered by severity.

Number one — AI credibility. This is the most dangerous. If the tool gives a bad signal — wrong person, stale data, wrong suggested angle — the CPM looks uninformed to the client. That's worse than the tool not existing. The mitigation is human-in-the-loop: the CPM always edits before sending. And we build signal freshness checks into the enrichment layer.

Number two — gimmicky solution. AI theater. Looks great in a demo but doesn't move pipeline. The mitigation is concrete: track outreach-to-meeting conversion, not tool usage. If there's no pipeline correlation after 90 days, kill it.

Three — low adoption. CPMs don't change behavior. That's why the tool answers their three natural questions in under 60 seconds. It's not new work, it's replacing research they'd do manually.

Four — data quality. The POC uses mocked CRM data. In production, stale signals are a real problem. CRM integration in Phase 2 and signal recency scoring address this.

Five — funnel bottleneck. If we expand the top of the funnel but meeting prep and proposals can't keep up, we'll choke. That's intentional sequencing — this tool first, downstream optimization later.

*[Point to right — roadmap]*

The product roadmap is four phases. P1 is what you just saw — the POC proving the concept with mocked CRM and live AI. P2 closes the data gap — live CRM integration, analytics dashboard, and prompt tuning from CPM feedback. P3 adds the full enrichment stack — Sales Navigator, ZoomInfo, email and calendar signals. P4 layers ML scoring on top once we have 6 to 12 months of conversion data. The ML model ranks, the LLM explains. They work together.

*[Pause]*

That's the presentation. The gap between what AI can do and what GTM teams actually use it for is enormous. This tool shows what's possible when you start with the highest-impact problem and build something a seller would actually use. Happy to take questions."

---

## NOTES FOR Q&A PREPARATION

**If they ask about your AI experience:** Capital One IRIS story — evaluated 3 AI architectures, built Python prototype, secured roadmap inclusion, $380K projected savings.

**If they ask about adoption strategy:** "I'd start with 3-5 CPMs as a pilot. Not the top performers — they already have their own system. The middle-tier CPMs who want to improve but lack the tools. Measure their expansion activity before and after. Use their results to build the case for broader rollout."

**If they ask about cost:** "API costs are cents per query. The real cost is integration time — 4-8 weeks for CRM, longer for Sales Navigator. But the tool works in standalone mode from day one."

**If they ask why not use existing tools:** "CRM systems track what happened. This tool predicts what should happen next. Clari and Gong analyze existing pipeline — this creates new pipeline from untapped white space. Different problem entirely."

**If they ask about the scoring methodology:** "The LLM scores on interpretable signals — role fit, tenure recency, team growth, proximity to existing stakeholders, budget authority. Each score comes with a written rationale. After 6-12 months, we'd train a gradient boosted model on which prospects actually converted, then use ML to rank and LLM to explain."
