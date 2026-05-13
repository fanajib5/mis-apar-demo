import { Head, Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface SalesOrder {
    id: number;
    order_number: string;
    customer_name: string;
    sales_person_name: string | null;
    status: string;
    order_date: string;
    grand_total: number;
}

export default function SalesOrdersIndex({ orders, filters }: { orders: SalesOrder[]; filters: Record<string, string> }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Sales Orders" />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Sales Orders</h1>
                    <Link href={`/${teamSlug}/sales/orders/create`}>
                        <Button>New Sales Order</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader><CardTitle>All Orders</CardTitle></CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-1">Order #</th>
                                    <th className="py-2 px-1">Customer</th>
                                    <th className="py-2 px-1">Sales</th>
                                    <th className="py-2 px-1">Status</th>
                                    <th className="py-2 px-1">Date</th>
                                    <th className="py-2 px-1">Total</th>
                                    <th className="py-2 px-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o.id} className="border-b hover:bg-muted/50">
                                        <td className="py-2 px-1 font-mono text-xs">{o.order_number}</td>
                                        <td className="py-2 px-1">{o.customer_name}</td>
                                        <td className="py-2 px-1">{o.sales_person_name ?? '-'}</td>
                                        <td className="py-2 px-1">
                                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                                o.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                                o.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                                                o.status === 'Delivered' ? 'bg-purple-100 text-purple-700' :
                                                o.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td className="py-2 px-1">{o.order_date}</td>
                                        <td className="py-2 px-1">Rp {o.grand_total.toLocaleString()}</td>
                                        <td className="py-2 px-1">
                                            <Link href={`/${teamSlug}/sales/orders/${o.id}/edit`}>
                                                <Button variant="outline" size="sm">View</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-8 text-center text-muted-foreground">No orders yet.</td>
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

SalesOrdersIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'Sales Orders', href: '#' },
    ] as BreadcrumbItem[],
});