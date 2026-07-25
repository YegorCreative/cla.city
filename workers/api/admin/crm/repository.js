import { getDatabase } from '../../contact/db.js';
export async function listCrmContacts(env, params) {
  const where = {}; if (['New','In Progress','Waiting','Closed'].includes(params.status)) where.status=params.status; if (['en','ru'].includes(params.language)) where.language=params.language;
  if (params.search) where.OR=[{name:{contains:params.search,mode:'insensitive'}},{email:{contains:params.search,mode:'insensitive'}}];
  const page=Math.max(1,Number(params.page)||1),db=getDatabase(env); const now=Date.now();
  const [items,total,week,month,connected]=await Promise.all([
    db.contact.findMany({where,orderBy:{createdAt:'desc'},skip:(page-1)*25,take:25,include:{_count:{select:{prayerRequest:true,visitor:true,volunteer:true}},prayerRequest:true,visitor:true,volunteer:true}}),
    db.contact.count({where}), db.contact.count({where:{createdAt:{gte:new Date(now-7*86400000)}}}), db.contact.count({where:{createdAt:{gte:new Date(now-30*86400000)}}}), db.contact.count({where:{status:'Closed'}})
  ]);
  return {items,total,page,pages:Math.ceil(total/25),summary:{total,week,month,connected}};
}
