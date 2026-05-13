<?php

namespace App\Concerns;

use Illuminate\Database\Eloquent\Builder;

trait TeamScoped
{
    protected static function bootTeamScoped(): void
    {
        static::addGlobalScope('team', function (Builder $builder) {
            $teamId = auth()->user()?->current_team_id;

            if ($teamId) {
                $builder->where('team_id', $teamId);
            }
        });

        static::creating(function ($model) {
            if (empty($model->team_id) && auth()->hasUser()) {
                $model->team_id = auth()->user()->current_team_id;
            }
        });
    }
}
