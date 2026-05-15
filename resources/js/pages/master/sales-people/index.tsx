import { Head, Form, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface SalesPerson {
    id: number;
    name: string;
    phone: string | null;
    email: string | null;
    is_active: boolean;
}

export default function SalesPeopleIndex({
    salesPeople,
}: {
    salesPeople: SalesPerson[];
}) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

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
            <AppLayout
                breadcrumbs={
                    SalesPeopleIndex.layout?.({
                        currentTeam: page.props.currentTeam,
                    })?.breadcrumbs ?? []
                }
            >
                <div className="space-y-4 p-4">
                    <h1 className="text-2xl font-bold">Sales People</h1>

                    <Form
                        action={`/${teamSlug}/master/sales-people`}
                        method="post"
                        resetOnSuccess
                    >
                        {({ processing }) => (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add Sales Person</CardTitle>
                                </CardHeader>
                                <CardContent className="flex items-end gap-4">
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <input
                                            id="name"
                                            name="name"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <Button type="submit" disabled={processing}>
                                        Add
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </Form>

                    <Card>
                        <CardHeader>
                            <CardTitle>All Sales People</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-1 py-2">Name</th>
                                        <th className="px-1 py-2">Phone</th>
                                        <th className="px-1 py-2">Email</th>
                                        <th className="px-1 py-2">Active</th>
                                        <th className="px-1 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salesPeople.map((sp) => (
                                        <tr
                                            key={sp.id}
                                            className="border-b hover:bg-muted/50"
                                        >
                                            <td className="px-1 py-2">
                                                {sp.name}
                                            </td>
                                            <td className="px-1 py-2">
                                                {sp.phone ?? '-'}
                                            </td>
                                            <td className="px-1 py-2">
                                                {sp.email ?? '-'}
                                            </td>
                                            <td className="px-1 py-2">
                                                {sp.is_active ? 'Yes' : 'No'}
                                            </td>
                                            <td className="px-1 py-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleToggle(sp)
                                                    }
                                                >
                                                    {sp.is_active
                                                        ? 'Deactivate'
                                                        : 'Activate'}
                                                </Button>
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

SalesPeopleIndex.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        { title: 'Sales People', href: '#' },
    ] as BreadcrumbItem[],
});
