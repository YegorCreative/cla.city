import { listContacts, updateContactStatus } from './repository.js';

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export async function handleAdminContacts(request, env) {
  try {
    const url = new URL(request.url);
    if (request.method === 'GET') return json(await listContacts(env, Object.fromEntries(url.searchParams)));
    if (request.method === 'PATCH') {
      const body = await request.json();
      if (!body?.id || !body?.status) return json({ error: 'Invalid request.' }, 400);
      const contact = await updateContactStatus(env, body.id, body.status);
      return contact ? json(contact) : json({ error: 'Validation failed.' }, 422);
    }
    return json({ error: 'Invalid request.' }, 400);
  } catch { return json({ error: 'Internal server error.' }, 500); }
}
