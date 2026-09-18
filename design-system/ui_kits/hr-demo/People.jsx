// People directory. Composes Tabs, Badge, Avatar, Input, IconButton, Card.
const { Tabs: PTabs, Badge: PBadge, Avatar: PAvatar, Input: PInput,
        IconButton: PIconButton, Card: PCard, Tooltip: PTooltip } = window.HAHSensoryDS;

const PEOPLE = [
  { id: "EMP-04821", name: "สุดา รักงาน", role: "เจ้าหน้าที่ขาย", dept: "ฝ่ายขาย", status: "present", email: "suda@hah.co.th" },
  { id: "EMP-04822", name: "ก้องภพ ศรีสุข", role: "นักพัฒนาซอฟต์แวร์", dept: "วิศวกรรม", status: "leave", email: "kong@hah.co.th" },
  { id: "EMP-04823", name: "นภัส วงศ์ทอง", role: "นักออกแบบ", dept: "ออกแบบ", status: "present", email: "naphat@hah.co.th" },
  { id: "EMP-04824", name: "ธีรเดช มากมี", role: "ผู้จัดการบัญชี", dept: "การเงิน", status: "present", email: "teeradech@hah.co.th" },
  { id: "EMP-04825", name: "Anna Lee", role: "HR Business Partner", dept: "ทรัพยากรบุคคล", status: "remote", email: "anna@hah.co.th" },
  { id: "EMP-04826", name: "Ravi Kumar", role: "วิศวกรข้อมูล", dept: "วิศวกรรม", status: "present", email: "ravi@hah.co.th" },
];
const STATUS = {
  present: { tone: "success", label: "เข้างาน" },
  leave: { tone: "warning", label: "ลา" },
  remote: { tone: "info", label: "ทำงานนอกสถานที่" },
};

function People() {
  const [tab, setTab] = React.useState("all");
  const [q, setQ] = React.useState("");
  const list = PEOPLE.filter((p) =>
    (tab === "all" || (tab === "present" && p.status === "present") || (tab === "leave" && p.status === "leave")) &&
    (q === "" || p.name.toLowerCase().includes(q.toLowerCase()) || p.role.includes(q))
  );
  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 600 }}>พนักงาน</h2>
          <div className="sub">48 คนใน 6 แผนก</div>
        </div>
        <div style={{ width: 260 }}>
          <PInput leadingIcon={<KitIcon n="search" />} placeholder="ค้นหาพนักงาน…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <PTabs value={tab} onChange={setTab} items={[
          { value: "all", label: "ทั้งหมด", count: PEOPLE.length },
          { value: "present", label: "เข้างาน" },
          { value: "leave", label: "ลา" },
        ]} />
      </div>

      <PCard>
        <table className="table">
          <thead>
            <tr>
              <th>พนักงาน</th><th>ตำแหน่ง</th><th>แผนก</th><th>สถานะ</th><th style={{ width: 90 }}></th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="cell-person">
                    <PAvatar name={p.name} size="md" status={p.status === "present"} />
                    <div>
                      <div className="nm">{p.name}</div>
                      <div className="id">{p.id}</div>
                    </div>
                  </div>
                </td>
                <td>{p.role}</td>
                <td>{p.dept}</td>
                <td><PBadge tone={STATUS[p.status].tone} dot>{STATUS[p.status].label}</PBadge></td>
                <td>
                  <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                    <PTooltip label="ส่งข้อความ"><PIconButton size="sm" aria-label="ส่งข้อความ"><KitIcon n="mail" /></PIconButton></PTooltip>
                    <PIconButton size="sm" aria-label="เพิ่มเติม"><KitIcon n="more-horizontal" /></PIconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 ? <div className="empty">ไม่พบพนักงานที่ตรงกับการค้นหา</div> : null}
      </PCard>
    </div>
  );
}

Object.assign(window, { People });
