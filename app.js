/* ════════════════════════════════════════════════════════════════════════
   Elderly Rehab Hub — application (vanilla JS)
   State store + hash router + event delegation. Renders HTML strings styled
   with HAH Sensory sensory-* classes + tokens. Lucide for all icons.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const CATEGORY_META = {
    exercise: { label: 'ออกกำลังกาย', icon: 'dumbbell', tone: 'tone-brand' },
    fine_motor: { label: 'กล้ามเนื้อมัดเล็ก', icon: 'hand', tone: 'tone-info' },
    brain: { label: 'พัฒนา/กระตุ้นสมอง', icon: 'brain', tone: 'tone-success' },
    general: { label: 'กิจกรรมทั่วไป', icon: 'sparkles', tone: 'tone-neutral' },
  };

  function loadAdminKey() { try { return localStorage.getItem('erh_admin_key') || ''; } catch (e) { return ''; } }
  function saveAdminKey(key) { try { localStorage.setItem('erh_admin_key', key); } catch (e) { /* ignore */ } }

  const state = {
    loading: true, activities: [], activeCategory: 'all', current: null, error: null,
    adminKey: loadAdminKey(), discovering: false, discoverNotice: null,
  };
  let lastRenderedView = null;

  async function api(path, opts) {
    const res = await fetch(path, opts);
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error((data && data.error) || ('เกิดข้อผิดพลาด (HTTP ' + res.status + ')'));
    return data;
  }

  function setState(patch) { Object.assign(state, patch); render(); }

  async function loadActivities() {
    try {
      const activities = await api('/api/activities');
      setState({ activities, loading: false, error: null });
    } catch (e) {
      setState({ loading: false, error: e.message });
    }
  }

  // ── Hash router ──────────────────────────────────────────────────────
  function applyHash() {
    const hash = location.hash.replace(/^#\/?/, '');
    const detailMatch = hash.match(/^activity\/(.+)$/);
    state.current = detailMatch ? detailMatch[1] : null;
    render();
  }
  window.addEventListener('hashchange', applyHash);

  // ── Views ────────────────────────────────────────────────────────────
  function topbar() {
    return `
      <header class="topbar">
        <a href="#/" class="brand" data-action="home">
          <img src="design-system/assets/hah-sensory.jpg" alt="" class="brand-mark" />
          <span>Elderly Rehab Hub</span>
        </a>
      </header>`;
  }

  function categoryTabs() {
    const tabs = [{ key: 'all', label: 'ทั้งหมด' }, ...Object.entries(CATEGORY_META).map(([key, m]) => ({ key, label: m.label }))];
    return `
      <div class="sensory-tabs is-pill" role="tablist">
        ${tabs.map(t => `<button type="button" class="sensory-tab ${state.activeCategory === t.key ? 'is-active' : ''}" data-action="filter" data-category="${t.key}">${t.label}</button>`).join('')}
      </div>`;
  }

  function activityCard(a) {
    const meta = CATEGORY_META[a.category] || CATEGORY_META.general;
    return `
      <a href="#/activity/${a.id}" class="sensory-card is-interactive activity-card">
        <div class="sensory-card-pad">
          <span class="sensory-badge ${meta.tone}"><i data-lucide="${meta.icon}"></i>${meta.label}</span>
          ${a.source === 'ai' ? `<span class="sensory-badge tone-neutral ai-tag"><i data-lucide="sparkles"></i>AI</span>` : ''}
          <h3 class="sensory-card-title">${a.title}</h3>
          <p class="activity-summary">${a.summary}</p>
        </div>
      </a>`;
  }

  function discoverPanel() {
    return `
      <section class="sensory-card discover-panel">
        <div class="sensory-card-header"><h2 class="sensory-card-title">ค้นหากิจกรรมใหม่ด้วย AI</h2></div>
        <div class="sensory-card-pad">
          <form data-action="discover-form" class="discover-form">
            <div class="sensory-field">
              <label class="sensory-label">รหัสผู้ดูแล</label>
              <input type="password" name="adminKey" class="sensory-input" value="${(state.adminKey || '').replace(/"/g, '&quot;')}" placeholder="Admin key" />
            </div>
            <div class="sensory-field">
              <label class="sensory-label">หัวข้อที่ต้องการ (ไม่บังคับ)</label>
              <input type="text" name="topic" class="sensory-input" placeholder="เช่น กิจกรรมกระตุ้นสมองสำหรับผู้ป่วยอัลไซเมอร์" />
            </div>
            <button type="submit" class="sensory-btn is-primary is-md" ${state.discovering ? 'disabled' : ''}>
              <i data-lucide="sparkles"></i>${state.discovering ? 'กำลังค้นหา...' : 'ค้นหากิจกรรมใหม่'}
            </button>
          </form>
          ${state.discoverNotice ? `<p class="discover-notice ${state.discoverNotice.ok ? 'is-ok' : 'is-error'}">${state.discoverNotice.text}</p>` : ''}
        </div>
      </section>`;
  }

  function viewHome() {
    const list = state.activeCategory === 'all' ? state.activities : state.activities.filter(a => a.category === state.activeCategory);
    let body;
    if (state.loading) body = `<div class="empty">กำลังโหลด...</div>`;
    else if (state.error) body = `<div class="empty">โหลดข้อมูลไม่สำเร็จ: ${state.error}</div>`;
    else if (!list.length) body = `<div class="empty">ยังไม่มีกิจกรรมในหมวดนี้</div>`;
    else body = `<div class="activity-grid">${list.map(activityCard).join('')}</div>`;
    return `
      <main class="content">
        <h1 class="page-title">กิจกรรมฟื้นฟูผู้สูงอายุ</h1>
        <p class="page-desc">เลือกกิจกรรมเพื่อดูประโยชน์และขั้นตอนการทำสำหรับผู้ดูแล</p>
        ${categoryTabs()}
        ${body}
        ${discoverPanel()}
      </main>`;
  }

  function viewDetail(id) {
    const a = state.activities.find(x => x.id === id);
    if (!a) return `<main class="content"><div class="empty">ไม่พบกิจกรรมนี้</div></main>`;
    const meta = CATEGORY_META[a.category] || CATEGORY_META.general;
    return `
      <main class="content">
        <a href="#/" class="sensory-btn is-ghost is-sm back-link"><i data-lucide="arrow-left"></i>กลับ</a>
        <span class="sensory-badge ${meta.tone}"><i data-lucide="${meta.icon}"></i>${meta.label}</span>
        ${a.source === 'ai' ? `<span class="sensory-badge tone-neutral ai-tag"><i data-lucide="sparkles"></i>AI</span>` : ''}
        <h1 class="page-title">${a.title}</h1>
        <p class="page-desc">${a.summary}</p>
        ${a.source === 'ai' && a.sourceUrl ? `<p class="source-note">สร้างโดย AI จาก <a href="${a.sourceUrl}" target="_blank" rel="noopener">แหล่งอ้างอิง</a> — โปรดตรวจสอบความถูกต้อง/ความปลอดภัยก่อนใช้จริง</p>` : ''}
        ${a.videoUrl ? `<video class="activity-video" src="${a.videoUrl}" controls></video>` : ''}
        <section class="sensory-card">
          <div class="sensory-card-header"><h2 class="sensory-card-title">ประโยชน์</h2></div>
          <div class="sensory-card-pad">${a.benefits}</div>
        </section>
        <section class="sensory-card">
          <div class="sensory-card-header"><h2 class="sensory-card-title">ขั้นตอนการทำ (สำหรับผู้ดูแล)</h2></div>
          <div class="sensory-card-pad">
            <ol class="steps-list">${a.steps.map(s => `<li>${s}</li>`).join('')}</ol>
          </div>
        </section>
      </main>`;
  }

  function render() {
    const app = document.getElementById('app');
    app.innerHTML = `<div class="app">${topbar()}${state.current ? viewDetail(state.current) : viewHome()}</div>`;
    if (window.lucide) window.lucide.createIcons();
    lastRenderedView = state.current || 'home';
  }

  // ── Event delegation ─────────────────────────────────────────────────
  document.addEventListener('click', ev => {
    const el = ev.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;
    if (action === 'filter') { ev.preventDefault(); setState({ activeCategory: el.dataset.category }); }
  });

  document.addEventListener('submit', async ev => {
    const form = ev.target.closest('[data-action="discover-form"]');
    if (!form) return;
    ev.preventDefault();
    const fd = new FormData(form);
    const adminKey = String(fd.get('adminKey') || '').trim();
    const topic = String(fd.get('topic') || '').trim();
    if (!adminKey) { setState({ discoverNotice: { ok: false, text: 'กรุณาใส่รหัสผู้ดูแล' } }); return; }
    setState({ discovering: true, discoverNotice: null });
    try {
      const created = await api('/api/activities/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + adminKey },
        body: JSON.stringify({ topic }),
      });
      saveAdminKey(adminKey);
      setState({
        discovering: false, adminKey,
        activities: [created, ...state.activities],
        discoverNotice: { ok: true, text: `เพิ่มกิจกรรมใหม่แล้ว: "${created.title}"` },
      });
    } catch (e) {
      setState({ discovering: false, discoverNotice: { ok: false, text: e.message } });
    }
  });

  applyHash();
  loadActivities();
})();
