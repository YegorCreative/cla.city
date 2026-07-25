import { getDatabase } from './contact/db.js';
export function writeAudit(env, request, data) { return getDatabase(env).auditLog.create({ data: { ...data, ipAddress: request.headers.get('CF-Connecting-IP'), userAgent: request.headers.get('User-Agent') } }).catch(() => null); }
