export const langs = ['th', 'en'] as const;
export type Lang = (typeof langs)[number];

// Shared by both languages. Prices are "from" prices in baht.
export const services = {
  scaling: 800,
  filling: 900,
  whitening: 6500,
  aligners: 45000,
  wisdom: 2500,
  implant: 39000,
} as const;
export type ServiceId = keyof typeof services;

export const doctors = ['mint', 'phum', 'prae'] as const;
export type DoctorId = (typeof doctors)[number];

// Placeholders, shown as text only so nobody real gets a call. While demo is true the booking
// form previews the LINE message instead of opening LINE; a real clinic sets its own ID and false.
export const contact = { line: '@your-line-id', phone: '0X-XXX-XXXX', demo: true };
export const mapUrl = 'https://www.google.com/maps/search/?api=1&query=BTS+Ari';
export const credit = { name: 'netiwit.', url: 'https://portfolio.ntwdev.com' };

const th = {
  meta: {
    title: 'Mellow Dental คลินิกทันตกรรม อารีย์ (เว็บตัวอย่าง)',
    description:
      'คลินิกทันตกรรมสมมติย่านอารีย์ ทำฟันแบบสบายใจ แจ้งราคาก่อนเริ่มทุกครั้ง จองคิวแล้วส่งเข้า LINE ได้ในครั้งเดียว',
    locale: 'th_TH',
  },
  nav: {
    skip: 'ข้ามไปเนื้อหา',
    services: 'บริการและราคา',
    visit: 'มาครั้งแรก',
    doctors: 'ทันตแพทย์',
    faq: 'คำถาม',
    contact: 'ติดต่อ',
    book: 'จองคิว',
    other: 'English',
  },
  hero: {
    eyebrow: 'คลินิกทันตกรรม · อารีย์',
    title: 'ทำฟันแบบสบายใจ ไม่ต้องเกร็ง',
    lead: 'หมออธิบายทุกขั้นตอนและแจ้งราคาก่อนเริ่มทุกครั้ง ห้องทำฟันเงียบ อบอุ่น ไม่เร่งรีบ เหมาะกับคนที่ไม่ชอบไปหาหมอฟัน',
    book: 'จองคิว',
    prices: 'ดูราคา',
    facts: ['เปิดทุกวัน 10:00–20:00', 'รู้ราคาก่อนเริ่มทำ', 'เดินจาก BTS อารีย์ 3 นาที'],
    badge: 'ห้องทำฟันส่วนตัวทุกห้อง',
    alt: 'ห้องทำฟันที่มีแสงธรรมชาติ เก้าอี้ทำฟันสีขาว และต้นไม้',
  },
  services: {
    eyebrow: 'บริการและราคา',
    title: 'รู้ราคาก่อนตัดสินใจ',
    lead: 'ราคาจริงขึ้นกับสภาพฟันของแต่ละคน หมอจะตรวจและสรุปราคาให้ก่อนเริ่มทุกครั้ง',
    from: 'เริ่มต้น',
    baht: 'บาท',
    care: 'เครื่องมือทุกชิ้นผ่านการฆ่าเชื้อและแพ็กแยกต่อคนไข้ เปิดซองให้เห็นตรงหน้า',
    careAlt: 'ถาดเครื่องมือทันตกรรมที่แพ็กในซองฆ่าเชื้อ วางบนโต๊ะในห้องทำฟัน',
    items: {
      scaling: { name: 'ขูดหินปูนและขัดฟัน', desc: 'ทำความสะอาดหินปูนและคราบสี แนะนำทุก 6 เดือน' },
      filling: { name: 'อุดฟันสีเหมือนฟัน', desc: 'วัสดุสีใกล้เคียงฟันจริง เสร็จในครั้งเดียว' },
      whitening: { name: 'ฟอกสีฟัน', desc: 'ทำที่คลินิก ใช้เวลาประมาณ 1 ชั่วโมง' },
      aligners: { name: 'จัดฟันใส', desc: 'ถอดทำความสะอาดได้ นัดติดตามผลทุก 6–8 สัปดาห์' },
      wisdom: { name: 'ผ่าฟันคุด', desc: 'เอ็กซ์เรย์ประเมินก่อนผ่า นัดตัดไหมหลังผ่า 7 วัน' },
      implant: { name: 'รากฟันเทียม', desc: 'ทดแทนฟันที่หายไป วางแผนจากภาพเอ็กซ์เรย์สามมิติ' },
    } satisfies Record<ServiceId, { name: string; desc: string }>,
  },
  visit: {
    eyebrow: 'มาครั้งแรก',
    title: 'มาครั้งแรกเป็นแบบนี้',
    steps: [
      { title: 'ตรวจและฟังก่อน', desc: 'หมอตรวจช่องปาก เอ็กซ์เรย์ถ้าจำเป็น และถามว่าคุณกังวลเรื่องอะไร' },
      { title: 'สรุปแผนและราคา', desc: 'อธิบายทางเลือกพร้อมราคาแต่ละแบบ คุณตัดสินใจเองได้ ไม่ต้องรีบ' },
      { title: 'รักษาตามที่ตกลง', desc: 'บอกก่อนทุกขั้นตอน ยกมือขอพักได้ทุกเมื่อ' },
      { title: 'นัดติดตามผล', desc: 'แจ้งเตือนนัดครั้งถัดไปทาง LINE ไม่ต้องจำเอง' },
    ],
  },
  doctors: {
    eyebrow: 'ทีมทันตแพทย์',
    title: 'หมอที่ใจเย็นและอธิบายเข้าใจง่าย',
    items: {
      mint: { name: 'ทพญ. มิ้นท์', role: 'ทันตกรรมทั่วไป และฟอกสีฟัน' },
      phum: { name: 'ทพ. ภูมิ', role: 'จัดฟันใส' },
      prae: { name: 'ทพญ. แพร', role: 'ผ่าฟันคุด และรากฟันเทียม' },
    } satisfies Record<DoctorId, { name: string; role: string }>,
    alt: 'รูปของ',
  },
  book: {
    eyebrow: 'จองคิว',
    title: 'เลือกวันที่สะดวก แล้วส่งเข้า LINE ได้เลย',
    lead: 'กรอกครั้งเดียว ข้อความจะไปถึงแอดมินคลินิกใน LINE ครบทุกข้อ แอดมินจะตอบยืนยันคิวในเวลาทำการ',
    service: 'บริการ',
    choose: 'เลือกบริการ',
    unsure: 'ยังไม่แน่ใจ ขอปรึกษาก่อน',
    date: 'วันที่',
    time: 'ช่วงเวลา',
    chooseTime: 'เลือกช่วงเวลา',
    times: ['เช้า 10:00–12:00', 'บ่าย 13:00–17:00', 'เย็น 17:00–20:00'],
    name: 'ชื่อ',
    phone: 'เบอร์โทร',
    note: 'อยากบอกหมอเพิ่มเติม (ไม่บังคับ)',
    submit: 'ส่งเข้า LINE',
    message: 'ขอจองคิว Mellow Dental',
    previewTitle: 'ข้อความที่คลินิกจะได้รับใน LINE',
    previewNote: 'นี่คือเว็บตัวอย่าง ในเว็บจริงปุ่มนี้จะเปิดแชต LINE ของคลินิกพร้อมข้อความนี้ กดส่งได้ทันที',
    close: 'ปิด',
  },
  faq: {
    eyebrow: 'คำถามที่พบบ่อย',
    title: 'สงสัยตรงไหน ถามได้',
    items: [
      { q: 'ทำฟันเจ็บไหม', a: 'งานที่อาจเจ็บ หมอจะใช้ยาชาเฉพาะที่ บอกก่อนทุกขั้นตอน และหยุดพักได้ทุกเมื่อที่คุณยกมือ' },
      { q: 'ต้องจองคิวล่วงหน้าไหม', a: 'แนะนำให้จองล่วงหน้าอย่างน้อย 1 วัน ถ้าปวดฟันเร่งด่วน ทักทาง LINE ได้เลย แอดมินจะหาคิวที่เร็วที่สุดให้' },
      { q: 'ใช้สิทธิประกันสังคมได้ไหม', a: 'ได้ สำหรับขูดหินปูน อุดฟัน และถอนฟัน ตามวงเงินที่ประกันสังคมกำหนด นำบัตรประชาชนมาด้วย' },
      { q: 'จ่ายเงินได้ทางไหนบ้าง', a: 'เงินสด โอนผ่านพร้อมเพย์ และบัตรเครดิต' },
      { q: 'มีที่จอดรถไหม', a: 'มีที่จอดหน้าคลินิก 4 คัน หรือเดินจาก BTS อารีย์ ทางออก 3 ประมาณ 3 นาที' },
    ],
  },
  contact: {
    eyebrow: 'แผนที่และเวลาเปิด',
    title: 'แวะมาได้ทุกวัน',
    hoursLabel: 'เวลาเปิด',
    hours: 'ทุกวัน 10:00–20:00',
    whereLabel: 'ที่ตั้ง',
    where: 'ใกล้ BTS อารีย์ ทางออก 3 กรุงเทพฯ',
    lineLabel: 'LINE',
    phoneLabel: 'โทร',
    map: 'เปิดใน Google Maps',
    alt: 'ห้องรับรองของคลินิก มีโซฟา โคมไฟ และต้นไม้',
  },
  footer: { demo: 'เว็บไซต์ตัวอย่าง คลินิกนี้ไม่มีอยู่จริง', by: 'ออกแบบและพัฒนาโดย' },
};

