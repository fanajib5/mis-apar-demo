import { Head, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

import type { BreadcrumbItem } from '@/types';

const CATEGORIES = ['Perorangan', 'Instansi', 'Toko', 'Apotek', 'Puskesmas', 'Perusahaan', 'Hotel/Mall/Gedung'];
const TAGS = ['VIP', 'Reguler', 'Tender'];

interface Customer {
    id: number;
    code: string;
    name: string;
    category: string;
    tag: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    pic_name: string | null;
    pic_phone: string | null;
    pic_position: string | null;
    credit_limit: number;
    payment_term: string;
    is_active: boolean;
}

export default function EditCustomer({ customer }: { customer: Customer }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    function handleDelete() {
        if (confirm('Are you sure you want to delete this customer?')) {
            router.delete(`/${teamSlug}/master/customers/${customer.id}`);
        }
    }

    return (
        <>
            <Head title={`Edit ${customer.name}`} />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Edit Customer: {customer.name}</h1>
                    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                </div>

                <Form action={`/${teamSlug}/master/customers/${customer.id}`} method="patch" resetOnSuccess>
                    {({ errors, processing }) => (
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <input type="hidden" name="_method" value="PATCH" />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="code">Code</Label>
                                        <input id="code" name="code" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={customer.code} required />
                                        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <input id="name" name="name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={customer.name} required />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <select id="category" name="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={customer.category} required>
                                            {CATEGORIES.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tag">Tag</Label>
                                        <select id="tag" name="tag" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={customer.tag ?? ''}>
                                            <option value="">None</option>
                                            {TAGS.map((tag) => (
                                                <option key={tag} value={tag}>{tag}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <input id="phone" name="phone" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={customer.phone ?? ''} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <input id="email" name="email" type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={customer.email ?? ''} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <textarea id="address" name="address" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={customer.address ?? ''} />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="pic_name">PIC Name</Label>
                                        <input id="pic_name" name="pic_name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={customer.pic_name ?? ''} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="pic_phone">PIC Phone</Label>
                                        <input id="pic_phone" name="pic_phone" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={customer.pic_phone ?? ''} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="pic_position">PIC Position</Label>
                                        <input id="pic_position" name="pic_position" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={customer.pic_position ?? ''} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="credit_limit">Credit Limit (Rp)</Label>
                                        <input id="credit_limit" name="credit_limit" type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={customer.credit_limit} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="payment_term">Payment Term (days)</Label>
                                        <input id="payment_term" name="payment_term" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={customer.payment_term} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input id="is_active" name="is_active" type="checkbox" defaultChecked={customer.is_active} className="h-4 w-4 rounded border-gray-300" />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>

                                <div className="flex gap-2">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Saving...' : 'Update Customer'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </Form>
            </div>
        </>
    );
}

EditCustomer.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'Customers', href: props.currentTeam ? `/${props.currentTeam.slug}/master/customers` : '#' },
        { title: 'Edit', href: '#' },
    ] as BreadcrumbItem[],
});