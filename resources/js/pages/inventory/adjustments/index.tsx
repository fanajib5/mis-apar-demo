import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function AdjustmentsIndex({ movements, products }: { movements: any[]; products: any[] }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Stock Adjustments" />
            <div className="p-4 space-y-4">
                <h1 className="text-2xl font-bold">Stock Adjustments</h1>

                <Form action={`/${teamSlug}/inventory/adjustments`} method="post" resetOnSuccess>
                    {({ errors, processing }) => (
                        <Card>
                            <CardHeader><CardTitle>Record Adjustment</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="product_id">Product</Label>
                                        <select id="product_id" name="product_id" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                                            <option value="">Select...</option>
                                            {products.map((p) => (
                                                <option key={p.id} value={p.id}>{p.code} - {p.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Type</Label>
                                        <select id="type" name="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                                            <option value="In">Stock In</option>
                                            <option value="Out">Stock Out</option>
                                            <option value="Adjustment">Adjustment</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quantity">Quantity</Label>
                                        <input id="quantity" name="quantity" type="number" min="1" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <textarea id="notes" name="notes" className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                                </div>
                                <Button type="submit" disabled={processing}>Record Adjustment</Button>
                            </CardContent>
                        </Card>
                    )}
                </Form>

                <Card>
                    <CardHeader><CardTitle>Movement History</CardTitle></CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-1">Product</th>
                                    <th className="py-2 px-1">Type</th>
                                    <th className="py-2 px-1">Qty</th>
                                    <th className="py-2 px-1">Before</th>
                                    <th className="py-2 px-1">After</th>
                                    <th className="py-2 px-1">Notes</th>
                                    <th className="py-2 px-1">By</th>
                                    <th className="py-2 px-1">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movements.map((m) => (
                                    <tr key={m.id} className="border-b hover:bg-muted/50">
                                        <td className="py-2 px-1">{m.product_name}</td>
                                        <td className="py-2 px-1">
                                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                m.type === 'In' ? 'bg-green-100 text-green-700' :
                                                m.type === 'Out' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                            }`}>{m.type}</span>
                                        </td>
                                        <td className="py-2 px-1">{m.quantity}</td>
                                        <td className="py-2 px-1">{m.stock_before}</td>
                                        <td className="py-2 px-1">{m.stock_after}</td>
                                        <td className="py-2 px-1 text-xs">{m.notes ?? '-'}</td>
                                        <td className="py-2 px-1">{m.created_by}</td>
                                        <td className="py-2 px-1 text-xs">{m.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AdjustmentsIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'Stock Adjustments', href: '#' },
    ] as BreadcrumbItem[],
});