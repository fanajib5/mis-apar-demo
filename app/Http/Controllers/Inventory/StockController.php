<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\InventoryMovement;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StockController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($product) {
                $stockIn = InventoryMovement::where('product_id', $product->id)
                    ->where('type', 'In')
                    ->sum('quantity');

                $stockOut = InventoryMovement::where('product_id', $product->id)
                    ->where('type', 'Out')
                    ->sum('quantity');

                $currentStock = $stockIn - $stockOut;

                return [
                    'id' => $product->id,
                    'code' => $product->code,
                    'name' => $product->name,
                    'category' => $product->category,
                    'current_stock' => $currentStock,
                    'cost_price' => $product->cost_price,
                    'selling_price' => $product->selling_price,
                ];
            });

        return Inertia::render('inventory/stock/index', [
            'products' => $products,
        ]);
    }

    public function adjustments(): Response
    {
        $movements = InventoryMovement::with(['product:id,name,code', 'createdBy:id,name'])
            ->orderByDesc('created_at')
            ->get()
            ->map(fn ($m) => [
                'id' => $m->id,
                'product_name' => $m->product?->name,
                'type' => $m->type,
                'quantity' => $m->quantity,
                'stock_before' => $m->stock_before,
                'stock_after' => $m->stock_after,
                'notes' => $m->notes,
                'created_by' => $m->createdBy?->name,
                'created_at' => $m->created_at->format('Y-m-d H:i'),
            ]);

        return Inertia::render('inventory/adjustments/index', [
            'movements' => $movements,
            'products' => Product::where('is_active', true)->orderBy('name')->get(['id', 'name', 'code']),
        ]);
    }

    public function storeAdjustment(Request $request)
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'type' => ['required', 'string', 'in:In,Out,Adjustment'],
            'quantity' => ['required', 'integer', 'min:1'],
            'notes' => ['nullable', 'string'],
        ]);

        $productId = $validated['product_id'];

        $stockIn = InventoryMovement::where('product_id', $productId)->where('type', 'In')->sum('quantity');
        $stockOut = InventoryMovement::where('product_id', $productId)->where('type', 'Out')->sum('quantity');
        $stockBefore = $stockIn - $stockOut;

        $quantity = $validated['type'] === 'Out' ? -$validated['quantity'] : $validated['quantity'];
        $stockAfter = $stockBefore + ($validated['type'] === 'Adjustment' ? $validated['quantity'] : $quantity);

        InventoryMovement::create([
            'team_id' => $request->user()->current_team_id,
            'product_id' => $productId,
            'type' => $validated['type'],
            'quantity' => $validated['quantity'],
            'stock_before' => $stockBefore,
            'stock_after' => $stockAfter,
            'notes' => $validated['notes'],
            'created_by' => $request->user()->id,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Stock adjustment recorded.')]);

        return back();
    }
}
