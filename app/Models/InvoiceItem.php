<?php

namespace App\Models;

use App\Models\Scopes\TenantScope;
use App\Support\Tenant;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['invoice_id', 'product_id', 'quantity', 'unit_price', 'subtotal', 'tenant_id'])]
class InvoiceItem extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        // Apply tenant global scope
        static::addGlobalScope(new TenantScope);

        // Auto-assign tenant_id on creating
        static::creating(function ($model) {
            if (empty($model->tenant_id) && Tenant::current()) {
                $model->tenant_id = Tenant::current()->id;
            }
        });
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
