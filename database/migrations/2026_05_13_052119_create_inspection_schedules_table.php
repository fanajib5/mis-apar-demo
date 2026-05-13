<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inspection_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->foreignId('apar_unit_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->nullable()->constrained()->nullOnDelete();
            $table->date('scheduled_date');
            $table->date('completed_date')->nullable();
            $table->string('status'); // Scheduled, Completed, Overdue, Cancelled
            $table->string('result')->nullable(); // Lulus, Perbaikan, Afkir
            $table->decimal('pressure', 8, 2)->nullable();
            $table->boolean('seal_ok')->nullable();
            $table->boolean('pin_ok')->nullable();
            $table->boolean('hose_ok')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['team_id', 'status']);
            $table->index(['team_id', 'scheduled_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inspection_schedules');
    }
};
