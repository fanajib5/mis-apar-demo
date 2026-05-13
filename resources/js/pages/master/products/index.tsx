import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { router } from '@inertiajs/react';

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

export default function ProductsIndex({ products, filters }: { products: Product[]; filters: Record<string, string> }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';
    const [search, setSearch] = useState(filters.search ?? '');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        router.get(`/${teamSlug}/master/products`, { search });
    }

    return (
        <>
            <Head title="Products" />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Link href={`/${teamSlug}/master/products/create`}>
                        <Button>New Product</Button>
                    </Link>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                    <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
                    <Button type="submit">Search</Button>
                </form>

                <Card>
                    <CardHeader>
                        <CardTitle>All Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-1">Code</th>
                                    <th className="py-2 px-1">Name</th>
                                    <th className="py-2 px-1">Category</th>
                                    <th className="py-2 px-1">Type</th>
                                    <th className="py-2 px-1">Size</th>
                                    <th className="py-2 px-1">Cost</th>
                                    <th className="py-2 px-1">Selling</th>
                                    <th className="py-2 px-1">Margin</th>
                                    <th className="py-2 px-1">Active</th>
                                    <th className="py-2 px-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id} className="border-b hover:bg-muted/50">
                                        <td className="py-2 px-1 font-mono text-xs">{p.code}</td>
                                        <td className="py-2 px-1">{p.name}</td>
                                        <td className="py-2 px-1">{p.category}</td>
                                        <td className="py-2 px-1">{p.apar_type ?? '-'}</td>
                                        <td className="py-2 px-1">{p.apar_size ?? '-'}</td>
                                        <td className="py-2 px-1">Rp {p.cost_price.toLocaleString()}</td>
                                        <td className="py-2 px-1">Rp {p.selling_price.toLocaleString()}</td>
                                        <td className="py-2 px-1">{p.margin}%</td>
                                        <td className="py-2 px-1">{p.is_active ? 'Yes' : 'No'}</td>
                                        <td className="py-2 px-1">
                                            <Link href={`/${teamSlug}/master/products/${p.id}/edit`}>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan={10} className="py-8 text-center text-muted-foreground">
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
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'Products', href: '#' },
    ] as BreadcrumbItem[],
});