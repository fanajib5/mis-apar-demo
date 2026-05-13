# DOKUMENTASI PROYEK: APAR Management System

**Nama Proyek:** APAR Management System  
**Klien:** PT. Penyedia APAR  
**Tipe Proyek:** Sistem Informasi Manajemen Terintegrasi  
**Status:** In Development  
**Tim:** 1 Developer (Full-stack)  
**Timeline:** 3 bulan  

---

## 📋 DAFTAR ISI

1. [Ringkasan Eksekutif](#ringkasan-eksekutif)
2. [Arsitektur Sistem](#arsitektur-sistem)
3. [Modul & Fitur](#modul--fitur)
4. [Rincian Biaya](#rincian-biaya)
5. [Stack Teknologi](#stack-teknologi)
6. [Timeline Pengembangan](#timeline-pengembangan)

---

## 🎯 RINGKASAN EKSEKUTIF

### Masalah yang Dipecahkan

| Masalah | Solusi |
|---------|--------|
| Input Excel manual → error-prone | ✅ Sistem terintegrasi, auto-generate dokumen |
| Hitung komisi manual → sulit audit | ✅ Komisi auto-calculate, transparent |
| Admin cuma punya data lokal | ✅ Backup cloud + offline capability |
| Owner tidak bisa monitor real-time | ✅ Dashboard cloud + laporan instant |
| Internet sering mati (offline risk) | ✅ Aplikasi desktop 100% offline-capable |
| Dokumen tercecer (invoice, SJ, kwitansi) | ✅ 1 input SO → semua dokumen auto-generate |

### Solusi Delivered

✅ **Web App (Cloud):** Remote access untuk owner + backup cloud  
✅ **Desktop App (NativePHP):** Offline-first untuk admin (5 komputer)  
✅ **Database Lokal:** SQLite/MySQL embedded per desktop  
✅ **Sync Engine:** Bidirectional push/pull saat online  
✅ **Role-Based Access:** Admin, Owner, Developer  

---

## 🏗️ ARSITEKTUR SISTEM

### Arsitektur Deployment

```bash
LARAVEL CLOUD SERVER
├─ Frontend (Web Browser Access - Filament Admin Panel)
├─ Backend API REST (Laravel Routes)
├─ PostgreSQL/MySQL (Master Database)
├─ Queue & Cache (Redis)
├─ File Storage (Laravel Storage)
└─ Backup & Audit Log

        ↓↑ Sync (HTTP REST API)

DESKTOP APPS (5 Komputer - NativePHP)
├─ NativePHP Desktop App
├─ Laravel Backend (embedded)
├─ Filament/Livewire UI (embedded)
├─ SQLite/MySQL Database (local file)
└─ Offline-capable architecture
```

### Data Flow

**Online Mode (Desktop → Cloud):**

```text
User Input → NativePHP Desktop App
           → Filament UI / Livewire Components
           → Laravel Controller (local)
           → Local SQLite/MySQL (immediate save)
           → HTTP API Call to Cloud
           → Cloud Laravel API
           → PostgreSQL Master (sync)
```

**Offline Mode:**

```text
User Input → NativePHP Desktop App
           → Filament UI / Livewire Components
           → Laravel Controller (local)
           → Local SQLite/MySQL (save)
           → Sync Queue (pending)
           [Internet Down]
           → Local DB tetap jalan 100%
```

**Sync Process:**

```text
Push: Local changes → Server API → Master DB
Pull: Master DB updates → Local SQLite/MySQL
Conflict Resolution: Server-priority or Last-Write-Wins
```

---

## 📦 MODUL & FITUR

### MODUL 1: Master Data Management

#### 1.1 Customer Management

- ✅ CRUD Customer (Create, Read, Update, Delete)
- ✅ Kategori: Perorangan, Instansi, Toko, Apotek, Puskesmas, Perusahaan
- ✅ Customer tagging: VIP/Reguler/Tender
- ✅ Credit limit & payment term default
- ✅ History transaksi per customer
- ✅ Search & filter (by nama, tipe, status)
- ✅ Export to Excel

**User:** Admin  
**Effort:** 8 jam  

#### 1.2 Product & Service Catalog

- ✅ CRUD Produk (kategori: Isi Ulang, Apar Baru, Tukar Tambah, Reparasi, O2, Evakuasi)
- ✅ Tipe APAR: Powder, CO2, Foam
- ✅ Size: 1kg, 3kg, 5kg, 9kg, dst
- ✅ Harga modal, harga jual, margin auto-calculate
- ✅ Bulk import Excel
- ✅ Price history tracking
- ✅ Status: Aktif/Non-aktif

**User:** Admin, Developer  
**Effort:** 6 jam  

#### 1.3 Customer-Specific Pricing

- ✅ Set harga khusus per customer per produk
- ✅ Valid date range (contract management)
- ✅ Auto-expire setelah periode
- ✅ Alert expire (7 hari sebelum)
- ✅ Bulk setup multi-produk
- ✅ Discount & special rate history

**User:** Admin  
**Effort:** 6 jam  

#### 1.4 Sales Person Management

- ✅ CRUD Sales (nama, kontak, email)
- ✅ Assign commission plan
- ✅ Performance dashboard per sales:
  - Total omzet bulan ini
  - Jumlah SO closing
  - Tier yang dicapai
  - Estimasi komisi
- ✅ History komisi per bulan

**User:** Admin, Owner  
**Effort:** 6 jam  

#### 1.5 Commission Plan & Tiers

- ✅ CRUD Commission Plan (Standard, Promo, Tender)
- ✅ Basis perhitungan: Revenue/Margin/Count
- ✅ Multiple tiers (max 5 per plan):
  - Bronze: 0-50 juta → 5%
  - Silver: 50-100 juta → 6%
  - Gold: 100M+ → 7%
- ✅ Bonus flat per tier
- ✅ Visualisasi tier (grafik)
- ✅ Simulation tool (cek komisi jika omzet X)

**User:** Owner (setup), Admin (view)  
**Effort:** 8 jam  

**Subtotal Modul 1:** 34 jam

---

### MODUL 2: Sales Order & Invoicing

#### 2.1 Sales Order Creation (Wizard-based)

- ✅ Step 1: Customer info (pilih/tambah baru, auto-load alamat)
- ✅ Step 2: Items (multi-select product, qty, auto-price)
  - Auto-load catalog price
  - Show customer-specific price ⭐ jika ada
  - Custom price dengan reason (nego/promo/kontrak/tender)
  - Discount per item
  - Subtotal auto-calculate
- ✅ Step 3: Summary
  - Subtotal items
  - Discount SO level
  - PPN 11% (checkbox)
  - Ongkir
  - Grand Total
  - Assign sales person
  - Payment term & method
  - PO/WO customer
  - Notes
- ✅ Status: Draft → Pending Approval → Confirmed → Delivered → Paid
- ✅ Auto-generate SO number: SO-YYYY-XXXX
- ✅ Duplicate SO (repeat order)
- ✅ Edit (hanya status Draft)
- ✅ Cancel dengan reason
- ✅ Print preview SO

**Validasi:**

- ❗ Custom price > 30% discount → trigger approval
- ❗ Total SO < Rp 50k → warning
- ❗ Outstanding customer > credit limit → warning

**User:** Admin  
**Effort:** 20 jam  

#### 2.2 Price Approval Workflow

- ✅ Queue SO custom price
- ✅ Notification badge ke owner
- ✅ Detail approval page (SO info, catalog vs custom, margin impact)
- ✅ Approve/Reject dengan notes
- ✅ Auto-notify admin
- ✅ History approval decisions

**User:** Owner (approve), Admin (view)  
**Effort:** 8 jam  

#### 2.3 Invoice Generator (Auto from SO)

- ✅ Auto-generate dari SO confirmed
- ✅ Invoice number: 0XXX/APK/TFG/MM/YYYY
- ✅ PDF template sesuai existing invoice
- ✅ Header: Logo, company info
- ✅ Customer: Nama, alamat
- ✅ Items table (No, Items, Size, Qty, Unit, Price, Amount)
- ✅ Subtotal, Discount, PPN 11%, Ongkir, Net Total
- ✅ Terbilang (Indo & English)
- ✅ Bank info footer (BRI: 058501001419309)
- ✅ Digital signature/cap
- ✅ Multiple invoice per SO (partial billing, Phase 2)
- ✅ Export PDF
- ✅ Email/WhatsApp integration (Phase 2)
- ✅ Invoice history & tracking

**User:** Admin  
**Effort:** 16 jam  

#### 2.4 Surat Jalan Generator

- ✅ Auto-generate dari SO delivering
- ✅ SJ number: SJ-YYYY-XXXX
- ✅ Template sesuai existing SJ
- ✅ Header: Logo, company info
- ✅ Customer: Nama, alamat pengiriman
- ✅ Items list (barang yang dikirim)
- ✅ Tanggal kirim, PIC penerima
- ✅ Tanda tangan penerima
- ✅ QR code tracking (Phase 2)
- ✅ Link ke SO terkait
- ✅ Export PDF
- ✅ Signature tracking (digital/photo, Phase 2)
- ✅ SJ history

**User:** Admin, Driver (Phase 2)  
**Effort:** 12 jam  

#### 2.5 Kwitansi/Receipt Generator

- ✅ Auto-generate saat payment diterima
- ✅ Kwitansi number: KWT-YYYY-XXXX
- ✅ Template sesuai existing kwitansi
- ✅ Payment detail (jumlah, metode, bukti transfer)
- ✅ Export PDF
- ✅ Archive digital (semua kwitansi tersimpan)
- ✅ Kwitansi history & search

**User:** Admin  
**Effort:** 8 jam  

**Subtotal Modul 2:** 64 jam

---

### MODUL 3: Payment Tracking & Receivables

#### 3.1 Payment Recording

- ✅ Form input payment:
  - Invoice selection (unpaid invoices dropdown)
  - Payment date
  - Amount paid (auto-load invoice amount, bisa partial)
  - Payment method: Cash/Transfer BRI/Transfer BCA/Lainnya
  - Bukti pembayaran (upload foto transfer/kwitansi)
  - Reference number (untuk transfer)
  - Notes
- ✅ Status payment: Pending → Confirmed → Lunas
- ✅ Auto-generate kwitansi saat payment Confirmed
- ✅ Mark invoice as Paid saat 100%
- ✅ Partial payment support
- ✅ Edit payment (sebelum confirmed)
- ✅ Delete payment (dengan soft-delete)
- ✅ Search & filter payment

**User:** Admin  
**Effort:** 12 jam  

#### 3.2 Receivables Dashboard (Admin)

- ✅ Summary card:
  - Total outstanding
  - Total received (bulan ini)
  - Overdue amount
  - Not yet due
- ✅ Aging report:
  - 0-30 hari (Due Soon)
  - 31-60 hari (Overdue)
  - 61-90 hari (Highly Overdue)
  - 90+ hari (At Risk)
- ✅ Detail list (customer, invoice, amount, due date, status)
- ✅ Filter by aging bucket
- ✅ Export Excel
- ✅ Mark payment received langsung dari list

**User:** Admin, Owner  
**Effort:** 8 jam  

#### 3.3 Collection Management (Phase 2)

- ✅ Collection task creation (reminder untuk collect)
- ✅ Priority system (based on amount & aging)
- ✅ Follow-up log (track conversation dengan customer)
- ✅ SMS/WhatsApp reminder template (Phase 2)
- ✅ Automation: auto-send reminder jika 30 hari overdue

**User:** Admin, Sales  
**Effort:** 12 jam  

**Subtotal Modul 3:** 32 jam

---

### MODUL 4: Commission Management

#### 4.1 Commission Calculation Engine

- ✅ Auto-calculate komisi based on:
  - Sales person
  - Period (bulanan)
  - Commission plan assigned
  - Total omzet delivered (SO yang sudah dikirim)
  - Paid amount (SO yang sudah lunas) ← basis perhitungan
- ✅ Tier progression (auto-select tier based on omzet)
- ✅ Formula: Omzet × Tier Rate% + Bonus flat
- ✅ Recalculation saat payment received
- ✅ Rounding rules (ke rib terdekat)

**User:** System (automatic)  
**Effort:** 12 jam  

#### 4.2 Commission Report (Admin)

- ✅ Monthly commission recap per sales
- ✅ Status: Draft → Calculated → Approved → Paid
- ✅ Filter by period & sales
- ✅ View detail breakdown per SO
- ✅ Export Excel

**User:** Admin  
**Effort:** 8 jam  

#### 4.3 Commission Approval & Payment (Owner)

- ✅ View draft commission report
- ✅ Approve/Reject dengan notes
- ✅ Mark as Paid
- ✅ History approval & payment

**User:** Owner  
**Effort:** 6 jam  

**Subtotal Modul 4:** 30 jam

---

### MODUL 5: Reporting & Analytics

#### 5.1 Daily/Monthly Recap Report

- ✅ Otomatis generate report setiap hari/bulan
- ✅ Filter: by date, customer, sales, status
- ✅ Export Excel (sesuai format existing)
- ✅ Email auto-send ke admin (daily) & owner (daily/weekly)

**User:** Admin, Owner  
**Effort:** 12 jam  

#### 5.2 Financial Dashboard (Owner)

- ✅ Cashflow chart (daily/weekly/monthly)
- ✅ Top performers: customer, sales, produk
- ✅ Payment health metrics
- ✅ Export chart as image/PDF

**User:** Owner  
**Effort:** 14 jam  

#### 5.3 Tax Report (PPN)

- ✅ Auto-track PPN 11% per SO
- ✅ Summary per bulan, export Excel untuk SPT

**User:** Admin, Owner  
**Effort:** 8 jam  

**Subtotal Modul 5:** 44 jam

---

### MODUL 6–8

Lihat dokumentasi lengkap di file asli (tersedia di arsip internal).

**Total Effort Semua Modul:** 378 jam

---

## 💰 RINCIAN BIAYA

### Development Cost

| Modul | Effort (jam) | Rate (Rp/jam) | Subtotal |
|---|---|---|---|
| Master Data | 34 | Rp 25.000 | Rp 850.000 |
| Sales & Invoice | 64 | Rp 25.000 | Rp 1.600.000 |
| Payment | 32 | Rp 25.000 | Rp 800.000 |
| Commission | 30 | Rp 25.000 | Rp 750.000 |
| Reporting | 44 | Rp 25.000 | Rp 1.100.000 |
| Document Mgmt | 26 | Rp 25.000 | Rp 650.000 |
| Offline & Sync | 50 | Rp 25.000 | Rp 1.250.000 |
| User & Auth | 38 | Rp 25.000 | Rp 950.000 |
| Testing & QA | 40 | Rp 25.000 | Rp 1.000.000 |
| Deployment & Docs | 20 | Rp 25.000 | Rp 500.000 |
| **TOTAL** | **378** | | **Rp 9.450.000** |

### Infrastructure Cost (Monthly)

| Komponen | Biaya/Bulan |
|---|---|
| Laravel Cloud (hosting + DB + Redis) | Rp 500.000 – 750.000 |
| Domain (.com / .id) | Rp 150.000 – 300.000/tahun |
| SSL | Gratis (Let's Encrypt) |

### Total Biaya

| Kategori | Biaya |
|---|---|
| Development (sekali) | Rp 9.450.000 |
| Infrastructure Year 1 | Rp 6.000.000 – 9.000.000 |
| **Total Year 1** | **~Rp 18.450.000** |
| **Total Year 2+** | Rp 6.000.000 – 9.000.000/tahun |

---

## 🛠️ STACK TEKNOLOGI

- **Backend:** Laravel 11
- **Admin UI:** FilamentPHP + Livewire 3
- **Desktop:** NativePHP (offline-capable)
- **Database:** PostgreSQL (cloud) + SQLite (desktop)
- **Cache/Queue:** Redis (Laravel Cloud)
- **PDF:** Laravel DomPDF / Spatie Laravel PDF
- **Excel:** Maatwebsite Laravel Excel
- **CI/CD:** GitHub Actions → Laravel Cloud
- **Monitoring:** Laravel Telescope, Sentry

---

## 📅 TIMELINE

| Minggu | Fokus |
|---|---|
| 1–2 | Setup, arsitektur, auth, RBAC |
| 3–4 | Master data (Filament resources) |
| 5–6 | Sales Order, Invoice, SJ, Kwitansi |
| 7–8 | Desktop app (NativePHP), offline mode |
| 9 | Sync engine (bidirectional) |
| 10 | Payment & commission |
| 11 | Reporting, testing, UAT |
| 12 | Deployment, training, handover |

**Phase 2 (bulan 4–6):** Email/WA integration, OCR nota, inventory, digital signature.

---

## ✅ SUCCESS CRITERIA

| Aspek | Target |
|---|---|
| Performance | < 1 detik load time |
| Availability | 99.5% uptime |
| Offline Mode | 100% functionality |
| Sync Accuracy | 0 data loss |
| Security | OWASP Top 10 compliant |
| User Adoption | 5/5 users aktif |

---

## 📞 KONTAK

**Developer:** Faiq Najib  
**Email:** faiq.najib@gmail.com  
**Phone:** +62-823-3607-1367  

---

*Last Updated: Desember 2025 | Dipindahkan ke 08-Project-Management: Mei 2026*