import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function AparUnitsIndex({ units }: { units: any[] }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="APAR Units" />
            <AppLayout
                breadcrumbs={
                    AparUnitsIndex.layout?.({
                        currentTeam: page.props.currentTeam,
                    })?.breadcrumbs ?? []
                }
            >
                <div className="space-y-4 p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">APAR Units</h1>
                        <Link href={`/${teamSlug}/apar/units/create`}>
                            <Button>Register Unit</Button>
                        </Link>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>All APAR Units</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-1 py-2">Serial #</th>
                                        <th className="px-1 py-2">Product</th>
                                        <th className="px-1 py-2">Type</th>
                                        <th className="px-1 py-2">Size</th>
                                        <th className="px-1 py-2">Location</th>
                                        <th className="px-1 py-2">Customer</th>
                                        <th className="px-1 py-2">Status</th>
                                        <th className="px-1 py-2">Expiry</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {units.map((u) => (
                                        <tr
                                            key={u.id}
                                            className="border-b hover:bg-muted/50"
                                        >
                                            <td className="px-1 py-2 font-mono text-xs">
                                                {u.serial_number}
                                            </td>
                                            <td className="px-1 py-2">
                                                {u.product_name}
                                            </td>
                                            <td className="px-1 py-2">
                                                {u.apar_type ?? '-'}
                                            </td>
                                            <td className="px-1 py-2">
                                                {u.apar_size ?? '-'}
                                            </td>
                                            <td className="px-1 py-2">
                                                {u.location ?? '-'}
                                            </td>
                                            <td className="px-1 py-2">
                                                {u.customer_name ?? '-'}
                                            </td>
                                            <td className="px-1 py-2">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        u.status === 'Aktif'
                                                            ? 'bg-green-100 text-green-700'
                                                            : u.status ===
                                                                'Perlu Isi Ulang'
                                                              ? 'bg-yellow-100 text-yellow-700'
                                                              : u.status ===
                                                                  'Rusak'
                                                                ? 'bg-red-100 text-red-700'
                                                                : 'bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {u.status}
                                                </span>
                                            </td>
                                            <td className="px-1 py-2">
                                                {u.expiry_date ?? '-'}
                                            </td>
                                        </tr>
                                    ))}
                                    {units.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No APAR units registered.
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

AparUnitsIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        { title: 'APAR Units', href: '#' },
    ] as BreadcrumbItem[],
});
