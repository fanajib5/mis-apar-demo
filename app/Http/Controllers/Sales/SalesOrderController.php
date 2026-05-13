<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sales\StoreSalesOrderRequest;
use App\Models\Customer;
use App\Models\Product;
use App\Models\SalesOrder;
use App\Models\SalesPerson;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SalesOrderController extends Controller
{
    public function index(Request $request): Response
    {
        $orders = SalesOrder::with(['customer:id,name', 'salesPerson:id,name'])
            ->when($request->search, fn ($q, $s) => $q->where('order_number', 'like', "%{$s}%"))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->orderByDesc('created_at')
            ->get()
            ->map(fn ($so) => [
                'id' => $so->id,
                'order_number' => $so->order_number,
                'customer_name' => $so->customer?->name,
                'sales_person_name' => $so->salesPerson?->name,
                'status' => $so->status,
                'order_date' => $so->order_date->format('Y-m-d'),
                'grand_total' => $so->grand_total,
            ]);

        return Inertia::render('sales/orders/index', [
            'orders' => $orders,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('sales/orders/create', [
            'customers' => Customer::where('is_active', true)->orderBy('name')->get(['id', 'name', 'code']),
            'products' => Product::where('is_active', true)->orderBy('name')->get(['id', 'name', 'code', 'selling_price', 'category']),
            'salesPeople' => SalesPerson::where('is_active', true)->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StoreSalesOrderRequest $request)
    {
        $order = SalesOrder::create([
            'team_id' => $request->user()->current_team_id,
            'order_number' => 'SO-'.now()->format('Ymd').'-'.str_pad(SalesOrder::max('id') + 1, 4, '0', STR_PAD_LEFT),
            'customer_id' => $request->customer_id,
            'sales_person_id' => $request->sales_person_id,
            'status' => 'Draft',
            'order_date' => now(),
            'subtotal' => $request->subtotal,
            'discount' => $request->discount ?? 0,
            'tax' => $request->tax ?? 0,
            'shipping_cost' => $request->shipping_cost ?? 0,
            'grand_total' => $request->grand_total,
            'payment_term' => $request->payment_term,
            'po_number' => $request->po_number,
            'notes' => $request->notes,
        ]);

        foreach ($request->items as $item) {
            $order->items()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'subtotal' => $item['quantity'] * $item['unit_price'],
            ]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Sales order created.')]);

        return to_route('sales.orders.index', ['current_team' => $request->route('current_team')]);
    }

    public function edit(Request $request, SalesOrder $salesOrder): Response
    {
        return Inertia::render('sales/orders/edit', [
            'order' => $salesOrder->load(['customer:id,name,code', 'salesPerson:id,name', 'items.product:id,name,code']),
            'customers' => Customer::where('is_active', true)->orderBy('name')->get(['id', 'name', 'code']),
            'products' => Product::where('is_active', true)->orderBy('name')->get(['id', 'name', 'code', 'selling_price', 'category']),
            'salesPeople' => SalesPerson::where('is_active', true)->orderBy('name')->get(['id', 'name']),
        ]);
    }
}
