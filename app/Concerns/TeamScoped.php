<?php

namespace App\Concerns;

use App\Models\Scopes\TenantScope;
use App\Support\Tenant;
use Illuminate\Database\Eloquent\Builder;

trait TeamScoped
{
    protected static function bootTeamScoped(): void
    {
        // Existing team-level global scope
        static::addGlobalScope('team', function (Builder $builder) {
            $teamId = auth()->user()?->current_team_id;

            if ($teamId) {
                $builder->where('team_id', $teamId);
            }
        });

        // New tenant-level global scope
        static::addGlobalScope(new TenantScope);

        // Auto-assign team_id on creating
        static::creating(function ($model) {
            if (empty($model->team_id) && auth()->hasUser()) {
                $model->team_id = auth()->user()->current_team_id;
            }
        });

        // Auto-assign tenant_id on creating
        static::creating(function ($model) {
            if (empty($model->tenant_id) && Tenant::current()) {
                $model->tenant_id = Tenant::current()->id;
            }
        });
    }
}
