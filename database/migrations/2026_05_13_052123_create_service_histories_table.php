<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->foreignId('apar_unit_id')->constrained()->cascadeOnDelete();
            $table->string('action'); // Isi Ulang, Reparasi, Inspeksi, Ganti Baru
            $table->date('service_date');
            $table->string('technician')->nullable();
            $table->decimal('cost', 15, 2)->default(0);
            $table->foreignId('sales_order_id')->nullable()->constrained()->nullOnDelete();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['team_id', 'apar_unit_id']);
            $table->index(['team_id', 'service_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_histories');
    }
};
