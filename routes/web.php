<?php

use App\Http\Controllers\Apar\AparUnitController;
use App\Http\Controllers\Apar\CertificateController;
use App\Http\Controllers\Apar\InspectionController;
use App\Http\Controllers\Apar\ServiceHistoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Inventory\StockController;
use App\Http\Controllers\Master\CommissionPlanController;
use App\Http\Controllers\Master\CustomerController;
use App\Http\Controllers\Master\ProductController;
use App\Http\Controllers\Master\SalesPersonController;
use App\Http\Controllers\Sales\CommissionController;
use App\Http\Controllers\Sales\InvoiceController;
use App\Http\Controllers\Sales\PaymentController;
use App\Http\Controllers\Sales\SalesOrderController;
use App\Http\Controllers\Sales\SuratJalanController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');

        Route::prefix('master')->name('master.')->group(function () {
            Route::resource('customers', CustomerController::class)->except(['show']);
            Route::resource('products', ProductController::class)->except(['show']);
            Route::resource('sales-people', SalesPersonController::class)->except(['show', 'create', 'edit']);
            Route::resource('commission-plans', CommissionPlanController::class)->only(['index', 'store', 'destroy']);
        });

        Route::prefix('sales')->name('sales.')->group(function () {
            Route::resource('orders', SalesOrderController::class)->except(['show', 'update', 'destroy']);
            Route::resource('invoices', InvoiceController::class)->only(['index', 'create', 'store']);
            Route::resource('payments', PaymentController::class)->only(['index', 'create', 'store']);
            Route::resource('surat-jalans', SuratJalanController::class)->only(['index', 'create', 'store']);
            Route::post('surat-jalans/{surat_jalan}/confirm', [SuratJalanController::class, 'confirm'])->name('surat-jalans.confirm');
            Route::resource('commissions', CommissionController::class)->only(['index']);
            Route::post('commissions/calculate', [CommissionController::class, 'calculate'])->name('commissions.calculate');
            Route::post('commissions/{sales_commission}/approve', [CommissionController::class, 'approve'])->name('commissions.approve');
            Route::post('commissions/{sales_commission}/pay', [CommissionController::class, 'pay'])->name('commissions.pay');
        });

        Route::prefix('apar')->name('apar.')->group(function () {
            Route::resource('units', AparUnitController::class)->only(['index', 'create', 'store']);
            Route::resource('inspections', InspectionController::class)->only(['index', 'create', 'store']);
            Route::post('inspections/{inspection_schedule}/complete', [InspectionController::class, 'complete'])->name('inspections.complete');
            Route::resource('service-histories', ServiceHistoryController::class)->only(['index', 'store']);
            Route::resource('certificates', CertificateController::class)->only(['index']);
        });

        Route::prefix('inventory')->name('inventory.')->group(function () {
            Route::get('stock', [StockController::class, 'index'])->name('stock.index');
            Route::get('adjustments', [StockController::class, 'adjustments'])->name('adjustments.index');
            Route::post('adjustments', [StockController::class, 'storeAdjustment'])->name('adjustments.store');
        });
    });

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
});

require __DIR__.'/settings.php';
