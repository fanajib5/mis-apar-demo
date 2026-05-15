import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function CertificatesIndex({
    certificates,
}: {
    certificates: any[];
}) {
    return (
        <>
            <Head title="Certificates" />
            <AppLayout
                breadcrumbs={
                    CertificatesIndex.layout?.({ currentTeam: undefined })
                        ?.breadcrumbs ?? []
                }
            >
                <div className="space-y-4 p-4">
                    <h1 className="text-2xl font-bold">
                        Certificate of Feasibility
                    </h1>
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Certificates</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-1 py-2">
                                            Certificate #
                                        </th>
                                        <th className="px-1 py-2">Serial #</th>
                                        <th className="px-1 py-2">Product</th>
                                        <th className="px-1 py-2">Issued</th>
                                        <th className="px-1 py-2">Expiry</th>
                                        <th className="px-1 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {certificates.map((c) => (
                                        <tr
                                            key={c.id}
                                            className="border-b hover:bg-muted/50"
                                        >
                                            <td className="px-1 py-2 font-mono text-xs">
                                                {c.certificate_number}
                                            </td>
                                            <td className="px-1 py-2 font-mono text-xs">
                                                {c.serial_number}
                                            </td>
                                            <td className="px-1 py-2">
                                                {c.product_name}
                                            </td>
                                            <td className="px-1 py-2">
                                                {c.issued_date}
                                            </td>
                                            <td className="px-1 py-2">
                                                {c.expiry_date}
                                            </td>
                                            <td className="px-1 py-2">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        c.status === 'Active'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                                >
                                                    {c.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {certificates.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No certificates issued yet.
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

CertificatesIndex.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        { title: 'Certificates', href: '#' },
    ] as BreadcrumbItem[],
});
