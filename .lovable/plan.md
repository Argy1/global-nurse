
## Redesign `/about` — Global Paro Page (image-22 style)

### Apa yang User Inginkan
Berdasarkan image-22 dan deskripsi user:
1. **Hero card glassmorphism** persis seperti image-22: background split (navy kiri + teal kanan), card putih rounded besar di tengah, foto 2 nurses (image-23) sebagai background kanan card dengan efek faded, kiri card ada logo icon + "Global **PARO**" teal + paragraf deskripsi
2. **2 kotak warna di bawah card** — seperti terlihat di image-22: ada 2 blok warna (teal dan navy) tepat di bawah card
3. **Strip putih** tipis di atas kotak warna
4. **"About Us" text header** di atas semua elemen (seperti judul halaman di atas card)

### Asset
- **image-23.png** → `src/assets/nurses-pair.png` (foto 2 nurses teal scrubs, untuk background card)

### Design Detail

```text
┌─────────────────────────────────────────────────────────┐
│  ABOUT US  (label teks teal, font-bold kecil di atas)   │
├──────────────────────────────────────────────────────────┤
│  [BG: split navy kiri / teal kanan]                      │
│  ┌──────────────────────────────────────────────────┐    │
│  │  [CARD: bg-white/90 backdrop-blur rounded-2xl]   │    │
│  │  ┌─────────────────────┐ ┌────────────────────┐  │    │
│  │  │  LEFT (50%): white  │ │  RIGHT (50%): nurse │  │    │
│  │  │                     │ │  photo opacity-60   │  │    │
│  │  │  🔵 Global PARO     │ │  object-cover       │  │    │
│  │  │  (icon + PARO teal) │ │  rounded-r-2xl      │  │    │
│  │  │                     │ │                     │  │    │
│  │  │  "empowers every    │ │                     │  │    │
│  │  │   international     │ │                     │  │    │
│  │  │   nurse..."         │ │                     │  │    │
│  │  └─────────────────────┘ └────────────────────┘  │    │
│  └──────────────────────────────────────────────────┘    │
│  ──────── strip putih tipis ────────────────────────     │
│  [TEAL kotak kiri ~50%] │ [NAVY kotak kanan ~50%]        │
└──────────────────────────────────────────────────────────┘
```

### Konten yang Tetap Dipertahankan (di bawah hero)
- Brand Philosophy Banner
- Red/Green Flags section
- JoinMissionBanner (CTA di atas footer)

Bagian Vision, Mission, Values **dihapus** dari About.tsx (sudah punya halaman sendiri).

### Files yang Diubah
1. **Copy** `user-uploads://image-23.png` → `src/assets/nurses-pair.png`
2. **`src/pages/About.tsx`** — redesign total hero + simplify konten:
   - Hero baru dengan card glassmorphism + foto nurses + 2 kotak warna
   - Hapus section Vision, Mission, Values (sudah punya halaman terpisah)
   - Pertahankan Brand Philosophy + Red/Green Flags
   - Pakai `JoinMissionBanner` di bawah
3. **`src/components/layout/Navbar.tsx`** — `What We Do` belum jadi dropdown (dari plan sebelumnya yang belum diimplementasi), tapi fokus utama adalah About page redesign

### Tidak Ada Perubahan Pada
- Routing App.tsx (sudah benar)
- Halaman AboutVision, AboutMission, AboutValues (sudah dibuat)
- Bagian lain dari site
