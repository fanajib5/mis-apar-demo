import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function InvoicesIndex({ invoices, filters }: { invoices: any[]; filters: any }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Invoices" />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Invoices</h1>
                    <Link href={`/${teamSlug}/sales/invoices/create`}><Button>New Invoice</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle>All Invoices</CardTitle></CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-1">Invoice #</th>
                                    <th className="py-2 px-1">Customer</th>
                                    <th className="py-2 px-1">Order</th>
                                    <th className="py-2 px-1">Status</th>
                                    <th className="py-2 px-1">Date</th>
                                    <th className="py-2 px-1">Due</th>
                                    <th className="py-2 px-1">Total</th>
                                    <th className="py-2 px-1">Paid</th>
                                    <th className="py-2 px-1">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((inv) => (
                                    <tr key={inv.id} className="border-b hover:bg-muted/50">
                                        <td className="py-2 px-1 font-mono text-xs">{inv.invoice_number}</td>
                                        <td className="py-2 px-1">{inv.customer_name}</td>
                                        <td className="py-2 px-1">{inv.order_number}</td>
                                        <td className="py-2 px-1">
                                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                inv.status === 'Paid' ? 'bg-green-100 text-green-700' : inv.status === 'Sent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                            }`}>{inv.status}</span>
                                        </td>
                                        <td className="py-2 px-1">{inv.invoice_date}</td>
                                        <td className="py-2 px-1">{inv.due_date}</td>
                                        <td className="py-2 px-1">Rp {inv.grand_total.toLocaleString()}</td>
                                        <td className="py-2 px-1">Rp {inv.paid_amount.toLocaleString()}</td>
                                        <td className="py-2 px-1 font-semibold">{inv.balance > 0 ? `Rp ${inv.balance.toLocaleString()}` : 'Paid'}</td>
                                    </tr>
                                ))}
                                {invoices.length === 0 && <tr><td colSpan={9} className="py-8 text-center text-muted-foreground">No invoices.</td></tr>}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

InvoicesIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'Invoices', href: '#' },
    ] as BreadcrumbItem[],
});