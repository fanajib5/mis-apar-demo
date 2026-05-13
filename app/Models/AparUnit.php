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
    'team_id', 'product_id', 'serial_number', 'location',
    'customer_id', 'status', 'production_date', 'last_refill_date',
    'next_inspection_date', 'expiry_date',
])]
class AparUnit extends Model
{
    use HasFactory, SoftDeletes, TeamScoped;

    protected function casts(): array
    {
        return [
            'production_date' => 'date',
            'last_refill_date' => 'date',
            'next_inspection_date' => 'date',
            'expiry_date' => 'date',
        ];
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function inspections(): HasMany
    {
        return $this->hasMany(InspectionSchedule::class);
    }

    public function serviceHistories(): HasMany
    {
        return $this->hasMany(ServiceHistory::class);
    }

    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class);
    }
}
