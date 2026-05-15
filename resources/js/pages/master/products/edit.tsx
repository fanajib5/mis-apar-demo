import { Head, usePage, router } from '@inertiajs/react';
import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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

interface Product {
    id: number;
    code: string;
    name: string;
    category: string;
    apar_type: string | null;
    apar_size: string | null;
    cost_price: number;
    selling_price: number;
    expiry_months: number | null;
    is_active: boolean;
}

export default function EditProduct({ product }: { product: Product }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    function handleDelete() {
        if (confirm('Delete this product?')) {
            router.delete(`/${teamSlug}/master/products/${product.id}`);
        }
    }

    return (
        <>
            <Head title={`Edit ${product.name}`} />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Edit: {product.name}</h1>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>

                <Form
                    action={`/${teamSlug}/master/products/${product.id}`}
                    method="patch"
                >
                    {({ errors, processing }) => (
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <input
                                    type="hidden"
                                    name="_method"
                                    value="PATCH"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="code">Code</Label>
                                        <input
                                            id="code"
                                            name="code"
                                            defaultValue={product.code}
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
                                            defaultValue={product.name}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            required
                                        />
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
                                            defaultValue={product.category}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            required
                                        >
                                            {CATEGORIES.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="apar_type">
                                            APAR Type
                                        </Label>
                                        <select
                                            id="apar_type"
                                            name="apar_type"
                                            defaultValue={
                                                product.apar_type ?? ''
                                            }
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
                                        <Label htmlFor="apar_size">Size</Label>
                                        <input
                                            id="apar_size"
                                            name="apar_size"
                                            defaultValue={
                                                product.apar_size ?? ''
                                            }
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cost_price">
                                            Cost Price
                                        </Label>
                                        <input
                                            id="cost_price"
                                            name="cost_price"
                                            type="number"
                                            defaultValue={product.cost_price}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="selling_price">
                                            Selling Price
                                        </Label>
                                        <input
                                            id="selling_price"
                                            name="selling_price"
                                            type="number"
                                            defaultValue={product.selling_price}
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
                                            defaultValue={
                                                product.expiry_months ?? ''
                                            }
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        id="is_active"
                                        name="is_active"
                                        type="checkbox"
                                        defaultChecked={product.is_active}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>

                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Saving...'
                                        : 'Update Product'}
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </Form>
            </div>
        </>
    );
}

EditProduct.layout = (props: { currentTeam?: { slug: string } | null }) => ({
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
        { title: 'Edit', href: '#' },
    ] as BreadcrumbItem[],
});
