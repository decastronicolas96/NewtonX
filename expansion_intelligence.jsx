import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════
const ACCOUNTS = [
  {
    id: "acc_msft",
    company: "Microsoft",
    industry: "Technology",
    employees: 228000,
    revenue: 340000,
    tier: "Enterprise",
    cpm: "Sarah Chen",
    since: "2022-03",
    projects: 8,
    ltv: 920000,
    engaged: 2,
    relevant: 12,
    penetration: 17,
    stakeholders: [
      {
        id: "stk_001", name: "Michael Rivera", title: "Director of Market Research", dept: "Cloud & AI", division: "Microsoft Cloud",
        strength: 5, lastContact: "Apr 18, 2026", projects: 5, channel: "Inbound", referralPotential: "High",
        history: [
          { name: "Azure AI Adoption Study", date: "Feb 2026", type: "Survey (n=500)", value: 85000 },
          { name: "Cloud Migration Decision Makers", date: "Aug 2025", type: "Expert Consults (12)", value: 45000 },
          { name: "Competitive Positioning vs AWS/GCP", date: "Mar 2025", type: "Survey + IDIs", value: 72000 },
          { name: "Azure Developer Experience", date: "Sep 2024", type: "Survey (n=200)", value: 38000 },
          { name: "Cloud Security Buyer Journey", date: "Jun 2022", type: "Expert Consults (8)", value: 32000 },
        ]
      },
      {
        id: "stk_002", name: "Lisa Patel", title: "Senior Research Manager", dept: "Devices & Creativity", division: "Experiences & Devices",
        strength: 3, lastContact: "Jan 10, 2026", projects: 3, channel: "Referral", referralPotential: "Medium",
        history: [
          { name: "Surface Enterprise Adoption", date: "Nov 2025", type: "Survey (n=400)", value: 55000 },
          { name: "Hybrid Work Hardware Needs", date: "Aug 2024", type: "Expert Consults (10)", value: 38000 },
          { name: "Copilot+ PC Market Sizing", date: "Nov 2023", type: "Survey (n=250)", value: 42000 },
        ]
      }
    ],
    prospects: [
      {
        id: "prs_004", name: "Raj Mehta", title: "Director of Strategy", dept: "Azure Data & AI", division: "Microsoft Cloud",
        tenure: "1 year", prevRole: "Principal, McKinsey & Company", score: 95, priority: "Very High",
        signals: ["Ex-McKinsey — values structured B2B research", "Azure AI revenue grew 60%+ YoY", "Same division as existing contact Michael Rivera", "Azure competing with Snowflake, Databricks"],
        proximity: "Same Microsoft Cloud division as Michael Rivera. Warm introduction very likely.",
        fit: "Ex-consulting background means he knows and values structured B2B research. Strategy roles are core NewtonX buyers.",
        angle: "Market sizing for Azure AI platform vs Snowflake/Databricks — reference existing Cloud & AI relationship",
        intro: "warm"
      },
      {
        id: "prs_001", name: "Jennifer Walsh", title: "VP of Product Marketing", dept: "Microsoft 365", division: "Experiences & Devices",
        tenure: "2 years", prevRole: "Dir. of Product Marketing, Salesforce", score: 90, priority: "Very High",
        signals: ["Team posted 3 PMM roles in last 60 days", "M365 Copilot entering crowded market vs Google Workspace", "Spoke at Enterprise Connect 2026 on data-driven positioning"],
        proximity: "Lisa Patel is in the same Experiences & Devices division — warm intro possible.",
        fit: "Product Marketing is a core NewtonX buyer persona. Competitive positioning and buyer perception surveys are exactly what we deliver.",
        angle: "Competitive positioning of M365 Copilot vs Google Workspace Gemini",
        intro: "warm"
      },
      {
        id: "prs_002", name: "David Kim", title: "Director of Competitive Intelligence", dept: "Gaming & Xbox", division: "Gaming",
        tenure: "8 months", prevRole: "Sr. Manager, Market Intelligence at Sony", score: 85, priority: "High",
        signals: ["Recently hired from Sony — building new CI function", "Activision integration creating market understanding needs", "Posted a CI Analyst role last month — team scaling"],
        proximity: "No direct connection to existing stakeholders. Cold outreach required.",
        fit: "New CI function with budget. Coming from Sony where expert networks are commonly used.",
        angle: "Competitive landscape study to build the CI foundation for the new gaming intelligence function",
        intro: "cold"
      },
      {
        id: "prs_003", name: "Amanda Torres", title: "Head of Customer Insights", dept: "LinkedIn", division: "LinkedIn",
        tenure: "3 years", prevRole: "Director of Research, HubSpot", score: 88, priority: "High",
        signals: ["LinkedIn has independent P&L and research budget", "Marketing Solutions facing competition from Meta B2B targeting", "Team of ~8 researchers — established function", "Published on 'AI in B2B buyer research'"],
        proximity: "LinkedIn operates semi-independently. Michael Rivera knows the broader research community — warm intro possible but not guaranteed.",
        fit: "Established research function with budget and ongoing needs. HubSpot background suggests familiarity with external research vendors.",
        angle: "B2B buyer persona research for LinkedIn Marketing Solutions",
        intro: "warm"
      },
      {
        id: "prs_005", name: "Catherine Liu", title: "Sr. Director, Product Marketing", dept: "Microsoft Security", division: "Microsoft Cloud",
        tenure: "4 years", prevRole: "Dir. of Product Marketing, CrowdStrike", score: 82, priority: "High",
        signals: ["Microsoft Security is a $20B+ business", "Cybersecurity market intensely competitive", "CrowdStrike background — used to research vendors"],
        proximity: "Same Microsoft Cloud division as Michael Rivera. Moderate connection.",
        fit: "PMM leader in high-growth business with competitive dynamics demanding ongoing research.",
        angle: "CISO buyer journey research — reference existing cloud security work with Michael Rivera's team",
        intro: "warm"
      },
      {
        id: "prs_006", name: "Marcus Johnson", title: "VP of Market Research", dept: "Microsoft Advertising", division: "Search, Ads & News",
        tenure: "5 years", prevRole: "Director of Research, Verizon Media", score: 72, priority: "Medium",
        signals: ["Microsoft Advertising growing with AI (Copilot Ads)", "Retail media is high-growth area", "Long tenure — established vendor relationships"],
        proximity: "No direct connection. Different division entirely. Cold outreach required.",
        fit: "Established research leader but long tenure means existing vendor relationships may be entrenched.",
        angle: "NewtonX's advertising research strength — reference case studies with social media and ad tech clients",
        intro: "cold"
      }
    ],
    whiteSpace: {
      engaged: [
        { dept: "Cloud & AI", status: "active" },
        { dept: "Devices & Creativity", status: "cooling" }
      ],
      targeted: ["Microsoft 365", "Gaming & Xbox", "LinkedIn", "Azure Data & AI", "Microsoft Security", "Microsoft Advertising"],
      unmapped: ["Teams Platform", "GitHub", "Dynamics 365", "Azure Infrastructure"]
    }
  },
  {
    id: "acc_airw",
    company: "Airwallex",
    industry: "Fintech",
    employees: 1800,
    revenue: 85000,
    tier: "Growth",
    cpm: "Sarah Chen",
    since: "2025-01",
    projects: 2,
    ltv: 85000,
    engaged: 1,
    relevant: 5,
    penetration: 20,
    stakeholders: [
      {
        id: "stk_003", name: "Priya Sharma", title: "Head of Product Marketing", dept: "Product Marketing", division: "Marketing",
        strength: 4, lastContact: "Mar 22, 2026", projects: 2, channel: "Outbound", referralPotential: "High",
        history: [
          { name: "SMB Payments Buyer Persona Study", date: "Jan 2026", type: "Survey + IDIs", value: 52000 },
          { name: "Competitive Positioning vs Wise/Stripe", date: "Jan 2025", type: "Survey (n=200)", value: 33000 },
        ]
      }
    ],
    prospects: [
      {
        id: "prs_007", name: "Thomas Wright", title: "VP of Strategy & Corp Dev", dept: "Strategy", division: "Executive",
        tenure: "1.5 years", prevRole: "Director, Strategy & M&A at Adyen", score: 93, priority: "Very High",
        signals: ["Airwallex raised $100M in 2024", "Ex-Adyen — knows payments landscape", "Expanding into Japan and Middle East", "Strategy roles commission market sizing studies"],
        proximity: "Priya Sharma is in the same leadership layer — warm intro highly likely.",
        fit: "Strategy + Corp Dev with expansion mandate. Classic NewtonX buyer. Ex-payments means he values data-driven market entry.",
        angle: "Market entry research for Japan/Middle East expansion — warm intro through Priya Sharma",
        intro: "warm"
      },
      {
        id: "prs_008", name: "Nina Kowalski", title: "Director of Product, Platform", dept: "Product — Platform", division: "Product & Engineering",
        tenure: "2 years", prevRole: "Senior PM, Stripe Connect", score: 78, priority: "Medium-High",
        signals: ["Embedded finance is high-growth segment", "Product teams need market validation for API products", "Ex-Stripe — data-driven product decisions"],
        proximity: "Different division from Priya Sharma but small company — likely knows each other.",
        fit: "Product roles buy research less frequently but projects tend to be high-value (market sizing, PMF studies).",
        angle: "Developer experience benchmarking — Airwallex API vs Stripe, Adyen, Wise from developer perspective",
        intro: "warm"
      },
      {
        id: "prs_009", name: "Sarah Mitchell", title: "Head of Revenue Operations", dept: "Revenue Operations", division: "Go-to-Market",
        tenure: "10 months", prevRole: "RevOps Manager, Brex", score: 65, priority: "Medium",
        signals: ["Newly created role — building GTM infrastructure", "RevOps leaders commission win/loss analysis", "Enterprise sales push needs buyer journey understanding"],
        proximity: "GTM org — Priya Sharma's PMM feeds into GTM. Clear connection.",
        fit: "RevOps buys research less frequently, but win/loss analysis and buyer journey studies are high-value.",
        angle: "Enterprise buyer journey mapping — how CFOs at $500M+ companies evaluate payment platforms",
        intro: "warm"
      }
    ],
    whiteSpace: {
      engaged: [{ dept: "Product Marketing", status: "active" }],
      targeted: ["Strategy", "Product — Platform", "Revenue Operations"],
      unmapped: ["Enterprise Sales", "Compliance & Risk"]
    }
  }
];

