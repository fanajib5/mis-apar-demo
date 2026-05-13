import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function SuratJalansIndex({ suratJalans }: { suratJalans: any[] }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Surat Jalan" />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Surat Jalan</h1>
                    <Link href={`/${teamSlug}/sales/surat-jalans/create`}><Button>New Surat Jalan</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle>Delivery Documents</CardTitle></CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-1">SJ #</th>
                                    <th className="py-2 px-1">Customer</th>
                                    <th className="py-2 px-1">Order</th>
                                    <th className="py-2 px-1">Status</th>
                                    <th className="py-2 px-1">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suratJalans.map((sj) => (
                                    <tr key={sj.id} className="border-b hover:bg-muted/50">
                                        <td className="py-2 px-1 font-mono text-xs">{sj.sj_number}</td>
                                        <td className="py-2 px-1">{sj.customer_name}</td>
                                        <td className="py-2 px-1">{sj.order_number}</td>
                                        <td className="py-2 px-1">
                                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                sj.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>{sj.status}</span>
                                        </td>
                                        <td className="py-2 px-1">{sj.delivery_date}</td>
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

SuratJalansIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: `/${props.currentTeam?.slug ?? ''}/dashboard` },
        { title: 'Surat Jalan', href: '#' },
    ] as BreadcrumbItem[],
});