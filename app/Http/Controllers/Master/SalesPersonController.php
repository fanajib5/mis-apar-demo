<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StoreSalesPersonRequest;
use App\Models\SalesPerson;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SalesPersonController extends Controller
{
    public function index(Request $request): Response
    {
        $salesPeople = SalesPerson::query()
            ->when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->orderBy('name')
            ->get()
            ->map(fn ($sp) => [
                'id' => $sp->id,
                'name' => $sp->name,
                'phone' => $sp->phone,
                'email' => $sp->email,
                'is_active' => $sp->is_active,
            ]);

        return Inertia::render('master/sales-people/index', [
            'salesPeople' => $salesPeople,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(StoreSalesPersonRequest $request)
    {
        $salesPerson = SalesPerson::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Sales person created.')]);

        return to_route('master.sales-people.index', ['current_team' => $request->route('current_team')]);
    }

    public function update(Request $request, SalesPerson $salesPerson)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        $salesPerson->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Sales person updated.')]);

        return to_route('master.sales-people.index', ['current_team' => $request->route('current_team')]);
    }

    public function destroy(Request $request, SalesPerson $salesPerson)
    {
        $salesPerson->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Sales person deleted.')]);

        return to_route('master.sales-people.index', ['current_team' => $request->route('current_team')]);
    }
}
