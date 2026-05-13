<?php

namespace App\Models;

use App\Concerns\TeamScoped;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'team_id', 'code', 'name', 'category', 'apar_type', 'apar_size',
    'cost_price', 'selling_price', 'expiry_months', 'is_active',
])]
class Product extends Model
{
    use HasFactory, SoftDeletes, TeamScoped;

    protected function casts(): array
    {
        return [
            'cost_price' => 'decimal:2',
            'selling_price' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function customerPricing(): HasMany
    {
        return $this->hasMany(CustomerPricing::class);
    }

    public function aparUnits(): HasMany
    {
        return $this->hasMany(AparUnit::class);
    }
}
