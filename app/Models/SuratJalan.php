<?php

namespace App\Models;

use App\Concerns\TeamScoped;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'team_id', 'sj_number', 'sales_order_id', 'customer_id',
    'delivery_date', 'status', 'notes',
])]
class SuratJalan extends Model
{
    use HasFactory, TeamScoped;

    protected function casts(): array
    {
        return [
            'delivery_date' => 'date',
        ];
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function salesOrder(): BelongsTo
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
