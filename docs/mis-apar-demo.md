# APAR Management System — Produk Demo Siap Jual

**Nama Produk:** APAR Management System (AMS)  
**Tipe Produk:** Sistem Informasi Manajemen APAR — Multi-Mode Deployment  
**Status:** Production-Ready Demo  
**Lisensi:** Per-Production Instance (bukan open source)  
**Dapat Dijual Kembali:** Ya — lihat skema reseller di bawah

---

## 📋 DAFTAR ISI

1. [Visi Produk](#visi-produk)
2. [Perbandingan Tiga Mode Deployment](#-perbandingan-tiga-mode-deployment)
3. [Fitur Lengkap](#-fitur-lengkap)
4. [Fitur Khusus APAR](#-fitur-khusus-apar)
5. [Skenario Demo (5-10 Menit)](#-skenario-demo-5-10-menit)
6. [Strategi Harga & Penjualan](#-strategi-harga--penjualan)
7. [Skema Reseller](#-skema-reseller)
8. [Arsitektur Teknis](#-arsitektur-teknis)
9. [Rincian Biaya](#-rincian-biaya)
10. [Stack Teknologi](#-stack-teknologi)
11. [FAQ untuk Calon Pembeli](#-faq-untuk-calon-pembeli)
12. [Roadmap Pengembangan](#-roadmap-pengembangan)

---

## 🎯 VISI PRODUK

### Dari Proyek Klien → Produk Siap Jual

Awalnya sistem ini dibuat untuk PT. Penyedia APAR (proyek kustom). Sekarang sudah dikembangkan menjadi **produk demo** yang bisa dipresentasikan ke perusahaan APAR mana pun di Indonesia dan **dijual kembali** oleh reseller.

### Masalah yang Dipecahkan

| Masalah | Solusi AMS |
|---------|-----------|
| Input Excel manual → error-prone, data tercecer | ✅ Sistem terintegrasi, 1 input SO → semua dokumen auto-generate |
| Hitung komisi sales manual → sulit audit, sering sengketa | ✅ Komisi auto-calculate berdasarkan omzet lunas + tier progresif |
| Bos tidak bisa monitor real-time | ✅ Dashboard cloud + laporan harian otomatis via email |
| Internet sering mati di kantor cabang/lapangan | ✅ Mode Hybrid (offline-capable dengan sync otomatis) |
| APAR kadaluarsa tidak terpantau → risiko keselamatan & bisnis | ✅ **Tracking expiring APAR + jadwal inspeksi berkala** ⭐ |
| Dokumen tercecer (invoice, SJ, kwitansi) | ✅ Auto-generate semua dokumen dari 1 input SO |
| Sulit追踪 piutang → cashflow bermasalah | ✅ Receivables aging report dengan reminder otomatis |

### Value Proposition

> "Satu sistem untuk manage customer, penjualan, piutang, komisi sales, inspeksi APAR, dan laporan keuangan — tanpa ribet Excel."

---

## 📊 PERBANDINGAN TIGA MODE DEPLOYMENT

AMS tersedia dalam **3 mode deployment** untuk mengakomodasi berbagai kondisi pasar:

| Aspek | 🟢 Mode A: Full Online | 🟡 Mode B: Hybrid | 🔴 Mode C: Full Offline |
|-------|------------------------|-------------------|------------------------|
| **Koneksi Internet** | Wajib (online 100%) | Opsional (offline bisa, sync saat online) | Tidak perlu |
| **Akses dari Mana** | Browser di mana saja | Browser + Desktop app | Desktop app saja |
| **Multi-Device** | Ya | Ya (via sync) | 1 komputer |
| **Multi-User** | Ya (via Team) | Ya (via sync ke server) | Ya (lokal) |
| **Kecepatan** | Tergantung koneksi | Cepat (lokal) + sync di background | Sangat cepat (100% lokal) |
| **Keamanan Data** | Di cloud server | Di cloud + lokal | 100% di perangkat sendiri |
| **Backup** | Otomatis (server) | Otomatis (server) + manual (lokal) | Manual export/import |
| **Biaya Server** | Rp 200-500k/bln | Rp 500-750k/bln | Rp 0 |
| **Biaya Lisensi** | Rp 200-500k/bln | Rp 5-7jt (sekali) + Rp 200k/bln | Rp 3-5jt (sekali) |
| **Cocok Untuk** | Kantor dengan internet stabil | Cabang/lapangan/koneksi tidak stabil | Daerah tanpa internet |
| **Upgrade Path** | — | Upgrade dari A | Upgrade dari A atau B |

### Rekomendasi Pemilihan

```
Ada internet stabil?
├── Ya → Budget kecil? → Mode A (SaaS)
│     └── Budget cukup? → Mode B (Hybrid, lebih fleksibel)
└── Tidak / Sering mati?
      └── Butuh akses 24/7? → Mode B (Hybrid, offline-capable)
            └── Tidak mau data di cloud sama sekali? → Mode C (Full Offline)
```

---

## 📦 FITUR LENGKAP

### MODUL 1: Master Data Management

#### 1.1 Customer Management
- ✅ CRUD Customer (Create, Read, Update, Delete)
- ✅ Kategori: Perorangan, Instansi, Toko, Apotek, Puskesmas, Perusahaan, Hotel/Mall/Gedung ⭐
- ✅ Customer tagging: VIP/Reguler/Tender
- ✅ Credit limit & payment term default
- ✅ History transaksi per customer
- ✅ Search & filter (by nama, tipe, status)
- ✅ Export to Excel
- ✅ ⭐ Kontak PIC (nama, telepon, jabatan) — untuk follow-up penagihan & inspeksi

#### 1.2 Product & Service Catalog
- ✅ CRUD Produk (kategori: Isi Ulang, APAR Baru, Tukar Tambah, Reparasi, O2, Evakuasi)
- ✅ Tipe APAR: Powder, CO2, Foam, Wet Chemical ⭐
- ✅ Size: 1kg, 3kg, 5kg, 9kg, dst
- ✅ Harga modal, harga jual, margin auto-calculate
- ✅ Bulk import Excel
- ✅ Price history tracking
- ✅ Status: Aktif/Non-aktif
- ✅ ⭐ Expiry tracking per produk (masa berlaku isi ulang)

#### 1.3 Customer-Specific Pricing
- ✅ Set harga khusus per customer per produk
- ✅ Valid date range (contract management)
- ✅ Auto-expire setelah periode
- ✅ Alert expire (7 hari sebelum)
- ✅ Bulk setup multi-produk
- ✅ Discount & special rate history

#### 1.4 Sales Person Management
- ✅ CRUD Sales (nama, kontak, email)
- ✅ Assign commission plan
- ✅ Performance dashboard per sales
- ✅ History komisi per bulan

#### 1.5 Commission Plan & Tiers
- ✅ CRUD Commission Plan (Standard, Promo, Tender)
- ✅ Basis perhitungan: Revenue/Margin/Count
- ✅ Multiple tiers (max 5 per plan)
- ✅ Simulation tool (cek komisi jika omzet X)

---

### MODUL 2: Sales Order & Invoicing

#### 2.1 Sales Order Creation (Wizard-based)
- ✅ Step 1: Customer info, auto-load alamat
- ✅ Step 2: Multi-select product, auto-price (catalog / customer-specific)
- ✅ Step 3: Summary — subtotal, diskon, PPN 11%, ongkir, grand total
- ✅ Assign sales person, payment term, PO/WO customer
- ✅ Status: Draft → Pending → Confirmed → Delivered → Paid
- ✅ Duplicate SO, cancel with reason, print preview

**Validasi Pintar:**
- ❗ Custom price > 30% discount → trigger approval owner
- ❗ Total SO < Rp 50k → warning
- ❗ Outstanding customer > credit limit → warning

#### 2.2 Price Approval Workflow
- ✅ Queue SO custom price → notifikasi owner
- ✅ Approve/Reject dengan notes
- ✅ History approval

#### 2.3 Invoice Generator
- ✅ Auto-generate dari SO confirmed
- ✅ Format nomor: 0XXX/APK/TFG/MM/YYYY
- ✅ Template PDF: Kop perusahaan, items table, terbilang, bank info
- ✅ Terbilang (Indonesia & English)
- ✅ Multiple invoice per SO (partial billing)
- ✅ Export PDF, history tracking

#### 2.4 Surat Jalan Generator
- ✅ Auto-generate dari SO delivering
- ✅ Format nomor: SJ-YYYY-XXXX
- ✅ Template sesuai existing SJ
- ✅ QR code tracking untuk pengiriman
- ✅ Export PDF

#### 2.5 Kwitansi/Receipt Generator
- ✅ Auto-generate saat payment confirmed
- ✅ Format nomor: KWT-YYYY-XXXX
- ✅ Export PDF, archive digital

---

### MODUL 3: Payment & Receivables

#### 3.1 Payment Recording
- ✅ Input payment: pilih invoice, amount, metode (Cash/Transfer BRI/BCA/Lainnya)
- ✅ Upload bukti transfer
- ✅ Partial payment support
- ✅ Auto-generate kwitansi saat confirmed

#### 3.2 Receivables Dashboard
- ✅ Outstanding, received, overdue summary
- ✅ Aging report: 0-30, 31-60, 61-90, 90+ hari
- ✅ Filter, export Excel

#### 3.3 Collection Management
- ✅ Collection task creation
- ✅ ⭐ Auto-WA reminder template (30 hari overdue)
- ✅ Follow-up log per customer

---

### MODUL 4: Commission Management

- ✅ Auto-calculate komisi: omzet lunas × tier rate% + bonus
- ✅ Tier progresif: Bronze/Silver/Gold
- ✅ Monthly recap per sales
- ✅ Approval flow: Draft → Calculated → Approved → Paid
- ✅ Export Excel

---

### MODUL 5: Reporting & Analytics

- ✅ Daily/Monthly recap (Excel export, auto-email)
- ✅ Owner dashboard: cashflow chart, top performers, payment health
- ✅ PPN 11% report (summary per bulan untuk SPT)
- ✅ ⭐ APAR Expiry Report (daftar APAR yang akan/sudah kadaluarsa)

---

### MODUL 6: ⭐ APAR Inspection & Service Management **BARU**

*Fitur eksklusif untuk perusahaan APAR — pembeda dari sistem ERP umum.*

#### 6.1 APAR Unit Tracking
- ✅ Setiap APAR punya **nomor seri / ID unik** (barcode/QR code)
- ✅ Lacak: lokasi pemasangan, pemilik, tipe, ukuran, tahun buat
- ✅ Riwayat lengkap: isi ulang → reparasi → inspeksi
- ✅ Status: Aktif / Perlu Isi Ulang / Rusak / Afkir

#### 6.2 Inspection Schedule
- ✅ Jadwal inspeksi berkala (6 bulanan / tahunan — sesuai aturan)
- ✅ Auto-reminder: H-7, H-1, H+7 overdue
- ✅ Checklist inspeksi (tekanan tabung, segel, pin, selang, dll)
- ✅ Hasil inspeksi: Lulus / Perbaikan / Afkir
- ✅ ⭐ Laporan inspeksi PDF untuk diserahkan ke pemilik gedung

#### 6.3 Expiry Tracking
- ✅ Tracking masa berlaku isi ulang (umumnya 5 tahun untuk APAR baru, 1 tahun untuk isi ulang)
- ✅ Dashboard: APAR yang akan expiring (30/60/90 hari)
- ✅ ⭐ Rekomendasi otomatis: jadwalkan isi ulang atau ganti baru
- ✅ Notifikasi ke admin & customer

#### 6.4 Service History
- ✅ Setiap tindakan servis tercatat: tanggal, teknisi, tindakan, biaya
- ✅ Link ke SO (jika servis berbayar)
- ✅ Cetak sertifikat kelayakan APAR (PDF)

#### 6.5 ⭐ Certificate of Feasibility (Sertifikat Layak Pakai)
- ✅ Auto-generate sertifikat setelah inspeksi lulus
- ✅ Nomor sertifikat, masa berlaku, tanda tangan digital
- ✅ Template sesuai standar Depnaker / PMK
- ✅ Export PDF untuk diserahkan ke customer / pemilik gedung

---

### MODUL 7: ⭐ Stock & Inventory **BARU**

- ✅ Manajemen stok APAR baru (barang masuk, keluar, sisa)
- ✅ Tracking stok di gudang
- ✅ Minimum stock alert
- ✅ Mutasi stok otomatis saat SO dikirim
- ✅ Opname fisik (stock adjustment)

---

## 🎬 SKENARIO DEMO (5-10 Menit)

Demo ini dirancang untuk **presentasi ke calon pembeli** dalam waktu singkat tapi berdampak.

### Persiapan Sebelum Demo

1. Buka sistem (Mode A — Full Online, tanpa instalasi)
2. Siapkan **data demo** yang sudah diisi: 5 customer, 10 produk, 3 sales, 3 SO + invoice
3. Demo environment menggunakan **multi-tenant** — setiap calon pembeli bisa punya demo terpisah

### Script Demo Langkah demi Langkah

```
MENIT 0-1: PEMBUKAAN
────────────────────
"Pak/Bu, saya akan demo sistem manajemen APAR yang sudah dipakai oleh
[beberapa perusahaan]. Sistem ini mengintegrasikan penjualan, piutang,
komisi sales, dan inspeksi APAR dalam satu platform."

MENIT 1-2: DASHBOARD
────────────────────
[Masuk ke dashboard]
"Ini dashboard utama. Dari sini Bapak/Ibu bisa lihat:
- Total penjualan hari ini/bulan ini
- Piutang yang outstanding dan yang sudah lewat jatuh tempo
- APAR yang akan kadaluarsa dalam 30 hari ke depan
- Performa sales"

MENIT 2-3: BUAT SALES ORDER
───────────────────────────
"Proses penjualan dimulai dari Sales Order. Tinggal pilih customer,
pilih produk, dan sistem auto-calculate semua harga."
[Demo: buat SO baru]
"Setelah SO confirmed, sistem auto-generate:
✓ Invoice → tinggal print PDF
✓ Surat Jalan → untuk pengiriman
✓ Kwitansi → saat pembayaran masuk
Sekali input, semua dokumen jadi."

MENIT 3-4: TRACKING APAR (FITUR UNGGULAN)
──────────────────────────────────────────
"Ini fitur yang membedakan sistem kami dari ERP biasa."
[Buka menu APAR Tracking]
"Setiap APAR punya riwayat dari awal sampai sekarang:
- Kapan terakhir diisi ulang
- Kapan harus inspeksi berikutnya
- Sertifikat kelayakannya
Sistem otomatis kasih notifikasi sebelum masa berlaku habis."

MENIT 4-5: LAPORAN & KOMISI
───────────────────────────────
"Di laporan, semua data sudah siap:
- Laporan penjualan harian/bulanan
- PPN 11% otomatis untuk SPT
- Komisi sales auto-calculate — tidak perlu hitung manual."

MENIT 5-6: PENUTUPAN
─────────────────────
"Keunggulan sistem kami:
1. 🤝 Bisa offline (Mode Hybrid) — tetap jalan walau internet mati
2. 📄 Auto-dokumen — dari 1 SO, semua surat jadi
3. 🔥 Tracking APAR — fitur eksklusif yang tidak ada di sistem lain
4. 💰 Terjangkau — mulai Rp 200rb/bulan

Berminat untuk trial gratis 14 hari?"
```

---

## 💰 STRATEGI HARGA & PENJUALAN

### Pricing Matrix

| Mode | Lisensi (Sekali) | Maintenance (Bulanan) | Server | Target Pasar |
|------|-----------------|---------------------|--------|-------------|
| **A: Full Online** | Rp 0 (SaaS murni) | Rp 200.000 – 500.000 | Termasuk | UKM APAR, budget kecil, internet stabil |
| **B: Hybrid** | Rp 5.000.000 – 7.000.000 | Rp 200.000 | Rp 500.000/bln | Perusahaan menengah, multi-cabang |
| **C: Full Offline** | Rp 3.000.000 – 5.000.000 | Rp 150.000 (opsional) | Rp 0 | Perusahaan kecil, tanpa internet |

Opsional:
- **White-label setup** (logo + brand sendiri): +Rp 1.000.000
- **Training onsite** (1 hari): +Rp 500.000
- **Custom template dokumen** (invoice/SJ/kwitansi sesuai existing): +Rp 500.000

### PSA: Revenue Projection

Asumsi target market: 50 perusahaan APAR di Indonesia

| Tahun | Mode A (10) | Mode B (8) | Mode C (7) | Total |
|-------|------------|------------|------------|-------|
| Tahun 1 | Rp 36.000.000 | Rp 59.200.000 | Rp 31.500.000 | **Rp 126.700.000** |
| Tahun 2 | Rp 48.000.000 | Rp 19.200.000 | Rp 12.600.000 | **Rp 79.800.000** |
| Tahun 3+ | dst. | dst. | dst. | Berulang |

---

## 🤝 SKEMA RESELLER

### Cara Kerja

| Aspek | Detail |
|-------|--------|
| **Siapa reseller?** | Freelancer IT, perusahaan konsultan, teman/relasi yang punya akses ke perusahaan APAR |
| **Diskon reseller** | 25-30% dari harga lisensi |
| **Contoh:** Reseller jual Mode B (Rp 6jt) | Reseller dapat Rp 1.5-1.8jt per penjualan |
| **White-label** | Ganti logo, nama aplikasi, domain — biaya setup Rp 1jt (opsional) |
| **Demo untuk reseller** | Reseller dapat akses demo gratis (Mode A) untuk dipresentasikan ke calon pembeli |
| **Support** | Developer handle technical support; reseller handle komunikasi dengan klien |
| **Komisi berulang** | 10% dari biaya maintenance bulanan untuk reseller aktif |

### Reseller Flow

```
Reseller cari lead (perusahaan APAR)
  → Reseller demo sistem (pakai akun demo)
  → Lead tertarik
  → Reseller kirim PO ke developer
  → Developer setup instance + training
  → Reseller terima komisi 25-30%
  → Developer handle maintenance & support
```

---

## 🏗️ ARSITEKTUR TEKNIS

### Mode A: Full Online (SaaS)

```
[Browser User] → Internet → [Laravel Cloud / VPS]
                                ├─ Inertia React SPA (Frontend)
                                ├─ Laravel API (Backend)
                                ├─ PostgreSQL (Database)
                                ├─ Redis (Cache/Queue)
                                └─ File Storage (dokumen PDF, upload)
```

### Mode B: Hybrid (Online + Offline Sync)

```
[Cloud Server]
├─ Mode A lengkap (full online access)
├─ REST API untuk sync
└─ Master database (PostgreSQL)
        ↕ sync (push/pull via API)
[Desktop App (Tauri/Electron) — offline-capable]
├─ Inertia React UI (embedded webview)
├─ SQLite (local database — replica)
├─ Sync Engine: push local changes, pull remote update
└─ Conflict resolution: Last-Write-Wins / Server Priority
```

### Mode C: Full Offline / Local First

```
[Desktop App (Tauri/Electron + PHP backend via Laragon)]
├─ Laravel backend (embedded, run via PHP binary)
├─ Inertia React UI (embedded webview)
├─ SQLite (local database — satu-satunya)
├─ No internet dependency
└─ Backup/export: SQLite file copy
     ↕ manual
[Backup: USB Flashdrive / Google Drive / Email]
```

### Data Flow — Mode Hybrid (yang paling kompleks)

```
Online Mode:
  Input → Local SQLite (immediate save) → API Sync → Cloud PostgreSQL

Offline Mode:
  Input → Local SQLite (immediate save) → Sync Queue (pending)
  [Internet kembali] → Sync Queue diproses otomatis → Cloud PostgreSQL

Pull from Cloud:
  Periodik (setiap 5 menit / manual refresh):
  GET /api/sync/changes?since=timestamp
  → Apply changes ke local SQLite
  → Conflict? Server-priority wins
```

---

## 💸 RINCIAN BIAYA

### Development Cost (Produk — sudah selesai)

| Komponen | Biaya |
|----------|-------|
| Development sistem inti (auth, teams, master data, SO, invoice, payment, commission, report) | Selesai |
| Fitur APAR (inspeksi, expiry, tracking, sertifikat) | Perlu dikerjakan |
| Mode A — Full Online | Selesai (tinggal deploy) |
| Mode B — Hybrid (Tauri/Electron + sync engine) | Perlu dikerjakan |
| Mode C — Full Offline (bundle app) | Perlu dikerjakan |
| TOTAL SISA | ~160 jam |

### Infrastructure Cost

| Komponen | Mode A | Mode B | Mode C |
|----------|--------|--------|--------|
| Server (Laravel Cloud / VPS) | Rp 200-500k/bln | Rp 500-750k/bln | Rp 0 |
| Domain | Rp 150-300k/thn | Rp 150-300k/thn | Rp 0 |
| SSL | Gratis | Gratis | — |
| **Total Tahun 1** | Rp 2.5-6jt | Rp 6-9jt | Rp 0 |

---

## 🛠️ STACK TEKNOLOGI

| Komponen | Teknologi |
|----------|-----------|
| **Backend** | Laravel 13 |
| **Frontend** | Inertia.js v3 + React 19 |
| **Admin UI** | Radix UI + Tailwind CSS v4 |
| **Database Cloud** | PostgreSQL |
| **Database Local** | SQLite |
| **Desktop** | Tauri (Rust) + embedded webview ⭐ |
| **Cache/Queue** | Redis |
| **Auth** | Laravel Fortify (login, register, 2FA, email verif) |
| **Multi-Tenant** | Team-based (sudah ada) |
| **PDF** | Spatie Laravel PDF / DomPDF |
| **Excel** | Maatwebsite Laravel Excel |
| **QR/Barcode** | Laravel QR Code / Simple QrCode |
| **Sync Engine** | Custom Laravel API + conflict resolver |
| **CI/CD** | GitHub Actions |
| **Monitoring** | Laravel Telescope, Sentry |

---

## ❓ FAQ UNTUK CALON PEMBELI

### Q: Apakah sistem ini bisa diakses dari HP?
**A:** Bisa. Mode A & B bisa diakses dari browser HP. Tampilan sudah responsive.

### Q: Kalau internet mati, data hilang?
**A:** Di Mode B (Hybrid), data tetap aman di komputer lokal. Saat internet kembali, data otomatis sync ke cloud. Tidak ada data loss.

### Q: Bisakah data lama dari Excel diimport?
**A:** Bisa. Kami support import Excel untuk customer, produk, dan harga. Kami juga bisa bantu migrasi data lama (ada biaya tambahan).

### Q: Apakah ada training?
**A:** Ada. 1 hari training onsite + dokumentasi video. Tersedia juga support WhatsApp.

### Q: Bisakah ganti logo perusahaan sendiri?
**A:** Bisa. Layanan white-label: logo, nama aplikasi, domain custom.

### Q: Bagaimana dengan keamanan data?
**A:** Mode A & B: data di cloud server dengan backup harian + SSL. Mode C: data 100% di komputer Anda, tidak ada yang bisa akses.

### Q: Kalau saya tutup langganan, data saya bagaimana?
**A:** Data akan di-export ke Excel/PDF dan dikirim ke Anda. Tidak ada data yang ditahan.

### Q: Berapa lama implementasinya?
**A:** Mode A: langsung (tinggal login). Mode B: 1-2 hari setup. Mode C: 1 hari instalasi.

### Q: Apakah sertifikat inspeksi APAR sesuai standar?
**A:** Ya, template sertifikat mengacu pada standar Depnaker dan PMK tentang pemadam kebakaran.

---

## 🗺️ ROADMAP PENGEMBANGAN

### Phase 1 (Selesai) — Foundation
- ✅ Multi-tenant auth & team management
- ✅ Customer management
- ✅ Product catalog
- ✅ Sales Order with wizard
- ✅ Invoice, Surat Jalan, Kwitansi generator
- ✅ Payment & receivables
- ✅ Commission management
- ✅ Reporting & dashboard

### Phase 2 (Sedang dikerjakan) — APAR-Specific
- [ ] APAR unit tracking (nomor seri, QR code)
- [ ] Inspection schedule & checklist
- [ ] Expiry tracking & auto-reminder
- [ ] Service history per unit APAR
- [ ] Certificate of feasibility (PDF)
- [ ] Stock & inventory management
- [ ] ⭐ **Mode A: Full Online — demo-ready**

### Phase 3 (Mendatang) — Hybrid & Offline
- [ ] **Mode B: Hybrid** — Tauri desktop app + SQLite sync engine
- [ ] Sync engine: push/pull dengan conflict resolution
- [ ] **Mode C: Full Offline** — bundled desktop app
- [ ] QR code generation & scanning untuk tracking APAR
- [ ] Auto-WA reminder (piutang, inspeksi, expiry)

### Phase 4 — Scale & Monetize
- [ ] White-label setup tool (self-service)
- [ ] Reseller dashboard
- [ ] Subscription billing (otomatis)
- [ ] License key management
- [ ] Demo provisioning (auto-create demo instance)

---

## ✅ KEY METRICS

| Aspek | Target |
|-------|--------|
| Demo-to-Sale Conversion | >30% |
| Time to Demo | <10 menit |
| Setup untuk klien baru (Mode A) | <1 jam |
| Uptime (Mode A & B) | 99.5% |
| Data sync accuracy (Mode B) | 100% |
| UAT acceptance | >90% fitur approved |

---

## 📞 KONTAK

**Developer / Product Owner:** Faiq Najib  
**Email:** faiq.najib@gmail.com  
**Phone:** +62-823-3607-1367  

---

*Dokumen ini adalah dokumentasi produk untuk demo & penjualan.*  
*Last Updated: Mei 2026*
