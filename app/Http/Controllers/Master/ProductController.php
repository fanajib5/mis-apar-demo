<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StoreProductRequest;
use App\Http\Requests\Master\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::query()
            ->when($request->search, fn ($q, $s) => $q->whereAny(['name', 'code'], 'like', "%{$s}%"))
            ->when($request->category, fn ($q, $c) => $q->where('category', $c))
            ->orderBy('name')
            ->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'code' => $p->code,
                'name' => $p->name,
                'category' => $p->category,
                'apar_type' => $p->apar_type,
                'apar_size' => $p->apar_size,
                'cost_price' => $p->cost_price,
                'selling_price' => $p->selling_price,
                'margin' => $p->cost_price > 0 ? round(($p->selling_price - $p->cost_price) / $p->cost_price * 100, 1) : 0,
                'is_active' => $p->is_active,
            ]);

        return Inertia::render('master/products/index', [
            'products' => $products,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('master/products/create');
    }

    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Product created.')]);

        return to_route('master.products.edit', [
            'current_team' => $request->route('current_team'),
            'product' => $product->id,
        ]);
    }

    public function edit(Request $request, Product $product): Response
    {
        return Inertia::render('master/products/edit', [
            'product' => [
                'id' => $product->id,
                'code' => $product->code,
                'name' => $product->name,
                'category' => $product->category,
                'apar_type' => $product->apar_type,
                'apar_size' => $product->apar_size,
                'cost_price' => $product->cost_price,
                'selling_price' => $product->selling_price,
                'expiry_months' => $product->expiry_months,
                'is_active' => $product->is_active,
            ],
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Product updated.')]);

        return to_route('master.products.edit', [
            'current_team' => $request->route('current_team'),
            'product' => $product->id,
        ]);
    }

    public function destroy(Request $request, Product $product)
    {
        $product->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Product deleted.')]);

        return to_route('master.products.index', ['current_team' => $request->route('current_team')]);
    }
}
