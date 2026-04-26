// Vercel serverless function — proxies requests to Anthropic API
// The ANTHROPIC_API_KEY environment variable is set in Vercel project settings
// and is NEVER exposed to the client

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { systemPrompt, userPrompt } = req.body;

  if (!systemPrompt || !userPrompt) {
    return res.status(400).json({ error: 'Missing systemPrompt or userPrompt' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

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

    if (!response.ok) {
      console.error('Anthropic API error:', JSON.stringify(data));
      return res.status(response.status).json({
        error: data.error?.message || 'Anthropic API request failed',
      });
    }

    const text =
      data.content?.map((b) => b.text || '').join('\n') ||
      'Error: empty response from API.';

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
