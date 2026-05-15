<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default tenant for demo / single-tenant mode
        $tenant = Tenant::firstOrCreate(
            ['id' => 1],
            [
                'name' => 'PT Demo APAR',
                'domain' => 'demo',
                'is_active' => true,
                'settings' => [
                    'timezone' => 'Asia/Jakarta',
                    'currency' => 'IDR',
                    'date_format' => 'd/m/Y',
                ],
            ]
        );

        $this->command->info("Tenant seeded: {$tenant->name} (ID: {$tenant->id})");
    }
}
