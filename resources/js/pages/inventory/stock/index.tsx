import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function StockIndex({ products }: { products: any[] }) {
    return (
        <>
            <Head title="Stock" />
            <AppLayout
                breadcrumbs={
                    StockIndex.layout?.({ currentTeam: undefined })
                        ?.breadcrumbs ?? []
                }
            >
                <div className="space-y-4 p-4">
                    <h1 className="text-2xl font-bold">Stock & Inventory</h1>
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Stock Levels</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-1 py-2">Code</th>
                                        <th className="px-1 py-2">Name</th>
                                        <th className="px-1 py-2">Category</th>
                                        <th className="px-1 py-2">
                                            Current Stock
                                        </th>
                                        <th className="px-1 py-2">
                                            Cost Price
                                        </th>
                                        <th className="px-1 py-2">
                                            Selling Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((p) => (
                                        <tr
                                            key={p.id}
                                            className="border-b hover:bg-muted/50"
                                        >
                                            <td className="px-1 py-2 font-mono text-xs">
                                                {p.code}
                                            </td>
                                            <td className="px-1 py-2">
                                                {p.name}
                                            </td>
                                            <td className="px-1 py-2">
                                                {p.category}
                                            </td>
                                            <td className="px-1 py-2">
                                                <span
                                                    className={`font-semibold ${p.current_stock <= 3 ? 'text-red-600' : ''}`}
                                                >
                                                    {p.current_stock}
                                                </span>
                                            </td>
                                            <td className="px-1 py-2">
                                                Rp{' '}
                                                {Number(
                                                    p.cost_price,
                                                ).toLocaleString()}
                                            </td>
                                            <td className="px-1 py-2">
                                                Rp{' '}
                                                {Number(
                                                    p.selling_price,
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No products found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </>
    );
}

StockIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        { title: 'Stock', href: '#' },
    ] as BreadcrumbItem[],
});