// ═══════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════
const fonts = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const colors = {
  bg: "#0f1117",
  sidebar: "#161820",
  card: "#1c1e27",
  cardHover: "#22242f",
  border: "#2a2d3a",
  borderLight: "#353849",
  text: "#e4e4e8",
  textMuted: "#8b8d98",
  textDim: "#5f6170",
  accent: "#4f8cff",
  accentDim: "#2a4a8a",
  green: "#34c759",
  greenDim: "#1a3a2a",
  greenBg: "#0d2818",
  yellow: "#f0b429",
  yellowDim: "#3a2e10",
  yellowBg: "#2a2008",
  gray: "#3a3d4a",
  grayBg: "#1a1c24",
  red: "#ff453a",
  purple: "#a78bfa",
  warm: "#34c759",
  cold: "#f0b429",
};

// ═══════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════

const ScoreBadge = ({ score }) => {
  const bg = score >= 90 ? colors.greenBg : score >= 80 ? colors.yellowBg : colors.grayBg;
  const border = score >= 90 ? colors.green : score >= 80 ? colors.yellow : colors.textDim;
  const color = score >= 90 ? colors.green : score >= 80 ? colors.yellow : colors.textMuted;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "42px", height: "26px", borderRadius: "6px", background: bg, border: `1px solid ${border}30`, color, fontSize: "13px", fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>
      {score}
    </span>
  );
};

