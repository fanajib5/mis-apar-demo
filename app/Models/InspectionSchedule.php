<?php

namespace App\Models;

use App\Concerns\TeamScoped;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'team_id', 'apar_unit_id', 'customer_id', 'scheduled_date',
    'completed_date', 'status', 'result', 'pressure',
    'seal_ok', 'pin_ok', 'hose_ok', 'notes',
])]
class InspectionSchedule extends Model
{
    use HasFactory, TeamScoped;

    protected function casts(): array
    {
        return [
            'scheduled_date' => 'date',
            'completed_date' => 'date',
            'pressure' => 'decimal:2',
            'seal_ok' => 'boolean',
            'pin_ok' => 'boolean',
            'hose_ok' => 'boolean',
        ];
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function aparUnit(): BelongsTo
    {
        return $this->belongsTo(AparUnit::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function certificate(): BelongsTo
    {
        return $this->belongsTo(Certificate::class);
    }

    public function certificateOfFeasibility(): BelongsTo
    {
        return $this->belongsTo(Certificate::class);
    }
}
