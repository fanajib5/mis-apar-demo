import { Head, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function CommissionsIndex({ commissions, periods, filters }: { commissions: any[]; periods: string[]; filters: any }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    function calculate() {
        const period = prompt('Enter period (YYYY-MM):', new Date().toISOString().slice(0, 7));
        if (period) {
            router.post(`/${teamSlug}/sales/commissions/calculate`, { period });
        }
    }

    return (
        <>
            <Head title="Commissions" />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Sales Commissions</h1>
                    <Button onClick={calculate}>Calculate Commissions</Button>
                </div>

                <Card>
                    <CardHeader><CardTitle>Commission Records</CardTitle></CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-1">Sales Person</th>
                                    <th className="py-2 px-1">Order</th>
                                    <th className="py-2 px-1">Plan</th>
                                    <th className="py-2 px-1">Period</th>
                                    <th className="py-2 px-1">Revenue</th>
                                    <th className="py-2 px-1">Rate</th>
                                    <th className="py-2 px-1">Amount</th>
                                    <th className="py-2 px-1">Status</th>
                                    <th className="py-2 px-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {commissions.map((c) => (
                                    <tr key={c.id} className="border-b hover:bg-muted/50">
                                        <td className="py-2 px-1">{c.sales_person_name}</td>
                                        <td className="py-2 px-1 font-mono text-xs">{c.order_number}</td>
                                        <td className="py-2 px-1">{c.plan_name}</td>
                                        <td className="py-2 px-1">{c.period}</td>
                                        <td className="py-2 px-1">Rp {Number(c.revenue).toLocaleString()}</td>
                                        <td className="py-2 px-1">{c.rate}%</td>
                                        <td className="py-2 px-1 font-semibold">Rp {Number(c.amount).toLocaleString()}</td>
                                        <td className="py-2 px-1">
                                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                c.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                                c.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>{c.status}</span>
                                        </td>
                                        <td className="py-2 px-1 space-x-1">
                                            {c.status === 'Calculated' && (
                                                <Button variant="outline" size="sm" onClick={() => router.post(`/${teamSlug}/sales/commissions/${c.id}/approve`)}>Approve</Button>
                                            )}
                                            {c.status === 'Approved' && (
                                                <Button variant="outline" size="sm" onClick={() => router.post(`/${teamSlug}/sales/commissions/${c.id}/pay`)}>Pay</Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {commissions.length === 0 && (
                                    <tr><td colSpan={9} className="py-8 text-center text-muted-foreground">No commissions recorded. Click "Calculate Commissions" to generate.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

CommissionsIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'Commissions', href: '#' },
    ] as BreadcrumbItem[],
});