import { getDatabase } from '../../contact/db.js';
import { config } from '../../../config.js';
const statuses = new Set(config.visitorStatuses);
export async function listVisitors(env, params) {
  const where = {};
  if (statuses.has(params.status)) where.status = params.status;
  if (params.search) where.OR = [{ name: { contains: params.search, mode: 'insensitive' } }, { email: { contains: params.search, mode: 'insensitive' } }, { notes: { contains: params.search, mode: 'insensitive' } }];
  const page = Math.max(1, Number(params.page) || 1); const db = getDatabase(env);
  const [items,total,counts] = await Promise.all([db.visitor.findMany({where,orderBy:{createdAt:'desc'},skip:(page-1)*25,take:25}),db.visitor.count({where}),Promise.all([...statuses].map(async(status)=>[status,await db.visitor.count({where:{status}})]))]);
  return {items,total,page,pageSize:25,pages:Math.ceil(total/25),counts:Object.fromEntries(counts)};
}
export function updateVisitor(env,id,data) { const update={}; if(statuses.has(data.status)) update.status=data.status; if(typeof data.welcomeAssignedTo==='string') update.welcomeAssignedTo=data.welcomeAssignedTo.slice(0,100)||null; if(typeof data.followUpDate==='string') update.followUpDate=data.followUpDate?new Date(data.followUpDate):null; if(typeof data.notes==='string') update.notes=data.notes.slice(0,3000); return getDatabase(env).visitor.update({where:{id},data:update}); }
