<?php

namespace App\Models;

use App\Concerns\TeamScoped;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['team_id', 'name', 'type', 'basis', 'is_active'])]
class CommissionPlan extends Model
{
    use HasFactory, SoftDeletes, TeamScoped;

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function tiers(): HasMany
    {
        return $this->hasMany(CommissionPlanTier::class);
    }
}
