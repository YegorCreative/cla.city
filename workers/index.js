import { handleContact } from './api/contact/route.js';
import { handleAdminContacts } from './api/admin/contacts/route.js';
import { handleAuth, requireSession } from './api/auth/route.js';
import { handleAdminPrayer } from './api/admin/prayer/route.js';
import { handleAdminVisitors } from './api/admin/visitors/route.js';
import { handleAdminVolunteers } from './api/admin/volunteers/route.js';
import { handleDashboard } from './api/admin/dashboard/route.js';
import { handleCrmContacts } from './api/admin/crm/route.js';
import { handleTasks } from './api/admin/tasks/route.js';
import { json, corsHeaders } from './api/shared.js';
import { requestId, log } from './config.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const id = requestId(request); log('request', { id, method: request.method, path: url.pathname });
    if (url.pathname === '/api/health') return json({ ok: true, service: 'cla-city-api' }, 200, { 'X-Request-ID': id });
    if (url.pathname.startsWith('/admin/') && !url.pathname.startsWith('/admin/login')) {
      if (!await requireSession(request, env)) return Response.redirect(`${url.origin}/admin/login`, 302);
    }
    if (url.pathname === '/api/contact') return handleContact(request, env);
    if (url.pathname === '/api/admin/contacts') {
      if (!await requireSession(request, env)) return json({ error: 'Unauthorized.', requestId: id }, 401, corsHeaders(env, id));
      return handleAdminContacts(request, env);
    }
    if (url.pathname === '/api/admin/prayer') {
      if (!await requireSession(request, env)) return new Response(JSON.stringify({ error: 'Unauthorized.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      return handleAdminPrayer(request, env);
    }
    if (url.pathname === '/api/admin/visitors') {
      if (!await requireSession(request, env)) return new Response(JSON.stringify({ error: 'Unauthorized.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      return handleAdminVisitors(request, env);
    }
    if (url.pathname === '/api/admin/volunteers') {
      if (!await requireSession(request, env)) return json({ error: 'Unauthorized.', requestId: id }, 401, corsHeaders(env, id));
      return handleAdminVolunteers(request, env);
    }
    if (url.pathname === '/api/admin/dashboard') {
      if (!await requireSession(request, env)) return json({ error: 'Unauthorized.', requestId: id }, 401, corsHeaders(env, id));
      return handleDashboard(request, env);
    }
    if (url.pathname === '/api/admin/crm-contacts') {
      if (!await requireSession(request, env)) return json({ error: 'Unauthorized.', requestId: id }, 401, corsHeaders(env, id));
      return handleCrmContacts(request, env);
    }
    if (url.pathname === '/api/admin/tasks') {
      if (!await requireSession(request, env)) return json({ error: 'Unauthorized.', requestId: id }, 401, corsHeaders(env, id));
      return handleTasks(request, env);
    }
    if (url.pathname === '/api/admin/login' || url.pathname === '/api/admin/logout') return handleAuth(request, env);
    return new Response('Not found', { status: 404 });
  }
};
