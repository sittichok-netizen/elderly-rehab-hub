# Elderly Rehab Hub

เว็บแอพรวบรวมกิจกรรม/นันทนาการเพื่อฟื้นฟูผู้สูงอายุ ครอบคลุมการออกกำลังกาย การใช้กล้ามเนื้อมัดเล็ก และการพัฒนา/กระตุ้นสมอง แต่ละกิจกรรมบอกว่าพัฒนาอะไร มีประโยชน์อย่างไร และมีขั้นตอน/คลิปวิดีโอสอนสำหรับผู้ดูแล มีฟีเจอร์ให้แอดมินกดค้นหากิจกรรมใหม่ด้วย AI (ค้นเว็บ + สรุปเป็นกิจกรรมอัตโนมัติ)

## Stack

- **Frontend:** Vanilla JS/HTML/CSS ไม่มี framework ไม่มี build step — hash router + state store ใน `app.js`, สไตล์ผ่าน `app.css`
- **Design system:** [HAH Sensory](design-system/readme.md) (คัดลอกมาจาก `so-service-desk` เพื่อความสอดคล้องของแบรนด์ H@H) — ใช้ `sensory-*` classes จาก `design-system/styles.css`, ไอคอนจาก Lucide
- **Backend:** Cloudflare Workers (`worker.js`) — thin API layer เหนือ D1
- **Database:** Cloudflare D1 (SQLite) — `elderly_rehab_hub`
- **File/video storage:** Cloudflare R2 — bucket `elderly-rehab-hub-files` (bound แล้ว ยังไม่ได้ต่อ upload flow)
- **AI:** Cloudflare Workers AI (`env.AI`, ฟรีในโควต้า Workers ปกติ เหมือน so-service-desk) — ใช้สรุปผลค้นหาเว็บเป็นกิจกรรมใหม่
- **Web search:** Google Custom Search JSON API (ฟรี 100 queries/วัน) — ต้องตั้งค่าเองก่อนใช้ฟีเจอร์ค้นหากิจกรรมใหม่ (ดูด้านล่าง)

## Running it

```bash
npx wrangler dev --remote --port 3457   # dev server ต่อ D1/R2/AI ตัวจริงบน Cloudflare (เหมือน so-service-desk — เห็นข้อมูลชุดเดียวกันทุกเครื่อง)
npx wrangler d1 migrations apply elderly_rehab_hub --local    # รัน schema migration (local, สำหรับตอนอยาก dev แบบ local ล้วน)
npx wrangler d1 migrations apply elderly_rehab_hub --remote   # รัน schema migration (remote/production)
npx wrangler d1 execute elderly_rehab_hub --remote --file=seed.sql   # ใส่ข้อมูลตัวอย่าง
npx wrangler deploy                     # deploy ขึ้น Cloudflare จริง
```

**อย่า dev แบบ local ล้วน (`wrangler dev` ไม่มี `--remote`)** — เจอบั๊กที่ D1/R2 local state (`.wrangler/state/...`) เขียนไฟล์ต่อเนื่องจนถูกตีความว่าเป็นการเปลี่ยนแปลง asset แล้ว trigger reload วนไม่รู้จบ (เพราะ `assets.directory` คือ `./` ทั้งโปรเจกต์) ทำให้ request ค้าง ถ้าจะแก้ให้ถูกจุดต้องตั้ง `--persist-to` ไปที่ path นอกโปรเจกต์ แต่ตอนนี้ใช้ `--remote` ตรงไปตรงมากว่าและตรงกับที่ so-service-desk ใช้อยู่แล้ว

Migration ใหม่ให้เพิ่มไฟล์ใน `migrations/` (`000N_ชื่อ.sql`) แล้วรันคำสั่ง apply ทั้ง `--local` และ `--remote`

### ตั้งค่าฟีเจอร์ "ค้นหากิจกรรมใหม่ด้วย AI"

1. **ADMIN_KEY** — ตั้งไว้แล้วทั้ง local (`.dev.vars`, gitignored) และ remote (`wrangler secret put ADMIN_KEY`) ใช้เป็นรหัสผู้ดูแลกรอกในหน้าเว็บ (เก็บใน localStorage ของเบราว์เซอร์หลังกรอกครั้งแรก)
2. **GOOGLE_SEARCH_API_KEY / GOOGLE_SEARCH_CX** — ยังไม่ได้ตั้งค่า ต้องสมัครเอง (ฟรี):
   - สร้าง Search Engine ที่ https://programmablesearchengine.google.com/ เลือก "Search the entire web" → จะได้ **Search engine ID** (คือค่า `GOOGLE_SEARCH_CX`)
   - เปิดใช้งาน "Custom Search API" ใน Google Cloud Console แล้วสร้าง API key ที่ https://console.cloud.google.com/apis/credentials (คือค่า `GOOGLE_SEARCH_API_KEY`)
   - ใส่ใน `.dev.vars` สำหรับ dev และรัน `npx wrangler secret put GOOGLE_SEARCH_API_KEY` / `npx wrangler secret put GOOGLE_SEARCH_CX` สำหรับ remote/production
   - ฟรี 100 queries/วัน ต่อโปรเจกต์ Google Cloud
