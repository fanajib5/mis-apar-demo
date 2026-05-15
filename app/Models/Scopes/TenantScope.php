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

        $builder->where($model->getTable().'.tenant_id', Tenant::current()?->id);
    }
}
