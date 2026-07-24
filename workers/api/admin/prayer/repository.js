import { getDatabase } from '../../contact/db.js';
const statuses = new Set(['New', 'Praying', 'Answered']);
export async function listPrayerRequests(env, params) {
  const where = {};
  if (statuses.has(params.status)) where.status = params.status;
  if (params.search) where.OR = [{ name: { contains: params.search, mode: 'insensitive' } }, { email: { contains: params.search, mode: 'insensitive' } }, { request: { contains: params.search, mode: 'insensitive' } }];
  const page = Math.max(1, Number(params.page) || 1);
  const db = getDatabase(env);
  const [items, total, counts] = await Promise.all([
    db.prayerRequest.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * 25, take: 25 }),
    db.prayerRequest.count({ where }),
    Promise.all([...statuses].map(async (status) => [status, await db.prayerRequest.count({ where: { status } })]))
  ]);
  return { items, total, page, pageSize: 25, pages: Math.ceil(total / 25), counts: Object.fromEntries(counts) };
}
export async function updatePrayerRequest(env, id, data) {
  const update = {};
  if (statuses.has(data.status)) update.status = data.status;
  if (typeof data.private === 'boolean') update.private = data.private;
  if (typeof data.answered === 'boolean') { update.answered = data.answered; update.answeredDate = data.answered ? new Date() : null; if (data.answered) update.status = 'Answered'; }
  if (typeof data.notes === 'string') update.notes = data.notes.slice(0, 3000);
  return getDatabase(env).prayerRequest.update({ where: { id }, data: update });
}
