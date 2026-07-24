import { getDatabase } from '../../contact/db.js';

const statuses = new Set(['New', 'In Progress', 'Waiting', 'Closed']);

export async function listContacts(env, filters) {
  const db = getDatabase(env);
  const where = {};
  if (statuses.has(filters.status)) where.status = filters.status;
  if (['general', 'prayer', 'visit', 'connection'].includes(filters.category)) where.category = filters.category;
  if (['en', 'ru'].includes(filters.language)) where.language = filters.language;
  if (filters.search) where.OR = [
    { name: { contains: filters.search, mode: 'insensitive' } },
    { email: { contains: filters.search, mode: 'insensitive' } },
    { message: { contains: filters.search, mode: 'insensitive' } }
  ];
  const page = Math.max(1, Number(filters.page) || 1);
  const [items, total] = await Promise.all([
    db.contact.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * 25, take: 25 }),
    db.contact.count({ where })
  ]);
  return { items, total, page, pageSize: 25, pages: Math.ceil(total / 25) };
}

export async function updateContactStatus(env, id, status) {
  if (!statuses.has(status)) return null;
  return getDatabase(env).contact.update({ where: { id }, data: { status } });
}
