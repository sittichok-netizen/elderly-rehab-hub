/* @ds-bundle: {"format":3,"namespace":"HAHSensoryDS","components":[{"name":"Avatar","sourcePath":"adapters/react/data-display/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"adapters/react/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"adapters/react/data-display/Badge.jsx"},{"name":"Card","sourcePath":"adapters/react/data-display/Card.jsx"},{"name":"CardHeader","sourcePath":"adapters/react/data-display/Card.jsx"},{"name":"CardBody","sourcePath":"adapters/react/data-display/Card.jsx"},{"name":"ProgressBar","sourcePath":"adapters/react/data-display/ProgressBar.jsx"},{"name":"StatCard","sourcePath":"adapters/react/data-display/StatCard.jsx"},{"name":"Tag","sourcePath":"adapters/react/data-display/Tag.jsx"},{"name":"Alert","sourcePath":"adapters/react/feedback/Alert.jsx"},{"name":"Tooltip","sourcePath":"adapters/react/feedback/Tooltip.jsx"},{"name":"Button","sourcePath":"adapters/react/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"adapters/react/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"adapters/react/forms/IconButton.jsx"},{"name":"Input","sourcePath":"adapters/react/forms/Input.jsx"},{"name":"Radio","sourcePath":"adapters/react/forms/Radio.jsx"},{"name":"Select","sourcePath":"adapters/react/forms/Select.jsx"},{"name":"Switch","sourcePath":"adapters/react/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"adapters/react/forms/Textarea.jsx"},{"name":"Tabs","sourcePath":"adapters/react/navigation/Tabs.jsx"}],"sourceHashes":{"adapters/react/data-display/Avatar.jsx":"b8b52386fd1c","adapters/react/data-display/Badge.jsx":"1f568266fd29","adapters/react/data-display/Card.jsx":"f0a13e20b316","adapters/react/data-display/ProgressBar.jsx":"d3e5ff5ffab1","adapters/react/data-display/StatCard.jsx":"3562ec5e79c0","adapters/react/data-display/Tag.jsx":"f96b83902b75","adapters/react/feedback/Alert.jsx":"25a1c15c3288","adapters/react/feedback/Tooltip.jsx":"6e57474936ad","adapters/react/forms/Button.jsx":"ce6b8446762b","adapters/react/forms/Checkbox.jsx":"afa872ebfbeb","adapters/react/forms/IconButton.jsx":"13e320df7ebc","adapters/react/forms/Input.jsx":"ab40d0777abd","adapters/react/forms/Radio.jsx":"59604c94ca7a","adapters/react/forms/Select.jsx":"d9c3d467f786","adapters/react/forms/Switch.jsx":"3f50eb0609a7","adapters/react/forms/Textarea.jsx":"37df45f15a2e","adapters/react/navigation/Tabs.jsx":"c83999b1a8af","guidelines/tweaks-panel.jsx":"6591467622ed","ui_kits/hr-demo/Approvals.jsx":"a98502f34f1f","ui_kits/hr-demo/Dashboard.jsx":"e4e563ce2179","ui_kits/hr-demo/LeaveRequest.jsx":"e9b773e17822","ui_kits/hr-demo/People.jsx":"5d6ce5c5caed","ui_kits/hr-demo/Shell.jsx":"4449148620ff"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HAHSensoryDS = window.HAHSensoryDS || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// adapters/react/data-display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function initialsOf(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Circular avatar — shows an image, or initials fallback. */
function Avatar({
  name = "",
  src,
  size = "md",
  status = false,
  className = "",
  style,
  ...props
}) {
  const cls = ["sensory-avatar", `is-${size}`, status ? "sensory-avatar-status" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: style,
    title: name || undefined
  }, props), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initialsOf(name));
}

/** Overlapping stack of avatars with an optional "+N" overflow chip. */
function AvatarGroup({
  people = [],
  max = 4,
  size = "sm"
}) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return /*#__PURE__*/React.createElement("span", {
    className: "sensory-avatar-group"
  }, shown.map((p, i) => /*#__PURE__*/React.createElement(Avatar, {
    key: i,
    name: p.name,
    src: p.src,
    size: size
  })), extra > 0 ? /*#__PURE__*/React.createElement("span", {
    className: `sensory-avatar is-${size}`,
    style: {
      background: "var(--surface-sunken)",
      color: "var(--text-muted)"
    }
  }, "+", extra) : null);
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// adapters/react/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Status pill. Tones convey HR state (approved, pending, rejected, etc). */
function Badge({
  tone = "neutral",
  solid = false,
  dot = false,
  className = "",
  children,
  ...props
}) {
  const cls = ["sensory-badge", `tone-${tone}`, solid ? "is-solid" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), dot ? /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// adapters/react/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface container. Compose with CardHeader / CardBody or use freely. */
function Card({
  flat = false,
  interactive = false,
  className = "",
  children,
  ...props
}) {
  const cls = ["sensory-card", flat ? "is-flat" : "", interactive ? "is-interactive" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), children);
}
function CardHeader({
  title,
  action,
  className = "",
  children,
  ...props
}) {
  const cls = ["sensory-card-header", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), title ? /*#__PURE__*/React.createElement("span", {
    className: "sensory-card-title"
  }, title) : children, action ? /*#__PURE__*/React.createElement("div", null, action) : null);
}
function CardBody({
  className = "",
  children,
  ...props
}) {
  const cls = ["sensory-card-pad", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardBody });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// adapters/react/data-display/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Horizontal progress / usage bar (leave used, goal completion). */
