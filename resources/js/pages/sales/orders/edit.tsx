import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function EditSalesOrder({ order, customers, products, salesPeople }: { order: any; customers: any[]; products: any[]; salesPeople: any[] }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title={`Order ${order.order_number}`} />
            <div className="p-4 space-y-4">
                <h1 className="text-2xl font-bold">Order: {order.order_number}</h1>

                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardHeader><CardTitle>Customer</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold">{order.customer?.name}</p>
                            <p className="text-sm text-muted-foreground">{order.customer?.code}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Sales Person</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold">{order.sales_person?.name ?? '-'}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Status</CardTitle></CardHeader>
                        <CardContent>
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                order.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                order.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                                order.status === 'Delivered' ? 'bg-purple-100 text-purple-700' :
                                'bg-yellow-100 text-yellow-700'
                            }`}>
                                {order.status}
                            </span>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader><CardTitle>Items</CardTitle></CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2">Product</th>
                                    <th className="py-2">Qty</th>
                                    <th className="py-2">Price</th>
                                    <th className="py-2">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items?.map((item: any) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-2">{item.product?.name ?? 'Product #' + item.product_id}</td>
                                        <td className="py-2">{item.quantity}</td>
                                        <td className="py-2">Rp {Number(item.unit_price).toLocaleString()}</td>
                                        <td className="py-2">Rp {Number(item.subtotal).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3} className="py-2 text-right font-semibold">Subtotal</td>
                                    <td className="py-2">Rp {Number(order.subtotal).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="py-1 text-right text-sm">Discount</td>
                                    <td className="py-1">Rp {Number(order.discount).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="py-1 text-right text-sm">PPN 11%</td>
                                    <td className="py-1">Rp {Number(order.tax).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="py-1 text-right text-sm">Shipping</td>
                                    <td className="py-1">Rp {Number(order.shipping_cost).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="py-2 text-right font-bold">Grand Total</td>
                                    <td className="py-2 font-bold">Rp {Number(order.grand_total).toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </CardContent>
                </Card>

                {order.notes && (
                    <Card>
                        <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
                        <CardContent><p className="text-sm">{order.notes}</p></CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

EditSalesOrder.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'Sales Orders', href: `/${props.currentTeam?.slug ?? ''}/sales/orders` },
        { title: 'Detail', href: '#' },
    ] as BreadcrumbItem[],
});