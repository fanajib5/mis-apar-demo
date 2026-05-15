import { Form, Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { BreadcrumbItem } from '@/types';

interface Tier {
    name: string;
    min_amount: string;
    max_amount: string;
    rate: string;
}

export default function CommissionPlansIndex({ plans }: { plans: any[] }) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';
    const [tiers, setTiers] = useState<Tier[]>([
        { name: '', min_amount: '0', max_amount: '', rate: '' },
    ]);

    function addTier() {
        if (tiers.length < 5) {
            setTiers([
                ...tiers,
                { name: '', min_amount: '0', max_amount: '', rate: '' },
            ]);
        }
    }

    function removeTier(i: number) {
        setTiers(tiers.filter((_, idx) => idx !== i));
    }

    function handleDelete(id: number) {
        if (confirm('Delete this plan?')) {
            router.delete(`/${teamSlug}/master/commission-plans/${id}`);
        }
    }

    return (
        <>
            <Head title="Commission Plans" />
            <div className="space-y-4 p-4">
                <h1 className="text-2xl font-bold">Commission Plans</h1>

                <Form
                    action={`/${teamSlug}/master/commission-plans`}
                    method="post"
                    resetOnSuccess
                >
                    {({ errors, processing }) => (
                        <Card>
                            <CardHeader>
                                <CardTitle>New Commission Plan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Plan Name</Label>
                                        <input
                                            id="name"
                                            name="name"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Type</Label>
                                        <select
                                            id="type"
                                            name="type"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            required
                                        >
                                            <option value="Standard">
                                                Standard
                                            </option>
                                            <option value="Promo">Promo</option>
                                            <option value="Tender">
                                                Tender
                                            </option>
                                        </select>
                                        {errors.type && (
                                            <p className="text-sm text-red-500">
                                                {errors.type}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="basis">Basis</Label>
                                        <select
                                            id="basis"
                                            name="basis"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            required
                                        >
                                            <option value="Revenue">
                                                Revenue
                                            </option>
                                            <option value="Margin">
                                                Margin
                                            </option>
                                            <option value="Count">Count</option>
                                        </select>
                                        {errors.basis && (
                                            <p className="text-sm text-red-500">
                                                {errors.basis}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Tiers</Label>
                                        {tiers.length < 5 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={addTier}
                                            >
                                                Add Tier
                                            </Button>
                                        )}
                                    </div>
                                    {tiers.map((tier, i) => (
                                        <div
                                            key={i}
                                            className="flex items-end gap-2"
                                        >
                                            <div>
                                                <Label className="text-xs">
                                                    Name
                                                </Label>
                                                <input
                                                    name={`tiers[${i}][name]`}
                                                    value={tier.name}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...tiers,
                                                        ];
                                                        updated[i].name =
                                                            e.target.value;
                                                        setTiers(updated);
                                                    }}
                                                    className="flex h-10 w-28 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-xs">
                                                    Min
                                                </Label>
                                                <input
                                                    name={`tiers[${i}][min_amount]`}
                                                    value={tier.min_amount}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...tiers,
                                                        ];
                                                        updated[i].min_amount =
                                                            e.target.value;
                                                        setTiers(updated);
                                                    }}
                                                    type="number"
                                                    className="flex h-10 w-28 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-xs">
                                                    Max
                                                </Label>
                                                <input
                                                    name={`tiers[${i}][max_amount]`}
                                                    value={tier.max_amount}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...tiers,
                                                        ];
                                                        updated[i].max_amount =
                                                            e.target.value;
                                                        setTiers(updated);
                                                    }}
                                                    type="number"
                                                    className="flex h-10 w-28 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-xs">
                                                    Rate %
                                                </Label>
                                                <input
                                                    name={`tiers[${i}][rate]`}
                                                    value={tier.rate}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...tiers,
                                                        ];
                                                        updated[i].rate =
                                                            e.target.value;
                                                        setTiers(updated);
                                                    }}
                                                    type="number"
                                                    className="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                    required
                                                />
                                            </div>
                                            {tiers.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeTier(i)
                                                    }
                                                >
                                                    X
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <Button type="submit" disabled={processing}>
                                    Create Plan
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </Form>

                {plans.map((plan) => (
                    <Card key={plan.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>
                                    {plan.name} ({plan.type})
                                </CardTitle>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(plan.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Basis: {plan.basis}
                            </p>
                            <table className="mt-2 w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-1">Tier</th>
                                        <th className="py-1">Min</th>
                                        <th className="py-1">Max</th>
                                        <th className="py-1">Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {plan.tiers.map((t: any) => (
                                        <tr key={t.id} className="border-b">
                                            <td className="py-1">{t.name}</td>
                                            <td className="py-1">
                                                Rp{' '}
                                                {Number(
                                                    t.min_amount,
                                                ).toLocaleString()}
                                            </td>
                                            <td className="py-1">
                                                {t.max_amount
                                                    ? `Rp ${Number(t.max_amount).toLocaleString()}`
                                                    : 'Unlimited'}
                                            </td>
                                            <td className="py-1">{t.rate}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}

CommissionPlansIndex.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        { title: 'Commission Plans', href: '#' },
    ] as BreadcrumbItem[],
});
