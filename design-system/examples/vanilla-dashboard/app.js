/* HAH Sensory — Vanilla Dashboard JS
   Handles: tabs, drawer, toast, table row click
   No framework dependencies — pure DOM API */

(function () {
  'use strict';

  /* ── Tabs ───────────────────────────────────────────────── */
  document.querySelectorAll('.sensory-tabs').forEach(tabList => {
    tabList.addEventListener('click', e => {
      const tab = e.target.closest('.sensory-tab');
      if (!tab || tab.disabled) return;

      const tabs = tabList.querySelectorAll('.sensory-tab');
      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      const panelId = tab.getAttribute('aria-controls');
      if (panelId) {
        document.querySelectorAll('[role="tabpanel"]').forEach(p => { p.hidden = true; });
        const panel = document.getElementById(panelId);
        if (panel) panel.hidden = false;
      }
    });

    // Keyboard: arrow keys to move between tabs
    tabList.addEventListener('keydown', e => {
      const tabs = Array.from(tabList.querySelectorAll('.sensory-tab'));
      const idx  = tabs.indexOf(document.activeElement);
      if (idx === -1) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); tabs[(idx + 1) % tabs.length].focus(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); tabs[(idx - 1 + tabs.length) % tabs.length].focus(); }
    });
  });

  /* ── Drawer ─────────────────────────────────────────────── */
  const focusable = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let drawerTrigger = null;

  function openDrawer(drawerId, triggeredBy) {
    const drawer = document.getElementById(drawerId);
    const scrim  = document.getElementById(drawerId + '-scrim');
    if (!drawer) return;
    drawerTrigger = triggeredBy || null;
    drawer.classList.add('open');
    if (scrim) { scrim.classList.add('open'); scrim.removeAttribute('aria-hidden'); }
    drawer.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    const first = drawer.querySelector(focusable);
    if (first) setTimeout(() => first.focus(), 50);
  }

  function closeDrawer(drawerId) {
    const drawer = document.getElementById(drawerId);
    const scrim  = document.getElementById(drawerId + '-scrim');
    if (!drawer) return;
    drawer.classList.remove('open');
    if (scrim) { scrim.classList.remove('open'); scrim.setAttribute('aria-hidden', 'true'); }
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (drawerTrigger) { drawerTrigger.focus(); drawerTrigger = null; }
  }

  // Wire up open triggers
  document.querySelectorAll('[data-drawer-open]').forEach(btn => {
    btn.addEventListener('click', () => openDrawer(btn.dataset.drawerOpen, btn));
  });

  // Wire up close triggers
  document.querySelectorAll('[data-drawer-close]').forEach(btn => {
    btn.addEventListener('click', () => closeDrawer(btn.dataset.drawerClose));
  });

  // Scrim click closes
  document.querySelectorAll('[data-drawer-scrim]').forEach(scrim => {
    scrim.addEventListener('click', () => closeDrawer(scrim.dataset.drawerScrim));
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.drawer.open').forEach(d => closeDrawer(d.id));
  });

  // Focus trap
  document.querySelectorAll('.drawer').forEach(drawer => {
    drawer.addEventListener('keydown', e => {
      if (e.key !== 'Tab' || !drawer.classList.contains('open')) return;
      const els   = Array.from(drawer.querySelectorAll(focusable));
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  });

  /* ── Toast ──────────────────────────────────────────────── */
  let toastTimer = null;

  window.showToast = function (message, duration) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), duration || 3500);
  };

  /* ── Table row → drawer ─────────────────────────────────── */
  document.querySelectorAll('[data-row-drawer]').forEach(row => {
    row.addEventListener('click', e => {
      // Don't open if user clicked a button inside the row
      if (e.target.closest('button')) return;
      const drawerId = row.dataset.rowDrawer;
      const name     = row.dataset.name     || '';
      const dept     = row.dataset.dept     || '';
      const position = row.dataset.position || '';
      const empId    = row.dataset.empId    || '';
      const status   = row.dataset.status   || '';
      const leave    = row.dataset.leave    || '';

      // Populate drawer
      const el = id => document.getElementById(id);
      if (el('d-name'))   el('d-name').textContent     = name;
      if (el('d-dept'))   el('d-dept').textContent     = dept + ' · ' + position;
      if (el('d-emp-id')) el('d-emp-id').textContent   = empId;
      if (el('d-leave'))  el('d-leave').textContent    = leave;

      const badge = document.getElementById('d-status-badge');
      if (badge) {
        const map = {
          'มาทำงาน': 'tone-success', 'ลาพักร้อน': 'tone-warning',
          'ลาป่วย': 'tone-warning',  'ขาดงาน': 'tone-danger',
        };
        badge.className = 'sensory-badge ' + (map[status] || 'tone-neutral');
        badge.innerHTML = '<span class="dot"></span>' + status;
      }

      // Initials for avatar
      const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2);
      const av = document.getElementById('d-avatar');
      if (av) av.textContent = initials;

      openDrawer(drawerId, row);
    });
    row.setAttribute('tabindex', '0');
    row.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); row.click(); }
    });
  });

}());
