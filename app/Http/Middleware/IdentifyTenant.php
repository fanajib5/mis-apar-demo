<?php

namespace App\Http\Middleware;

use App\Exceptions\TenantNotFoundException;
use App\Support\Tenant;
use Closure;
use Illuminate\Http\Request;

class IdentifyTenant
{
    /**
     * Handle an incoming request.
     *
     * Resolves the tenant from subdomain, header, session, or ENV fallback.
     * Sets the current tenant globally for the request lifecycle.
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $tenant = app('tenant')->resolveForRequest($request);

        if ($tenant) {
            // Ensure tenant is active
            if (! $tenant->is_active) {
                throw new TenantNotFoundException('Tenant is inactive.');
            }

            Tenant::setCurrent($tenant);

            // Persist tenant_id in session for subsequent requests
            if ($request->hasSession()) {
                $request->session()->put('tenant_id', $tenant->id);
            }
        } elseif (config('deployment.tenant.enabled', false)) {
            // In multi-tenant mode, tenant identification is required.
            throw new TenantNotFoundException('Unable to identify tenant for this request.');
        }

        return $next($request);
    }
}
