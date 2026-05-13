<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('commission_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('type'); // Standard, Promo, Tender
            $table->string('basis'); // Revenue, Margin, Count
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['team_id', 'is_active']);
        });

        Schema::create('commission_plan_tiers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('commission_plan_id')->constrained()->cascadeOnDelete();
            $table->integer('tier_order');
            $table->string('name'); // Bronze, Silver, Gold
            $table->decimal('min_amount', 15, 2)->default(0);
            $table->decimal('max_amount', 15, 2)->nullable();
            $table->decimal('rate', 5, 2); // percentage
            $table->timestamps();

            $table->index('commission_plan_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('commission_plan_tiers');
        Schema::dropIfExists('commission_plans');
    }
};
