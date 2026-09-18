// Dashboard — employee/manager self-service home.
const { StatCard: DStat, Card: DCard, CardHeader: DCardHeader, CardBody: DCardBody,
        Badge: DBadge, ProgressBar: DProgress, Avatar: DAvatar, Button: DButton } = window.HAHSensoryDS;

const RECENT = [
  { name: "สุดา รักงาน", type: "ลาพักร้อน", days: "3 วัน", when: "12–14 ก.ค.", status: "warning", label: "รออนุมัติ" },
  { name: "ก้องภพ ศรีสุข", type: "ลาป่วย", days: "1 วัน", when: "8 ก.ค.", status: "success", label: "อนุมัติแล้ว" },
  { name: "นภัส วงศ์ทอง", type: "ลากิจ", days: "2 วัน", when: "5–6 ก.ค.", status: "danger", label: "ปฏิเสธ" },
  { name: "ธีรเดช มากมี", type: "ลาพักร้อน", days: "5 วัน", when: "1–5 ก.ค.", status: "success", label: "อนุมัติแล้ว" },
];

function Dashboard({ onNav }) {
  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 600 }}>สวัสดีตอนเช้า, สมชาย 👋</h2>
          <div className="sub">วันจันทร์ที่ 7 กรกฎาคม 2568 · มีคำขอ 8 รายการรอการอนุมัติจากคุณ</div>
        </div>
        <DButton variant="primary" leadingIcon={<KitIcon n="plus" />} onClick={() => onNav("leave")}>ขอลา</DButton>
      </div>

      <div className="stat-grid">
        <DStat label="รออนุมัติ" value="8" icon={<KitIcon n="clock" />} delta="+3" deltaDir="up" footer="สัปดาห์นี้" />
        <DStat label="เข้างานวันนี้" value="42" icon={<KitIcon n="user-check" />} footer="จาก 48 คน" />
        <DStat label="ลาวันนี้" value="4" icon={<KitIcon n="palmtree" />} footer="2 ลาป่วย · 2 ลากิจ" />
        <DStat label="ขาดงาน" value="2" icon={<KitIcon n="user-x" />} delta="-1" deltaDir="down" footer="เทียบเดือนก่อน" />
      </div>

      <div className="two-col">
        <DCard>
          <DCardHeader title="คำขอลาล่าสุด" action={<DButton variant="ghost" size="sm" trailingIcon={<KitIcon n="arrow-right" />} onClick={() => onNav("approvals")}>ดูทั้งหมด</DButton>} />
          <div>
            {RECENT.map((r, i) => (
              <div className="req-row" key={i}>
                <DAvatar name={r.name} size="md" />
                <div className="body">
                  <div className="ttl">{r.name}</div>
                  <div className="meta">{r.type} · {r.days} · {r.when}</div>
                </div>
                <DBadge tone={r.status} dot>{r.label}</DBadge>
              </div>
            ))}
          </div>
        </DCard>

        <DCard>
          <DCardHeader title="วันลาคงเหลือของฉัน" />
          <DCardBody>
            <LeaveBalance label="ลาพักร้อน" used={6} total={10} tone="brand" />
            <LeaveBalance label="ลาป่วย" used={2} total={30} tone="success" />
            <LeaveBalance label="ลากิจ" used={5} total={6} tone="warning" />
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginBottom: 10 }}>ทีมที่ลาสัปดาห์นี้</div>
              <div className="seg">
                <DAvatar name="สุดา รักงาน" size="sm" />
                <DAvatar name="กิตติ ก." size="sm" />
                <DAvatar name="Anna Lee" size="sm" />
                <DAvatar name="ravi k" size="sm" />
              </div>
            </div>
          </DCardBody>
        </DCard>
      </div>
    </div>
  );
}

function LeaveBalance({ label, used, total, tone }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, fontSize: "var(--text-sm)" }}>
        <span style={{ color: "var(--text-body)", fontWeight: 500 }}>{label}</span>
        <span className="mono" style={{ color: "var(--text-muted)" }}>{total - used} / {total} วัน</span>
      </div>
      <DProgress value={used} max={total} tone={tone} />
    </div>
  );
}

Object.assign(window, { Dashboard });
