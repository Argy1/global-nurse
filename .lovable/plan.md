
# Redesign Website Global Paro Sesuai PPT

## Ringkasan
Merombak seluruh tampilan website agar sesuai dengan desain yang ada di PPT, mencakup perubahan layout, navigasi, typography, warna, halaman-halaman utama, dan struktur konten.

---

## Perubahan Besar yang Akan Dilakukan

### 1. Header / Navbar (2 baris)
Desain PPT menunjukkan navbar dengan 2 baris:
- **Baris atas**: Language switcher (English dropdown), Search bar, Help, Phone icon, Mail icon, Login button (teal rounded)
- **Baris bawah**: Logo "Global PARO" + navigasi utama (About Us, What We Do, How We Do It, Why Choose Us, Programs, QuickStart, LMS, Our Team, Register)
- Menu dropdown pada hover (About Us -> Global Paro, Our Vision, Our Mission, Our Value; How We Do It -> Our Approach, Know The Different, Your Journey Step by Step; Programs -> Batch Program, Requirement Criteria, Webinar; LMS -> IELTS Preparation, Certified Global Nurse, NCLEX 2026 Resources)

### 2. Typography
- **Headers**: Garet Bold / Montserrat Black (karena Garet bukan Google Font gratis, kita gunakan Montserrat untuk semua heading dengan weight 900/800/700)
- **Body**: Garet / Montserrat regular (kita gunakan Montserrat sebagai primary font, mengganti Plus Jakarta Sans)
- Update Google Fonts import dan tailwind config

### 3. Logo
- Menggunakan logo transparan dari PPT (speech bubble "P" dengan plus icon berwarna teal)
- Logo sudah ada di project, tapi perlu diperbarui dengan versi dari PPT yang lebih jelas

### 4. Halaman-Halaman yang Dirombak

#### Homepage (Index.tsx)
- Hero: Background foto nurse Asia + overlay, logo besar di kiri, "Global PARO / Global Career Gateway for Nurses", tombol "Get Started" dan "Learn More" (teal)
- Chat widget floating di kanan bawah hero

#### About Us (About.tsx)
Menjadi satu halaman panjang dengan anchor sections:
- **Global Paro**: Intro dengan foto nurse + logo + deskripsi
- **Our Vision**: "to become the leader and the preferred global partner platform..."
- **Our Mission**: Tabel 3 kolom (Providing, Accelerating, Empowering)
- **Our Value / Core VALUES**: PARO akronim (Passion, Accountability, Resilience, Opportunity) dengan numbered circles
- **Banner**: "NURSES ARE THE HEART OF HEALTHCARE"
- **Join Our Mission CTA**: Teal gradient background + "Register Now" button

#### What We Do (WhatWeDo.tsx)
Tabbed/sectioned layout:
- **For Candidates**: 6 service cards (Personalized Learning, IELTS/NCLEX Prep, STR Verification, Job Matching, Visa & Relocation, Human + AI Support)
- **For Employers**: 4 cards (Verified Credentials, English Proficiency, Ready-to-Relocate, Ethical Compliance)
- **What We Don't Do**: Transparency list (no fees, no guarantees, no pressure, no data sharing)
- CTA: "Ready to Get Started? Register today"

#### How We Do It (HowWeDoIt.tsx)
Sectioned layout:
- **Our Approach**: 4 cards (AI-Driven Assessment, Guided Learning, Ethical Recruitment, Human + AI Support)
- **Know the Difference**: Red Flags vs Green Flags comparison cards
- **Your Journey Step by Step**: 4-step vertical timeline (01-04)
- CTA: "Start Your Journey Today"

#### Why Choose Us (baru, atau gabung ke About)
- P.A.R.O akronim visual dengan foto nurse di kiri:
  - **P**ersonalized Platform
  - **A**ccessible Anytime Anywhere, Affordable
  - **R**eputable Team with Global Healthcare Access
  - **O** (logo icon) ne stop career journey

