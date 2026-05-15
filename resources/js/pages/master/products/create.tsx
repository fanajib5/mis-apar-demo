import { Head, Form, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const CATEGORIES = [
    'Isi Ulang',
    'APAR Baru',
    'Tukar Tambah',
    'Reparasi',
    'O2',
    'Evakuasi',
];
const APAR_TYPES = ['Powder', 'CO2', 'Foam', 'Wet Chemical'];

export default function CreateProduct() {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Create Product" />
            <AppLayout
                breadcrumbs={
                    CreateProduct.layout?.({
                        currentTeam: page.props.currentTeam,
                    })?.breadcrumbs ?? []
                }
            >
                <div className="space-y-4 p-4">
                    <h1 className="text-2xl font-bold">New Product</h1>

                    <Form
                        action={`/${teamSlug}/master/products`}
                        method="post"
                        resetOnSuccess
                    >
                        {({ errors, processing }) => (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="code">Code</Label>
                                            <input
                                                id="code"
                                                name="code"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            />
                                            {errors.code && (
                                                <p className="text-sm text-red-500">
                                                    {errors.code}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <input
                                                id="name"
                                                name="name"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-500">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">
                                                Category
                                            </Label>
                                            <select
                                                id="category"
                                                name="category"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            >
                                                <option value="">
                                                    Select...
                                                </option>
                                                {CATEGORIES.map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category && (
                                                <p className="text-sm text-red-500">
                                                    {errors.category}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="apar_type">
                                                APAR Type
                                            </Label>
                                            <select
                                                id="apar_type"
                                                name="apar_type"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            >
                                                <option value="">N/A</option>
                                                {APAR_TYPES.map((t) => (
                                                    <option key={t} value={t}>
                                                        {t}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="apar_size">
                                                Size
                                            </Label>
                                            <input
                                                id="apar_size"
                                                name="apar_size"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                placeholder="e.g. 3kg"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cost_price">
                                                Cost Price (Rp)
                                            </Label>
                                            <input
                                                id="cost_price"
                                                name="cost_price"
                                                type="number"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="selling_price">
                                                Selling Price (Rp)
                                            </Label>
                                            <input
                                                id="selling_price"
                                                name="selling_price"
                                                type="number"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry_months">
                                                Expiry (months)
                                            </Label>
                                            <input
                                                id="expiry_months"
                                                name="expiry_months"
                                                type="number"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                placeholder="e.g. 60"
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Saving...'
                                            : 'Save Product'}
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

CreateProduct.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        {
            title: 'Products',
            href: props.currentTeam
                ? `/${props.currentTeam.slug}/master/products`
                : '#',
        },
        { title: 'Create', href: '#' },
    ] as BreadcrumbItem[],
});
