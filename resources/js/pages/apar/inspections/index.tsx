import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function InspectionsIndex({
    inspections,
}: {
    inspections: any[];
}) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Inspections" />
            <AppLayout
                breadcrumbs={
                    InspectionsIndex.layout?.({
                        currentTeam: page.props.currentTeam,
                    })?.breadcrumbs ?? []
                }
            >
                <div className="space-y-4 p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">
                            Inspection Schedule
                        </h1>
                        <Link href={`/${teamSlug}/apar/inspections/create`}>
                            <Button>Schedule Inspection</Button>
                        </Link>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Inspections</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-1 py-2">Serial #</th>
                                        <th className="px-1 py-2">Product</th>
                                        <th className="px-1 py-2">Customer</th>
                                        <th className="px-1 py-2">Scheduled</th>
                                        <th className="px-1 py-2">Completed</th>
                                        <th className="px-1 py-2">Status</th>
                                        <th className="px-1 py-2">Result</th>
                                        <th className="px-1 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inspections.map((i) => (
                                        <tr
                                            key={i.id}
                                            className="border-b hover:bg-muted/50"
                                        >
                                            <td className="px-1 py-2 font-mono text-xs">
                                                {i.serial_number}
                                            </td>
                                            <td className="px-1 py-2">
                                                {i.product_name}
                                            </td>
                                            <td className="px-1 py-2">
                                                {i.customer_name ?? '-'}
                                            </td>
                                            <td className="px-1 py-2">
                                                {i.scheduled_date}
                                            </td>
                                            <td className="px-1 py-2">
                                                {i.completed_date ?? '-'}
                                            </td>
                                            <td className="px-1 py-2">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        i.status === 'Completed'
                                                            ? 'bg-green-100 text-green-700'
                                                            : i.status ===
                                                                'Overdue'
                                                              ? 'bg-red-100 text-red-700'
                                                              : 'bg-blue-100 text-blue-700'
                                                    }`}
                                                >
                                                    {i.status}
                                                </span>
                                            </td>
                                            <td className="px-1 py-2">
                                                {i.result ?? '-'}
                                            </td>
                                            <td className="px-1 py-2">
                                                {i.status === 'Scheduled' && (
                                                    <Link
                                                        href={`/${teamSlug}/apar/inspections/${i.id}/complete`}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Complete
                                                        </Button>
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {inspections.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No inspections scheduled.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </>
    );
}

InspectionsIndex.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        { title: 'Inspections', href: '#' },
    ] as BreadcrumbItem[],
});
