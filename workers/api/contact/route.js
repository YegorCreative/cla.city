import { validateContactPayload } from './validation/contact.js';
import { sendContactEmail } from './email/resend.js';
import { createContact } from './db.js';

const json = (body, status = 200, origin = '*') => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }
});

const rateLimit = new Map();
function isRateLimited(request) {
  const key = request.headers.get('CF-Connecting-IP') || 'unknown';
  const now = Date.now();
  const recent = (rateLimit.get(key) || []).filter((time) => now - time < 60_000);
  recent.push(now);
  rateLimit.set(key, recent);
  return recent.length > 5;
}

export async function handleContact(request, env) {
  const origin = env.ALLOWED_ORIGIN || '*';
  if (request.method === 'OPTIONS') return json({}, 204, origin);
  if (request.method !== 'POST') return json({ error: 'Invalid request.' }, 400, origin);
  if (isRateLimited(request)) return json({ error: 'Rate limited.' }, 429, origin);
  let payload;
  try { payload = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400, origin); }
  const result = validateContactPayload(payload);
  if (!result.ok) return json({ error: result.error }, result.status, origin);
  let savedContact;
  try { savedContact = await createContact(result.value, env); }
  catch { return json({ error: 'Internal server error.' }, 500, origin); }
  try { await sendContactEmail(result.value, env); return json({ success: true, id: savedContact.id }, 200, origin); }
  catch { return json({ error: 'Internal server error.' }, 500, origin); }
}
