import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BreadcrumbItem } from '@/types';

export default function PaymentsIndex({ payments }: { payments: any[] }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Payments" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Payments</h1>
                    <Link href={`/${teamSlug}/sales/payments/create`}>
                        <Button>Record Payment</Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Payment History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-1 py-2">Payment #</th>
                                    <th className="px-1 py-2">Invoice</th>
                                    <th className="px-1 py-2">Customer</th>
                                    <th className="px-1 py-2">Amount</th>
                                    <th className="px-1 py-2">Method</th>
                                    <th className="px-1 py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p) => (
                                    <tr
                                        key={p.id}
                                        className="border-b hover:bg-muted/50"
                                    >
                                        <td className="px-1 py-2 font-mono text-xs">
                                            {p.payment_number}
                                        </td>
                                        <td className="px-1 py-2">
                                            {p.invoice_number}
                                        </td>
                                        <td className="px-1 py-2">
                                            {p.customer_name}
                                        </td>
                                        <td className="px-1 py-2 font-semibold">
                                            Rp {p.amount.toLocaleString()}
                                        </td>
                                        <td className="px-1 py-2">
                                            {p.method}
                                        </td>
                                        <td className="px-1 py-2">
                                            {p.payment_date}
                                        </td>
                                    </tr>
                                ))}
                                {payments.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            No payments recorded.
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

PaymentsIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        { title: 'Payments', href: '#' },
    ] as BreadcrumbItem[],
});
