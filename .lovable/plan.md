
## Analisis Gambar Referensi

- **image-13**: Halaman **Our Values** — layout 2-kolom: kiri ada ikon checkmark besar (navy) + judul "Core VALUES" + tagline "Talent is EVERYWHERE, opportunity is not." | Kanan: 4 value items bernomor (1-4) dengan format huruf pertama besar (drop cap style): **P**ASSION, **A**CCOUNTABILITY, **R**ESILIENCE, **O**PPORTUNITY. Di bawah ada banner teal "NURSES ARE THE HEART OF HEALTHCARE"

- **image-14**: Halaman **Our Mission** — judul "MISSION" di kiri teal besar | Kanan: 3 kartu bernomor (1,2,3) dengan rounded card style, teks bold teal untuk kata kunci (AFFORDABLE MOBILE, ANYTIME ANYWHERE, NURSE, GLOBAL ECOSYSTEM, AI-powered platform)

- **image-15**: Halaman **Our Vision** — layout sederhana: "VISION" besar teal di kiri, teks deskripsi di kanan. User minta diperbagus

- **image-16**: **CTA Banner** "Join Our Mission" — gradient teal-to-navy background, teks putih bold, tombol putih "Register Now →". Ini yang dimaksud user sebagai "yang dibawah setiap halaman tapi diatas footer"

## Yang Akan Dibuat

### File Baru:
1. `src/pages/AboutVision.tsx` — Vision page yang diperbagus (bukan hanya teks polos)
2. `src/pages/AboutMission.tsx` — Mission page dengan 3 numbered cards
3. `src/pages/AboutValues.tsx` — Values page dengan layout 2-kolom + checkmark icon + PARO acronym + CTA banner

### File Diubah:
4. `src/App.tsx` — tambah 3 route baru `/about/vision`, `/about/mission`, `/about/values`
5. `src/components/layout/Navbar.tsx` — update dropdown href dari `#anchor` ke route baru

---

## Design per Halaman

### `/about/vision` — Vision (diperbagus)
- Hero: teal background dengan "VISION" besar di kiri, teks di kanan (seperti referensi tapi tidak polos)
- Tambahkan: visual decorative element (globe/target icon), highlight kata kunci "healthcare talents" dan "healthcare providers" dalam warna teal bold
- Section tambahan: quote card dengan border teal, stats kecil (jumlah negara, dsb)
- CTA Banner (image-16 style) di bawah sebelum footer

### `/about/mission` — Mission (ikut image-14)
- Header "MISSION" besar teal di kiri
- 3 numbered cards (1, 2, 3) dengan rounded border navy, nomor besar di pojok
- Card 1: Providing **AFFORDABLE MOBILE** platform... **ANYTIME ANYWHERE**
- Card 2: Accelerating international career for **NURSE** through AI-powered platform
- Card 3: Empowering sustainable **GLOBAL ECOSYSTEM** by partnering
- CTA Banner di bawah

### `/about/values` — Values (ikut image-13)
- Layout 2-kolom:
  - Kiri: Big checkmark icon (navy circle dengan centang putih), "Core **VALUES**" (VALUES teal bold), tagline "Talent is EVERYWHERE, opportunity is not."
  - Kanan: 4 numbered items dengan drop-cap style: **P**ASSION, **A**CCOUNTABILITY, **R**ESILIENCE, **O**PPORTUNITY + deskripsi singkat
- Banner bawah: "NURSES ARE THE HEART OF HEALTHCARE" (teal, seperti di image-13)
- CTA Banner di atas footer

### CTA Banner (reusable)
Buat komponen `src/components/about/JoinMissionBanner.tsx`:
- Background: `linear-gradient(to right, #03989E, #015779)`
- "Join Our Mission" bold putih
- Subtitle: "Ready to explore international nursing opportunities..."
- Tombol putih rounded "Register Now →"

---

## Update Navbar

```
About Us dropdown:
  - Global Paro  → /about          (tetap)
  - Our Vision   → /about/vision   (ubah dari /about#vision)
  - Our Mission  → /about/mission  (ubah dari /about#mission)
  - Our Value    → /about/values   (ubah dari /about#values)
```

---

## Urutan Implementasi

1. Buat `JoinMissionBanner` komponen (dipakai di semua 3 halaman)
2. Buat `AboutVision.tsx`
3. Buat `AboutMission.tsx`
4. Buat `AboutValues.tsx`
5. Update `App.tsx` — tambah 3 route
6. Update `Navbar.tsx` — update dropdown href