const PriorityTag = ({ priority }) => {
  const map = { "Very High": colors.green, "High": colors.accent, "Medium-High": colors.yellow, "Medium": colors.textMuted };
  const c = map[priority] || colors.textMuted;
  return <span style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.5px", color: c, fontWeight: 500 }}>{priority}</span>;
};

const IntroTag = ({ type }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px", fontFamily: "'DM Mono', monospace",
    color: type === "warm" ? colors.warm : colors.cold, padding: "2px 8px", borderRadius: "4px",
    background: type === "warm" ? `${colors.warm}15` : `${colors.cold}15`, border: `1px solid ${type === "warm" ? colors.warm : colors.cold}25`
  }}>
    {type === "warm" ? "◉" : "○"} {type}
  </span>
);

const StatBox = ({ label, value, sub }) => (
  <div style={{ padding: "12px 0", borderBottom: `1px solid ${colors.border}` }}>
    <div style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "4px" }}>{label}</div>
    <div style={{ fontSize: "20px", fontWeight: 700, color: colors.text, fontFamily: "'DM Sans', sans-serif" }}>{value}</div>
    {sub && <div style={{ fontSize: "11px", color: colors.textMuted, marginTop: "2px" }}>{sub}</div>}
  </div>
);

const DeptBlock = ({ dept, status }) => {
  const bg = status === "active" ? colors.greenBg : status === "cooling" ? `${colors.yellow}18` : status === "targeted" ? `${colors.accent}12` : colors.grayBg;
  const border = status === "active" ? `${colors.green}40` : status === "cooling" ? `${colors.yellow}30` : status === "targeted" ? `${colors.accent}30` : `${colors.textDim}20`;
  const dot = status === "active" ? colors.green : status === "cooling" ? colors.yellow : status === "targeted" ? colors.accent : colors.textDim;
  const label = status === "active" ? "Engaged" : status === "cooling" ? "Cooling" : status === "targeted" ? "Target" : "Unmapped";
  return (
    <div style={{ padding: "10px 12px", borderRadius: "8px", background: bg, border: `1px solid ${border}`, minWidth: 0 }}>
      <div style={{ fontSize: "12px", fontWeight: 600, color: colors.text, marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dept}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: dot, flexShrink: 0 }} />
        <span style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</span>
      </div>
    </div>
  );
};

