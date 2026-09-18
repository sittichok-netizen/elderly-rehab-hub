/* ════════════════════════════════════════════════════════════════════════
   Elderly Rehab Hub — Worker API
   Thin persistence layer over D1. Serves static assets for everything
   outside /api/, JSON for everything under it.
   ════════════════════════════════════════════════════════════════════════ */

const CATEGORY_KEYS = ['exercise', 'fine_motor', 'brain', 'general'];

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
    source: r.source || 'manual',
    sourceUrl: r.source_url || null,
    createdAt: r.created_at,
    updatedAt: r.updated_at || null,
  };
}

// Shared secret gate for the AI-discovery endpoint — it calls billable/rate
// limited external APIs and writes straight to the public catalog, so it
// can't be left open the way the read endpoints are. Fails closed: no
// ADMIN_KEY configured means nobody gets in, not everybody.
function requireAdmin(request, env) {
  if (!env.ADMIN_KEY) return err('ยังไม่ได้ตั้งค่า ADMIN_KEY บนเซิร์ฟเวอร์ กรุณาตั้งค่าก่อนใช้งานฟีเจอร์นี้', 501);
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (token !== env.ADMIN_KEY) return err('รหัสผู้ดูแลไม่ถูกต้อง', 401);
  return null;
}

async function searchWeb(env, query) {
  if (!env.GOOGLE_SEARCH_API_KEY || !env.GOOGLE_SEARCH_CX) {
    const e = new Error('ยังไม่ได้ตั้งค่า Web Search API (GOOGLE_SEARCH_API_KEY / GOOGLE_SEARCH_CX) ดูวิธีตั้งค่าใน CLAUDE.md');
    e.status = 501;
    throw e;
  }
  const url = new URL('https://www.googleapis.com/customsearch/v1');
  url.searchParams.set('key', env.GOOGLE_SEARCH_API_KEY);
  url.searchParams.set('cx', env.GOOGLE_SEARCH_CX);
  url.searchParams.set('q', query);
  url.searchParams.set('num', '5');
  url.searchParams.set('hl', 'th');
  const res = await fetch(url);
  if (!res.ok) throw new Error('ค้นหาเว็บไม่สำเร็จ (HTTP ' + res.status + ')');
  const data = await res.json();
  return (data.items || []).map(it => ({ title: it.title, link: it.link, snippet: it.snippet || '' }));
}

// Grounds generation in the search snippets (rather than free-generating)
// and asks for one net-new activity so repeated clicks build up the catalog
// instead of reshuffling the same idea.
async function generateActivity(env, { results, existingTitles }) {
  const sourcesText = results.map((r, i) => `[${i + 1}] ${r.title}\n${r.snippet}\nลิงก์: ${r.link}`).join('\n\n');
  const existingText = existingTitles.length ? existingTitles.join(', ') : '(ยังไม่มี)';
  const prompt = `คุณคือผู้ช่วยออกแบบกิจกรรมฟื้นฟู/นันทนาการสำหรับผู้สูงอายุ สำหรับผู้ดูแล (caregiver) ใช้งาน

จากผลการค้นหาเว็บต่อไปนี้ ให้สรุปและออกแบบกิจกรรมใหม่ 1 กิจกรรมที่ยังไม่ซ้ำกับรายการที่มีอยู่ และทำได้จริงอย่างปลอดภัยกับผู้สูงอายุ:

${sourcesText}

กิจกรรมที่มีอยู่แล้ว (ห้ามซ้ำ): ${existingText}

ตอบกลับเป็น JSON เท่านั้น ห้ามมีข้อความอื่นนอกเหนือจาก JSON รูปแบบ:
{"title": "ชื่อกิจกรรมภาษาไทย สั้นกระชับ", "category": "exercise|fine_motor|brain|general", "summary": "คำอธิบายสั้น 1 ประโยค", "benefits": "ประโยชน์/สิ่งที่พัฒนา 1-2 ประโยค", "steps": ["ขั้นตอนที่ 1", "ขั้นตอนที่ 2"], "sourceIndex": 1}
"sourceIndex" คือหมายเลขแหล่งอ้างอิงที่ใช้เป็นหลัก (1-${results.length})`;

  const aiResp = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 800,
  });
  // Workers AI's OpenAI-compat shape sometimes pre-parses JSON-mode output into
  // `response` as an object, sometimes leaves it as a string — handle both.
  let parsed;
  if (aiResp && typeof aiResp.response === 'object' && aiResp.response !== null) {
    parsed = aiResp.response;
  } else {
    const raw = String(aiResp?.response ?? aiResp?.choices?.[0]?.message?.content ?? '').trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
  }
  if (!parsed.title || !CATEGORY_KEYS.includes(parsed.category) || !Array.isArray(parsed.steps) || !parsed.steps.length) {
    throw new Error('AI ส่งข้อมูลกิจกรรมไม่ครบถ้วน ลองอีกครั้ง');
  }
  const idx = Number(parsed.sourceIndex) - 1;
  const sourceUrl = (results[idx] || results[0] || {}).link || null;
  return {
    title: String(parsed.title).slice(0, 200),
    category: parsed.category,
    summary: String(parsed.summary || '').slice(0, 500),
    benefits: String(parsed.benefits || '').slice(0, 500),
    steps: parsed.steps.map(s => String(s)).slice(0, 12),
    sourceUrl,
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

  if (pathname === '/api/activities/discover' && method === 'POST') {
    const authErr = requireAdmin(request, env);
    if (authErr) return authErr;

    const body = await request.json().catch(() => ({}));
    const topic = (body.topic || '').trim();
    const query = topic || 'กิจกรรมฟื้นฟูผู้สูงอายุ ผู้ดูแล วิธีทำ';

    let results;
    try {
      results = await searchWeb(env, query);
    } catch (e) {
      return err(e.message, e.status || 502);
    }
    if (!results.length) return err('ไม่พบผลการค้นหาสำหรับหัวข้อนี้ ลองเปลี่ยนคำค้นหา', 404);

    const { results: existingRows } = await env.DB.prepare('SELECT title FROM activities').all();
    let generated;
    try {
      generated = await generateActivity(env, { results, existingTitles: existingRows.map(r => r.title) });
    } catch (e) {
      return err('AI สร้างกิจกรรมไม่สำเร็จ: ' + e.message, 502);
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    await env.DB.prepare(
      `INSERT INTO activities (id, title, category, summary, benefits, steps, video_url, source, source_url, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NULL, 'ai', ?, ?)`
    ).bind(id, generated.title, generated.category, generated.summary, generated.benefits, JSON.stringify(generated.steps), generated.sourceUrl, now).run();
    const row = await env.DB.prepare('SELECT * FROM activities WHERE id = ?').bind(id).first();
    return json(rowToActivity(row));
  }

  const detailMatch = pathname.match(/^\/api\/activities\/([^/]+)$/);
  if (detailMatch && method === 'GET') {
    const row = await env.DB.prepare('SELECT * FROM activities WHERE id = ?').bind(detailMatch[1]).first();
    if (!row) return err('ไม่พบกิจกรรมนี้', 404);
    return json(rowToActivity(row));
  }

  return err('Not found', 404);
}
