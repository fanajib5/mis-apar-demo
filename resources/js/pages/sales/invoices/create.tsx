import { Head, usePage } from '@inertiajs/react';
import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { BreadcrumbItem } from '@/types';

export default function CreateInvoice({ orders }: { orders: any[] }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Create Invoice" />
            <div className="space-y-4 p-4">
                <h1 className="text-2xl font-bold">New Invoice</h1>
                <Form
                    action={`/${teamSlug}/sales/invoices`}
                    method="post"
                    resetOnSuccess
                >
                    {({ errors, processing }) => (
                        <Card>
                            <CardHeader>
                                <CardTitle>Select Sales Order</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="sales_order_id">
                                        Sales Order
                                    </Label>
                                    <select
                                        id="sales_order_id"
                                        name="sales_order_id"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        required
                                    >
                                        <option value="">
                                            Select order...
                                        </option>
                                        {orders.map((o) => (
                                            <option key={o.id} value={o.id}>
                                                {o.order_number} -{' '}
                                                {o.customer_name} (Rp{' '}
                                                {Number(
                                                    o.grand_total,
                                                ).toLocaleString()}
                                                )
                                            </option>
                                        ))}
                                    </select>
                                    {errors.sales_order_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.sales_order_id}
                                        </p>
                                    )}
                                </div>
                                <Button type="submit" disabled={processing}>
                                    Generate Invoice
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </Form>
            </div>
        </>
    );
}

CreateInvoice.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        {
            title: 'Invoices',
            href: `/${props.currentTeam?.slug ?? ''}/sales/invoices`,
        },
        { title: 'Create', href: '#' },
    ] as BreadcrumbItem[],
});
