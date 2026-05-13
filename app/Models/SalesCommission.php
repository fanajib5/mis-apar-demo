<?php

namespace App\Models;

use App\Concerns\TeamScoped;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'team_id', 'sales_person_id', 'sales_order_id', 'commission_plan_id',
    'status', 'revenue', 'rate', 'amount', 'period', 'paid_at',
])]
class SalesCommission extends Model
{
    use HasFactory, TeamScoped;

    protected function casts(): array
    {
        return [
            'revenue' => 'decimal:2',
            'rate' => 'decimal:2',
            'amount' => 'decimal:2',
            'paid_at' => 'date',
        ];
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function salesPerson(): BelongsTo
    {
        return $this->belongsTo(SalesPerson::class);
    }

    public function salesOrder(): BelongsTo
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function commissionPlan(): BelongsTo
    {
        return $this->belongsTo(CommissionPlan::class);
    }
}
