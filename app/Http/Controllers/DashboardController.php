<?php

namespace App\Http\Controllers;

use App\Models\AparUnit;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Product;
use App\Models\SalesOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $teamId = $request->user()->current_team_id;

        $totalCustomers = Customer::where('team_id', $teamId)->count();
        $totalProducts = Product::where('team_id', $teamId)->count();

        $totalOrders = SalesOrder::where('team_id', $teamId)->count();
        $totalRevenue = SalesOrder::where('team_id', $teamId)
            ->where('status', 'Paid')
            ->whereMonth('order_date', now()->month)
            ->sum('grand_total');

        $pendingInvoices = Invoice::where('team_id', $teamId)
            ->where('status', 'Sent')
            ->count();

        $expiringApar = AparUnit::where('team_id', $teamId)
            ->whereIn('status', ['Aktif', 'Perlu Isi Ulang'])
            ->where('expiry_date', '<=', now()->addDays(30))
            ->count();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalCustomers' => $totalCustomers,
                'totalProducts' => $totalProducts,
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'pendingInvoices' => $pendingInvoices,
                'expiringApar' => $expiringApar,
            ],
        ]);
    }
}
