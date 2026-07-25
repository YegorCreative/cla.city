import { getDatabase } from '../../contact/db.js';
const start = (days) => new Date(Date.now() - days * 86400000);
export async function getDashboard(env, search = '') {
  const db = getDatabase(env); const now = new Date();
  const ranges = { today: start(1), week: start(7), month: start(30) };
  const countSet = async (model, where = {}) => Object.fromEntries(await Promise.all(Object.entries(ranges).map(async ([key, date]) => [key, await model.count({ where: { ...where, createdAt: { gte: date } } })])));
  const [contacts, prayers, visitors, volunteers] = await Promise.all([countSet(db.contact), countSet(db.prayerRequest), countSet(db.visitor), countSet(db.volunteer)]);
  const [recentContacts, recentPrayers, recentVisitors, recentVolunteers] = await Promise.all([
    db.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 15 }), db.prayerRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 15 }), db.visitor.findMany({ orderBy: { createdAt: 'desc' }, take: 15 }), db.volunteer.findMany({ orderBy: { createdAt: 'desc' }, take: 15 })
  ]);
  const recent = [...recentContacts.map(i=>({ type:'Contact submitted', name:i.name, date:i.createdAt })), ...recentPrayers.map(i=>({ type:'Prayer request received', name:i.name, date:i.createdAt })), ...recentVisitors.map(i=>({ type:'Visitor planned a visit', name:i.name, date:i.createdAt })), ...recentVolunteers.map(i=>({ type:'Volunteer applied', name:`${i.firstName} ${i.lastName||''}`.trim(), date:i.createdAt }))].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,15);
  const followUps = await Promise.all([db.visitor.findMany({ where:{ status:'Follow-up Scheduled' }, orderBy:{ createdAt:'desc' }, take:15 }), db.prayerRequest.findMany({ where:{ status:'Praying' }, orderBy:{ createdAt:'desc' }, take:15 }), db.volunteer.findMany({ where:{ status:'Interview Scheduled' }, orderBy:{ createdAt:'desc' }, take:15 })]);
  let results = [];
  if (search) { const q={contains:search,mode:'insensitive'}; const [c,p,v,vol]=await Promise.all([db.contact.findMany({where:{OR:[{name:q},{email:q},{message:q}]},take:10}),db.prayerRequest.findMany({where:{OR:[{name:q},{email:q},{request:q}]},take:10}),db.visitor.findMany({where:{OR:[{name:q},{email:q},{notes:q}]},take:10}),db.volunteer.findMany({where:{OR:[{firstName:q},{lastName:q},{email:q},{experience:q}]},take:10})]);results=[...c.map(i=>({type:'Contact',name:i.name,email:i.email})),...p.map(i=>({type:'Prayer',name:i.name,email:i.email})),...v.map(i=>({type:'Visitor',name:i.name,email:i.email})),...vol.map(i=>({type:'Volunteer',name:`${i.firstName} ${i.lastName||''}`.trim(),email:i.email}))];}
  return { kpis:{ contacts, prayers, visitors, volunteers }, recent, followUps, search: results, generatedAt: now.toISOString() };
}
