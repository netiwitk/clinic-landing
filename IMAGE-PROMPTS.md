# Prompt สำหรับเจนรูปใน ChatGPT

เจนทั้ง 6 รูป **ในแชตเดียวกัน** ตามลำดับ เพื่อให้แสง สี และการตกแต่งของคลินิกออกมาเป็นที่เดียวกัน

1. วางข้อความในหัวข้อ "ข้อความตั้งต้น" ก่อน
2. แล้วส่ง prompt ของแต่ละรูปทีละข้อความ
3. ถ้ารูปไหนไม่ตรง พิมพ์บอกให้แก้ในแชตเดิม (เช่น "เหมือนเดิมแต่ไม่มีคน")

## ข้อความตั้งต้น

```
I'm making photos for the website of a fictional dental clinic in Bangkok called "Mellow Dental".
Every photo in this chat must look like the same clinic, shot by the same photographer on the same day.

Style for every photo:
- photorealistic, editorial interior photography, 35mm lens, soft natural daylight from large windows
- warm off-white walls, pale mint and light oak wood accents, small deep teal-green details
- a few potted plants, calm, clean, minimal, uncluttered, nothing clinical or scary
- no text, no logos, no signs, no watermarks, no brand names on equipment

Reply "ready" and wait for my prompts.
```

## รูปทั้ง 6

| ไฟล์ | สัดส่วนที่ขอ | ใช้ตรงไหน |
|---|---|---|
| `hero.jpg` | แนวตั้ง 2:3 | รูปใหญ่หัวเว็บ |
| `care.jpg` | แนวตั้ง 2:3 | การ์ดรูปในส่วนบริการ (จอคอมเป็นแนวตั้งสูง มือถือเป็นแนวนอน ตัดขอบอัตโนมัติ) |
| `lounge.jpg` | แนวนอน 3:2 | ส่วนแผนที่และเวลาเปิด |
| `doctor-1.jpg` | แนวตั้ง 2:3 | ทพญ. มิ้นท์ |
| `doctor-2.jpg` | แนวตั้ง 2:3 | ทพ. ภูมิ |
| `doctor-3.jpg` | แนวตั้ง 2:3 | ทพญ. แพร |

**hero.jpg**
```
Portrait 2:3. A private dental treatment room: one modern white dental chair facing a large window,
light oak cabinet, a plant in the corner, soft morning light. No people. Calm and inviting.
```

**care.jpg**
```
Portrait 2:3. Close-up of a dental instrument tray on a light oak counter: instruments still inside
sealed sterilisation pouches, a folded mint-coloured towel beside them. Keep the tray in the centre
with plenty of empty space above and below, because the photo will be cropped to both tall and wide shapes.
```

**lounge.jpg**
```
Landscape 3:2. The clinic's waiting lounge: a soft sofa in warm off-white fabric, a light oak side table,
a floor lamp, two plants, a large window. No people. Feels like a calm café rather than a hospital.
```

**doctor-1.jpg**
```
Portrait 2:3. A Thai female dentist in her early 30s with a calm, friendly smile, wearing deep teal-green scrubs,
standing in this clinic with the background softly blurred. Head and shoulders, head in the upper third of the frame.
Natural, not glamorous, no jewellery, no name badge.
```

**doctor-2.jpg**
```
Portrait 2:3. Same framing, light and background as the previous portrait. A Thai male dentist in his mid 30s,
short hair, friendly smile, deep teal-green scrubs. No name badge.
```

**doctor-3.jpg**
```
Portrait 2:3. Same framing, light and background as the previous portraits. A Thai female dentist in her early 40s,
hair tied back, warm confident smile, deep teal-green scrubs. No name badge.
```

## เอารูปเข้าเว็บ

ChatGPT ให้ไฟล์ PNG ขนาดหลาย MB ให้แปลงเป็น JPG ก่อนแล้ววางทับไฟล์เดิมใน `src/assets/` โดยใช้ชื่อเดิม
(ตอน build Astro จะทำเป็น AVIF/WebP หลายขนาดให้เอง ไฟล์ JPG นี้เป็นแค่ต้นฉบับ)

```bash
# แปลง PNG เป็น JPG คุณภาพ 85 แล้ววางทับรูปชั่วคราว (เปลี่ยนชื่อไฟล์ PNG ให้ตรงกับของคุณ)
sips -s format jpeg -s formatOptions 85 ~/Downloads/ChatGPT-hero.png --out src/assets/hero.jpg

# เก็บ PNG ต้นฉบับไว้ในโฟลเดอร์นี้ได้ (ไม่ขึ้น git)
mkdir -p images-original && mv ~/Downloads/ChatGPT-*.png images-original/
```
