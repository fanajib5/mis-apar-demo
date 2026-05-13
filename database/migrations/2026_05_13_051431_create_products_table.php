<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->string('code', 20)->unique();
            $table->string('name');
            $table->string('category'); // Isi Ulang, APAR Baru, Tukar Tambah, Reparasi, O2, Evakuasi
            $table->string('apar_type')->nullable(); // Powder, CO2, Foam, Wet Chemical
            $table->string('apar_size')->nullable(); // 1kg, 3kg, 5kg, 9kg
            $table->decimal('cost_price', 15, 2)->default(0);
            $table->decimal('selling_price', 15, 2)->default(0);
            $table->integer('expiry_months')->nullable(); // masa berlaku bulan
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['team_id', 'category', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
