<?php

namespace App\Models;

use Database\Factories\TenantFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'name',
    'domain',
    'database',
    'settings',
    'logo_url',
    'primary_color',
    'custom_css_url',
    'favicon_url',
    'company_name',
    'is_active',
])]
class Tenant extends Model
{
    /** @use HasFactory<TenantFactory> */
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'settings' => 'array',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get branding configuration for this tenant.
     *
     * @return array{logo: string, primary_color: string, custom_css_url: string|null, favicon_url: string|null, company_name: string}
     */
    public function branding(): array
    {
        $defaults = config('branding.defaults', [
            'logo' => '/images/logo.svg',
            'primary_color' => '#3b82f6',
            'custom_css_url' => null,
            'favicon_url' => null,
            'company_name' => config('app.name'),
        ]);

        return [
            'logo' => $this->logo_url ?: $defaults['logo'],
            'primary_color' => $this->primary_color ?: $defaults['primary_color'],
            'custom_css_url' => $this->custom_css_url ?: $defaults['custom_css_url'],
            'favicon_url' => $this->favicon_url ?: $defaults['favicon_url'],
            'company_name' => $this->company_name ?: $defaults['company_name'],
        ];
    }

    /**
     * Determine if tenant has custom branding.
     */
    public function hasBranding(): bool
    {
        return ! empty($this->logo_url) || ! empty($this->primary_color) || ! empty($this->custom_css_url);
    }

    // License relationship will be added in Phase 2 (Licensing)
    // public function license() { ... }
}
