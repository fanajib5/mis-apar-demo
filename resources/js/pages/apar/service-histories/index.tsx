import { Head, Form, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function ServiceHistoriesIndex({
    histories,
    units,
}: {
    histories: any[];
    units: any[];
}) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Service Histories" />
            <AppLayout
                breadcrumbs={
                    ServiceHistoriesIndex.layout?.({
                        currentTeam: page.props.currentTeam,
                    })?.breadcrumbs ?? []
                }
            >
                <div className="space-y-4 p-4">
                    <h1 className="text-2xl font-bold">Service History</h1>

                    <Form
                        action={`/${teamSlug}/apar/service-histories`}
                        method="post"
                        resetOnSuccess
                    >
                        {({ processing }) => (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Record Service</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label
                                                className="text-sm font-medium"
                                                htmlFor="apar_unit_id"
                                            >
                                                APAR Unit
                                            </label>
                                            <select
                                                id="apar_unit_id"
                                                name="apar_unit_id"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            >
                                                <option value="">
                                                    Select...
                                                </option>
                                                {units.map((u) => (
                                                    <option
                                                        key={u.id}
                                                        value={u.id}
                                                    >
                                                        {u.serial_number} -{' '}
                                                        {u.product_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                className="text-sm font-medium"
                                                htmlFor="action"
                                            >
                                                Action
                                            </label>
                                            <select
                                                id="action"
                                                name="action"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            >
                                                <option value="Isi Ulang">
                                                    Isi Ulang
                                                </option>
                                                <option value="Reparasi">
                                                    Reparasi
                                                </option>
                                                <option value="Inspeksi">
                                                    Inspeksi
                                                </option>
                                                <option value="Ganti Baru">
                                                    Ganti Baru
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label
                                                className="text-sm font-medium"
                                                htmlFor="service_date"
                                            >
                                                Service Date
                                            </label>
                                            <input
                                                id="service_date"
                                                name="service_date"
                                                type="date"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                className="text-sm font-medium"
                                                htmlFor="technician"
                                            >
                                                Technician
                                            </label>
                                            <input
                                                id="technician"
                                                name="technician"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label
                                                className="text-sm font-medium"
                                                htmlFor="cost"
                                            >
                                                Cost (Rp)
                                            </label>
                                            <input
                                                id="cost"
                                                name="cost"
                                                type="number"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                className="text-sm font-medium"
                                                htmlFor="sales_order_id"
                                            >
                                                Related SO (optional)
                                            </label>
                                            <input
                                                id="sales_order_id"
                                                name="sales_order_id"
                                                type="number"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                placeholder="SO ID"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className="text-sm font-medium"
                                            htmlFor="notes"
                                        >
                                            Notes
                                        </label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <Button type="submit" disabled={processing}>
                                        Record Service
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </Form>

                    <Card>
                        <CardHeader>
                            <CardTitle>History Log</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-1 py-2">Serial #</th>
                                        <th className="px-1 py-2">Product</th>
                                        <th className="px-1 py-2">Action</th>
                                        <th className="px-1 py-2">Date</th>
                                        <th className="px-1 py-2">
                                            Technician
                                        </th>
                                        <th className="px-1 py-2">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {histories.map((h) => (
                                        <tr
                                            key={h.id}
                                            className="border-b hover:bg-muted/50"
                                        >
                                            <td className="px-1 py-2 font-mono text-xs">
                                                {h.serial_number}
                                            </td>
                                            <td className="px-1 py-2">
                                                {h.product_name}
                                            </td>
                                            <td className="px-1 py-2">
                                                {h.action}
                                            </td>
                                            <td className="px-1 py-2">
                                                {h.service_date}
                                            </td>
                                            <td className="px-1 py-2">
                                                {h.technician ?? '-'}
                                            </td>
                                            <td className="px-1 py-2">
                                                Rp{' '}
                                                {Number(
                                                    h.cost,
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {histories.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No service records.
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

ServiceHistoriesIndex.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        { title: 'Service History', href: '#' },
    ] as BreadcrumbItem[],
});
