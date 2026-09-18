/*!
 * sensory-ui.js — HAH Sensory Design System
 * Vanilla JS behavior layer — dependency-free, data-attribute driven
 *
 * API:
 *   SensoryUI.init()              — auto-wire all components on page
 *   SensoryUI.drawer.open(id)     — open drawer programmatically
 *   SensoryUI.drawer.close(id)    — close drawer
 *   SensoryUI.modal.open(id)      — open modal
 *   SensoryUI.modal.close(id)     — close modal
 *   SensoryUI.toast(msg, opts)    — show toast { tone, duration, icon }
 *   SensoryUI.dropdown.toggle(id) — toggle dropdown
 *   SensoryUI.dropdown.close(id)  — close dropdown
 *
 * Data attributes:
 *   Drawer:   data-drawer-open="id"   data-drawer-close="id"   data-drawer-scrim="id"
 *   Modal:    data-modal-open="id"    data-modal-close="id"    data-modal-scrim="id"
 *   Dropdown: data-sensory-dropdown="target-id"   (on trigger button)
 *   Tabs:     auto-detected from .sensory-tabs (uses existing aria-controls / aria-selected)
 */

(function (global) {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────── */

  const FOCUSABLE = [
    'button:not([disabled])', '[href]',
    'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  const reducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Trap focus inside element; return cleanup function */
  function trapFocus(el) {
    function handler(e) {
      if (e.key !== 'Tab') return;
      const els = Array.from(el.querySelectorAll(FOCUSABLE));
      if (!els.length) { e.preventDefault(); return; }
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
    el.addEventListener('keydown', handler);
    return () => el.removeEventListener('keydown', handler);
  }

  /** Stack of open overlays for Escape key handling */
  const _overlayStack = [];

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !_overlayStack.length) return;
    const top = _overlayStack[_overlayStack.length - 1];
    if (top.type === 'drawer')   SensoryUI.drawer.close(top.id);
    if (top.type === 'modal')    SensoryUI.modal.close(top.id);
    if (top.type === 'dropdown') SensoryUI.dropdown.close(top.id);
  });

  /* ── Tabs ────────────────────────────────────────────────── */

  const tabs = {
    /** Wire a single .sensory-tabs container */
    init(tabList) {
      if (tabList._sensoryTabsInit) return;
      tabList._sensoryTabsInit = true;

      tabList.addEventListener('click', e => {
        const tab = e.target.closest('.sensory-tab');
        if (!tab || tab.disabled) return;
        tabs._activate(tabList, tab);
      });

      tabList.addEventListener('keydown', e => {
        const tabEls = Array.from(tabList.querySelectorAll('.sensory-tab'));
        const idx = tabEls.indexOf(document.activeElement);
        if (idx === -1) return;
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          tabEls[(idx + 1) % tabEls.length].focus();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          tabEls[(idx - 1 + tabEls.length) % tabEls.length].focus();
        } else if (e.key === 'Home') {
          e.preventDefault(); tabEls[0].focus();
        } else if (e.key === 'End') {
          e.preventDefault(); tabEls[tabEls.length - 1].focus();
        }
      });
    },

    _activate(tabList, activeTab) {
      tabList.querySelectorAll('.sensory-tab').forEach(t => {
        const isActive = t === activeTab;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      // show/hide panels
      const panelId = activeTab.getAttribute('aria-controls');
      if (panelId) {
        const scope = tabList.closest('[data-tabs-scope]') || document;
        scope.querySelectorAll('[role="tabpanel"]').forEach(p => { p.hidden = true; });
        const panel = document.getElementById(panelId);
        if (panel) panel.hidden = false;
      }
    },

    _initAll() {
      document.querySelectorAll('.sensory-tabs').forEach(tl => tabs.init(tl));
    },
  };

  /* ── Drawer ──────────────────────────────────────────────── */

  const _drawerTriggers = new WeakMap();
  const _drawerCleanups = new WeakMap();

  const drawer = {
    open(id, trigger) {
      const el    = document.getElementById(id);
      const scrim = document.getElementById(id + '-scrim');
      if (!el) return;

      dropdown._closeAll();
      el.classList.add('open');
      el.removeAttribute('aria-hidden');
      if (scrim) { scrim.classList.add('open'); scrim.removeAttribute('aria-hidden'); }
      document.body.style.overflow = 'hidden';

      if (trigger) _drawerTriggers.set(el, trigger);
      _overlayStack.push({ type: 'drawer', id });

      const cleanup = trapFocus(el);
      _drawerCleanups.set(el, cleanup);

      const first = el.querySelector(FOCUSABLE);
      if (first) {
        if (reducedMotion()) { first.focus(); }
        else { setTimeout(() => first.focus(), 50); }
      }
    },

    close(id) {
      const el    = document.getElementById(id);
      const scrim = document.getElementById(id + '-scrim');
      if (!el || !el.classList.contains('open')) return;

      el.classList.remove('open');
      el.setAttribute('aria-hidden', 'true');
      if (scrim) { scrim.classList.remove('open'); scrim.setAttribute('aria-hidden', 'true'); }

      const idx = _overlayStack.findLastIndex(o => o.type === 'drawer' && o.id === id);
      if (idx !== -1) _overlayStack.splice(idx, 1);

      const cleanup = _drawerCleanups.get(el);
      if (cleanup) { cleanup(); _drawerCleanups.delete(el); }

      if (!_overlayStack.length) document.body.style.overflow = '';

      const trigger = _drawerTriggers.get(el);
      if (trigger) { trigger.focus(); _drawerTriggers.delete(el); }
    },

    _initAll() {
      document.querySelectorAll('[data-drawer-open]:not([data-sensory-wired])').forEach(btn => {
        btn.setAttribute('data-sensory-wired', '');
        btn.addEventListener('click', () => drawer.open(btn.dataset.drawerOpen, btn));
      });
      document.querySelectorAll('[data-drawer-close]:not([data-sensory-wired])').forEach(btn => {
        btn.setAttribute('data-sensory-wired', '');
        btn.addEventListener('click', () => drawer.close(btn.dataset.drawerClose));
      });
      document.querySelectorAll('[data-drawer-scrim]:not([data-sensory-wired])').forEach(scrim => {
        scrim.setAttribute('data-sensory-wired', '');
        scrim.addEventListener('click', () => drawer.close(scrim.dataset.drawerScrim));
      });
    },
  };

  /* ── Modal ───────────────────────────────────────────────── */

  const _modalTriggers = new WeakMap();
  const _modalCleanups = new WeakMap();

  const modal = {
    open(id, trigger) {
      const el    = document.getElementById(id);
      const scrim = document.getElementById(id + '-scrim') ||
                    (el?.previousElementSibling?.matches('.sensory-modal-scrim')
                     ? el.previousElementSibling : null);
      if (!el) return;

      dropdown._closeAll();
      el.classList.add('is-open');
      el.removeAttribute('aria-hidden');
      if (scrim) { scrim.classList.add('is-open'); scrim.removeAttribute('aria-hidden'); }
      document.body.style.overflow = 'hidden';

      if (trigger) _modalTriggers.set(el, trigger);
      _overlayStack.push({ type: 'modal', id });

      const cleanup = trapFocus(el);
      _modalCleanups.set(el, cleanup);

      const first = el.querySelector(FOCUSABLE);
      if (first) {
        if (reducedMotion()) { first.focus(); }
        else { setTimeout(() => first.focus(), 60); }
      }
    },

    close(id) {
      const el    = document.getElementById(id);
      const scrim = document.getElementById(id + '-scrim') ||
                    (el?.previousElementSibling?.matches('.sensory-modal-scrim')
                     ? el.previousElementSibling : null);
      if (!el || !el.classList.contains('is-open')) return;

      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      if (scrim) { scrim.classList.remove('is-open'); scrim.setAttribute('aria-hidden', 'true'); }

      const idx = _overlayStack.findLastIndex(o => o.type === 'modal' && o.id === id);
      if (idx !== -1) _overlayStack.splice(idx, 1);

      const cleanup = _modalCleanups.get(el);
      if (cleanup) { cleanup(); _modalCleanups.delete(el); }

      if (!_overlayStack.length) document.body.style.overflow = '';

      const trigger = _modalTriggers.get(el);
      if (trigger) { trigger.focus(); _modalTriggers.delete(el); }
    },

    _initAll() {
      document.querySelectorAll('[data-modal-open]:not([data-sensory-wired])').forEach(btn => {
        btn.setAttribute('data-sensory-wired', '');
        btn.addEventListener('click', () => modal.open(btn.dataset.modalOpen, btn));
      });
      document.querySelectorAll('[data-modal-close]:not([data-sensory-wired])').forEach(btn => {
        btn.setAttribute('data-sensory-wired', '');
        btn.addEventListener('click', () => modal.close(btn.dataset.modalClose));
      });
      document.querySelectorAll('[data-modal-scrim]:not([data-sensory-wired])').forEach(scrim => {
        scrim.setAttribute('data-sensory-wired', '');
        scrim.addEventListener('click', () => modal.close(scrim.dataset.modalScrim));
      });
    },
  };

  /* ── Toast ───────────────────────────────────────────────── */

  let _toastEl = null;
  let _toastTimer = null;

  function _ensureToast() {
    if (_toastEl) return _toastEl;
    _toastEl = document.createElement('div');
    _toastEl.className = 'sensory-toast';
    _toastEl.setAttribute('role', 'status');
    _toastEl.setAttribute('aria-live', 'polite');
    _toastEl.setAttribute('aria-atomic', 'true');
    _toastEl.style.cssText = [
      'position:fixed', 'bottom:24px', 'left:50%',
      'transform:translateX(-50%) translateY(16px)',
      'background:var(--ink-950)', 'color:#fff',
      'padding:11px 18px', 'border-radius:var(--radius-md)',
      'font-size:var(--text-sm)', 'font-family:var(--font-sans)',
      'box-shadow:var(--shadow-lg)', 'z-index:var(--z-toast)',
      'opacity:0', 'pointer-events:none',
      'transition:opacity var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out)',
      'display:flex', 'align-items:center', 'gap:10px', 'white-space:nowrap',
      'max-width:calc(100vw - 48px)',
    ].join(';');
    document.body.appendChild(_toastEl);
    return _toastEl;
  }

  const TOAST_ICONS = {
    success: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    warning: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    danger:  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    info:    '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  };

  /**
   * Show a toast message.
   * @param {string} message
   * @param {{ tone?: 'success'|'warning'|'danger'|'info', duration?: number, icon?: string }} [opts]
   */
  function toast(message, opts) {
    const { tone = 'success', duration = 3500, icon } = opts || {};
    const el = _ensureToast();

    const iconHtml = icon !== undefined ? icon : (TOAST_ICONS[tone] || TOAST_ICONS.success);
    el.innerHTML = iconHtml + '<span>' + message + '</span>';

    // Tone background
    const toneColors = {
      success: 'var(--ink-950)',
      warning: 'oklch(35% 0.08 75)',
      danger:  'var(--status-danger)',
      info:    'var(--status-info)',
    };
    el.style.background = toneColors[tone] || toneColors.success;

    el.style.opacity = '1';
    el.style.pointerEvents = 'auto';
    el.style.transform = 'translateX(-50%) translateY(0)';

    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-50%) translateY(16px)';
      el.style.pointerEvents = 'none';
    }, duration);
  }

  /* ── Dropdown ────────────────────────────────────────────── */

  const _openDropdowns = new Set();

  /** Position dropdown menu relative to its trigger */
  function _positionDropdown(menu, trigger) {
    // Reset position classes
    menu.classList.remove('is-right', 'is-up');

    const trigRect  = trigger.getBoundingClientRect();
    const menuRect  = menu.getBoundingClientRect();
    const vpWidth   = window.innerWidth;
    const vpHeight  = window.innerHeight;
    const spaceBelow = vpHeight - trigRect.bottom;
    const spaceRight = vpWidth  - trigRect.left;

    if (spaceBelow < menuRect.height + 12 && trigRect.top > menuRect.height + 12) {
      menu.classList.add('is-up');
    }
    if (spaceRight < menuRect.width + 8) {
      menu.classList.add('is-right');
    }
  }

  const dropdown = {
    toggle(id, trigger) {
      const menu = document.getElementById(id);
      if (!menu) return;
      if (_openDropdowns.has(id)) { dropdown.close(id); return; }
      dropdown._closeAll();
      dropdown.open(id, trigger);
    },

    open(id, trigger) {
      const menu = document.getElementById(id);
      if (!menu) return;

      menu.classList.add('is-open');
      menu.removeAttribute('aria-hidden');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'true');
        menu._trigger = trigger;
      }
      _openDropdowns.add(id);
      _overlayStack.push({ type: 'dropdown', id });

      _positionDropdown(menu, trigger || menu.previousElementSibling);

      // Focus first item
      const first = menu.querySelector(FOCUSABLE);
      if (first) setTimeout(() => first.focus(), 20);

      // Keyboard nav inside dropdown
      if (!menu._keyHandler) {
        menu._keyHandler = e => dropdown._onKey(e, menu, id);
        menu.addEventListener('keydown', menu._keyHandler);
      }
    },

    close(id) {
      const menu = document.getElementById(id);
      if (!menu || !menu.classList.contains('is-open')) return;

      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      _openDropdowns.delete(id);

      const idx = _overlayStack.findLastIndex(o => o.type === 'dropdown' && o.id === id);
      if (idx !== -1) _overlayStack.splice(idx, 1);

      const trigger = menu._trigger;
      if (trigger) { trigger.setAttribute('aria-expanded', 'false'); trigger.focus(); }
    },

    _closeAll() {
      [..._openDropdowns].forEach(id => dropdown.close(id));
    },

    _onKey(e, menu, id) {
      const items = Array.from(menu.querySelectorAll('.sensory-dropdown-item:not([disabled])'));
      const idx   = items.indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[idx === -1 ? 0 : Math.min(idx + 1, items.length - 1)]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[idx <= 0 ? 0 : idx - 1]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault(); items[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault(); items[items.length - 1]?.focus();
      } else if (e.key === 'Tab') {
        dropdown.close(id);
      }
    },

    _initAll() {
      document.querySelectorAll('[data-sensory-dropdown]:not([data-sensory-wired])').forEach(trigger => {
        const targetId = trigger.dataset.sensoryDropdown;
        if (!targetId) return;
        trigger.setAttribute('data-sensory-wired', '');
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        const menu = document.getElementById(targetId);
        if (menu) {
          menu.setAttribute('aria-hidden', 'true');
          menu._trigger = trigger;
          // Menu items are one-shot actions — close the menu once one is activated.
          menu.addEventListener('click', e => {
            if (e.target.closest('.sensory-dropdown-item:not([disabled])')) {
              dropdown.close(targetId);
            }
          });
        }
        trigger.addEventListener('click', e => {
          e.stopPropagation();
          dropdown.toggle(targetId, trigger);
        });
      });

      // Click outside closes all dropdowns
      document.addEventListener('click', e => {
        if (!_openDropdowns.size) return;
        [..._openDropdowns].forEach(id => {
          const menu = document.getElementById(id);
          if (!menu) return;
          const trigger = menu._trigger;
          if (!menu.contains(e.target) && (!trigger || !trigger.contains(e.target))) {
            dropdown.close(id);
          }
        });
      });
    },
  };

  /* ── Main init ───────────────────────────────────────────── */

  function init() {
    tabs._initAll();
    drawer._initAll();
    modal._initAll();
    dropdown._initAll();
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── Public API ──────────────────────────────────────────── */

  const SensoryUI = { init, tabs, drawer, modal, toast, dropdown };
  global.SensoryUI = SensoryUI;

}(window));
