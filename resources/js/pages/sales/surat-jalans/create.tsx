import { Form, Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function CreateSuratJalan({ orders }: { orders: any[] }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Create Surat Jalan" />
            <AppLayout
                breadcrumbs={
                    CreateSuratJalan.layout?.({
                        currentTeam: page.props.currentTeam,
                    })?.breadcrumbs ?? []
                }
            >
                <div className="space-y-4 p-4">
                    <h1 className="text-2xl font-bold">New Surat Jalan</h1>
                    <Form
                        action={`/${teamSlug}/sales/surat-jalans`}
                        method="post"
                        resetOnSuccess
                    >
                        {({ processing }) => (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Delivery Details</CardTitle>
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
                                                    {o.customer_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="delivery_date">
                                            Delivery Date
                                        </Label>
                                        <input
                                            id="delivery_date"
                                            name="delivery_date"
                                            type="date"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notes</Label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Creating...'
                                            : 'Create Surat Jalan'}
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

CreateSuratJalan.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        {
            title: 'Surat Jalan',
            href: `/${props.currentTeam?.slug ?? ''}/sales/surat-jalans`,
        },
        { title: 'Create', href: '#' },
    ] as BreadcrumbItem[],
});
