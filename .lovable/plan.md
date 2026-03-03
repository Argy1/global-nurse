
# Batch 5: Team Redesign, Register Polish & Dropdown Fix

## Masalah Utama: Dropdown Navbar Hilang

**Root Cause**: Ketika kursor bergerak dari tombol nav ke dropdown menu, ada "gap" (jarak 4px dari `mt-1`) antara tombol dan menu. Saat kursor melewati gap ini, event `onMouseLeave` terpicu di parent `div`, sehingga `activeDropdown` di-reset ke `null` sebelum kursor sempat masuk ke menu.

**Solusi**: Tambahkan `paddingTop` transparan pada dropdown agar tidak ada gap antara trigger dan menu, sehingga kursor tidak pernah "meninggalkan" area hover. Gunakan `pt-2` pada wrapper dropdown dan kurangi `mt-1` menjadi `mt-0`, atau tambahkan bridge invisible `before:` pseudo-element. Pendekatan paling bersih: ganti implementasi hover dengan **CSS pure hover** menggunakan Tailwind `group` dan `group-hover`, sehingga tidak bergantung pada JavaScript state sama sekali — tidak ada gap, tidak ada race condition.

---

## 1. Fix Navbar Dropdown (PRIORITAS UTAMA)

**Perubahan di `Navbar.tsx`**:
- Hapus `onMouseEnter`/`onMouseLeave` + `useState activeDropdown`
- Ganti dengan pendekatan CSS `group` / `group-hover` Tailwind
- Dropdown akan menggunakan `hidden group-hover:block` — selama kursor ada di parent `div` (termasuk dropdown itu sendiri), menu tetap visible
- Tambahkan `absolute` wrapper dengan `pt-2` agar ada area hover yang seamless dari trigger ke menu
- Mobile tetap menggunakan click + `mobileExpanded` state seperti sekarang

```text
BEFORE (JavaScript hover — ada gap race condition):
┌─────────────┐
│  About Us ▾ │  ← onMouseEnter → setActiveDropdown
└─────────────┘
   ← GAP 4px → kursor melewati gap → onMouseLeave fired! → dropdown hilang
┌─────────────────────┐
│ • Global Paro       │
│ • Our Vision        │
└─────────────────────┘

AFTER (CSS group-hover — seamless):
┌─────────────┐
│  About Us ▾ │  ← group-hover active
└─────────────┘
 ← area pt-2 masih dalam group div →
┌─────────────────────┐
│ • Global Paro       │  ← hover tetap aktif
│ • Our Vision        │
└─────────────────────┘
```

---

## 2. Our Team Page Redesign

**Perubahan di `Team.tsx`**:

### Hero Banner (PPT style)
- Background teal gradient dengan wave/fold decoration
- Judul besar "Our **TEAM**" dengan TEAM bold berwarna putih/aksen
- Subtitle tagline

### 6 Member Cards dalam Grid 3x2

**Row 1 - Core Team:**
| DUMA Evi | ANN MARIE Christopher | MEGAWATI Santoso |
|---|---|---|
| Founder | Workplace Culture Nurse Expert | Strategic Business |

**Row 2 - Advisors:**
| Dr. TIMOTHY Low | Prof. AGUS Setiawan | LIA Retnani |
|---|---|---|
| Board Advisor | Independent Board Advisor | Board Advisor - Pharma |

### Card Design per Member:
- Placeholder avatar lingkaran teal gradient (ukuran lebih besar, 96px)
- Nama dengan format **FIRSTNAME** bold uppercase, lastname regular
- Badge role dengan warna teal/navy
- Bio 2-3 kalimat
- Ikon LinkedIn kecil (placeholder — bisa diisi link nanti)
- Tidak ada pembagian "leadership" vs "advisors" yang terpisah — satu grid unified

---

## 3. Register Page - Update ke "Create My Profile"

**Perubahan di `Register.tsx`**:

### Visual Overhaul (konten/logic tetap sama):
- Header Hero: ganti teks "Register in Under 3 Minutes" → **"Create My Profile"**
- Subtitle: "Start your global nursing career journey"
- Step labels lebih friendly:
  - Step 1: "Basic Details" → **"Personal Info"**
  - Step 2: "Professional" → **"Your Background"**
  - Step 3: "Contact" → **"Stay Connected"**
  - Step 4: "Motivation" → **"Your Goals"**
  - Step 5: "Consent" → **"Final Step"**
- Progress bar: ganti warna dari `bg-primary` ke `bg-accent` (teal lebih sesuai PPT)
- Card form: tambahkan subtle teal left-border accent per step
- Thank you screen: tambahkan icon lebih besar, warna lebih celebratory

---

## 4. Polish Visual Konsistensi

### Halaman-halaman yang di-polish:

**Index.tsx (Homepage)**:
- Pastikan hero image `hero-nurses.jpg` tampil dengan benar dengan overlay gradient
- Logo 3D clay di posisi yang tepat
- Stats bar 4-kolom tetap
- Spacing dan typography konsisten

**About.tsx**:
- Pastikan anchor section `#vision`, `#mission`, `#values` berfungsi
- Banner "NURSES ARE THE HEART OF HEALTHCARE" styling yang lebih bold

**WhyChooseUs.tsx**:
- Tambahkan visual PARO akronim yang lebih kuat (huruf besar P/A/R/O dengan highlight teal)

**Footer**:
- Pastikan logo full tampil dengan benar di footer dark background (mungkin perlu filter invert atau versi putih)
- Social icons teal hover state

---

## 5. Urutan Implementasi

1. **Fix Navbar dropdown** (paling critical, langsung terlihat dampaknya)
2. **Redesign Team page** (grid 6 member, hero banner)
3. **Update Register** hero text + visual polish
4. **Polish Homepage** hero image + overlay
5. **Footer logo fix** jika diperlukan

---

## Detail Teknis

- Navbar: hapus `activeDropdown` state, ganti dengan `group`/`group-hover` Tailwind CSS
- Team: update data member sesuai PPT (tambah MEGAWATI Santoso)
- Register: hanya perubahan visual/text, tidak ada perubahan logic/database
- Tidak ada dependency baru
- Semua halaman admin tidak terpengaruh
- i18n keys yang ada tetap dipertahankan
