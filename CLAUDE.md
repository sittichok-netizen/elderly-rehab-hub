# Elderly Rehab Hub

เว็บแอพรวบรวมกิจกรรม/นันทนาการเพื่อฟื้นฟูผู้สูงอายุ ครอบคลุมการออกกำลังกาย การใช้กล้ามเนื้อมัดเล็ก และการพัฒนา/กระตุ้นสมอง แต่ละกิจกรรมบอกว่าพัฒนาอะไร มีประโยชน์อย่างไร และมีขั้นตอน/คลิปวิดีโอสอนสำหรับผู้ดูแล

## Stack

- **Frontend:** Vanilla JS/HTML/CSS ไม่มี framework ไม่มี build step — hash router + state store ใน `app.js`, สไตล์ผ่าน `app.css`
- **Design system:** [HAH Sensory](design-system/readme.md) (คัดลอกมาจาก `so-service-desk` เพื่อความสอดคล้องของแบรนด์ H@H) — ใช้ `sensory-*` classes จาก `design-system/styles.css`, ไอคอนจาก Lucide
- **Backend:** Cloudflare Workers (`worker.js`) — thin API layer เหนือ D1
- **Database:** Cloudflare D1 (SQLite) — `elderly_rehab_hub`
- **File/video storage:** Cloudflare R2 — bucket `elderly-rehab-hub-files` (bound แล้ว ยังไม่ได้ต่อ upload flow)

## Running it

```bash
npx wrangler dev --port 3457          # dev server ต่อ local D1 (ไม่ต้อง npm install)
npx wrangler d1 migrations apply elderly_rehab_hub --local   # รัน schema migration (local)
npx wrangler d1 execute elderly_rehab_hub --local --file=seed.sql   # ใส่ข้อมูลตัวอย่าง (dev เท่านั้น)
npx wrangler deploy                   # deploy ขึ้น Cloudflare จริง
```

Migration ใหม่ให้เพิ่มไฟล์ใน `migrations/` (`000N_ชื่อ.sql`) แล้วรันคำสั่ง apply ทั้ง `--local` และ `--remote`

## Development rules

- เขียน test สำหรับ logic ที่ส่วนอื่นพึ่งพา (เช่น query/route ใน `worker.js`) เน้นทดสอบ behaviour ไม่ใช่ implementation
- แยกขอบเขตชัดเจน: `worker.js` เก็บ persistence/route เท่านั้น ไม่ผสม business logic ที่ควรอยู่ฝั่ง frontend เข้าไป (ตามแนวทางเดียวกับ so-service-desk)
- จัดการ error case ที่เกิดได้จริง (ไม่พบข้อมูล, body ผิด schema) ก่อน merge
- commit เป็นก้อนเล็กๆ ที่รันได้จริงในแต่ละ commit
- เมื่อ schema เปลี่ยน ต้องมี migration ไฟล์ใหม่เสมอ ห้ามแก้ไฟล์ migration เก่าที่ apply ไปแล้ว
- Production-grade: เพิ่ม CI, tests ตามความคืบหน้าของฟีเจอร์จริง, ตัดสินใจที่ไม่ตรงไปตรงมาให้บันทึกเหตุผลสั้นๆ ไว้ (ADR) ก่อน merge จุดสำคัญ

## Notes

- **Production-grade** — ความน่าเชื่อถือและ scale สำคัญ
- สแตกอิงตาม `so-service-desk` ตามที่ผู้ใช้ระบุ (Cloudflare Workers + D1 + R2 + vanilla JS ไม่มี framework)
- ตอนนี้มีแค่ read-only API (`GET /api/activities`, `GET /api/activities/:id`) — ยังไม่มีระบบ auth/แอดมินสำหรับเพิ่ม-แก้ไขกิจกรรม ต้องออกแบบเพิ่มตอนพัฒนาฟีเจอร์แอดมิน
- คอลัมน์ `video_url` รองรับไว้แล้วแต่ยังไม่มี upload flow ผ่าน R2 จริง
- Dev ใช้ D1/R2 **local** (ต่างจาก so-service-desk ที่ dev ต่อ `--remote` เพื่อ shared state) — ทบทวนอีกครั้งถ้าต้องการให้ทีมเห็นข้อมูลเดียวกันตอน dev
