// Leave request form. Composes Select, Input, Radio, Textarea, Alert, Button, Card.
const { Card: LCard, CardHeader: LCardHeader, CardBody: LCardBody, Select: LSelect,
        Input: LInput, Radio: LRadio, Textarea: LTextarea, Alert: LAlert, Button: LButton } = window.HAHSensoryDS;

function LeaveRequest({ onSubmit, onCancel }) {
  const [type, setType] = React.useState("ลาพักร้อน");
  const [duration, setDuration] = React.useState("full");
  return (
    <div className="content" style={{ maxWidth: 720 }}>
      <div className="page-head">
        <div>
          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 600 }}>ยื่นคำขอลา</h2>
          <div className="sub">กรอกรายละเอียดด้านล่าง หัวหน้างานของคุณจะได้รับการแจ้งเตือนเพื่ออนุมัติ</div>
        </div>
      </div>

      <LCard>
        <LCardHeader title="รายละเอียดการลา" />
        <LCardBody>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <LSelect label="ประเภทการลา" value={type} onChange={(e) => setType(e.target.value)}
              options={["ลาพักร้อน", "ลาป่วย", "ลากิจ", "ลาคลอด", "ลาบวช"]} required />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <LInput label="วันที่เริ่ม" type="date" defaultValue="2025-07-12" required />
              <LInput label="ถึงวันที่" type="date" defaultValue="2025-07-14" required />
            </div>

            <div className="sensory-field">
              <span className="sensory-label">ระยะเวลา</span>
              <div className="seg" style={{ gap: 22 }}>
                <LRadio name="dur" value="full" label="เต็มวัน" checked={duration === "full"} onChange={() => setDuration("full")} />
                <LRadio name="dur" value="am" label="ครึ่งวันเช้า" checked={duration === "am"} onChange={() => setDuration("am")} />
                <LRadio name="dur" value="pm" label="ครึ่งวันบ่าย" checked={duration === "pm"} onChange={() => setDuration("pm")} />
              </div>
            </div>

            <LTextarea label="เหตุผลการลา" placeholder="ระบุเหตุผล…" rows={3} required />

            <LAlert tone="info" title="วันลาคงเหลือ">
              {type === "ลาพักร้อน" ? "ลาพักร้อน: เหลือ 4 วันจาก 10 วันในปีนี้"
                : type === "ลาป่วย" ? "ลาป่วย: เหลือ 28 วันจาก 30 วันในปีนี้"
                : "ลากิจ: เหลือ 1 วันจาก 6 วันในปีนี้"}
            </LAlert>
          </div>
        </LCardBody>
        <div className="drawer-foot" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <LButton variant="ghost" onClick={onCancel}>ยกเลิก</LButton>
          <LButton variant="primary" leadingIcon={<KitIcon n="send" />} onClick={onSubmit}>ส่งคำขอ</LButton>
        </div>
      </LCard>
    </div>
  );
}

Object.assign(window, { LeaveRequest });
