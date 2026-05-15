import { Head, usePage } from '@inertiajs/react';
import { Form } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Customer {
    id: number;
    name: string;
    code: string;
}
interface Product {
    id: number;
    name: string;
    code: string;
    selling_price: number;
    category: string;
}
interface SalesPerson {
    id: number;
    name: string;
}
interface LineItem {
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
}

export default function CreateSalesOrder({
    customers,
    products,
    salesPeople,
}: {
    customers: Customer[];
    products: Product[];
    salesPeople: SalesPerson[];
}) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';
    const [items, setItems] = useState<LineItem[]>([]);
    const [selectedProduct, setSelectedProduct] = useState('');

    function addItem() {
        if (!selectedProduct) {
            return;
        }

        const prod = products.find((p) => p.id === Number(selectedProduct));

        if (!prod) {
            return;
        }

        if (items.find((i) => i.product_id === prod.id)) {
            return;
        }

        setItems([
            ...items,
            {
                product_id: prod.id,
                product_name: prod.name,
                quantity: 1,
                unit_price: prod.selling_price,
            },
        ]);
        setSelectedProduct('');
    }

    function removeItem(i: number) {
        setItems(items.filter((_, idx) => idx !== i));
    }

    function updateItem(
        i: number,
        field: 'quantity' | 'unit_price',
        value: string,
    ) {
        const updated = [...items];
        updated[i] = { ...updated[i], [field]: Number(value) };
        setItems(updated);
    }

    const subtotal = items.reduce(
        (sum, i) => sum + i.quantity * i.unit_price,
        0,
    );
    const tax = subtotal * 0.11;
    const grandTotal = subtotal + tax;

    return (
        <>
            <Head title="Create Sales Order" />
            <AppLayout
                breadcrumbs={
                    CreateSalesOrder.layout?.({
                        currentTeam: page.props.currentTeam,
                    })?.breadcrumbs ?? []
                }
            >
                <div className="space-y-4 p-4">
                    <h1 className="text-2xl font-bold">New Sales Order</h1>

                    <Form
                        action={`/${teamSlug}/sales/orders`}
                        method="post"
                        resetOnSuccess
                    >
                        {({ errors, processing }) => {
                            return (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Order Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <input
                                            type="hidden"
                                            name="items"
                                            value={JSON.stringify(items)}
                                        />
                                        <input
                                            type="hidden"
                                            name="subtotal"
                                            value={subtotal}
                                        />
                                        <input
                                            type="hidden"
                                            name="tax"
                                            value={tax}
                                        />
                                        <input
                                            type="hidden"
                                            name="grand_total"
                                            value={grandTotal}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="customer_id">
                                                    Customer
                                                </Label>
                                                <select
                                                    id="customer_id"
                                                    name="customer_id"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                    required
                                                >
                                                    <option value="">
                                                        Select customer...
                                                    </option>
                                                    {customers.map((c) => (
                                                        <option
                                                            key={c.id}
                                                            value={c.id}
                                                        >
                                                            {c.code} - {c.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.customer_id && (
                                                    <p className="text-sm text-red-500">
                                                        {errors.customer_id}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="sales_person_id">
                                                    Sales Person
                                                </Label>
                                                <select
                                                    id="sales_person_id"
                                                    name="sales_person_id"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                >
                                                    <option value="">
                                                        Select...
                                                    </option>
                                                    {salesPeople.map((sp) => (
                                                        <option
                                                            key={sp.id}
                                                            value={sp.id}
                                                        >
                                                            {sp.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="payment_term">
                                                    Payment Term
                                                </Label>
                                                <input
                                                    id="payment_term"
                                                    name="payment_term"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                    value="30"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="po_number">
                                                    PO Number
                                                </Label>
                                                <input
                                                    id="po_number"
                                                    name="po_number"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Items</Label>
                                            <div className="flex gap-2">
                                                <select
                                                    value={selectedProduct}
                                                    onChange={(e) =>
                                                        setSelectedProduct(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                >
                                                    <option value="">
                                                        Add product...
                                                    </option>
                                                    {products.map((p) => (
                                                        <option
                                                            key={p.id}
                                                            value={p.id}
                                                        >
                                                            {p.code} - {p.name}{' '}
                                                            (Rp{' '}
                                                            {p.selling_price.toLocaleString()}
                                                            )
                                                        </option>
                                                    ))}
                                                </select>
                                                <Button
                                                    type="button"
                                                    onClick={addItem}
                                                >
                                                    Add
                                                </Button>
                                            </div>

                                            {items.length > 0 && (
                                                <table className="mt-2 w-full text-left text-sm">
                                                    <thead>
                                                        <tr className="border-b">
                                                            <th className="py-1">
                                                                Product
                                                            </th>
                                                            <th className="py-1">
                                                                Qty
                                                            </th>
                                                            <th className="py-1">
                                                                Price
                                                            </th>
                                                            <th className="py-1">
                                                                Subtotal
                                                            </th>
                                                            <th className="py-1"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {items.map(
                                                            (item, i) => (
                                                                <tr
                                                                    key={i}
                                                                    className="border-b"
                                                                >
                                                                    <td className="py-1">
                                                                        {
                                                                            item.product_name
                                                                        }
                                                                    </td>
                                                                    <td className="py-1">
                                                                        <input
                                                                            type="number"
                                                                            min="1"
                                                                            value={
                                                                                item.quantity
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                updateItem(
                                                                                    i,
                                                                                    'quantity',
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                            className="flex h-8 w-20 rounded-md border border-input bg-background px-2 text-sm"
                                                                        />
                                                                    </td>
                                                                    <td className="py-1">
                                                                        <input
                                                                            type="number"
                                                                            value={
                                                                                item.unit_price
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                updateItem(
                                                                                    i,
                                                                                    'unit_price',
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                            className="flex h-8 w-28 rounded-md border border-input bg-background px-2 text-sm"
                                                                        />
                                                                    </td>
                                                                    <td className="py-1">
                                                                        Rp{' '}
                                                                        {(
                                                                            item.quantity *
                                                                            item.unit_price
                                                                        ).toLocaleString()}
                                                                    </td>
                                                                    <td className="py-1">
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                removeItem(
                                                                                    i,
                                                                                )
                                                                            }
                                                                        >
                                                                            X
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            ),
                                                        )}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>

                                        <div className="space-y-1 border-t pt-4 text-right">
                                            <p className="text-sm">
                                                Subtotal: Rp{' '}
                                                {subtotal.toLocaleString()}
                                            </p>
                                            <p className="text-sm">
                                                PPN 11%: Rp{' '}
                                                {tax.toLocaleString()}
                                            </p>
                                            <p className="text-lg font-bold">
                                                Total: Rp{' '}
                                                {grandTotal.toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="notes">Notes</Label>
                                            <textarea
                                                id="notes"
                                                name="notes"
                                                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={
                                                processing || items.length === 0
                                            }
                                        >
                                            {processing
                                                ? 'Creating...'
                                                : 'Create Sales Order'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        }}
                    </Form>
                </div>
            </AppLayout>
        </>
    );
}

CreateSalesOrder.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        {
            title: 'Sales Orders',
            href: `/${props.currentTeam?.slug ?? ''}/sales/orders`,
        },
        { title: 'Create', href: '#' },
    ] as BreadcrumbItem[],
});
