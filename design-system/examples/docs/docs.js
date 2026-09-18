/* docs.js — HAH Sensory Design System Docs */

(function () {
  'use strict';

  /* ── Copy buttons ──────────────────────────────────────── */

  function initCopyButtons() {
    document.querySelectorAll('.doc-copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const wrap = btn.closest('.doc-code-wrap');
        const code = wrap?.querySelector('.doc-code');
        if (!code) return;
        try {
          await navigator.clipboard.writeText(code.textContent);
        } catch {
          // fallback for older browsers / http
          const ta = document.createElement('textarea');
          ta.value = code.textContent;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        btn.textContent = 'คัดลอกแล้ว ✓';
        btn.classList.add('is-copied');
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'คัดลอก';
          btn.classList.remove('is-copied');
          btn.disabled = false;
        }, 2000);
      });
    });
  }

  /* ── Active sidebar highlight (IntersectionObserver) ───── */

  function initActiveNav() {
    const sections = document.querySelectorAll('[data-doc-section]');
    const links    = document.querySelectorAll('.docs-nav-link');

    if (!sections.length || !links.length) return;

    const map = new Map();
    links.forEach(link => {
      const id = link.getAttribute('href')?.replace('#', '');
      if (id) map.set(id, link);
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('is-active'));
          const active = map.get(entry.target.id);
          if (active) {
            active.classList.add('is-active');
            // scroll link into view inside sidebar
            active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
      });
    }, { rootMargin: '-15% 0px -75% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /* ── Mobile sidebar toggle ──────────────────────────────── */

  function initMobileToggle() {
    const toggle  = document.getElementById('docs-sidebar-toggle');
    const sidebar = document.querySelector('.docs-sidebar');
    if (!toggle || !sidebar) return;
    toggle.addEventListener('click', () => {
      const open = sidebar.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '✕ ปิดเมนู' : '☰ เมนู';
    });
    // close sidebar on nav link click (mobile)
    sidebar.querySelectorAll('.docs-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰ เมนู';
      });
    });
  }

  /* ── Init ────────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', () => {
    initCopyButtons();
    initActiveNav();
    initMobileToggle();
  });
}());
