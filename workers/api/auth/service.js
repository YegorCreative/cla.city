import bcrypt from 'bcryptjs';
import { getDatabase } from '../contact/db.js';

const roles = new Set(['Super Admin', 'Pastor', 'Ministry Leader', 'Media']);
const cookieName = 'cla_admin_session';
const encode = (value) => btoa(String.fromCharCode(...new Uint8Array(value)));
async function hashToken(token) { return encode(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token))); }
function cookie(token, secure) { return `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}; Max-Age=28800`; }

export async function login(email, password, env) {
  const user = await getDatabase(env).user.findUnique({ where: { email: email.trim().toLowerCase() } });
  if (!user || !roles.has(user.role) || !(await bcrypt.compare(password, user.passwordHash))) return null;
  const token = crypto.randomUUID() + crypto.randomUUID();
  await getDatabase(env).session.create({ data: { tokenHash: await hashToken(token), userId: user.id, expiresAt: new Date(Date.now() + 28800000) } });
  return { user, cookie: cookie(token, env.ENVIRONMENT === 'production') };
}
export async function requireSession(request, env) {
  const token = request.headers.get('Cookie')?.match(new RegExp(`${cookieName}=([^;]+)`))?.[1];
  if (!token) return null;
  const session = await getDatabase(env).session.findUnique({ where: { tokenHash: await hashToken(token) }, include: { user: true } });
  return session && session.expiresAt > new Date() ? session.user : null;
}
export function clearSession(env) { return `${cookieName}=; Path=/; HttpOnly; SameSite=Lax${env.ENVIRONMENT === 'production' ? '; Secure' : ''}; Max-Age=0`; }
export { cookieName };
