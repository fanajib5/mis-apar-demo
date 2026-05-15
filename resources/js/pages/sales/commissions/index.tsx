import { Head, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BreadcrumbItem } from '@/types';

export default function CommissionsIndex({
    commissions,
}: {
    commissions: any[];
}) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    function calculate() {
        const period = prompt(
            'Enter period (YYYY-MM):',
            new Date().toISOString().slice(0, 7),
        );

        if (period) {
            router.post(`/${teamSlug}/sales/commissions/calculate`, { period });
        }
    }

    return (
        <>
            <Head title="Commissions" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Sales Commissions</h1>
                    <Button onClick={calculate}>Calculate Commissions</Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Commission Records</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-1 py-2">Sales Person</th>
                                    <th className="px-1 py-2">Order</th>
                                    <th className="px-1 py-2">Plan</th>
                                    <th className="px-1 py-2">Period</th>
                                    <th className="px-1 py-2">Revenue</th>
                                    <th className="px-1 py-2">Rate</th>
                                    <th className="px-1 py-2">Amount</th>
                                    <th className="px-1 py-2">Status</th>
                                    <th className="px-1 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {commissions.map((c) => (
                                    <tr
                                        key={c.id}
                                        className="border-b hover:bg-muted/50"
                                    >
                                        <td className="px-1 py-2">
                                            {c.sales_person_name}
                                        </td>
                                        <td className="px-1 py-2 font-mono text-xs">
                                            {c.order_number}
                                        </td>
                                        <td className="px-1 py-2">
                                            {c.plan_name}
                                        </td>
                                        <td className="px-1 py-2">
                                            {c.period}
                                        </td>
                                        <td className="px-1 py-2">
                                            Rp{' '}
                                            {Number(c.revenue).toLocaleString()}
                                        </td>
                                        <td className="px-1 py-2">{c.rate}%</td>
                                        <td className="px-1 py-2 font-semibold">
                                            Rp{' '}
                                            {Number(c.amount).toLocaleString()}
                                        </td>
                                        <td className="px-1 py-2">
                                            <span
                                                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                    c.status === 'Paid'
                                                        ? 'bg-green-100 text-green-700'
                                                        : c.status ===
                                                            'Approved'
                                                          ? 'bg-blue-100 text-blue-700'
                                                          : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                            >
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="space-x-1 px-1 py-2">
                                            {c.status === 'Calculated' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        router.post(
                                                            `/${teamSlug}/sales/commissions/${c.id}/approve`,
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </Button>
                                            )}
                                            {c.status === 'Approved' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        router.post(
                                                            `/${teamSlug}/sales/commissions/${c.id}/pay`,
                                                        )
                                                    }
                                                >
                                                    Pay
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {commissions.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            No commissions recorded. Click
                                            "Calculate Commissions" to generate.
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

CommissionsIndex.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        { title: 'Commissions', href: '#' },
    ] as BreadcrumbItem[],
});
