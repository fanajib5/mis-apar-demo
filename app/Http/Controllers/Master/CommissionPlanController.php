<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\CommissionPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CommissionPlanController extends Controller
{
    public function index(Request $request): Response
    {
        $plans = CommissionPlan::with('tiers')
            ->orderBy('name')
            ->get()
            ->map(fn ($plan) => [
                'id' => $plan->id,
                'name' => $plan->name,
                'type' => $plan->type,
                'basis' => $plan->basis,
                'is_active' => $plan->is_active,
                'tiers' => $plan->tiers->map(fn ($t) => [
                    'id' => $t->id,
                    'name' => $t->name,
                    'min_amount' => $t->min_amount,
                    'max_amount' => $t->max_amount,
                    'rate' => $t->rate,
                ]),
            ]);

        return Inertia::render('master/commission-plans/index', [
            'plans' => $plans,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:Standard,Promo,Tender'],
            'basis' => ['required', 'string', 'in:Revenue,Margin,Count'],
            'tiers' => ['required', 'array', 'min:1', 'max:5'],
            'tiers.*.name' => ['required', 'string', 'max:255'],
            'tiers.*.min_amount' => ['required', 'numeric', 'min:0'],
            'tiers.*.max_amount' => ['nullable', 'numeric', 'min:0'],
            'tiers.*.rate' => ['required', 'numeric', 'min:0', 'max:100'],
        ]);

        $plan = CommissionPlan::create([
            'name' => $validated['name'],
            'type' => $validated['type'],
            'basis' => $validated['basis'],
        ]);

        foreach ($validated['tiers'] as $i => $tierData) {
            $plan->tiers()->create([
                'tier_order' => $i + 1,
                'name' => $tierData['name'],
                'min_amount' => $tierData['min_amount'],
                'max_amount' => $tierData['max_amount'],
                'rate' => $tierData['rate'],
            ]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Commission plan created.')]);

        return to_route('master.commission-plans.index', ['current_team' => $request->route('current_team')]);
    }

    public function destroy(Request $request, CommissionPlan $commissionPlan)
    {
        $commissionPlan->tiers()->delete();
        $commissionPlan->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Commission plan deleted.')]);

        return to_route('master.commission-plans.index', ['current_team' => $request->route('current_team')]);
    }
}
