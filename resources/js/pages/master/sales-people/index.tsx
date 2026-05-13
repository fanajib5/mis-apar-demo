import { Head, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';

interface SalesPerson {
    id: number;
    name: string;
    phone: string | null;
    email: string | null;
    is_active: boolean;
}

export default function SalesPeopleIndex({ salesPeople, filters }: { salesPeople: SalesPerson[]; filters: Record<string, string> }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';
    const [search, setSearch] = useState(filters.search ?? '');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        router.get(`/${teamSlug}/master/sales-people`, { search });
    }

    function handleToggle(sp: SalesPerson) {
        router.patch(`/${teamSlug}/master/sales-people/${sp.id}`, {
            name: sp.name,
            phone: sp.phone ?? '',
            email: sp.email ?? '',
            is_active: !sp.is_active,
        });
    }

    return (
        <>
            <Head title="Sales People" />
            <div className="p-4 space-y-4">
                <h1 className="text-2xl font-bold">Sales People</h1>

                <Form action={`/${teamSlug}/master/sales-people`} method="post" resetOnSuccess>
                    {({ errors, processing }) => (
                        <Card>
                            <CardHeader><CardTitle>Add Sales Person</CardTitle></CardHeader>
                            <CardContent className="flex gap-4 items-end">
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="name">Name</Label>
                                    <input id="name" name="name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="phone">Phone</Label>
                                    <input id="phone" name="phone" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                                </div>
                                <Button type="submit" disabled={processing}>Add</Button>
                            </CardContent>
                        </Card>
                    )}
                </Form>

                <Card>
                    <CardHeader><CardTitle>All Sales People</CardTitle></CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-1">Name</th>
                                    <th className="py-2 px-1">Phone</th>
                                    <th className="py-2 px-1">Email</th>
                                    <th className="py-2 px-1">Active</th>
                                    <th className="py-2 px-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesPeople.map((sp) => (
                                    <tr key={sp.id} className="border-b hover:bg-muted/50">
                                        <td className="py-2 px-1">{sp.name}</td>
                                        <td className="py-2 px-1">{sp.phone ?? '-'}</td>
                                        <td className="py-2 px-1">{sp.email ?? '-'}</td>
                                        <td className="py-2 px-1">{sp.is_active ? 'Yes' : 'No'}</td>
                                        <td className="py-2 px-1">
                                            <Button variant="outline" size="sm" onClick={() => handleToggle(sp)}>
                                                {sp.is_active ? 'Deactivate' : 'Activate'}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SalesPeopleIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'Sales People', href: '#' },
    ] as BreadcrumbItem[],
});