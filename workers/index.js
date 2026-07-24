import { handleContact } from './api/contact/route.js';
import { handleAdminContacts } from './api/admin/contacts/route.js';
import { handleAuth, requireSession } from './api/auth/route.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') return handleContact(request, env);
    if (url.pathname === '/api/admin/contacts') {
      if (!await requireSession(request, env)) return new Response(JSON.stringify({ error: 'Unauthorized.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      return handleAdminContacts(request, env);
    }
    if (url.pathname === '/api/admin/login' || url.pathname === '/api/admin/logout') return handleAuth(request, env);
    return new Response('Not found', { status: 404 });
  }
};
