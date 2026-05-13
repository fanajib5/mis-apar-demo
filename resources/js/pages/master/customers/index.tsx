import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface Customer {
    id: number;
    code: string;
    name: string;
    category: string;
    tag: string | null;
    phone: string | null;
    email: string | null;
    pic_name: string | null;
    credit_limit: number;
    payment_term: string;
    is_active: boolean;
}

export default function CustomersIndex({ customers, filters }: { customers: Customer[]; filters: Record<string, string> }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';
    const [search, setSearch] = useState(filters.search ?? '');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        router.get(`/${teamSlug}/master/customers`, { search });
    }

    return (
        <>
            <Head title="Customers" />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Customers</h1>
                    <Link href={`/${teamSlug}/master/customers/create`}>
                        <Button>New Customer</Button>
                    </Link>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                        placeholder="Search customers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button type="submit">Search</Button>
                </form>

                <Card>
                    <CardHeader>
                        <CardTitle>All Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-1">Code</th>
                                    <th className="py-2 px-1">Name</th>
                                    <th className="py-2 px-1">Category</th>
                                    <th className="py-2 px-1">Tag</th>
                                    <th className="py-2 px-1">Phone</th>
                                    <th className="py-2 px-1">PIC</th>
                                    <th className="py-2 px-1">Credit Limit</th>
                                    <th className="py-2 px-1">Active</th>
                                    <th className="py-2 px-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((c) => (
                                    <tr key={c.id} className="border-b hover:bg-muted/50">
                                        <td className="py-2 px-1 font-mono text-xs">{c.code}</td>
                                        <td className="py-2 px-1">{c.name}</td>
                                        <td className="py-2 px-1">{c.category}</td>
                                        <td className="py-2 px-1">{c.tag ?? '-'}</td>
                                        <td className="py-2 px-1">{c.phone ?? '-'}</td>
                                        <td className="py-2 px-1">{c.pic_name ?? '-'}</td>
                                        <td className="py-2 px-1">Rp {c.credit_limit.toLocaleString()}</td>
                                        <td className="py-2 px-1">{c.is_active ? 'Yes' : 'No'}</td>
                                        <td className="py-2 px-1">
                                            <Link href={`/${teamSlug}/master/customers/${c.id}/edit`}>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {customers.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className="py-8 text-center text-muted-foreground">
                                            No customers found.
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

CustomersIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'Customers', href: props.currentTeam ? `/${props.currentTeam.slug}/master/customers` : '#' },
    ] as BreadcrumbItem[],
});