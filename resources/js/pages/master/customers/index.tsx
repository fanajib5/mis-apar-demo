import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BreadcrumbItem } from '@/types';

interface Customer {
    id: number;
    code: string;
    name: string;
    category: string;
    tag: string | null;
    phone: string | null;
    email: string | null;
    pic_name: string | null;
    credit_limit: number;
    payment_term: string;
    is_active: boolean;
}

export default function CustomersIndex({
    customers,
}: {
    customers: Customer[];
}) {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';

    return (
        <>
            <Head title="Customers" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Customers</h1>
                    <Link href={`/${teamSlug}/master/customers/create`}>
                        <Button>New Customer</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-1 py-2">Code</th>
                                    <th className="px-1 py-2">Name</th>
                                    <th className="px-1 py-2">Category</th>
                                    <th className="px-1 py-2">Tag</th>
                                    <th className="px-1 py-2">Phone</th>
                                    <th className="px-1 py-2">PIC</th>
                                    <th className="px-1 py-2">Credit Limit</th>
                                    <th className="px-1 py-2">Active</th>
                                    <th className="px-1 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((c) => (
                                    <tr
                                        key={c.id}
                                        className="border-b hover:bg-muted/50"
                                    >
                                        <td className="px-1 py-2 font-mono text-xs">
                                            {c.code}
                                        </td>
                                        <td className="px-1 py-2">{c.name}</td>
                                        <td className="px-1 py-2">
                                            {c.category}
                                        </td>
                                        <td className="px-1 py-2">
                                            {c.tag ?? '-'}
                                        </td>
                                        <td className="px-1 py-2">
                                            {c.phone ?? '-'}
                                        </td>
                                        <td className="px-1 py-2">
                                            {c.pic_name ?? '-'}
                                        </td>
                                        <td className="px-1 py-2">
                                            Rp {c.credit_limit.toLocaleString()}
                                        </td>
                                        <td className="px-1 py-2">
                                            {c.is_active ? 'Yes' : 'No'}
                                        </td>
                                        <td className="px-1 py-2">
                                            <Link
                                                href={`/${teamSlug}/master/customers/${c.id}/edit`}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Edit
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {customers.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            No customers found.
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

CustomersIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: `/${props.currentTeam?.slug ?? ''}/dashboard`,
        },
        {
            title: 'Customers',
            href: props.currentTeam
                ? `/${props.currentTeam.slug}/master/customers`
                : '#',
        },
    ] as BreadcrumbItem[],
});
