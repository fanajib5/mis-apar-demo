import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function AparUnitsIndex({ units, filters }: { units: any[]; filters: any }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="APAR Units" />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">APAR Units</h1>
                    <Link href={`/${teamSlug}/apar/units/create`}><Button>Register Unit</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle>All APAR Units</CardTitle></CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-1">Serial #</th>
                                    <th className="py-2 px-1">Product</th>
                                    <th className="py-2 px-1">Type</th>
                                    <th className="py-2 px-1">Size</th>
                                    <th className="py-2 px-1">Location</th>
                                    <th className="py-2 px-1">Customer</th>
                                    <th className="py-2 px-1">Status</th>
                                    <th className="py-2 px-1">Expiry</th>
                                </tr>
                            </thead>
                            <tbody>
                                {units.map((u) => (
                                    <tr key={u.id} className="border-b hover:bg-muted/50">
                                        <td className="py-2 px-1 font-mono text-xs">{u.serial_number}</td>
                                        <td className="py-2 px-1">{u.product_name}</td>
                                        <td className="py-2 px-1">{u.apar_type ?? '-'}</td>
                                        <td className="py-2 px-1">{u.apar_size ?? '-'}</td>
                                        <td className="py-2 px-1">{u.location ?? '-'}</td>
                                        <td className="py-2 px-1">{u.customer_name ?? '-'}</td>
                                        <td className="py-2 px-1">
                                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                u.status === 'Aktif' ? 'bg-green-100 text-green-700' :
                                                u.status === 'Perlu Isi Ulang' ? 'bg-yellow-100 text-yellow-700' :
                                                u.status === 'Rusak' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>{u.status}</span>
                                        </td>
                                        <td className="py-2 px-1">{u.expiry_date ?? '-'}</td>
                                    </tr>
                                ))}
                                {units.length === 0 && <tr><td colSpan={8} className="py-8 text-center text-muted-foreground">No APAR units registered.</td></tr>}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AparUnitsIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'APAR Units', href: '#' },
    ] as BreadcrumbItem[],
});