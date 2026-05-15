<?php

namespace Tests\Concerns;

use App\Support\Tenant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;

/**
 * Trait for tests that need tenant isolation.
 *
 * Use this trait in feature tests that interact with tenant-scoped models.
 * It automatically creates a default tenant and sets it as the current tenant.
 *
 * @mixin TestCase
 */
trait WithTenant
{
    use RefreshDatabase {
        refreshTestDatabase as baseRefreshTestDatabase;
    }

    /**
     * The ID of the tenant used for this test.
     */
    protected int $tenantId = 1;

    /**
     * Refresh the test database and set up tenant context.
     */
    protected function refreshTestDatabase(): void
    {
        $this->baseRefreshTestDatabase();

        // Seed the tenants table
        \App\Models\Tenant::factory()->create(['id' => $this->tenantId]);

        // Set fake tenant for the duration of the test
        Tenant::fake($this->tenantId);
    }

    /**
     * Disable tenant scoping for a callback.
     */
    protected function withoutTenantScope(callable $callback): mixed
    {
        return Tenant::withoutScoping($callback);
    }

    /**
     * Get the current tenant ID.
     */
    protected function tenantId(): int
    {
        return $this->tenantId;
    }
}
