// Approvals — manager inbox. Composes Tabs, Badge, Avatar, Button, Card.
const { Tabs: ATabs, Badge: ABadge, Avatar: AAvatar, Button: AButton, Card: ACard } = window.HAHSensoryDS;

function Approvals({ pending, onAction, onOpen }) {
  const [tab, setTab] = React.useState("pending");
  const done = [
    { id: 101, name: "ก้องภพ ศรีสุข", type: "ลาป่วย", days: "1 วัน", when: "8 ก.ค.", status: "success", label: "อนุมัติแล้ว" },
    { id: 102, name: "นภัส วงศ์ทอง", type: "ลากิจ", days: "2 วัน", when: "5–6 ก.ค.", status: "danger", label: "ปฏิเสธ" },
  ];
  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 600 }}>คำขอรออนุมัติ</h2>
          <div className="sub">ตรวจสอบและอนุมัติคำขอลาของทีมคุณ</div>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <ATabs value={tab} onChange={setTab} items={[
          { value: "pending", label: "รอดำเนินการ", count: pending.length },
          { value: "done", label: "ดำเนินการแล้ว" },
        ]} />
      </div>

      <ACard>
        {tab === "pending" ? (
          pending.length === 0
            ? <div className="empty">🎉 ไม่มีคำขอที่รอดำเนินการ</div>
            : pending.map((r) => (
              <div className="req-row" key={r.id}>
                <AAvatar name={r.name} size="md" />
                <div className="body" style={{ cursor: "pointer" }} onClick={() => onOpen(r)}>
                  <div className="ttl">{r.name}</div>
                  <div className="meta">{r.type} · {r.days} · {r.when}</div>
                </div>
                <div className="actions">
                  <AButton variant="secondary" size="sm" onClick={() => onAction(r.id, "reject")}>ปฏิเสธ</AButton>
                  <AButton variant="primary" size="sm" leadingIcon={<KitIcon n="check" />} onClick={() => onAction(r.id, "approve")}>อนุมัติ</AButton>
                </div>
              </div>
            ))
        ) : (
          done.map((r) => (
            <div className="req-row" key={r.id}>
              <AAvatar name={r.name} size="md" />
              <div className="body">
                <div className="ttl">{r.name}</div>
                <div className="meta">{r.type} · {r.days} · {r.when}</div>
              </div>
              <ABadge tone={r.status} dot>{r.label}</ABadge>
            </div>
          ))
        )}
      </ACard>
    </div>
  );
}

Object.assign(window, { Approvals });
