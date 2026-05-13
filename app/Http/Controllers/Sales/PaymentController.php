<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Kwitansi;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function index(Request $request): Response
    {
        $payments = Payment::with(['invoice:id,invoice_number,customer_id,grand_total', 'invoice.customer:id,name'])
            ->orderByDesc('payment_date')
            ->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'payment_number' => $p->payment_number,
                'invoice_number' => $p->invoice->invoice_number,
                'customer_name' => $p->invoice->customer?->name,
                'amount' => $p->amount,
                'method' => $p->method,
                'payment_date' => $p->payment_date->format('Y-m-d'),
            ]);

        return Inertia::render('sales/payments/index', [
            'payments' => $payments,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('sales/payments/create', [
            'invoices' => Invoice::where('status', 'Sent')
                ->where('balance', '>', 0)
                ->with('customer:id,name')
                ->get()
                ->map(fn ($inv) => [
                    'id' => $inv->id,
                    'invoice_number' => $inv->invoice_number,
                    'customer_name' => $inv->customer?->name,
                    'grand_total' => $inv->grand_total,
                    'paid_amount' => $inv->paid_amount,
                    'balance' => $inv->balance,
                ]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'invoice_id' => ['required', 'exists:invoices,id'],
            'amount' => ['required', 'numeric', 'min:1'],
            'method' => ['required', 'string', 'in:Cash,Transfer BRI,Transfer BCA,Lainnya'],
            'reference' => ['nullable', 'string', 'max:100'],
            'payment_date' => ['required', 'date'],
        ]);

        $invoice = Invoice::findOrFail($validated['invoice_id']);

        $payment = Payment::create([
            'team_id' => $request->user()->current_team_id,
            'invoice_id' => $invoice->id,
            'payment_number' => 'PAY-'.now()->format('Ymd').'-'.str_pad(Payment::max('id') + 1, 4, '0', STR_PAD_LEFT),
            'amount' => $validated['amount'],
            'method' => $validated['method'],
            'reference' => $validated['reference'],
            'payment_date' => $validated['payment_date'],
        ]);

        $newPaid = $invoice->paid_amount + $validated['amount'];
        $invoice->update([
            'paid_amount' => $newPaid,
            'balance' => $invoice->grand_total - $newPaid,
        ]);

        if ($invoice->balance <= 0) {
            $invoice->update(['status' => 'Paid']);
        }

        Kwitansi::create([
            'team_id' => $request->user()->current_team_id,
            'kwitansi_number' => 'KWT-'.now()->format('Ymd').'-'.str_pad(Kwitansi::max('id') + 1, 4, '0', STR_PAD_LEFT),
            'payment_id' => $payment->id,
            'invoice_id' => $invoice->id,
            'amount' => $validated['amount'],
            'receipt_date' => $validated['payment_date'],
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Payment recorded.')]);

        return to_route('sales.payments.index', ['current_team' => $request->route('current_team')]);
    }
}
