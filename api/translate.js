// Vercel serverless function: proxy to Google Cloud Translation API.
// Keeps the API key server-side. Used by blog article pages for on-demand translation.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }

  const key = process.env.GOOGLE_TRANSLATE_KEY;
  if (!key) { res.status(500).json({ error: 'GOOGLE_TRANSLATE_KEY not set' }); return; }

  try {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    const q = body && body.q;
    const target = body && body.target;
    if (!q || !target) { res.status(400).json({ error: 'q and target required' }); return; }

    const r = await fetch('https://translation.googleapis.com/language/translate/v2?key=' + encodeURIComponent(key), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: q, target: target, source: 'en', format: (body.format || 'html') })
    });
    const data = await r.json();
    if (!r.ok) { res.status(r.status).json(data); return; }
    const out = (data.data && data.data.translations) ? data.data.translations.map(function (t) { return t.translatedText; }) : [];
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).json({ translations: out });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
