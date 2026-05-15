<?php

namespace App\Models\Scopes;

use App\Support\Tenant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Scope;

class TenantScope implements Scope
{
    /**
     * Apply the scope to a given query.
     */
    public function apply(Builder $builder, $model): void
    {
        if (! Tenant::isScopingEnabled()) {
            return;
        }

        $tenantId = Tenant::current()?->id;

        if ($tenantId) {
            $builder->where('tenant_id', $tenantId);
        }
    }
}
