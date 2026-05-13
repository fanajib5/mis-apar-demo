<?php

namespace App\Models;

use App\Concerns\TeamScoped;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'team_id', 'apar_unit_id', 'inspection_schedule_id',
    'certificate_number', 'issued_date', 'expiry_date',
    'status', 'pdf_path',
])]
class Certificate extends Model
{
    use HasFactory, TeamScoped;

    protected function casts(): array
    {
        return [
            'issued_date' => 'date',
            'expiry_date' => 'date',
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

    public function inspectionSchedule(): BelongsTo
    {
        return $this->belongsTo(InspectionSchedule::class);
    }
}