#### Programs (Programs.tsx)
- **Batch Program**: Hero banner "50 NURSES ONLY", Nurse in Singapore Batch #1 card
- **Requirement Criteria**: Tabel RN / EN / HA requirements
- **Webinar**: Event section
- **Choose Your Plan**: Pricing cards (Starter 9 SGD, Professional 19 SGD recommended)
- **SG Nurse Detail**: Requirements & Documents + Compensation & Benefits tables

#### LMS (LMS.tsx)
- Hero: "Learning Management System" with teal banner
- 3 feature cards (Comprehensive Training, Personalized Matching, Full Support)
- Tabs: IELTS Preparation, Certified Global Nurse, NCLEX 2026 Resources
- Resource links per section
- CTA: "Ready to Start Learning?"

#### Our Team (Team.tsx)
- Banner "Our TEAM" dengan desain teal + page fold effect
- 6 team member cards dalam grid 3x2:
  - DUMA Evi (Founder)
  - ANN Marie C (Workplace Culture Nurse Expert)
  - MEGAWATI Santoso (Strategic Business)
  - Dr. TIMOTHY Low (Board Advisor)
  - Prof. AGUS Setiawan (Independence Board Advisor)
  - LIA Retnani (Board Advisor - Pharma)
- Setiap card: foto placeholder (lingkaran teal), QR code LinkedIn, nama dengan format FIRSTNAME bold

#### Register (Register.tsx)
- "CREATE MY PROFILE" form: Full Name, Date of Birth, Email, Mobile/WhatsApp, Are you a Nursing Graduate?
- Document upload flow (setelah verify email)

#### Footer
- Background dark navy
- 3 kolom: Brand info + social icons, Explore links, More links + email
- Tagline: "Prepare. Beyond. Global."
- Bottom: copyright + disclaimer

### 5. Warna (tetap sama, sudah sesuai)
- Primary Dark Navy: #015779
- Primary Teal: #03989E
- Background: light warm (#faf8f5-ish)
- CTA buttons: teal rounded

### 6. Gambar
- Saya akan menggunakan gambar nurse dari PPT yang sudah di-extract
- Untuk foto-foto tambahan yang perlu AI generate (nurse Asia), saya akan menggunakan Lovable AI image generation
- Saya membutuhkan foto tim dari Anda (DUMA Evi, ANN Marie C, dll) - untuk sementara akan menggunakan placeholder

---

## Yang Saya Butuhkan dari Anda

1. **Foto tim** (DUMA Evi, ANN Marie C, MEGAWATI Santoso, Dr. TIMOTHY Low, Prof. AGUS Setiawan, LIA Retnani) - jika ingin foto asli, tolong upload. Jika tidak, saya pakai placeholder circle teal
2. **Logo high-res** - logo dari PPT sudah cukup jelas, saya akan gunakan yang sudah di-extract

---

## Rencana Implementasi (akan dikerjakan bertahap)

**Batch 1 - Foundation**
- Update typography (Garet/Montserrat)
- Update Navbar menjadi 2 baris dengan dropdown menus
- Copy logo dari PPT ke project
- Update Footer sesuai desain

**Batch 2 - Homepage + About**
- Rombak Homepage hero sesuai PPT
- Rombak About page (Vision, Mission, Value, CTA)
- Generate/pasang gambar nurse Asia

**Batch 3 - What We Do + How We Do It**
- Rombak What We Do (tabbed: Candidates, Employers, What We Don't Do)
- Rombak How We Do It (Our Approach, Red/Green Flags, Journey Steps)

**Batch 4 - Programs + LMS + Why Choose Us**
- Buat halaman Why Choose Us (PARO visual)
- Rombak Programs (Batch, Requirements, Pricing)
- Rombak LMS

**Batch 5 - Team + Register + Finishing**
- Rombak Our Team page
- Update Register/Create My Profile
- Polish semua halaman, pastikan i18n tetap berfungsi

---

## Catatan Teknis
- Semua perubahan tetap mempertahankan sistem i18n (EN/ID)
- Routing: tambah route `/why-choose-us` untuk halaman baru
- Navbar dropdown menggunakan CSS hover atau Radix NavigationMenu
- Tidak ada perubahan database/backend
- Semua halaman admin tidak terpengaruh
