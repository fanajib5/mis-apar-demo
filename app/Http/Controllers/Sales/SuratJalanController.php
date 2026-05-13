<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Models\SalesOrder;
use App\Models\SuratJalan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SuratJalanController extends Controller
{
    public function index(Request $request): Response
    {
        $suratJalans = SuratJalan::with(['customer:id,name', 'salesOrder:id,order_number'])
            ->orderByDesc('created_at')
            ->get()
            ->map(fn ($sj) => [
                'id' => $sj->id,
                'sj_number' => $sj->sj_number,
                'customer_name' => $sj->customer?->name,
                'order_number' => $sj->salesOrder?->order_number,
                'status' => $sj->status,
                'delivery_date' => $sj->delivery_date->format('Y-m-d'),
            ]);

        return Inertia::render('sales/surat-jalans/index', [
            'suratJalans' => $suratJalans,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('sales/surat-jalans/create', [
            'orders' => SalesOrder::whereIn('status', ['Confirmed', 'Delivered'])
                ->with('customer:id,name')
                ->get()
                ->map(fn ($so) => [
                    'id' => $so->id,
                    'order_number' => $so->order_number,
                    'customer_name' => $so->customer?->name,
                ]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sales_order_id' => ['required', 'exists:sales_orders,id'],
            'delivery_date' => ['required', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        $salesOrder = SalesOrder::findOrFail($validated['sales_order_id']);

        $suratJalan = SuratJalan::create([
            'team_id' => $request->user()->current_team_id,
            'sj_number' => 'SJ-'.now()->format('Ymd').'-'.str_pad(SuratJalan::max('id') + 1, 4, '0', STR_PAD_LEFT),
            'sales_order_id' => $salesOrder->id,
            'customer_id' => $salesOrder->customer_id,
            'delivery_date' => $validated['delivery_date'],
            'status' => 'Draft',
            'notes' => $validated['notes'],
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Surat jalan created.')]);

        return to_route('sales.surat-jalans.index', ['current_team' => $request->route('current_team')]);
    }

    public function confirm(Request $request, SuratJalan $suratJalan)
    {
        $suratJalan->update(['status' => 'Delivered']);

        $suratJalan->salesOrder->update(['status' => 'Delivered']);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Surat jalan confirmed.')]);

        return back();
    }
}
