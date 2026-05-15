import { Head, Form, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function CreatePayment({ invoices }: { invoices: any[] }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Record Payment" />
            <AppLayout
                breadcrumbs={
                    CreatePayment.layout?.({
                        currentTeam: page.props.currentTeam,
                    })?.breadcrumbs ?? []
                }
            >
                <div className="space-y-4 p-4">
                    <h1 className="text-2xl font-bold">Record Payment</h1>
                    <Form
                        action={`/${teamSlug}/sales/payments`}
                        method="post"
                        resetOnSuccess
                    >
                        {({ errors, processing }) => (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="invoice_id">
                                            Invoice
                                        </Label>
                                        <select
                                            id="invoice_id"
                                            name="invoice_id"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            required
                                        >
                                            <option value="">
                                                Select invoice...
                                            </option>
                                            {invoices.map((inv) => (
                                                <option
                                                    key={inv.id}
                                                    value={inv.id}
                                                >
                                                    {inv.invoice_number} -{' '}
                                                    {inv.customer_name}{' '}
                                                    (Balance: Rp{' '}
                                                    {Number(
                                                        inv.balance,
                                                    ).toLocaleString()}
                                                    )
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="amount">
                                                Amount (Rp)
                                            </Label>
                                            <input
                                                id="amount"
                                                name="amount"
                                                type="number"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            />
                                            {errors.amount && (
                                                <p className="text-sm text-red-500">
                                                    {errors.amount}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="method">
                                                Method
                                            </Label>
                                            <select
                                                id="method"
                                                name="method"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            >
                                                <option value="Cash">
                                                    Cash
                                                </option>
                                                <option value="Transfer BRI">
                                                    Transfer BRI
                                                </option>
                                                <option value="Transfer BCA">
                                                    Transfer BCA
                                                </option>
                                                <option value="Lainnya">
                                                    Lainnya
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="payment_date">
                                                Payment Date
                                            </Label>
                                            <input
                                                id="payment_date"
                                                name="payment_date"
                                                type="date"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="reference">
                                                Reference
                                            </Label>
                                            <input
                                                id="reference"
                                                name="reference"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                placeholder="Transfer ref..."
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Saving...'
                                            : 'Record Payment'}
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

CreatePayment.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        {
            title: 'Payments',
            href: `/${props.currentTeam?.slug ?? ''}/sales/payments`,
        },
        { title: 'Record', href: '#' },
    ] as BreadcrumbItem[],
});
