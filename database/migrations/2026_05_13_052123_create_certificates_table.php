<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->foreignId('apar_unit_id')->constrained()->cascadeOnDelete();
            $table->foreignId('inspection_schedule_id')->constrained()->cascadeOnDelete();
            $table->string('certificate_number', 50)->unique();
            $table->date('issued_date');
            $table->date('expiry_date');
            $table->string('status'); // Active, Expired
            $table->string('pdf_path')->nullable();
            $table->timestamps();

            $table->index(['team_id', 'status']);
            $table->index(['team_id', 'expiry_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
