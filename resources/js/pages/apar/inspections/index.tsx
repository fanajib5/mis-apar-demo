import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function InspectionsIndex({ inspections, filters }: { inspections: any[]; filters: any }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Inspections" />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Inspection Schedule</h1>
                    <Link href={`/${teamSlug}/apar/inspections/create`}><Button>Schedule Inspection</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle>Inspections</CardTitle></CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-1">Serial #</th>
                                    <th className="py-2 px-1">Product</th>
                                    <th className="py-2 px-1">Customer</th>
                                    <th className="py-2 px-1">Scheduled</th>
                                    <th className="py-2 px-1">Completed</th>
                                    <th className="py-2 px-1">Status</th>
                                    <th className="py-2 px-1">Result</th>
                                    <th className="py-2 px-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {inspections.map((i) => (
                                    <tr key={i.id} className="border-b hover:bg-muted/50">
                                        <td className="py-2 px-1 font-mono text-xs">{i.serial_number}</td>
                                        <td className="py-2 px-1">{i.product_name}</td>
                                        <td className="py-2 px-1">{i.customer_name ?? '-'}</td>
                                        <td className="py-2 px-1">{i.scheduled_date}</td>
                                        <td className="py-2 px-1">{i.completed_date ?? '-'}</td>
                                        <td className="py-2 px-1">
                                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                i.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                i.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>{i.status}</span>
                                        </td>
                                        <td className="py-2 px-1">{i.result ?? '-'}</td>
                                        <td className="py-2 px-1">
                                            {i.status === 'Scheduled' && (
                                                <Link href={`/${teamSlug}/apar/inspections/${i.id}/complete`}>
                                                    <Button variant="outline" size="sm">Complete</Button>
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {inspections.length === 0 && <tr><td colSpan={8} className="py-8 text-center text-muted-foreground">No inspections scheduled.</td></tr>}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

InspectionsIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'Inspections', href: '#' },
    ] as BreadcrumbItem[],
});