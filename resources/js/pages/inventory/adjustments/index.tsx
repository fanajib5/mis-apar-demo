import { Head, Form, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function AdjustmentsIndex({
    movements,
    products,
}: {
    movements: any[];
    products: any[];
}) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Stock Adjustments" />
            <AppLayout
                breadcrumbs={
                    AdjustmentsIndex.layout?.({
                        currentTeam: page.props.currentTeam,
                    })?.breadcrumbs ?? []
                }
            >
                <div className="space-y-4 p-4">
                    <h1 className="text-2xl font-bold">Stock Adjustments</h1>

                    <Form
                        action={`/${teamSlug}/inventory/adjustments`}
                        method="post"
                        resetOnSuccess
                    >
                        {({ processing }) => (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Record Adjustment</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="product_id">
                                                Product
                                            </Label>
                                            <select
                                                id="product_id"
                                                name="product_id"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            >
                                                <option value="">
                                                    Select...
                                                </option>
                                                {products.map((p) => (
                                                    <option
                                                        key={p.id}
                                                        value={p.id}
                                                    >
                                                        {p.code} - {p.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Type</Label>
                                            <select
                                                id="type"
                                                name="type"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            >
                                                <option value="In">
                                                    Stock In
                                                </option>
                                                <option value="Out">
                                                    Stock Out
                                                </option>
                                                <option value="Adjustment">
                                                    Adjustment
                                                </option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="quantity">
                                                Quantity
                                            </Label>
                                            <input
                                                id="quantity"
                                                name="quantity"
                                                type="number"
                                                min="1"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notes</Label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <Button type="submit" disabled={processing}>
                                        Record Adjustment
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </Form>

                    <Card>
                        <CardHeader>
                            <CardTitle>Movement History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-1 py-2">Product</th>
                                        <th className="px-1 py-2">Type</th>
                                        <th className="px-1 py-2">Qty</th>
                                        <th className="px-1 py-2">Before</th>
                                        <th className="px-1 py-2">After</th>
                                        <th className="px-1 py-2">Notes</th>
                                        <th className="px-1 py-2">By</th>
                                        <th className="px-1 py-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movements.map((m) => (
                                        <tr
                                            key={m.id}
                                            className="border-b hover:bg-muted/50"
                                        >
                                            <td className="px-1 py-2">
                                                {m.product_name}
                                            </td>
                                            <td className="px-1 py-2">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        m.type === 'In'
                                                            ? 'bg-green-100 text-green-700'
                                                            : m.type === 'Out'
                                                              ? 'bg-red-100 text-red-700'
                                                              : 'bg-blue-100 text-blue-700'
                                                    }`}
                                                >
                                                    {m.type}
                                                </span>
                                            </td>
                                            <td className="px-1 py-2">
                                                {m.quantity}
                                            </td>
                                            <td className="px-1 py-2">
                                                {m.stock_before}
                                            </td>
                                            <td className="px-1 py-2">
                                                {m.stock_after}
                                            </td>
                                            <td className="px-1 py-2 text-xs">
                                                {m.notes ?? '-'}
                                            </td>
                                            <td className="px-1 py-2">
                                                {m.created_by}
                                            </td>
                                            <td className="px-1 py-2 text-xs">
                                                {m.created_at}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </>
    );
}

AdjustmentsIndex.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        { title: 'Stock Adjustments', href: '#' },
    ] as BreadcrumbItem[],
});
