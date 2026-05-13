<?php

namespace App\Http\Controllers\Apar;

use App\Http\Controllers\Controller;
use App\Models\AparUnit;
use App\Models\ServiceHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceHistoryController extends Controller
{
    public function index(Request $request): Response
    {
        $histories = ServiceHistory::with(['aparUnit:id,serial_number', 'aparUnit.product:id,name', 'salesOrder:id,order_number'])
            ->orderByDesc('service_date')
            ->get()
            ->map(fn ($h) => [
                'id' => $h->id,
                'serial_number' => $h->aparUnit?->serial_number,
                'product_name' => $h->aparUnit?->product?->name,
                'action' => $h->action,
                'service_date' => $h->service_date->format('Y-m-d'),
                'technician' => $h->technician,
                'cost' => $h->cost,
                'order_number' => $h->salesOrder?->order_number,
            ]);

        $units = AparUnit::with('product:id,name,apar_type,apar_size')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn ($u) => [
                'id' => $u->id,
                'serial_number' => $u->serial_number,
                'product_name' => $u->product?->name,
            ]);

        return Inertia::render('apar/service-histories/index', [
            'histories' => $histories,
            'units' => $units,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'apar_unit_id' => ['required', 'exists:apar_units,id'],
            'action' => ['required', 'string', 'in:Isi Ulang,Reparasi,Inspeksi,Ganti Baru'],
            'service_date' => ['required', 'date'],
            'technician' => ['nullable', 'string', 'max:255'],
            'cost' => ['nullable', 'numeric', 'min:0'],
            'sales_order_id' => ['nullable', 'exists:sales_orders,id'],
            'notes' => ['nullable', 'string'],
        ]);

        ServiceHistory::create(array_merge($validated, [
            'team_id' => $request->user()->current_team_id,
        ]));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Service history recorded.')]);

        return to_route('apar.service-histories.index', ['current_team' => $request->route('current_team')]);
    }
}
