<?php

namespace Database\Seeders;

use App\Models\AparUnit;
use App\Models\CommissionPlan;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Product;
use App\Models\SalesOrder;
use App\Models\SalesPerson;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'demo@aparmanagement.com'],
            [
                'name' => 'Demo User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        $team = Team::firstOrCreate(
            ['slug' => 'pt-demo-apar'],
            [
                'name' => 'PT Demo APAR',
                'is_personal' => false,
            ]
        );

        if (! $user->belongsToTeam($team)) {
            $team->memberships()->create([
                'user_id' => $user->id,
                'role' => 'owner',
            ]);
        }

        $user->switchTeam($team);

        $customers = collect([
            ['code' => 'C001', 'name' => 'PT Graha Sejahtera', 'category' => 'Perusahaan', 'tag' => 'VIP', 'phone' => '021-5551234', 'pic_name' => 'Budi Santoso', 'pic_phone' => '08123456789'],
            ['code' => 'C002', 'name' => 'Hotel Indah Permai', 'category' => 'Hotel/Mall/Gedung', 'tag' => 'Reguler', 'phone' => '021-5555678', 'pic_name' => 'Siti Rahayu', 'pic_phone' => '08198765432'],
            ['code' => 'C003', 'name' => 'RS Sehat Sentosa', 'category' => 'Instansi', 'tag' => 'VIP', 'phone' => '021-5559012', 'pic_name' => 'Dr. Andi', 'pic_phone' => '08234567890'],
            ['code' => 'C004', 'name' => 'Toko Maju Jaya', 'category' => 'Toko', 'tag' => 'Reguler', 'phone' => '021-5553456', 'pic_name' => 'Agus Wijaya', 'pic_phone' => '08567890123'],
            ['code' => 'C005', 'name' => 'Puskesmas Kecamatan', 'category' => 'Puskesmas', 'tag' => 'Tender', 'phone' => '021-5557890', 'pic_name' => 'Dewi Lestari', 'pic_phone' => '08789012345'],
        ]);

        $customers->each(fn ($data) => Customer::create(array_merge($data, ['team_id' => $team->id, 'payment_term' => '30', 'credit_limit' => 50000000])));

        $products = collect([
            ['code' => 'APR-PW-3', 'name' => 'APAR Powder 3kg', 'category' => 'APAR Baru', 'apar_type' => 'Powder', 'apar_size' => '3kg', 'cost_price' => 120000, 'selling_price' => 185000, 'expiry_months' => 60],
            ['code' => 'APR-PW-6', 'name' => 'APAR Powder 6kg', 'category' => 'APAR Baru', 'apar_type' => 'Powder', 'apar_size' => '6kg', 'cost_price' => 180000, 'selling_price' => 275000, 'expiry_months' => 60],
            ['code' => 'APR-PW-9', 'name' => 'APAR Powder 9kg', 'category' => 'APAR Baru', 'apar_type' => 'Powder', 'apar_size' => '9kg', 'cost_price' => 250000, 'selling_price' => 375000, 'expiry_months' => 60],
            ['code' => 'APR-CO2-3', 'name' => 'APAR CO2 3kg', 'category' => 'APAR Baru', 'apar_type' => 'CO2', 'apar_size' => '3kg', 'cost_price' => 350000, 'selling_price' => 525000, 'expiry_months' => 60],
            ['code' => 'APR-FM-6', 'name' => 'APAR Foam 6L', 'category' => 'APAR Baru', 'apar_type' => 'Foam', 'apar_size' => '6L', 'cost_price' => 200000, 'selling_price' => 325000, 'expiry_months' => 60],
            ['code' => 'SVC-REFILL-3', 'name' => 'Isi Ulang APAR 3kg', 'category' => 'Isi Ulang', 'apar_type' => 'Powder', 'apar_size' => '3kg', 'cost_price' => 50000, 'selling_price' => 95000, 'expiry_months' => 12],
            ['code' => 'SVC-REFILL-6', 'name' => 'Isi Ulang APAR 6kg', 'category' => 'Isi Ulang', 'apar_type' => 'Powder', 'apar_size' => '6kg', 'cost_price' => 75000, 'selling_price' => 140000, 'expiry_months' => 12],
            ['code' => 'SVC-HYDRO', 'name' => 'Hydrostatic Test', 'category' => 'Reparasi', 'cost_price' => 30000, 'selling_price' => 60000],
            ['code' => 'O2-1', 'name' => 'Oksigen 1m3', 'category' => 'O2', 'cost_price' => 500000, 'selling_price' => 750000],
        ]);

        $products->each(fn ($data) => Product::create(array_merge($data, ['team_id' => $team->id])));

        $salesPeople = collect([
            ['name' => 'Ahmad Rizal', 'phone' => '08111111111', 'email' => 'ahmad@demo.com'],
            ['name' => 'Dian Purnama', 'phone' => '08222222222', 'email' => 'dian@demo.com'],
            ['name' => 'Rudi Hartono', 'phone' => '08333333333', 'email' => 'rudi@demo.com'],
        ]);

        $salesPeople->each(fn ($data) => SalesPerson::create(array_merge($data, ['team_id' => $team->id])));

        $plan = CommissionPlan::create([
            'team_id' => $team->id,
            'name' => 'Standard Commission',
            'type' => 'Standard',
            'basis' => 'Revenue',
        ]);

        collect([
            ['name' => 'Bronze', 'tier_order' => 1, 'min_amount' => 0, 'max_amount' => 10000000, 'rate' => 2.5],
            ['name' => 'Silver', 'tier_order' => 2, 'min_amount' => 10000001, 'max_amount' => 50000000, 'rate' => 5.0],
            ['name' => 'Gold', 'tier_order' => 3, 'min_amount' => 50000001, 'max_amount' => null, 'rate' => 7.5],
        ])->each(fn ($tier) => $plan->tiers()->create($tier));

        $so1 = SalesOrder::create([
            'team_id' => $team->id,
            'order_number' => 'SO-20260501-0001',
            'customer_id' => 1,
            'sales_person_id' => 1,
            'status' => 'Paid',
            'order_date' => '2026-05-01',
            'subtotal' => 925000,
            'discount' => 0,
            'tax' => 101750,
            'grand_total' => 1026750,
        ]);

        $so1->items()->createMany([
            ['product_id' => 1, 'quantity' => 3, 'unit_price' => 185000, 'subtotal' => 555000],
            ['product_id' => 4, 'quantity' => 1, 'unit_price' => 525000, 'subtotal' => 525000],
        ]);

        $inv1 = Invoice::create([
            'team_id' => $team->id,
            'invoice_number' => 'INV-20260501-0001',
            'sales_order_id' => $so1->id,
            'customer_id' => 1,
            'status' => 'Paid',
            'invoice_date' => '2026-05-01',
            'due_date' => '2026-05-31',
            'subtotal' => 925000,
            'discount' => 0,
            'tax' => 101750,
            'grand_total' => 1026750,
            'paid_amount' => 1026750,
            'balance' => 0,
        ]);

        $inv1->items()->createMany([
            ['product_id' => 1, 'quantity' => 3, 'unit_price' => 185000, 'subtotal' => 555000],
            ['product_id' => 4, 'quantity' => 1, 'unit_price' => 525000, 'subtotal' => 525000],
        ]);

        Payment::create([
            'team_id' => $team->id,
            'invoice_id' => $inv1->id,
            'payment_number' => 'PAY-20260505-0001',
            'amount' => 1026750,
            'method' => 'Transfer BRI',
            'payment_date' => '2026-05-05',
        ]);

        $so2 = SalesOrder::create([
            'team_id' => $team->id,
            'order_number' => 'SO-20260510-0002',
            'customer_id' => 2,
            'sales_person_id' => 2,
            'status' => 'Confirmed',
            'order_date' => '2026-05-10',
            'subtotal' => 1375000,
            'discount' => 50000,
            'tax' => 145750,
            'grand_total' => 1470750,
        ]);

        $so2->items()->createMany([
            ['product_id' => 3, 'quantity' => 2, 'unit_price' => 375000, 'subtotal' => 750000],
            ['product_id' => 5, 'quantity' => 2, 'unit_price' => 325000, 'subtotal' => 650000],
            ['product_id' => 7, 'quantity' => 5, 'unit_price' => 95000, 'subtotal' => 475000],
        ]);

        $aparUnits = collect([
            ['serial_number' => 'APR-PW3-2026-001', 'product_id' => 1, 'location' => 'Lantai 1 - R. Tamu', 'customer_id' => 1, 'production_date' => '2025-01-15', 'expiry_date' => '2030-01-15', 'next_inspection_date' => '2026-07-15'],
            ['serial_number' => 'APR-PW3-2026-002', 'product_id' => 1, 'location' => 'Lantai 2 - R. Rapat', 'customer_id' => 1, 'production_date' => '2025-01-15', 'expiry_date' => '2030-01-15', 'next_inspection_date' => '2026-07-15'],
            ['serial_number' => 'APR-CO2-2026-001', 'product_id' => 4, 'location' => 'R. Server', 'customer_id' => 1, 'production_date' => '2025-03-20', 'expiry_date' => '2030-03-20', 'next_inspection_date' => '2026-09-20'],
            ['serial_number' => 'APR-PW6-2026-001', 'product_id' => 2, 'location' => 'Gudang - Lt 1', 'customer_id' => 2, 'production_date' => '2024-11-01', 'expiry_date' => '2029-11-01', 'next_inspection_date' => '2026-05-01'],
            ['serial_number' => 'APR-FM6-2026-001', 'product_id' => 5, 'location' => 'Dapur - Lt 1', 'customer_id' => 2, 'production_date' => '2024-08-10', 'expiry_date' => '2029-08-10', 'next_inspection_date' => '2026-06-01'],
        ]);

        $aparUnits->each(fn ($data) => AparUnit::create(array_merge($data, ['team_id' => $team->id, 'status' => 'Aktif'])));

        $this->command->info('Demo data seeded successfully!');
        $this->command->info("Team: {$team->name} ({$team->slug})");
        $this->command->info('Login: demo@aparmanagement.com / password');
    }
}
