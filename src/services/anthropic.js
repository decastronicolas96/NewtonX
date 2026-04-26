// Client-side wrapper for the Anthropic API call via Vercel serverless function
// The actual API key lives server-side in api/generate.js — never exposed to the client

export async function generateOutreach({ type, prospect, account, stakeholder }) {
  const systemPrompt = `You are a sales outreach expert for NewtonX, a B2B research company. Write a ${
    type === 'email'
      ? 'professional email'
      : 'LinkedIn connection message (under 280 characters)'
  } for a Client Partnership Manager to send to a new expansion prospect.

Rules:
- Be concise and specific. No fluff.
- Reference the existing relationship at the company naturally — don't be heavy-handed about it.
- Lead with relevance to THEIR challenges, not NewtonX's capabilities.
- ${
    type === 'email'
      ? "Include subject line on the first line prefixed with 'Subject: '. Keep body under 150 words."
      : 'Keep it under 280 characters. Be direct and personal.'
  }
- Sound like a smart human, not a bot. No "I hope this finds you well."
- No exclamation marks.`;

  const userPrompt = `Company: ${account.company}
Prospect: ${prospect.name}, ${prospect.title}, ${prospect.dept}
Previous role: ${prospect.prevRole}
Key signals: ${prospect.signals.join('; ')}
Suggested angle: ${prospect.angle}
Intro type: ${prospect.intro}
${
  prospect.intro === 'warm'
    ? `Warm intro path: ${prospect.proximity}`
    : 'Cold outreach — no existing connection.'
}
Existing stakeholder at ${account.company}: ${stakeholder.name}, ${stakeholder.title} (${stakeholder.projects} projects completed together)
CPM name: ${account.cpm}
NewtonX value prop: We connect enterprise clients with verified industry experts for surveys, interviews, and consulting. 1.1 billion professional network, 100% ID-verified.`;

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, userPrompt }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `API error ${response.status}`);
  }

  const data = await response.json();
  return data.text;
}
