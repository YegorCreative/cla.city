export const config = {
  contactCategories: ['general', 'prayer', 'visit', 'connection', 'volunteer'],
  languages: ['en', 'ru'],
  contactStatuses: ['New', 'In Progress', 'Waiting', 'Closed'],
  prayerStatuses: ['New', 'Praying', 'Answered'],
  visitorStatuses: ['Planned', 'Visited', 'Welcomed', 'Follow-up Scheduled', 'Connected'],
  volunteerMinistries: ['Kids', 'Youth', 'Women', 'Men', 'Prayer', 'Media', 'Worship', 'Hospitality', 'Welcome Team', 'Parking', 'Security', 'Life Groups', 'MTC', 'Other'],
  volunteerStatuses: ['Applied', 'Contacted', 'Interview Scheduled', 'Approved', 'Serving', 'Inactive'],
  roles: ['Super Admin', 'Pastor', 'Ministry Leader', 'Media'],
  pageSize: 25,
  rateLimit: { windowMs: 60_000, max: 5 }
};

export function requestId(request) { return request.headers.get('X-Request-ID') || crypto.randomUUID(); }
export function log(event, data = {}) { console.log(JSON.stringify({ event, timestamp: new Date().toISOString(), ...data })); }
