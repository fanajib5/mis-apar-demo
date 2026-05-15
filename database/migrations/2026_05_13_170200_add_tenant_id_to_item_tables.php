<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add tenant_id to invoice_items (nullable first for safe backfill)
        if (Schema::hasTable('invoice_items') && ! Schema::hasColumn('invoice_items', 'tenant_id')) {
            Schema::table('invoice_items', function (Blueprint $table) {
                $table->unsignedBigInteger('tenant_id')->nullable()->after('id');
                $table->index('tenant_id');
                $table->foreign('tenant_id')
                    ->references('id')
                    ->on('tenants')
                    ->cascadeOnDelete();
            });

            // Backfill tenant_id from parent invoice using scalar subquery (DB-agnostic)
            DB::table('invoice_items')
                ->whereNull('tenant_id')
                ->update([
                    'tenant_id' => DB::raw('(SELECT tenant_id FROM invoices WHERE invoices.id = invoice_items.invoice_id)'),
                ]);

            // Make column NOT NULL after backfill
            Schema::table('invoice_items', function (Blueprint $table) {
                $table->unsignedBigInteger('tenant_id')->nullable(false)->change();
            });
        }

        // Add tenant_id to sales_order_items (nullable first for safe backfill)
        if (Schema::hasTable('sales_order_items') && ! Schema::hasColumn('sales_order_items', 'tenant_id')) {
            Schema::table('sales_order_items', function (Blueprint $table) {
                $table->unsignedBigInteger('tenant_id')->nullable()->after('id');
                $table->index('tenant_id');
                $table->foreign('tenant_id')
                    ->references('id')
                    ->on('tenants')
                    ->cascadeOnDelete();
            });

            // Backfill tenant_id from parent sales_order using scalar subquery (DB-agnostic)
            DB::table('sales_order_items')
                ->whereNull('tenant_id')
                ->update([
                    'tenant_id' => DB::raw('(SELECT tenant_id FROM sales_orders WHERE sales_orders.id = sales_order_items.sales_order_id)'),
                ]);

            // Make column NOT NULL after backfill
            Schema::table('sales_order_items', function (Blueprint $table) {
                $table->unsignedBigInteger('tenant_id')->nullable(false)->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('invoice_items')) {
            Schema::table('invoice_items', function (Blueprint $table) {
                $table->dropForeign(['tenant_id']);
                $table->dropIndex(['tenant_id']);
                $table->dropColumn('tenant_id');
            });
        }

        if (Schema::hasTable('sales_order_items')) {
            Schema::table('sales_order_items', function (Blueprint $table) {
                $table->dropForeign(['tenant_id']);
                $table->dropIndex(['tenant_id']);
                $table->dropColumn('tenant_id');
            });
        }
    }
};
