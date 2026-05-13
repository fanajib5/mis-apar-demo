<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\SalesOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    public function index(Request $request): Response
    {
        $invoices = Invoice::with(['customer:id,name', 'salesOrder:id,order_number'])
            ->when($request->search, fn ($q, $s) => $q->where('invoice_number', 'like', "%{$s}%"))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->orderByDesc('created_at')
            ->get()
            ->map(fn ($inv) => [
                'id' => $inv->id,
                'invoice_number' => $inv->invoice_number,
                'customer_name' => $inv->customer?->name,
                'order_number' => $inv->salesOrder?->order_number,
                'status' => $inv->status,
                'invoice_date' => $inv->invoice_date->format('Y-m-d'),
                'due_date' => $inv->due_date->format('Y-m-d'),
                'grand_total' => $inv->grand_total,
                'paid_amount' => $inv->paid_amount,
                'balance' => $inv->balance,
            ]);

        return Inertia::render('sales/invoices/index', [
            'invoices' => $invoices,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('sales/invoices/create', [
            'orders' => SalesOrder::where('status', 'Confirmed')
                ->with('customer:id,name')
                ->get()
                ->map(fn ($so) => [
                    'id' => $so->id,
                    'order_number' => $so->order_number,
                    'customer_name' => $so->customer?->name,
                    'grand_total' => $so->grand_total,
                ]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sales_order_id' => ['required', 'exists:sales_orders,id'],
        ]);

        $salesOrder = SalesOrder::with('items')->findOrFail($validated['sales_order_id']);

        $invoiceNumber = 'INV-'.now()->format('Ymd').'-'.str_pad(Invoice::max('id') + 1, 4, '0', STR_PAD_LEFT);

        $invoice = Invoice::create([
            'team_id' => $request->user()->current_team_id,
            'invoice_number' => $invoiceNumber,
            'sales_order_id' => $salesOrder->id,
            'customer_id' => $salesOrder->customer_id,
            'status' => 'Sent',
            'invoice_date' => now(),
            'due_date' => now()->addDays(30),
            'subtotal' => $salesOrder->subtotal,
            'discount' => $salesOrder->discount,
            'tax' => $salesOrder->tax,
            'grand_total' => $salesOrder->grand_total,
            'paid_amount' => 0,
            'balance' => $salesOrder->grand_total,
        ]);

        foreach ($salesOrder->items as $item) {
            $invoice->items()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'unit_price' => $item->unit_price,
                'subtotal' => $item->subtotal,
            ]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Invoice created.')]);

        return to_route('sales.invoices.index', ['current_team' => $request->route('current_team')]);
    }
}