const StakeholderCard = ({ s }) => (
  <div style={{ padding: "12px", borderRadius: "8px", background: colors.card, border: `1px solid ${colors.border}`, marginBottom: "8px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "6px" }}>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 600, color: colors.text }}>{s.name}</div>
        <div style={{ fontSize: "11px", color: colors.textMuted }}>{s.title} · {s.dept}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span style={{ fontSize: "9px", fontFamily: "'DM Mono', monospace", color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.3px", marginRight: "2px" }}>Str</span>
        {[1,2,3,4,5].map(i => (
          <span key={i} style={{ width: "8px", height: "8px", borderRadius: "2px", background: i <= s.strength ? colors.green : colors.gray }} />
        ))}
      </div>
    </div>
    <div style={{ fontSize: "11px", color: colors.textDim }}>
      Last contact: {s.lastContact} · {s.projects} projects · {s.channel}
    </div>
  </div>
);

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════

export default function ExpansionIntelligence() {
  const [selectedAccountId, setSelectedAccountId] = useState(ACCOUNTS[0].id);
  const [selectedProspectId, setSelectedProspectId] = useState(null);
  const [centerTab, setCenterTab] = useState("prospects");
  const [outreach, setOutreach] = useState(null);
  const [outreachLoading, setOutreachLoading] = useState(false);
  const [outreachType, setOutreachType] = useState("email");

  const account = ACCOUNTS.find(a => a.id === selectedAccountId);
  const prospect = account?.prospects.find(p => p.id === selectedProspectId);

  useEffect(() => {
    setSelectedProspectId(null);
    setOutreach(null);
    setCenterTab("prospects");
  }, [selectedAccountId]);

  useEffect(() => {
    setOutreach(null);
  }, [selectedProspectId]);

  const generateOutreach = async () => {
    if (!prospect || !account) return;
    setOutreachLoading(true);
    setOutreach(null);

    const existingStakeholder = account.stakeholders[0];
    const systemPrompt = `You are a sales outreach expert for NewtonX, a B2B research company. Write a ${outreachType === "email" ? "professional email" : "LinkedIn connection message (under 280 characters)"} for a Client Partnership Manager to send to a new expansion prospect.

Rules:
- Be concise and specific. No fluff.
- Reference the existing relationship at the company naturally (don't be heavy-handed).
- Lead with relevance to THEIR challenges, not NewtonX's capabilities.
- ${outreachType === "email" ? "Include subject line on first line prefixed with 'Subject: '. Keep body under 150 words." : "Keep it under 280 characters. Be direct and personal."}
- Sound like a smart human, not a bot. No "I hope this finds you well."
- Don't use exclamation marks.`;

    const userPrompt = `Company: ${account.company}
Prospect: ${prospect.name}, ${prospect.title}, ${prospect.dept}
Previous role: ${prospect.prevRole}
Key signals: ${prospect.signals.join("; ")}
Suggested angle: ${prospect.angle}
Intro type: ${prospect.intro}
${prospect.intro === "warm" ? `Warm intro path: ${prospect.proximity}` : "Cold outreach — no existing connection."}
Existing stakeholder: ${existingStakeholder.name}, ${existingStakeholder.title} (${existingStakeholder.projects} projects completed)
CPM name: ${account.cpm}
NewtonX value prop: We connect enterprise clients with verified industry experts for surveys, interviews, and consulting. 1.1 billion professional network, 100% ID-verified.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("\n") || "Error generating outreach.";
      setOutreach(text);
    } catch (e) {
      setOutreach("Error: Could not connect to AI service. In production, this generates personalized outreach in real time.");
    }
    setOutreachLoading(false);
  };

  // All departments for the white space view
  const allDepts = [
    ...account.whiteSpace.engaged.map(e => ({ dept: e.dept, status: e.status })),
    ...account.whiteSpace.targeted.map(t => ({ dept: t, status: "targeted" })),
    ...account.whiteSpace.unmapped.map(u => ({ dept: u, status: "unmapped" })),
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: colors.bg, color: colors.text, minHeight: "100vh", display: "flex" }}>
      <style>{fonts}</style>

      {/* ─── LEFT SIDEBAR ─── */}
      <div style={{ width: "260px", minWidth: "260px", background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: "20px 16px", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ fontSize: "14px", fontWeight: 700, color: colors.accent, letterSpacing: "-0.3px", marginBottom: "4px" }}>Expansion Intelligence</div>
        <div style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: colors.textDim, marginBottom: "20px" }}>NewtonX · CPM Dashboard</div>

        {/* Account Selector */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "8px" }}>Account</div>
          {ACCOUNTS.map(a => (
            <button key={a.id} onClick={() => setSelectedAccountId(a.id)} style={{
              display: "block", width: "100%", textAlign: "left", padding: "10px 12px", marginBottom: "4px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: a.id === selectedAccountId ? `${colors.accent}18` : "transparent",
              outline: a.id === selectedAccountId ? `1px solid ${colors.accent}40` : "none",
            }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: a.id === selectedAccountId ? colors.accent : colors.text }}>{a.company}</div>
              <div style={{ fontSize: "11px", color: colors.textMuted }}>{a.industry} · {a.tier}</div>
            </button>
          ))}
        </div>

        {/* Account Stats */}
        <StatBox label="Penetration" value={`${account.penetration}%`} sub={`${account.engaged} of ${account.relevant} depts engaged`} />
        <StatBox label="Lifetime Value" value={`$${(account.ltv / 1000).toFixed(0)}K`} sub={`${account.projects} projects completed`} />
        <StatBox label="Annual Revenue" value={`$${(account.revenue / 1000).toFixed(0)}K`} sub={`Since ${account.since}`} />
        <StatBox label="Expansion Targets" value={account.prospects.length} sub={`${account.prospects.filter(p => p.score >= 90).length} very high priority`} />

        {/* Stakeholders */}
        <div style={{ marginTop: "16px" }}>
          <div style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "8px" }}>Current Stakeholders</div>
          {account.stakeholders.map(s => <StakeholderCard key={s.id} s={s} />)}
        </div>
      </div>

      {/* ─── CENTER ─── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: "0", borderBottom: `1px solid ${colors.border}`, background: colors.sidebar }}>
          {[
            { key: "prospects", label: "Prospect List" },
            { key: "whitespace", label: "White Space Map" },
          ].map(tab => (
            <button key={tab.key} onClick={() => setCenterTab(tab.key)} style={{
              padding: "14px 24px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600,
              background: "transparent", color: centerTab === tab.key ? colors.accent : colors.textMuted,
              borderBottom: centerTab === tab.key ? `2px solid ${colors.accent}` : "2px solid transparent",
              transition: "all 0.15s"
            }}>
              {tab.label}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ padding: "14px 20px", fontSize: "12px", color: colors.textDim, fontFamily: "'DM Mono', monospace" }}>
            CPM: {account.cpm}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", display: "flex" }}>
          {/* Center Content */}
          <div style={{ flex: 1, padding: "20px", overflowY: "auto", minWidth: 0 }}>
            {centerTab === "prospects" ? (
              <div>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: colors.text, marginBottom: "4px" }}>
                    Expansion Targets — {account.company}
                  </div>
                  <div style={{ fontSize: "13px", color: colors.textMuted }}>
                    {account.prospects.length} prospects identified across {new Set(account.prospects.map(p => p.division)).size} divisions. Ranked by expansion fit score.
                  </div>
                </div>

                {account.prospects.sort((a, b) => b.score - a.score).map(p => (
                  <div key={p.id} onClick={() => setSelectedProspectId(p.id)} style={{
                    padding: "16px", borderRadius: "10px", marginBottom: "8px", cursor: "pointer",
                    background: selectedProspectId === p.id ? `${colors.accent}12` : colors.card,
                    border: `1px solid ${selectedProspectId === p.id ? colors.accent + "40" : colors.border}`,
                    transition: "all 0.15s"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "3px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "15px", fontWeight: 600, color: colors.text }}>{p.name}</span>
                          <PriorityTag priority={p.priority} />
                          <IntroTag type={p.intro} />
                        </div>
                        <div style={{ fontSize: "12px", color: colors.textMuted }}>{p.title} · {p.dept}</div>
                        <div style={{ fontSize: "11px", color: colors.textDim, marginTop: "2px" }}>Previously: {p.prevRole}</div>
                      </div>
                      <ScoreBadge score={p.score} />
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
                      {p.signals.slice(0, 2).map((s, i) => (
                        <span key={i} style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "4px", background: `${colors.accent}10`, color: colors.accent, border: `1px solid ${colors.accent}20` }}>
                          {s.length > 60 ? s.substring(0, 57) + "..." : s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: colors.text, marginBottom: "4px" }}>
                    White Space — {account.company}
                  </div>
                  <div style={{ fontSize: "13px", color: colors.textMuted }}>
                    {account.engaged} engaged · {account.whiteSpace.targeted.length} targeted · {account.whiteSpace.unmapped.length} unmapped
                  </div>
                </div>

                {/* Penetration Bar */}
                <div style={{ marginBottom: "24px", padding: "16px", background: colors.card, borderRadius: "10px", border: `1px solid ${colors.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: colors.text }}>Account Penetration</span>
                    <span style={{ fontSize: "13px", fontFamily: "'DM Mono', monospace", color: colors.accent, fontWeight: 600 }}>{account.penetration}%</span>
                  </div>
                  <div style={{ height: "8px", borderRadius: "4px", background: colors.gray, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${account.penetration}%`, background: `linear-gradient(90deg, ${colors.green}, ${colors.accent})`, borderRadius: "4px", transition: "width 0.5s" }} />
                  </div>
                  <div style={{ fontSize: "12px", color: colors.textMuted, marginTop: "8px" }}>
                    {account.relevant - account.engaged} departments with potential NewtonX buyers not yet engaged
                  </div>
                </div>

                {/* Legend */}
                <div style={{ display: "flex", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
                  {[
                    { label: "Engaged", color: colors.green },
                    { label: "Cooling", color: colors.yellow },
                    { label: "Target Identified", color: colors.accent },
                    { label: "Unmapped", color: colors.textDim },
                  ].map(l => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "3px", background: l.color }} />
                      <span style={{ fontSize: "11px", color: colors.textMuted, fontFamily: "'DM Mono', monospace" }}>{l.label}</span>
                    </div>
                  ))}
                </div>

                {/* Department Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "8px" }}>
                  {allDepts.map((d, i) => (
                    <div key={i} onClick={() => {
                      if (d.status === "targeted") {
                        const p = account.prospects.find(p => p.dept === d.dept);
                        if (p) { setCenterTab("prospects"); setSelectedProspectId(p.id); }
                      }
                    }} style={{ cursor: d.status === "targeted" ? "pointer" : "default" }}>
                      <DeptBlock dept={d.dept} status={d.status} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── RIGHT PANEL ─── */}
          {prospect && (
            <div style={{ width: "380px", minWidth: "380px", borderLeft: `1px solid ${colors.border}`, background: colors.sidebar, overflowY: "auto", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: colors.text }}>{prospect.name}</div>
                  <div style={{ fontSize: "12px", color: colors.textMuted, marginTop: "2px" }}>{prospect.title}</div>
                  <div style={{ fontSize: "12px", color: colors.textDim }}>{prospect.dept} · {prospect.division}</div>
                </div>
                <button onClick={() => { setSelectedProspectId(null); setOutreach(null); }} style={{ background: "none", border: "none", color: colors.textDim, cursor: "pointer", fontSize: "18px", padding: "4px" }}>×</button>
              </div>

              <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                <ScoreBadge score={prospect.score} />
                <PriorityTag priority={prospect.priority} />
                <IntroTag type={prospect.intro} />
              </div>

              {/* Signals */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "8px" }}>Signals</div>
                {prospect.signals.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "start" }}>
                    <span style={{ color: colors.accent, fontSize: "10px", marginTop: "3px", flexShrink: 0 }}>▸</span>
                    <span style={{ fontSize: "12px", color: colors.text, lineHeight: 1.4 }}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Proximity */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "6px" }}>Intro Path</div>
                <div style={{ fontSize: "12px", color: colors.textMuted, lineHeight: 1.5, padding: "10px 12px", background: colors.card, borderRadius: "8px", border: `1px solid ${colors.border}` }}>
                  {prospect.proximity}
                </div>
              </div>

              {/* Fit Rationale */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "6px" }}>Fit Rationale</div>
                <div style={{ fontSize: "12px", color: colors.textMuted, lineHeight: 1.5 }}>{prospect.fit}</div>
              </div>

              {/* Suggested Angle */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "6px" }}>Suggested Angle</div>
                <div style={{ fontSize: "12px", color: colors.accent, lineHeight: 1.5, fontWeight: 500 }}>{prospect.angle}</div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: colors.border, margin: "8px 0 20px" }} />

              {/* Outreach Generation */}
              <div>
                <div style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "10px" }}>Generate Outreach</div>

                <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                  {["email", "linkedin"].map(t => (
                    <button key={t} onClick={() => { setOutreachType(t); setOutreach(null); }} style={{
                      padding: "6px 14px", borderRadius: "6px", border: `1px solid ${outreachType === t ? colors.accent : colors.border}`,
                      background: outreachType === t ? `${colors.accent}18` : "transparent",
                      color: outreachType === t ? colors.accent : colors.textMuted, fontSize: "12px", fontWeight: 500, cursor: "pointer"
                    }}>
                      {t === "email" ? "Email" : "LinkedIn"}
                    </button>
                  ))}
                </div>

                <button onClick={generateOutreach} disabled={outreachLoading} style={{
                  width: "100%", padding: "10px", borderRadius: "8px", border: "none", cursor: outreachLoading ? "wait" : "pointer",
                  background: outreachLoading ? colors.accentDim : colors.accent, color: "#fff", fontSize: "13px", fontWeight: 600,
                  transition: "all 0.15s"
                }}>
                  {outreachLoading ? "Generating..." : `Draft ${outreachType === "email" ? "Email" : "LinkedIn Message"}`}
                </button>

                {outreach && (
                  <div style={{ marginTop: "12px", padding: "14px", borderRadius: "8px", background: colors.card, border: `1px solid ${colors.border}`, fontSize: "12px", color: colors.text, lineHeight: 1.6, whiteSpace: "pre-wrap", fontFamily: "'DM Sans', sans-serif" }}>
                    {outreach}
                  </div>
                )}
              </div>

              {/* Previous Role */}
              <div style={{ marginTop: "20px", padding: "12px", borderRadius: "8px", background: `${colors.purple}08`, border: `1px solid ${colors.purple}15` }}>
                <div style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: colors.purple, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "4px" }}>Background</div>
                <div style={{ fontSize: "12px", color: colors.textMuted }}>
                  <span style={{ fontWeight: 500, color: colors.text }}>Previous:</span> {prospect.prevRole}
                </div>
                <div style={{ fontSize: "12px", color: colors.textMuted, marginTop: "2px" }}>
                  <span style={{ fontWeight: 500, color: colors.text }}>Tenure:</span> {prospect.tenure} in current role
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
