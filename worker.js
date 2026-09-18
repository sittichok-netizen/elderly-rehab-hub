/* ════════════════════════════════════════════════════════════════════════
   Elderly Rehab Hub — Worker API
   Thin persistence layer over D1. Serves static assets for everything
   outside /api/, JSON for everything under it.
   ════════════════════════════════════════════════════════════════════════ */

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
function err(message, status) { return json({ error: message }, status || 400); }

function rowToActivity(r) {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    summary: r.summary,
    benefits: r.benefits,
    steps: JSON.parse(r.steps || '[]'),
    videoUrl: r.video_url || null,
    createdAt: r.created_at,
    updatedAt: r.updated_at || null,
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    try {
      return await route(request, env, url);
    } catch (e) {
      return err('Server error: ' + (e && e.message || e), 500);
    }
  },
};

async function route(request, env, url) {
  const { pathname, searchParams } = url;
  const method = request.method;

  if (pathname === '/api/activities' && method === 'GET') {
    const category = searchParams.get('category');
    const { results } = category
      ? await env.DB.prepare('SELECT * FROM activities WHERE category = ? ORDER BY created_at DESC').bind(category).all()
      : await env.DB.prepare('SELECT * FROM activities ORDER BY created_at DESC').all();
    return json(results.map(rowToActivity));
  }

  const detailMatch = pathname.match(/^\/api\/activities\/([^/]+)$/);
  if (detailMatch && method === 'GET') {
    const row = await env.DB.prepare('SELECT * FROM activities WHERE id = ?').bind(detailMatch[1]).first();
    if (!row) return err('ไม่พบกิจกรรมนี้', 404);
    return json(rowToActivity(row));
  }

  return err('Not found', 404);
}
