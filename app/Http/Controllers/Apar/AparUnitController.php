<?php

namespace App\Http\Controllers\Apar;

use App\Http\Controllers\Controller;
use App\Models\AparUnit;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AparUnitController extends Controller
{
    public function index(Request $request): Response
    {
        $units = AparUnit::with(['product:id,name,apar_type,apar_size', 'customer:id,name'])
            ->when($request->search, fn ($q, $s) => $q->where('serial_number', 'like', "%{$s}%"))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->orderByDesc('created_at')
            ->get()
            ->map(fn ($u) => [
                'id' => $u->id,
                'serial_number' => $u->serial_number,
                'product_name' => $u->product?->name,
                'apar_type' => $u->product?->apar_type,
                'apar_size' => $u->product?->apar_size,
                'location' => $u->location,
                'customer_name' => $u->customer?->name,
                'status' => $u->status,
                'expiry_date' => $u->expiry_date?->format('Y-m-d'),
                'next_inspection_date' => $u->next_inspection_date?->format('Y-m-d'),
            ]);

        return Inertia::render('apar/units/index', [
            'units' => $units,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('apar/units/create', [
            'products' => Product::where('is_active', true)
                ->whereNotNull('apar_type')
                ->orderBy('name')
                ->get(['id', 'name', 'apar_type', 'apar_size']),
            'customers' => Customer::where('is_active', true)->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'serial_number' => ['required', 'string', 'max:50', 'unique:apar_units'],
            'location' => ['nullable', 'string', 'max:255'],
            'customer_id' => ['nullable', 'exists:customers,id'],
            'production_date' => ['nullable', 'date'],
            'expiry_date' => ['nullable', 'date'],
        ]);

        AparUnit::create(array_merge($validated, [
            'team_id' => $request->user()->current_team_id,
            'status' => 'Aktif',
        ]));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('APAR unit created.')]);

        return to_route('apar.units.index', ['current_team' => $request->route('current_team')]);
    }
}
