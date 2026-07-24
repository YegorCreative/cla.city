import { login, clearSession, requireSession } from './service.js';
const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } });
export async function handleAuth(request, env) {
  const url = new URL(request.url);
  if (request.method === 'POST' && url.pathname === '/api/admin/login') {
    try { const body = await request.json(); const result = await login(body.email || '', body.password || '', env); return result ? json({ success: true, role: result.user.role }, 200, { 'Set-Cookie': result.cookie }) : json({ error: 'Invalid credentials.' }, 401); } catch { return json({ error: 'Invalid request.' }, 400); }
  }
  if (request.method === 'POST' && url.pathname === '/api/admin/logout') return json({ success: true }, 200, { 'Set-Cookie': clearSession(env) });
  return json({ error: 'Unauthorized.' }, 401);
}
export { requireSession };
