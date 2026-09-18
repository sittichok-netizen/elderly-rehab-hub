// App shell: sidebar nav + topbar. Composes Avatar from the design system.
const { Avatar: ShellAvatar } = window.HAHSensoryDS;

function KitIcon({ n }) { return <i data-lucide={n}></i>; }

const NAV_MAIN = [
  { id: "dashboard", label: "หน้าหลัก", icon: "layout-dashboard" },
  { id: "leave", label: "การลา", icon: "palmtree" },
  { id: "approvals", label: "รออนุมัติ", icon: "inbox", badge: "approvals" },
  { id: "people", label: "พนักงาน", icon: "users" },
];
const NAV_MANAGE = [
  { id: "evaluation", label: "ประเมินผล", icon: "clipboard-check" },
  { id: "reports", label: "รายงาน", icon: "bar-chart-3" },
  { id: "settings", label: "ตั้งค่า", icon: "settings" },
];

function NavItem({ item, active, onNav, pendingCount }) {
  return (
    <button className={"nav-item" + (active ? " active" : "")} onClick={() => onNav(item.id)}>
      <KitIcon n={item.icon} />
      {item.label}
      {item.badge === "approvals" && pendingCount > 0 ? <span className="badge-count">{pendingCount}</span> : null}
    </button>
  );
}

function Sidebar({ active, onNav, pendingCount }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src="../../assets/hah-sensory.jpg" height="30" width="30" alt="HAH Sensory" style={{ borderRadius: "8px" }} />
      </div>
      <nav className="nav">
        {NAV_MAIN.map((it) => <NavItem key={it.id} item={it} active={active === it.id} onNav={onNav} pendingCount={pendingCount} />)}
        <div className="nav-section">จัดการ</div>
        {NAV_MANAGE.map((it) => <NavItem key={it.id} item={it} active={active === it.id} onNav={onNav} pendingCount={pendingCount} />)}
      </nav>
      <div className="sidebar-user">
        <ShellAvatar name="สมชาย ใจดี" size="md" status />
        <div className="meta">
          <div className="nm">สมชาย ใจดี</div>
          <div className="rl">ผู้จัดการฝ่ายขาย</div>
        </div>
        <button className="sensory-iconbtn is-sm" aria-label="ออกจากระบบ"><KitIcon n="log-out" /></button>
      </div>
    </aside>
  );
}

function Topbar({ title, children }) {
  return (
    <header className="topbar">
      <h1>{title}</h1>
      <div className="spacer" />
      {children}
      <button className="sensory-iconbtn is-md" aria-label="ค้นหา"><KitIcon n="search" /></button>
      <button className="sensory-iconbtn is-md" aria-label="การแจ้งเตือน"><KitIcon n="bell" /></button>
    </header>
  );
}

Object.assign(window, { Sidebar, Topbar, KitIcon });
