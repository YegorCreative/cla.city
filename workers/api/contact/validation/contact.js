const CATEGORIES = new Set(['general', 'prayer', 'visit', 'connection', 'volunteer']);
const LANGUAGES = new Set(['en', 'ru']);
const PAGES = new Set(['home']);

const hasMarkup = (value) => /<[^>]*>|javascript\s*:/i.test(value);

export function validateContactPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, status: 400, error: 'Invalid request.' };
  }

  const fields = ['name', 'email', 'message', 'category', 'language', 'page'];
  if (fields.some((field) => typeof payload[field] !== 'string')) {
    return { ok: false, status: 400, error: 'Invalid request.' };
  }

  const value = Object.fromEntries(fields.map((field) => [field, payload[field].trim()]));
  if (Object.values(value).some((field) => !field) || hasMarkup(value.name) || hasMarkup(value.email) || hasMarkup(value.message)) {
    return { ok: false, status: 422, error: 'Validation failed.' };
  }
  if (value.name.length > 100 || value.message.length > 3000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
    return { ok: false, status: 422, error: 'Validation failed.' };
  }
  if (!CATEGORIES.has(value.category) || !LANGUAGES.has(value.language) || !PAGES.has(value.page)) {
    return { ok: false, status: 422, error: 'Validation failed.' };
  }
  return { ok: true, value };
}
