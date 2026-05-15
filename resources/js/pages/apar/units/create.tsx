import { Head, usePage, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function CreateAparUnit({
    products,
    customers,
}: {
    products: any[];
    customers: any[];
}) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Register APAR Unit" />
            <AppLayout
                breadcrumbs={
                    CreateAparUnit.layout?.({
                        currentTeam: page.props.currentTeam,
                    })?.breadcrumbs ?? []
                }
            >
                <div className="space-y-4 p-4">
                    <h1 className="text-2xl font-bold">Register APAR Unit</h1>
                    <Form
                        action={`/${teamSlug}/apar/units`}
                        method="post"
                        resetOnSuccess
                    >
                        {({ errors, processing }) => (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Unit Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="serial_number">
                                                Serial Number
                                            </Label>
                                            <input
                                                id="serial_number"
                                                name="serial_number"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            />
                                            {errors.serial_number && (
                                                <p className="text-sm text-red-500">
                                                    {errors.serial_number}
                                                </p>
                                            )}
                                        </div>
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
                                                        {p.name} ({p.apar_type}{' '}
                                                        {p.apar_size})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="location">
                                                Location
                                            </Label>
                                            <input
                                                id="location"
                                                name="location"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                placeholder="e.g. Lantai 1, R. Gudang"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="customer_id">
                                                Customer / Owner
                                            </Label>
                                            <select
                                                id="customer_id"
                                                name="customer_id"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            >
                                                <option value="">None</option>
                                                {customers.map((c) => (
                                                    <option
                                                        key={c.id}
                                                        value={c.id}
                                                    >
                                                        {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="production_date">
                                                Production Date
                                            </Label>
                                            <input
                                                id="production_date"
                                                name="production_date"
                                                type="date"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry_date">
                                                Expiry Date
                                            </Label>
                                            <input
                                                id="expiry_date"
                                                name="expiry_date"
                                                type="date"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Saving...'
                                            : 'Register Unit'}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </Form>
                </div>
            </AppLayout>
        </>
    );
}

CreateAparUnit.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        {
            title: 'APAR Units',
            href: `/${props.currentTeam?.slug ?? ''}/apar/units`,
        },
        { title: 'Register', href: '#' },
    ] as BreadcrumbItem[],
});
