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
    'team_id', 'code', 'name', 'category', 'tag', 'phone', 'email',
    'address', 'pic_name', 'pic_phone', 'pic_position',
    'credit_limit', 'payment_term', 'is_active',
])]
class Customer extends Model
{
    use HasFactory, SoftDeletes, TeamScoped;

    protected function casts(): array
    {
        return [
            'credit_limit' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function pricing(): HasMany
    {
        return $this->hasMany(CustomerPricing::class);
    }

    public function salesOrders(): HasMany
    {
        return $this->hasMany(SalesOrder::class);
    }

    public function aparUnits(): HasMany
    {
        return $this->hasMany(AparUnit::class);
    }
}
