export function json(body, status = 200, headers = {}) { return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers } }); }
export function corsHeaders(env, id) { return { 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*', 'Access-Control-Allow-Headers': 'Content-Type, X-Request-ID', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS', 'X-Request-ID': id }; }
export function allowedOrigin(request, env) {
  const origin = request.headers.get('Origin');
  const allowed = (env.ALLOWED_ORIGINS || 'https://cla.city,https://www.cla.city').split(',').map((item) => item.trim());
  return origin && allowed.includes(origin) ? origin : allowed[0];
}
