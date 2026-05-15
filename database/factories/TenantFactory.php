<?php

namespace Database\Factories;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class TenantFactory extends Factory
{
    protected $model = Tenant::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'domain' => $this->faker->unique()->lexify('tenant?????'),
            'database' => null,
            'settings' => [
                'timezone' => 'Asia/Jakarta',
                'currency' => 'IDR',
            ],
            'logo_url' => null,
            'primary_color' => $this->faker->randomElement(['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']),
            'custom_css_url' => null,
            'favicon_url' => null,
            'company_name' => null,
            'is_active' => true,
        ];
    }
}
