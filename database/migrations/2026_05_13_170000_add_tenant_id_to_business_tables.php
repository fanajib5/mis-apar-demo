<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * List of tables that require tenant_id column.
     *
     * @var array<int, string>
     */
    protected array $tables = [
        'customers',
        'products',
        'sales_people',
        'commission_plans',
        'customer_pricing',
        'sales_orders',
        'invoices',
        'payments',
        'kwitansis',
        'surat_jalans',
        'apar_units',
        'sales_commissions',
        'inspection_schedules',
        'certificates',
        'service_histories',
        'inventory_movements',
    ];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        foreach ($this->tables as $table) {
            if (! Schema::hasTable($table) || ! Schema::hasColumn($table, 'tenant_id')) {
                Schema::table($table, function (Blueprint $table) {
                    // Add NOT NULL column; existing fresh tables are empty so constraint is safe.
                    $table->unsignedBigInteger('tenant_id')->after('id');
                    $table->index('tenant_id');
                    $table->foreign('tenant_id')
                        ->references('id')
                        ->on('tenants')
                        ->cascadeOnDelete();
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach ($this->tables as $table) {
            if (Schema::hasTable($table) && Schema::hasColumn($table, 'tenant_id')) {
                Schema::table($table, function (Blueprint $table) {
                    $table->dropForeign(['tenant_id']);
                    $table->dropIndex(['tenant_id']);
                    $table->dropColumn('tenant_id');
                });
            }
        }
    }
};