const en: typeof th = {
  meta: {
    title: 'Mellow Dental, a dental clinic in Ari (demo)',
    description:
      'A fictional dental clinic in Ari, Bangkok. Calm dentistry, prices agreed before treatment, and booking that lands in LINE in one step.',
    locale: 'en_US',
  },
  nav: {
    skip: 'Skip to content',
    services: 'Services',
    visit: 'First visit',
    doctors: 'Dentists',
    faq: 'FAQ',
    contact: 'Contact',
    book: 'Book',
    other: 'ไทย',
  },
  hero: {
    eyebrow: 'Dental clinic · Ari, Bangkok',
    title: 'Dentistry that lets you relax',
    lead: 'Every step explained and every price agreed before we start. Quiet, warm rooms and no rushing, made for people who would rather not see a dentist.',
    book: 'Book a visit',
    prices: 'See prices',
    facts: ['Open daily 10:00–20:00', 'Prices before treatment', '3 minutes from BTS Ari'],
    badge: 'A private room for every patient',
    alt: 'A sunlit treatment room with a white dental chair and plants',
  },
  services: {
    eyebrow: 'Services and prices',
    title: 'Know the price before you decide',
    lead: 'The final price depends on your teeth. Your dentist examines first and confirms the price before any treatment.',
    from: 'from',
    baht: 'THB',
    care: 'Every instrument is sterilised and sealed per patient, and opened in front of you.',
    careAlt: 'A tray of dental instruments in sealed sterilisation pouches on a treatment-room table',
    items: {
      scaling: { name: 'Cleaning and polish', desc: 'Removes tartar and stains. Recommended every 6 months.' },
      filling: { name: 'Tooth-coloured fillings', desc: 'Matched to your natural shade, done in one visit.' },
      whitening: { name: 'Whitening', desc: 'In-clinic, about one hour.' },
      aligners: { name: 'Clear aligners', desc: 'Removable for cleaning, check-ups every 6–8 weeks.' },
      wisdom: { name: 'Wisdom tooth removal', desc: 'X-ray assessment first, stitches out after 7 days.' },
      implant: { name: 'Dental implants', desc: 'Replaces missing teeth, planned from a 3D X-ray.' },
    },
  },
  visit: {
    eyebrow: 'First visit',
    title: 'What your first visit looks like',
    steps: [
      { title: 'Check-up and a chat', desc: 'An exam, X-rays if needed, and time to hear what worries you.' },
      { title: 'Plan and price', desc: 'Your options, each with its price. Decide in your own time.' },
      { title: 'Treatment as agreed', desc: 'Each step announced first. Raise a hand to pause at any time.' },
      { title: 'Follow-up', desc: 'Your next appointment reminder arrives in LINE.' },
    ],
  },
  doctors: {
    eyebrow: 'Our dentists',
    title: 'Patient dentists who explain things clearly',
    items: {
      mint: { name: 'Dr. Mint', role: 'General dentistry and whitening' },
      phum: { name: 'Dr. Phum', role: 'Clear aligners' },
      prae: { name: 'Dr. Prae', role: 'Wisdom teeth and implants' },
    },
    alt: 'Portrait of',
  },
  book: {
    eyebrow: 'Book',
    title: 'Pick a time and send it to LINE',
    lead: 'Fill this in once and the clinic’s LINE receives every detail. The team confirms your slot during opening hours.',
    service: 'Service',
    choose: 'Choose a service',
    unsure: 'Not sure yet, I’d like advice',
    date: 'Date',
    time: 'Time',
    chooseTime: 'Choose a time',
    times: ['Morning 10:00–12:00', 'Afternoon 13:00–17:00', 'Evening 17:00–20:00'],
    name: 'Name',
    phone: 'Phone',
    note: 'Anything the dentist should know (optional)',
    submit: 'Send to LINE',
    message: 'Booking request, Mellow Dental',
    previewTitle: 'What the clinic receives in LINE',
    previewNote: 'This is a demo site. On a real site this button opens the clinic’s LINE chat with this message, ready to send.',
    close: 'Close',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions people ask',
    items: [
      { q: 'Will it hurt?', a: 'For anything that might, we use local anaesthetic, tell you each step first, and stop whenever you raise a hand.' },
      { q: 'Do I need to book ahead?', a: 'At least a day ahead is best. For urgent pain, message us on LINE and we will find the earliest slot.' },
      { q: 'Do you accept Thai social security?', a: 'Yes, for cleaning, fillings and extractions, up to the social security limit. Please bring your ID card.' },
      { q: 'How can I pay?', a: 'Cash, PromptPay transfer or credit card.' },
      { q: 'Is there parking?', a: 'Four spaces in front of the clinic, or a 3-minute walk from BTS Ari exit 3.' },
    ],
  },
  contact: {
    eyebrow: 'Hours and location',
    title: 'Open every day',
    hoursLabel: 'Hours',
    hours: 'Daily 10:00–20:00',
    whereLabel: 'Location',
    where: 'Near BTS Ari exit 3, Bangkok',
    lineLabel: 'LINE',
    phoneLabel: 'Phone',
    map: 'Open in Google Maps',
    alt: 'The clinic lounge with a sofa, a lamp and plants',
  },
  footer: { demo: 'Demo website. This clinic does not exist.', by: 'Designed and built by' },
};

export const dict: Record<Lang, typeof th> = { th, en };
