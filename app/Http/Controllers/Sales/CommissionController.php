<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Models\CommissionPlan;
use App\Models\SalesCommission;
use App\Models\SalesOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CommissionController extends Controller
{
    public function index(Request $request): Response
    {
        $commissions = SalesCommission::with(['salesPerson:id,name', 'salesOrder:id,order_number', 'commissionPlan:id,name'])
            ->when($request->period, fn ($q, $p) => $q->where('period', $p))
            ->orderByDesc('created_at')
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'sales_person_name' => $c->salesPerson?->name,
                'order_number' => $c->salesOrder?->order_number,
                'plan_name' => $c->commissionPlan?->name,
                'status' => $c->status,
                'revenue' => $c->revenue,
                'rate' => $c->rate,
                'amount' => $c->amount,
                'period' => $c->period,
            ]);

        $periods = SalesCommission::selectRaw('DISTINCT period')
            ->orderByDesc('period')
            ->pluck('period');

        return Inertia::render('sales/commissions/index', [
            'commissions' => $commissions,
            'periods' => $periods,
            'filters' => $request->only(['period']),
        ]);
    }

    public function calculate(Request $request)
    {
        $validated = $request->validate([
            'period' => ['required', 'string', 'regex:/^\d{4}-\d{2}$/'],
        ]);

        $period = $validated['period'];
        [$year, $month] = explode('-', $period);

        $orders = SalesOrder::where('status', 'Paid')
            ->whereYear('order_date', $year)
            ->whereMonth('order_date', $month)
            ->whereNotNull('sales_person_id')
            ->with('salesPerson')
            ->get();

        $plans = CommissionPlan::where('is_active', true)->with('tiers')->get();

        foreach ($orders as $order) {
            $plan = $plans->first();

            $tier = $plan?->tiers
                ->where('min_amount', '<=', $order->grand_total)
                ->where('max_amount', '>=', $order->grand_total)
                ->first();

            $rate = $tier?->rate ?? 0;
            $amount = $order->grand_total * $rate / 100;

            SalesCommission::updateOrCreate(
                [
                    'team_id' => $order->team_id,
                    'sales_person_id' => $order->sales_person_id,
                    'sales_order_id' => $order->id,
                    'period' => $period,
                ],
                [
                    'status' => 'Calculated',
                    'revenue' => $order->grand_total,
                    'rate' => $rate,
                    'amount' => $amount,
                    'commission_plan_id' => $plan?->id,
                ]
            );
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Commissions calculated.')]);

        return to_route('sales.commissions.index', ['current_team' => $request->route('current_team')]);
    }

    public function approve(Request $request, SalesCommission $salesCommission)
    {
        $salesCommission->update(['status' => 'Approved']);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Commission approved.')]);

        return back();
    }

    public function pay(Request $request, SalesCommission $salesCommission)
    {
        $salesCommission->update([
            'status' => 'Paid',
            'paid_at' => now(),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Commission paid.')]);

        return back();
    }
}
