<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('domain')->unique()->index();
            $table->string('database')->nullable()->comment('Optional separate database for this tenant');
            $table->json('settings')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('primary_color', 20)->nullable()->default('#3b82f6');
            $table->string('custom_css_url')->nullable();
            $table->string('favicon_url')->nullable();
            $table->string('company_name')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
