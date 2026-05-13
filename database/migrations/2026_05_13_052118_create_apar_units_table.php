<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('apar_units', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('serial_number', 50)->unique();
            $table->string('location')->nullable();
            $table->foreignId('customer_id')->nullable()->constrained()->nullOnDelete();
            $table->string('status'); // Aktif, Perlu Isi Ulang, Rusak, Afkir
            $table->date('production_date')->nullable();
            $table->date('last_refill_date')->nullable();
            $table->date('next_inspection_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['team_id', 'status']);
            $table->index(['team_id', 'expiry_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('apar_units');
    }
};
