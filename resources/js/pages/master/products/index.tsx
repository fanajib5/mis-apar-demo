import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BreadcrumbItem } from '@/types';

interface Product {
    id: number;
    code: string;
    name: string;
    category: string;
    apar_type: string | null;
    apar_size: string | null;
    cost_price: number;
    selling_price: number;
    margin: number;
    is_active: boolean;
}

export default function ProductsIndex({ products }: { products: Product[] }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Products" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Link href={`/${teamSlug}/master/products/create`}>
                        <Button>New Product</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-1 py-2">Code</th>
                                    <th className="px-1 py-2">Name</th>
                                    <th className="px-1 py-2">Category</th>
                                    <th className="px-1 py-2">Type</th>
                                    <th className="px-1 py-2">Size</th>
                                    <th className="px-1 py-2">Cost</th>
                                    <th className="px-1 py-2">Selling</th>
                                    <th className="px-1 py-2">Margin</th>
                                    <th className="px-1 py-2">Active</th>
                                    <th className="px-1 py-2"></th>
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
                                        <td className="px-1 py-2">{p.name}</td>
                                        <td className="px-1 py-2">
                                            {p.category}
                                        </td>
                                        <td className="px-1 py-2">
                                            {p.apar_type ?? '-'}
                                        </td>
                                        <td className="px-1 py-2">
                                            {p.apar_size ?? '-'}
                                        </td>
                                        <td className="px-1 py-2">
                                            Rp {p.cost_price.toLocaleString()}
                                        </td>
                                        <td className="px-1 py-2">
                                            Rp{' '}
                                            {p.selling_price.toLocaleString()}
                                        </td>
                                        <td className="px-1 py-2">
                                            {p.margin}%
                                        </td>
                                        <td className="px-1 py-2">
                                            {p.is_active ? 'Yes' : 'No'}
                                        </td>
                                        <td className="px-1 py-2">
                                            <Link
                                                href={`/${teamSlug}/master/products/${p.id}/edit`}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Edit
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={10}
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
        </>
    );
}

ProductsIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        { title: 'Products', href: '#' },
    ] as BreadcrumbItem[],
});
