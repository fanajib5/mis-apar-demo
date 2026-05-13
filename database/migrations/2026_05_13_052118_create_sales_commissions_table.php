<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sales_commissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sales_person_id')->constrained('sales_people')->cascadeOnDelete();
            $table->foreignId('sales_order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('commission_plan_id')->nullable()->constrained()->nullOnDelete();
            $table->string('status'); // Draft, Calculated, Approved, Paid
            $table->decimal('revenue', 15, 2)->default(0);
            $table->decimal('rate', 5, 2)->default(0);
            $table->decimal('amount', 15, 2)->default(0);
            $table->string('period'); // YYYY-MM
            $table->date('paid_at')->nullable();
            $table->timestamps();

            $table->index(['team_id', 'status']);
            $table->index(['team_id', 'period']);
            $table->index('sales_person_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sales_commissions');
    }
};