3. ก่อนตั้งค่าสองตัวนี้ กดปุ่ม "ค้นหากิจกรรมใหม่" จะได้ error ที่อธิบายชัดเจนว่ายังไม่ได้ตั้งค่า (ไม่ crash)

## Development rules

- เขียน test สำหรับ logic ที่ส่วนอื่นพึ่งพา (เช่น query/route ใน `worker.js`) เน้นทดสอบ behaviour ไม่ใช่ implementation
- แยกขอบเขตชัดเจน: `worker.js` เก็บ persistence/route เท่านั้น ไม่ผสม business logic ที่ควรอยู่ฝั่ง frontend เข้าไป (ตามแนวทางเดียวกับ so-service-desk)
- จัดการ error case ที่เกิดได้จริง (ไม่พบข้อมูล, body ผิด schema, external API ไม่ได้ตั้งค่า) ก่อน merge — ให้ no-op/error message ชัดเจนแบบเดียวกับที่ so-service-desk ทำกับ email/Slack ไม่ใช่ crash
- endpoint ที่เขียนข้อมูล/เรียก external API ที่มีค่าใช้จ่ายหรือ quota (เช่น `/api/activities/discover`) ต้องมีการป้องกันเสมอ (อย่างน้อย shared secret) ห้ามเปิดสาธารณะ
- commit เป็นก้อนเล็กๆ ที่รันได้จริงในแต่ละ commit
- เมื่อ schema เปลี่ยน ต้องมี migration ไฟล์ใหม่เสมอ ห้ามแก้ไฟล์ migration เก่าที่ apply ไปแล้ว
- Production-grade: เพิ่ม CI, tests ตามความคืบหน้าของฟีเจอร์จริง, ตัดสินใจที่ไม่ตรงไปตรงมาให้บันทึกเหตุผลสั้นๆ ไว้ (ADR) ก่อน merge จุดสำคัญ

## Notes

- **Production-grade** — ความน่าเชื่อถือและ scale สำคัญ
- สแตกอิงตาม `so-service-desk` ตามที่ผู้ใช้ระบุ (Cloudflare Workers + D1 + R2 + Workers AI + vanilla JS ไม่มี framework), dev ต่อ `--remote` เหมือนกัน
- ตอนนี้มี API: `GET /api/activities`, `GET /api/activities/:id` (สาธารณะ), `POST /api/activities/discover` (ต้องมี `ADMIN_KEY`) — ยังไม่มีระบบ auth/แอดมินแบบเต็ม (login, บัญชีผู้ใช้) แค่ shared secret เดียวพอสำหรับใช้งานคนเดียว/ทีมเล็ก ถ้าทีมโตขึ้นควรทำระบบ auth จริงแทน
- **"ค้นหากิจกรรมใหม่ด้วย AI"**: แอดมินกดปุ่ม → ค้นเว็บผ่าน Google Custom Search → Workers AI (`@cf/meta/llama-3.3-70b-instruct-fp8-fast`) สรุปเป็นกิจกรรมใหม่ 1 รายการ → **เผยแพร่ทันทีอัตโนมัติ ไม่มีคิวตรวจสอบ** (ตัดสินใจของผู้ใช้ — ยอมรับความเสี่ยงที่เนื้อหาอาจไม่ถูกต้อง/ไม่ปลอดภัย 100%) กิจกรรมที่มาจาก AI จะมี badge "AI" และลิงก์แหล่งอ้างอิงในหน้ารายละเอียดเพื่อให้ตรวจสอบย้อนกลับได้ — ถ้าต้องการเพิ่มคิวตรวจสอบทีหลัง ให้เติม status column (`pending`/`published`) แทนการ insert ตรง
- คอลัมน์ `video_url` รองรับไว้แล้วแต่ยังไม่มี upload flow ผ่าน R2 จริง (กิจกรรมที่ AI สร้างจะไม่มีวิดีโอ มีแค่ลิงก์อ้างอิง)