function ProgressBar({
  value = 0,
  max = 100,
  tone = "brand",
  className = "",
  ...props
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const cls = ["sensory-progress", `tone-${tone}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": max
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "fill",
    style: {
      width: `${pct}%`
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/data-display/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// adapters/react/data-display/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** KPI tile — label, big value and optional delta. Wrap in a Card. */
function StatCard({
  label,
  value,
  icon,
  delta,
  deltaDir = "up",
  footer,
  className = "",
  ...props
}) {
  const cls = ["sensory-card", "sensory-stat", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, icon ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "inline-flex",
      color: "var(--brand)"
    }
  }, icon) : null, label), /*#__PURE__*/React.createElement("span", {
    className: "stat-value tabular"
  }, value), delta != null ? /*#__PURE__*/React.createElement("span", {
    className: `stat-delta ${deltaDir}`
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      transform: deltaDir === "down" ? "rotate(180deg)" : "none"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "19",
    x2: "12",
    y2: "5"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "5 12 12 5 19 12"
  })), delta) : null, footer ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, footer) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/data-display/StatCard.jsx", error: String((e && e.message) || e) }); }

// adapters/react/data-display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Removable chip — filters, selected people, skills. */
function Tag({
  onRemove,
  className = "",
  children,
  ...props
}) {
  const cls = ["sensory-tag", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), children, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "remove",
    "aria-label": "\u0E25\u0E1A",
    onClick: onRemove
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/data-display/Tag.jsx", error: String((e && e.message) || e) }); }

// adapters/react/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ICONS = {
  info: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12.01",
    y2: "8"
  })),
  success: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })),
  warning: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "9",
    x2: "12",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12.01",
    y2: "17"
  })),
  danger: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "9",
    x2: "9",
    y2: "15"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "9",
    x2: "15",
    y2: "15"
  }))
};

/** Inline alert / banner with tone icon, title and message. */
function Alert({
  tone = "info",
  title,
  className = "",
  children,
  ...props
}) {
  const cls = ["sensory-alert", `tone-${tone}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "status"
  }, props), /*#__PURE__*/React.createElement("svg", {
    className: "alert-icon",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, ICONS[tone]), /*#__PURE__*/React.createElement("div", null, title ? /*#__PURE__*/React.createElement("div", {
    className: "alert-title"
  }, title) : null, children ? /*#__PURE__*/React.createElement("div", {
    className: "alert-body"
  }, children) : null));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// adapters/react/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hover/focus tooltip. Wraps its trigger children. */
function Tooltip({
  label,
  children,
  className = "",
  ...props
}) {
  const cls = ["sensory-tooltip-wrap", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), children, /*#__PURE__*/React.createElement("span", {
    className: "sensory-tooltip",
    role: "tooltip"
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// adapters/react/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * HAH Sensory primary action button. Variants map to intent: primary (brand),
 * secondary (outline), ghost (low-emphasis), danger (destructive), brand-soft.
 */
function Button({
  variant = "primary",
  size = "md",
  block = false,
  leadingIcon,
  trailingIcon,
  className = "",
  children,
  ...props
}) {
  const cls = ["sensory-btn", `is-${variant}`, `is-${size}`, block ? "is-block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls
  }, props), leadingIcon ? /*#__PURE__*/React.createElement("span", {
    className: "btn-icon",
    "aria-hidden": "true",
    style: {
      display: "inline-flex"
    }
  }, leadingIcon) : null, children, trailingIcon ? /*#__PURE__*/React.createElement("span", {
    className: "btn-icon",
    "aria-hidden": "true",
    style: {
      display: "inline-flex"
    }
  }, trailingIcon) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/forms/Button.jsx", error: String((e && e.message) || e) }); }

// adapters/react/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CheckIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));

/** Checkbox with animated tick. Controlled via `checked` / `onChange`. */
function Checkbox({
  label,
  disabled = false,
  className = "",
  ...props
}) {
  const cls = ["sensory-check", disabled ? "is-disabled" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("label", {
    className: cls
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    disabled: disabled
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "box"
  }, /*#__PURE__*/React.createElement(CheckIcon, null)), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// adapters/react/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Square icon-only button. Always pass `aria-label` for accessibility. */
function IconButton({
  size = "md",
  solid = false,
  className = "",
  children,
  ...props
}) {
  const cls = ["sensory-iconbtn", `is-${size}`, solid ? "is-solid" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls
  }, props), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// adapters/react/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useId
} = React;
/** Text input with optional label, hint/error and a leading icon. */
function Input({
  label,
  hint,
  error,
  leadingIcon,
  id,
  className = "",
  ...props
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const inputCls = ["sensory-input", error ? "has-error" : "", className].filter(Boolean).join(" ");
  const input = /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: inputCls,
    "aria-invalid": error ? "true" : undefined
  }, props));
  return /*#__PURE__*/React.createElement("div", {
    className: "sensory-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "sensory-label",
    htmlFor: inputId
  }, label, props.required ? /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*") : null) : null, leadingIcon ? /*#__PURE__*/React.createElement("div", {
    className: "sensory-input-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lead-icon",
    "aria-hidden": "true"
  }, leadingIcon), input) : input, error ? /*#__PURE__*/React.createElement("span", {
    className: "sensory-hint is-error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "sensory-hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/forms/Input.jsx", error: String((e && e.message) || e) }); }

// adapters/react/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Radio button with animated dot. Group by sharing a `name`. */
function Radio({
  label,
  disabled = false,
  className = "",
  ...props
}) {
  const cls = ["sensory-check", "is-radio", disabled ? "is-disabled" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("label", {
    className: cls
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    disabled: disabled
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "box"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sensory-radio-dot"
  })), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// adapters/react/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useId
} = React;
/** Styled native select. Pass <option> children or an `options` array. */
function Select({
  label,
  hint,
  error,
  options,
  id,
  className = "",
  children,
  ...props
}) {
  const autoId = useId();
  const selId = id || autoId;
  const cls = ["sensory-select", error ? "has-error" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "sensory-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "sensory-label",
    htmlFor: selId
  }, label, props.required ? /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    className: cls,
    "aria-invalid": error ? "true" : undefined
  }, props), options ? options.map(o => {
    const value = typeof o === "string" ? o : o.value;
    const labelText = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, labelText);
  }) : children), error ? /*#__PURE__*/React.createElement("span", {
    className: "sensory-hint is-error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "sensory-hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/forms/Select.jsx", error: String((e && e.message) || e) }); }

// adapters/react/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useId
} = React;
/** Toggle switch. Controlled via `checked` / `onChange`. */
function Switch({
  label,
  checked,
  onChange,
  disabled = false,
  id,
  className = "",
  ...props
}) {
  const autoId = useId();
  const sid = id || autoId;
  const cls = ["sensory-switch", disabled ? "is-disabled" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("label", {
    className: cls,
    htmlFor: sid
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: sid,
    type: "checkbox",
    role: "switch",
    checked: checked,
    onChange: onChange,
    disabled: disabled
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "thumb"
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: "switch-label"
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// adapters/react/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useId
} = React;
/** Multi-line text field with label / hint / error. */
function Textarea({
  label,
  hint,
  error,
  id,
  className = "",
  ...props
}) {
  const autoId = useId();
  const taId = id || autoId;
  const cls = ["sensory-textarea", error ? "has-error" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "sensory-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "sensory-label",
    htmlFor: taId
  }, label, props.required ? /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("textarea", _extends({
    id: taId,
    className: cls,
    "aria-invalid": error ? "true" : undefined
  }, props)), error ? /*#__PURE__*/React.createElement("span", {
    className: "sensory-hint is-error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "sensory-hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// adapters/react/navigation/Tabs.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Tab bar. Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).
 * `items`: [{ value, label, count? }].
 */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = "underline",
  className = ""
}) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value);
  const current = value !== undefined ? value : internal;
  const select = v => {
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };
  const cls = ["sensory-tabs", `is-${variant}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    role: "tablist"
  }, items.map(it => {
    const active = it.value === current;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      type: "button",
      role: "tab",
      "aria-selected": active,
      className: ["sensory-tab", active ? "is-active" : ""].filter(Boolean).join(" "),
      onClick: () => select(it.value)
    }, it.label, it.count != null ? /*#__PURE__*/React.createElement("span", {
      className: "tab-count"
    }, it.count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "adapters/react/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// guidelines/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "guidelines/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/hr-demo/Approvals.jsx
try { (() => {
// Approvals — manager inbox. Composes Tabs, Badge, Avatar, Button, Card.
const {
  Tabs: ATabs,
  Badge: ABadge,
  Avatar: AAvatar,
  Button: AButton,
  Card: ACard
} = window.HAHSensoryDS;
function Approvals({
  pending,
  onAction,
  onOpen
}) {
  const [tab, setTab] = React.useState("pending");
  const done = [{
    id: 101,
    name: "ก้องภพ ศรีสุข",
    type: "ลาป่วย",
    days: "1 วัน",
    when: "8 ก.ค.",
    status: "success",
    label: "อนุมัติแล้ว"
  }, {
    id: 102,
    name: "นภัส วงศ์ทอง",
    type: "ลากิจ",
    days: "2 วัน",
    when: "5–6 ก.ค.",
    status: "danger",
    label: "ปฏิเสธ"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: 600
    }
  }, "\u0E04\u0E33\u0E02\u0E2D\u0E23\u0E2D\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E41\u0E25\u0E30\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34\u0E04\u0E33\u0E02\u0E2D\u0E25\u0E32\u0E02\u0E2D\u0E07\u0E17\u0E35\u0E21\u0E04\u0E38\u0E13"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ATabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: "pending",
      label: "รอดำเนินการ",
      count: pending.length
    }, {
      value: "done",
      label: "ดำเนินการแล้ว"
    }]
  })), /*#__PURE__*/React.createElement(ACard, null, tab === "pending" ? pending.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, "\uD83C\uDF89 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E33\u0E02\u0E2D\u0E17\u0E35\u0E48\u0E23\u0E2D\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23") : pending.map(r => /*#__PURE__*/React.createElement("div", {
    className: "req-row",
    key: r.id
  }, /*#__PURE__*/React.createElement(AAvatar, {
    name: r.name,
    size: "md"
  }), /*#__PURE__*/React.createElement("div", {
    className: "body",
    style: {
      cursor: "pointer"
    },
    onClick: () => onOpen(r)
  }, /*#__PURE__*/React.createElement("div", {
    className: "ttl"
  }, r.name), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, r.type, " \xB7 ", r.days, " \xB7 ", r.when)), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement(AButton, {
    variant: "secondary",
    size: "sm",
    onClick: () => onAction(r.id, "reject")
  }, "\u0E1B\u0E0F\u0E34\u0E40\u0E2A\u0E18"), /*#__PURE__*/React.createElement(AButton, {
    variant: "primary",
    size: "sm",
    leadingIcon: /*#__PURE__*/React.createElement(KitIcon, {
      n: "check"
    }),
    onClick: () => onAction(r.id, "approve")
  }, "\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34")))) : done.map(r => /*#__PURE__*/React.createElement("div", {
    className: "req-row",
    key: r.id
  }, /*#__PURE__*/React.createElement(AAvatar, {
    name: r.name,
    size: "md"
  }), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ttl"
  }, r.name), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, r.type, " \xB7 ", r.days, " \xB7 ", r.when)), /*#__PURE__*/React.createElement(ABadge, {
    tone: r.status,
    dot: true
  }, r.label)))));
}
Object.assign(window, {
  Approvals
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hr-demo/Approvals.jsx", error: String((e && e.message) || e) }); }

// ui_kits/hr-demo/Dashboard.jsx
try { (() => {
// Dashboard — employee/manager self-service home.
const {
  StatCard: DStat,
  Card: DCard,
  CardHeader: DCardHeader,
  CardBody: DCardBody,
  Badge: DBadge,
  ProgressBar: DProgress,
  Avatar: DAvatar,
  Button: DButton
} = window.HAHSensoryDS;
const RECENT = [{
  name: "สุดา รักงาน",
  type: "ลาพักร้อน",
  days: "3 วัน",
  when: "12–14 ก.ค.",
  status: "warning",
  label: "รออนุมัติ"
}, {
  name: "ก้องภพ ศรีสุข",
  type: "ลาป่วย",
  days: "1 วัน",
  when: "8 ก.ค.",
  status: "success",
  label: "อนุมัติแล้ว"
}, {
  name: "นภัส วงศ์ทอง",
  type: "ลากิจ",
  days: "2 วัน",
  when: "5–6 ก.ค.",
  status: "danger",
  label: "ปฏิเสธ"
}, {
  name: "ธีรเดช มากมี",
  type: "ลาพักร้อน",
  days: "5 วัน",
  when: "1–5 ก.ค.",
  status: "success",
  label: "อนุมัติแล้ว"
}];
function Dashboard({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: 600
    }
  }, "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E15\u0E2D\u0E19\u0E40\u0E0A\u0E49\u0E32, \u0E2A\u0E21\u0E0A\u0E32\u0E22 \uD83D\uDC4B"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "\u0E27\u0E31\u0E19\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C\u0E17\u0E35\u0E48 7 \u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21 2568 \xB7 \u0E21\u0E35\u0E04\u0E33\u0E02\u0E2D 8 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E23\u0E2D\u0E01\u0E32\u0E23\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34\u0E08\u0E32\u0E01\u0E04\u0E38\u0E13")), /*#__PURE__*/React.createElement(DButton, {
    variant: "primary",
    leadingIcon: /*#__PURE__*/React.createElement(KitIcon, {
      n: "plus"
    }),
    onClick: () => onNav("leave")
  }, "\u0E02\u0E2D\u0E25\u0E32")), /*#__PURE__*/React.createElement("div", {
    className: "stat-grid"
  }, /*#__PURE__*/React.createElement(DStat, {
    label: "\u0E23\u0E2D\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34",
    value: "8",
    icon: /*#__PURE__*/React.createElement(KitIcon, {
      n: "clock"
    }),
    delta: "+3",
    deltaDir: "up",
    footer: "\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E19\u0E35\u0E49"
  }), /*#__PURE__*/React.createElement(DStat, {
    label: "\u0E40\u0E02\u0E49\u0E32\u0E07\u0E32\u0E19\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
    value: "42",
    icon: /*#__PURE__*/React.createElement(KitIcon, {
      n: "user-check"
    }),
    footer: "\u0E08\u0E32\u0E01 48 \u0E04\u0E19"
  }), /*#__PURE__*/React.createElement(DStat, {
    label: "\u0E25\u0E32\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
    value: "4",
    icon: /*#__PURE__*/React.createElement(KitIcon, {
      n: "palmtree"
    }),
    footer: "2 \u0E25\u0E32\u0E1B\u0E48\u0E27\u0E22 \xB7 2 \u0E25\u0E32\u0E01\u0E34\u0E08"
  }), /*#__PURE__*/React.createElement(DStat, {
    label: "\u0E02\u0E32\u0E14\u0E07\u0E32\u0E19",
    value: "2",
    icon: /*#__PURE__*/React.createElement(KitIcon, {
      n: "user-x"
    }),
    delta: "-1",
    deltaDir: "down",
    footer: "\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E01\u0E48\u0E2D\u0E19"
  })), /*#__PURE__*/React.createElement("div", {
    className: "two-col"
  }, /*#__PURE__*/React.createElement(DCard, null, /*#__PURE__*/React.createElement(DCardHeader, {
    title: "\u0E04\u0E33\u0E02\u0E2D\u0E25\u0E32\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
    action: /*#__PURE__*/React.createElement(DButton, {
      variant: "ghost",
      size: "sm",
      trailingIcon: /*#__PURE__*/React.createElement(KitIcon, {
        n: "arrow-right"
      }),
      onClick: () => onNav("approvals")
    }, "\u0E14\u0E39\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14")
  }), /*#__PURE__*/React.createElement("div", null, RECENT.map((r, i) => /*#__PURE__*/React.createElement("div", {
    className: "req-row",
    key: i
  }, /*#__PURE__*/React.createElement(DAvatar, {
    name: r.name,
    size: "md"
  }), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ttl"
  }, r.name), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, r.type, " \xB7 ", r.days, " \xB7 ", r.when)), /*#__PURE__*/React.createElement(DBadge, {
    tone: r.status,
    dot: true
  }, r.label))))), /*#__PURE__*/React.createElement(DCard, null, /*#__PURE__*/React.createElement(DCardHeader, {
    title: "\u0E27\u0E31\u0E19\u0E25\u0E32\u0E04\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E02\u0E2D\u0E07\u0E09\u0E31\u0E19"
  }), /*#__PURE__*/React.createElement(DCardBody, null, /*#__PURE__*/React.createElement(LeaveBalance, {
    label: "\u0E25\u0E32\u0E1E\u0E31\u0E01\u0E23\u0E49\u0E2D\u0E19",
    used: 6,
    total: 10,
    tone: "brand"
  }), /*#__PURE__*/React.createElement(LeaveBalance, {
    label: "\u0E25\u0E32\u0E1B\u0E48\u0E27\u0E22",
    used: 2,
    total: 30,
    tone: "success"
  }), /*#__PURE__*/React.createElement(LeaveBalance, {
    label: "\u0E25\u0E32\u0E01\u0E34\u0E08",
    used: 5,
    total: 6,
    tone: "warning"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 16,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)",
      marginBottom: 10
    }
  }, "\u0E17\u0E35\u0E21\u0E17\u0E35\u0E48\u0E25\u0E32\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E19\u0E35\u0E49"), /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, /*#__PURE__*/React.createElement(DAvatar, {
    name: "\u0E2A\u0E38\u0E14\u0E32 \u0E23\u0E31\u0E01\u0E07\u0E32\u0E19",
    size: "sm"
  }), /*#__PURE__*/React.createElement(DAvatar, {
    name: "\u0E01\u0E34\u0E15\u0E15\u0E34 \u0E01.",
    size: "sm"
  }), /*#__PURE__*/React.createElement(DAvatar, {
    name: "Anna Lee",
    size: "sm"
  }), /*#__PURE__*/React.createElement(DAvatar, {
    name: "ravi k",
    size: "sm"
  })))))));
}
function LeaveBalance({
  label,
  used,
  total,
  tone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 7,
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-body)",
      fontWeight: 500
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: "var(--text-muted)"
    }
  }, total - used, " / ", total, " \u0E27\u0E31\u0E19")), /*#__PURE__*/React.createElement(DProgress, {
    value: used,
    max: total,
    tone: tone
  }));
}
Object.assign(window, {
  Dashboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hr-demo/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/hr-demo/LeaveRequest.jsx
try { (() => {
// Leave request form. Composes Select, Input, Radio, Textarea, Alert, Button, Card.
const {
  Card: LCard,
  CardHeader: LCardHeader,
  CardBody: LCardBody,
  Select: LSelect,
  Input: LInput,
  Radio: LRadio,
  Textarea: LTextarea,
  Alert: LAlert,
  Button: LButton
} = window.HAHSensoryDS;
function LeaveRequest({
  onSubmit,
  onCancel
}) {
  const [type, setType] = React.useState("ลาพักร้อน");
  const [duration, setDuration] = React.useState("full");
  return /*#__PURE__*/React.createElement("div", {
    className: "content",
    style: {
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: 600
    }
  }, "\u0E22\u0E37\u0E48\u0E19\u0E04\u0E33\u0E02\u0E2D\u0E25\u0E32"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "\u0E01\u0E23\u0E2D\u0E01\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E14\u0E49\u0E32\u0E19\u0E25\u0E48\u0E32\u0E07 \u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E07\u0E32\u0E19\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E08\u0E30\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34"))), /*#__PURE__*/React.createElement(LCard, null, /*#__PURE__*/React.createElement(LCardHeader, {
    title: "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E01\u0E32\u0E23\u0E25\u0E32"
  }), /*#__PURE__*/React.createElement(LCardBody, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(LSelect, {
    label: "\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E01\u0E32\u0E23\u0E25\u0E32",
    value: type,
    onChange: e => setType(e.target.value),
    options: ["ลาพักร้อน", "ลาป่วย", "ลากิจ", "ลาคลอด", "ลาบวช"],
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(LInput, {
    label: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E23\u0E34\u0E48\u0E21",
    type: "date",
    defaultValue: "2025-07-12",
    required: true
  }), /*#__PURE__*/React.createElement(LInput, {
    label: "\u0E16\u0E36\u0E07\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48",
    type: "date",
    defaultValue: "2025-07-14",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "sensory-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sensory-label"
  }, "\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32"), /*#__PURE__*/React.createElement("div", {
    className: "seg",
    style: {
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(LRadio, {
    name: "dur",
    value: "full",
    label: "\u0E40\u0E15\u0E47\u0E21\u0E27\u0E31\u0E19",
    checked: duration === "full",
    onChange: () => setDuration("full")
  }), /*#__PURE__*/React.createElement(LRadio, {
    name: "dur",
    value: "am",
    label: "\u0E04\u0E23\u0E36\u0E48\u0E07\u0E27\u0E31\u0E19\u0E40\u0E0A\u0E49\u0E32",
    checked: duration === "am",
    onChange: () => setDuration("am")
  }), /*#__PURE__*/React.createElement(LRadio, {
    name: "dur",
    value: "pm",
    label: "\u0E04\u0E23\u0E36\u0E48\u0E07\u0E27\u0E31\u0E19\u0E1A\u0E48\u0E32\u0E22",
    checked: duration === "pm",
    onChange: () => setDuration("pm")
  }))), /*#__PURE__*/React.createElement(LTextarea, {
    label: "\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E25\u0E32",
    placeholder: "\u0E23\u0E30\u0E1A\u0E38\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u2026",
    rows: 3,
    required: true
  }), /*#__PURE__*/React.createElement(LAlert, {
    tone: "info",
    title: "\u0E27\u0E31\u0E19\u0E25\u0E32\u0E04\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D"
  }, type === "ลาพักร้อน" ? "ลาพักร้อน: เหลือ 4 วันจาก 10 วันในปีนี้" : type === "ลาป่วย" ? "ลาป่วย: เหลือ 28 วันจาก 30 วันในปีนี้" : "ลากิจ: เหลือ 1 วันจาก 6 วันในปีนี้"))), /*#__PURE__*/React.createElement("div", {
    className: "drawer-foot",
    style: {
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(LButton, {
    variant: "ghost",
    onClick: onCancel
  }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"), /*#__PURE__*/React.createElement(LButton, {
    variant: "primary",
    leadingIcon: /*#__PURE__*/React.createElement(KitIcon, {
      n: "send"
    }),
    onClick: onSubmit
  }, "\u0E2A\u0E48\u0E07\u0E04\u0E33\u0E02\u0E2D"))));
}
Object.assign(window, {
  LeaveRequest
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hr-demo/LeaveRequest.jsx", error: String((e && e.message) || e) }); }

// ui_kits/hr-demo/People.jsx
try { (() => {
// People directory. Composes Tabs, Badge, Avatar, Input, IconButton, Card.
const {
  Tabs: PTabs,
  Badge: PBadge,
  Avatar: PAvatar,
  Input: PInput,
  IconButton: PIconButton,
  Card: PCard,
  Tooltip: PTooltip
} = window.HAHSensoryDS;
const PEOPLE = [{
  id: "EMP-04821",
  name: "สุดา รักงาน",
  role: "เจ้าหน้าที่ขาย",
  dept: "ฝ่ายขาย",
  status: "present",
  email: "suda@hah.co.th"
}, {
  id: "EMP-04822",
  name: "ก้องภพ ศรีสุข",
  role: "นักพัฒนาซอฟต์แวร์",
  dept: "วิศวกรรม",
  status: "leave",
  email: "kong@hah.co.th"
}, {
  id: "EMP-04823",
  name: "นภัส วงศ์ทอง",
  role: "นักออกแบบ",
  dept: "ออกแบบ",
  status: "present",
  email: "naphat@hah.co.th"
}, {
  id: "EMP-04824",
  name: "ธีรเดช มากมี",
  role: "ผู้จัดการบัญชี",
  dept: "การเงิน",
  status: "present",
  email: "teeradech@hah.co.th"
}, {
  id: "EMP-04825",
  name: "Anna Lee",
  role: "HR Business Partner",
  dept: "ทรัพยากรบุคคล",
  status: "remote",
  email: "anna@hah.co.th"
}, {
  id: "EMP-04826",
  name: "Ravi Kumar",
  role: "วิศวกรข้อมูล",
  dept: "วิศวกรรม",
  status: "present",
  email: "ravi@hah.co.th"
}];
const STATUS = {
  present: {
    tone: "success",
    label: "เข้างาน"
  },
  leave: {
    tone: "warning",
    label: "ลา"
  },
  remote: {
    tone: "info",
    label: "ทำงานนอกสถานที่"
  }
};
function People() {
  const [tab, setTab] = React.useState("all");
  const [q, setQ] = React.useState("");
  const list = PEOPLE.filter(p => (tab === "all" || tab === "present" && p.status === "present" || tab === "leave" && p.status === "leave") && (q === "" || p.name.toLowerCase().includes(q.toLowerCase()) || p.role.includes(q)));
  return /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: 600
    }
  }, "\u0E1E\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "48 \u0E04\u0E19\u0E43\u0E19 6 \u0E41\u0E1C\u0E19\u0E01")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260
    }
  }, /*#__PURE__*/React.createElement(PInput, {
    leadingIcon: /*#__PURE__*/React.createElement(KitIcon, {
      n: "search"
    }),
    placeholder: "\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E1E\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19\u2026",
    value: q,
    onChange: e => setQ(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(PTabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: "all",
      label: "ทั้งหมด",
      count: PEOPLE.length
    }, {
      value: "present",
      label: "เข้างาน"
    }, {
      value: "leave",
      label: "ลา"
    }]
  })), /*#__PURE__*/React.createElement(PCard, null, /*#__PURE__*/React.createElement("table", {
    className: "table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u0E1E\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19"), /*#__PURE__*/React.createElement("th", null, "\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07"), /*#__PURE__*/React.createElement("th", null, "\u0E41\u0E1C\u0E19\u0E01"), /*#__PURE__*/React.createElement("th", null, "\u0E2A\u0E16\u0E32\u0E19\u0E30"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 90
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, list.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "cell-person"
  }, /*#__PURE__*/React.createElement(PAvatar, {
    name: p.name,
    size: "md",
    status: p.status === "present"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "id"
  }, p.id)))), /*#__PURE__*/React.createElement("td", null, p.role), /*#__PURE__*/React.createElement("td", null, p.dept), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(PBadge, {
    tone: STATUS[p.status].tone,
    dot: true
  }, STATUS[p.status].label)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(PTooltip, {
    label: "\u0E2A\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21"
  }, /*#__PURE__*/React.createElement(PIconButton, {
    size: "sm",
    "aria-label": "\u0E2A\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21"
  }, /*#__PURE__*/React.createElement(KitIcon, {
    n: "mail"
  }))), /*#__PURE__*/React.createElement(PIconButton, {
    size: "sm",
    "aria-label": "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21"
  }, /*#__PURE__*/React.createElement(KitIcon, {
    n: "more-horizontal"
  })))))))), list.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1E\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E04\u0E49\u0E19\u0E2B\u0E32") : null));
}
Object.assign(window, {
  People
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hr-demo/People.jsx", error: String((e && e.message) || e) }); }

// ui_kits/hr-demo/Shell.jsx
try { (() => {
// App shell: sidebar nav + topbar. Composes Avatar from the design system.
const {
  Avatar: ShellAvatar
} = window.HAHSensoryDS;
function KitIcon({
  n
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": n
  });
}
const NAV_MAIN = [{
  id: "dashboard",
  label: "หน้าหลัก",
  icon: "layout-dashboard"
}, {
  id: "leave",
  label: "การลา",
  icon: "palmtree"
}, {
  id: "approvals",
  label: "รออนุมัติ",
  icon: "inbox",
  badge: "approvals"
}, {
  id: "people",
  label: "พนักงาน",
  icon: "users"
}];
const NAV_MANAGE = [{
  id: "evaluation",
  label: "ประเมินผล",
  icon: "clipboard-check"
}, {
  id: "reports",
  label: "รายงาน",
  icon: "bar-chart-3"
}, {
  id: "settings",
  label: "ตั้งค่า",
  icon: "settings"
}];
function NavItem({
  item,
  active,
  onNav,
  pendingCount
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "nav-item" + (active ? " active" : ""),
    onClick: () => onNav(item.id)
  }, /*#__PURE__*/React.createElement(KitIcon, {
    n: item.icon
  }), item.label, item.badge === "approvals" && pendingCount > 0 ? /*#__PURE__*/React.createElement("span", {
    className: "badge-count"
  }, pendingCount) : null);
}
function Sidebar({
  active,
  onNav,
  pendingCount
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/hah-sensory.jpg",
    height: "30",
    width: "30",
    alt: "HAH Sensory",
    style: { borderRadius: "8px" }
  })), /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, NAV_MAIN.map(it => /*#__PURE__*/React.createElement(NavItem, {
    key: it.id,
    item: it,
    active: active === it.id,
    onNav: onNav,
    pendingCount: pendingCount
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-section"
  }, "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23"), NAV_MANAGE.map(it => /*#__PURE__*/React.createElement(NavItem, {
    key: it.id,
    item: it,
    active: active === it.id,
    onNav: onNav,
    pendingCount: pendingCount
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-user"
  }, /*#__PURE__*/React.createElement(ShellAvatar, {
    name: "\u0E2A\u0E21\u0E0A\u0E32\u0E22 \u0E43\u0E08\u0E14\u0E35",
    size: "md",
    status: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, "\u0E2A\u0E21\u0E0A\u0E32\u0E22 \u0E43\u0E08\u0E14\u0E35"), /*#__PURE__*/React.createElement("div", {
    className: "rl"
  }, "\u0E1C\u0E39\u0E49\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E1D\u0E48\u0E32\u0E22\u0E02\u0E32\u0E22")), /*#__PURE__*/React.createElement("button", {
    className: "sensory-iconbtn is-sm",
    "aria-label": "\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A"
  }, /*#__PURE__*/React.createElement(KitIcon, {
    n: "log-out"
  }))));
}
function Topbar({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("h1", null, title), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), children, /*#__PURE__*/React.createElement("button", {
    className: "sensory-iconbtn is-md",
    "aria-label": "\u0E04\u0E49\u0E19\u0E2B\u0E32"
  }, /*#__PURE__*/React.createElement(KitIcon, {
    n: "search"
  })), /*#__PURE__*/React.createElement("button", {
    className: "sensory-iconbtn is-md",
    "aria-label": "\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19"
  }, /*#__PURE__*/React.createElement(KitIcon, {
    n: "bell"
  })));
}
Object.assign(window, {
  Sidebar,
  Topbar,
  KitIcon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hr-demo/Shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardBody = __ds_scope.CardBody;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
