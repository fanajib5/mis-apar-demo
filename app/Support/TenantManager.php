<?php

namespace App\Support;

use App\Models\Tenant as TenantModel;
use Illuminate\Http\Request;

class TenantManager
{
    protected ?TenantModel $current = null;

    protected bool $scopingEnabled = true;

    protected ?int $fakeTenantId = null;

    /**
     * Get the current tenant, resolving if needed.
     */
    public function current(): ?TenantModel
    {
        if ($this->fakeTenantId !== null) {
            return TenantModel::find($this->fakeTenantId);
        }

        return $this->current;
    }

    /**
     * Set the current tenant instance.
     */
    public function setCurrent(?TenantModel $tenant): void
    {
        $this->current = $tenant;
    }

    /**
     * Check if tenant scoping should be applied.
     */
    public function isScopingEnabled(): bool
    {
        return $this->scopingEnabled && $this->fakeTenantId === null;
    }

    /**
     * Temporarily fake a tenant ID (for seeding/tests).
     */
    public function fake(int $tenantId): void
    {
        $this->fakeTenantId = $tenantId;
    }

    /**
     * Reset fake tenant.
     */
    public function resetFake(): void
    {
        $this->fakeTenantId = null;
    }

    /**
     * Disable tenant scoping for a callback.
     */
    public function withoutScoping(callable $callback): mixed
    {
        $previous = $this->scopingEnabled;
        $this->scopingEnabled = false;

        try {
            return $callback();
        } finally {
            $this->scopingEnabled = $previous;
        }
    }

    /**
     * Resolve tenant from request (subdomain, header, session, env fallback).
     */
    public function resolveFromRequest(Request $request): ?TenantModel
    {
        // 1. X-Tenant-ID header (API / white-label)
        if ($headerTenantId = $request->header('X-Tenant-ID')) {
            return TenantModel::find($headerTenantId);
        }

        // 2. Subdomain: tenant.aparmanagement.com
        $host = $request->getHost();
        $subdomain = explode('.', $host)[0] ?? null;
        if ($subdomain && ! in_array($subdomain, ['www', 'api', 'app', 'admin'])) {
            $tenant = TenantModel::where('domain', $subdomain)->first();
            if ($tenant) {
                return $tenant;
            }
        }

        // 3. Session stored tenant_id
        if ($request->hasSession() && $sessionTenantId = $request->session()->get('tenant_id')) {
            return TenantModel::find($sessionTenantId);
        }

        // 4. ENV fallback (single-tenant demo)
        $fallbackId = config('deployment.tenant.fallback_id');
        if ($fallbackId) {
            return TenantModel::find($fallbackId);
        }

        return null;
    }

    /**
     * Resolve tenant for the current request (used by IdentifyTenant middleware).
     * In testing environment, falls back to tenant ID 1 if no tenant is found.
     */
    public function resolveForRequest(Request $request): ?TenantModel
    {
        $tenant = $this->resolveFromRequest($request);

        // In testing, automatically create/fetch tenant ID 1 if none resolved
        if (! $tenant && app()->environment('testing')) {
            $tenant = TenantModel::firstOrCreate(
                ['id' => 1],
                [
                    'name' => 'Test Tenant',
                    'domain' => 'test',
                    'is_active' => true,
                ]
            );
        }

        return $tenant;
    }
}
