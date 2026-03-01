
# Batch 4: Redesign Programs, LMS, dan Why Choose Us

## Ringkasan

Redesign 3 halaman sesuai PPT: Programs dengan batch banner + pricing cards + requirement table, LMS dengan tabs IELTS/NCLEX/Certified + badge "Coming Soon" pada konten yang belum ready (bukan hyperlink external), dan Why Choose Us dengan i18n lengkap.

---

## 1. Programs (Programs.tsx) - Redesign Lengkap

### Struktur Baru:
- **Hero Banner**: "50 NURSES ONLY" eye-catching banner dengan background teal gradient
- **Batch Program Section** (`#batch`): Card "Nurse in Singapore Batch #1" dengan detail role, contract, employer
- **Requirement Criteria** (`#requirements`): Tabel 3 kolom (RN / EN / HA) dengan requirements per kategori
- **Webinar Section** (`#webinar`): Event card untuk upcoming webinar (dengan "Coming Soon" badge)
- **Choose Your Plan**: 2 pricing cards (Starter 9 SGD, Professional 19 SGD) - dipertahankan tapi diperbarui styling sesuai PPT (rounded corners, teal accent, shadow)
- **SG Nurse Detail**: Requirements & Documents + Compensation & Benefits tables (sudah ada, dipoles)
- **CTA Bottom**: "Register Now" gradient section

### Perubahan Visual:
- Batch banner menggunakan warna teal bold
- Pricing cards dengan border teal untuk recommended, badge "RECOMMENDED" di atas
- Anchor IDs ditambahkan agar dropdown navbar berfungsi (#batch, #requirements, #webinar)

---

## 2. LMS (LMS.tsx) - Redesign dengan Tabs + "Coming Soon"

### Perubahan Utama:
- **Hapus semua hyperlink external** (British Council, IELTS Liz, dll) - ganti dengan konten placeholder internal + badge "-soon-"
- **Implementasi Tabs** menggunakan Radix Tabs (`@radix-ui/react-tabs` sudah terinstall):
  - Tab 1: **IELTS Preparation** - card-card topik (Reading, Writing, Listening, Speaking) dengan badge "Coming Soon"
  - Tab 2: **Certified Global Nurse** - overview + modules placeholder dengan badge "Coming Soon"  
  - Tab 3: **NCLEX 2026 Resources** - card-card topik (Pharmacology, Med-Surg, Pediatrics, dll) dengan badge "Coming Soon"
- **3 feature cards** di atas tetap dipertahankan (Comprehensive Training, Personalized Matching, Full Support)
- **US Healthcare Basics** tetap ada di bawah tabs, dengan badge "Coming Soon"
- Anchor IDs: `#ielts`, `#certified`, `#nclex`

### Badge "Coming Soon":
- Setiap card konten yang belum ready menampilkan overlay/badge teal "Coming Soon" 
- Tidak ada lagi external hyperlinks - semua jadi internal placeholder cards

---

## 3. Why Choose Us (WhyChooseUs.tsx) - Tambah i18n

### Perubahan:
- Pindahkan semua hardcoded English text ke `en.ts` dan `id.ts`
- Gunakan `useTranslation()` hook
- Tambahkan translation keys: `whyChooseUs.heroSubtitle`, `whyChooseUs.heroTitle`, `whyChooseUs.paroPromise`, dan semua PARO points
- Styling tetap sama (sudah sesuai PPT dari Batch sebelumnya)

---

## 4. Update i18n (en.ts + id.ts)

### Tambahan keys:
- `lms.ieltsTopics` (array: Reading, Writing, Listening, Speaking)
- `lms.certifiedGlobalNurse`, `lms.certifiedGlobalNurseDesc`
- `lms.nclexTopics` (array: Pharmacology, Med-Surg, Pediatrics, Maternal)
- `programs.batchTitle`, `programs.fiftyNursesOnly`, `programs.webinarTitle`, `programs.webinarComingSoon`
- `programs.requirementRN`, `programs.requirementEN`, `programs.requirementHA` (requirement criteria per role)
- `whyChooseUs.*` (semua text dari WhyChooseUs page)
- Semua keys diterjemahkan ke Bahasa Indonesia di `id.ts`

---

## 5. Update Navbar LMS dropdown

Tambahkan badge "soon" visual kecil di dropdown item "Certified Global Nurse" agar user tahu konten belum ready.

---

## Urutan Implementasi

1. Update `en.ts` dan `id.ts` dengan semua translation keys baru
2. Redesign `Programs.tsx` dengan batch banner, requirement table, anchor IDs
3. Redesign `LMS.tsx` dengan Radix Tabs, hapus external links, tambah "Coming Soon" cards
4. Update `WhyChooseUs.tsx` dengan i18n
5. Minor update Navbar dropdown untuk LMS section

---

## Detail Teknis

- Menggunakan `Tabs, TabsList, TabsTrigger, TabsContent` dari `src/components/ui/tabs.tsx` (sudah ada)
- Tidak ada perubahan database atau backend
- Tidak ada dependency baru yang perlu diinstall
- Semua halaman admin tidak terpengaruh
- Anchor scroll (`#ielts`, `#batch`, dll) menggunakan `useEffect` + `useLocation().hash`
