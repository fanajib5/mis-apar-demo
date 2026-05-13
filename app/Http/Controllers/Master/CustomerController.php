<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StoreCustomerRequest;
use App\Http\Requests\Master\UpdateCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(Request $request): Response
    {
        $customers = Customer::query()
            ->when($request->search, fn ($q, $s) => $q->whereAny(['name', 'code', 'phone', 'email'], 'like', "%{$s}%"))
            ->when($request->category, fn ($q, $c) => $q->where('category', $c))
            ->when($request->tag, fn ($q, $t) => $q->where('tag', $t))
            ->orderBy('name')
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'code' => $c->code,
                'name' => $c->name,
                'category' => $c->category,
                'tag' => $c->tag,
                'phone' => $c->phone,
                'email' => $c->email,
                'pic_name' => $c->pic_name,
                'credit_limit' => $c->credit_limit,
                'payment_term' => $c->payment_term,
                'is_active' => $c->is_active,
            ]);

        return Inertia::render('master/customers/index', [
            'customers' => $customers,
            'filters' => $request->only(['search', 'category', 'tag']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('master/customers/create');
    }

    public function store(StoreCustomerRequest $request)
    {
        $customer = Customer::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Customer created.')]);

        return to_route('master.customers.edit', ['current_team' => $request->route('current_team'), 'customer' => $customer->id]);
    }

    public function edit(Request $request, Customer $customer): Response
    {
        return Inertia::render('master/customers/edit', [
            'customer' => [
                'id' => $customer->id,
                'code' => $customer->code,
                'name' => $customer->name,
                'category' => $customer->category,
                'tag' => $customer->tag,
                'phone' => $customer->phone,
                'email' => $customer->email,
                'address' => $customer->address,
                'pic_name' => $customer->pic_name,
                'pic_phone' => $customer->pic_phone,
                'pic_position' => $customer->pic_position,
                'credit_limit' => $customer->credit_limit,
                'payment_term' => $customer->payment_term,
                'is_active' => $customer->is_active,
            ],
        ]);
    }

    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Customer updated.')]);

        return to_route('master.customers.edit', ['current_team' => $request->route('current_team'), 'customer' => $customer->id]);
    }

    public function destroy(Request $request, Customer $customer)
    {
        $customer->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Customer deleted.')]);

        return to_route('master.customers.index', ['current_team' => $request->route('current_team')]);
    }
}
