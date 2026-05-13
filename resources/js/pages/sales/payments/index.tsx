import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function PaymentsIndex({ payments }: { payments: any[] }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Payments" />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Payments</h1>
                    <Link href={`/${teamSlug}/sales/payments/create`}><Button>Record Payment</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle>Payment History</CardTitle></CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-1">Payment #</th>
                                    <th className="py-2 px-1">Invoice</th>
                                    <th className="py-2 px-1">Customer</th>
                                    <th className="py-2 px-1">Amount</th>
                                    <th className="py-2 px-1">Method</th>
                                    <th className="py-2 px-1">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p) => (
                                    <tr key={p.id} className="border-b hover:bg-muted/50">
                                        <td className="py-2 px-1 font-mono text-xs">{p.payment_number}</td>
                                        <td className="py-2 px-1">{p.invoice_number}</td>
                                        <td className="py-2 px-1">{p.customer_name}</td>
                                        <td className="py-2 px-1 font-semibold">Rp {p.amount.toLocaleString()}</td>
                                        <td className="py-2 px-1">{p.method}</td>
                                        <td className="py-2 px-1">{p.payment_date}</td>
                                    </tr>
                                ))}
                                {payments.length === 0 && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No payments recorded.</td></tr>}
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
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'Payments', href: '#' },
    ] as BreadcrumbItem[],
});