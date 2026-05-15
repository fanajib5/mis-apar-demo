import { Head, usePage } from '@inertiajs/react';
import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { BreadcrumbItem } from '@/types';

export default function CreateInspection({ units }: { units: any[] }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Schedule Inspection" />
            <div className="space-y-4 p-4">
                <h1 className="text-2xl font-bold">Schedule Inspection</h1>
                <Form
                    action={`/${teamSlug}/apar/inspections`}
                    method="post"
                    resetOnSuccess
                >
                    {({ processing }) => (
                        <Card>
                            <CardHeader>
                                <CardTitle>Inspection Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="apar_unit_id">
                                        APAR Unit
                                    </Label>
                                    <select
                                        id="apar_unit_id"
                                        name="apar_unit_id"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        required
                                    >
                                        <option value="">Select unit...</option>
                                        {units.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u.serial_number} -{' '}
                                                {u.product_name}{' '}
                                                {u.location
                                                    ? `(${u.location})`
                                                    : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="scheduled_date">
                                        Scheduled Date
                                    </Label>
                                    <input
                                        id="scheduled_date"
                                        name="scheduled_date"
                                        type="date"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    />
                                </div>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Saving...'
                                        : 'Schedule Inspection'}
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </Form>
            </div>
        </>
    );
}

CreateInspection.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        {
            title: 'Inspections',
            href: `/${props.currentTeam?.slug ?? ''}/apar/inspections`,
        },
        { title: 'Schedule', href: '#' },
    ] as BreadcrumbItem[],
});
