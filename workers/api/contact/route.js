import { validateContactPayload } from './validation/contact.js';
import { sendContactEmail } from './email/resend.js';
import { createContact, createPrayerRequest, createVisitor, createVolunteer } from './db.js';

const json = (body, status = 200, origin) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }
});

const rateLimit = new Map();
async function isRateLimited(request, env) {
  const key = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (env.RATE_LIMIT_KV) {
    const bucket = `contact:${key}:${Math.floor(Date.now() / 60000)}`;
    const count = Number(await env.RATE_LIMIT_KV.get(bucket) || 0) + 1;
    await env.RATE_LIMIT_KV.put(bucket, String(count), { expirationTtl: 120 });
    return count > 5;
  }
  const now = Date.now();
  const recent = (rateLimit.get(key) || []).filter((time) => now - time < 60_000);
  recent.push(now);
  rateLimit.set(key, recent);
  return recent.length > 5;
}

export async function handleContact(request, env) {
  const origin = request.headers.get('Origin') || 'https://cla.city';
  const allowed = (env.ALLOWED_ORIGINS || 'https://cla.city,https://www.cla.city').split(',');
  if (request.headers.get('Origin') && !allowed.includes(request.headers.get('Origin'))) return json({ error: 'Forbidden.' }, 403, allowed[0]);
  if (request.method === 'OPTIONS') return json({}, 204, origin);
  if (request.method !== 'POST') return json({ error: 'Invalid request.' }, 400, origin);
  if (await isRateLimited(request, env)) return json({ error: 'Rate limited.' }, 429, origin);
  let payload;
  try { payload = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400, origin); }
  const result = validateContactPayload(payload);
  if (!result.ok) return json({ error: result.error }, result.status, origin);
  let savedContact;
  try { savedContact = await createContact(result.value, env); }
  catch { return json({ error: 'Internal server error.' }, 500, origin); }
  if (result.value.category === 'prayer') {
    try { await createPrayerRequest(result.value, savedContact.id, env); }
    catch { return json({ error: 'Internal server error.' }, 500, origin); }
  }
  if (result.value.category === 'visit') {
    try { await createVisitor(result.value, savedContact.id, env); }
    catch { return json({ error: 'Internal server error.' }, 500, origin); }
  }
  if (result.value.category === 'volunteer') {
    try { await createVolunteer(result.value, savedContact.id, env); }
    catch { return json({ error: 'Internal server error.' }, 500, origin); }
  }
  try { await sendContactEmail(result.value, env); return json({ success: true, id: savedContact.id }, 200, origin); }
  catch { return json({ error: 'Internal server error.' }, 500, origin); }
}
