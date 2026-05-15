import { Link, usePage } from '@inertiajs/react';
import {
    Building2,
    Package,
    Users,
    Percent,
    ShoppingCart,
    FileText,
    CreditCard,
    Truck,
    BadgeDollarSign,
    Flame,
    ClipboardCheck,
    History,
    Award,
    Warehouse,
    ListChecks,
    LayoutGrid,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const page = usePage();
    const teamSlug = page.props.currentTeam?.slug ?? '';
    const dashboardUrl = teamSlug ? `/${teamSlug}/dashboard` : '/';

    const mainNavItems: NavItem[] = [
        { title: 'Dashboard', href: dashboardUrl, icon: LayoutGrid },
        {
            title: 'Master Data',
            icon: Building2,
            isActive: false,
            href: '#',
            children: [
                {
                    title: 'Customers',
                    href: `/${teamSlug}/master/customers`,
                    icon: Building2,
                },
                {
                    title: 'Products',
                    href: `/${teamSlug}/master/products`,
                    icon: Package,
                },
                {
                    title: 'Sales People',
                    href: `/${teamSlug}/master/sales-people`,
                    icon: Users,
                },
                {
                    title: 'Commission Plans',
                    href: `/${teamSlug}/master/commission-plans`,
                    icon: Percent,
                },
            ],
        },
        {
            title: 'Sales',
            icon: ShoppingCart,
            isActive: false,
            href: '#',
            children: [
                {
                    title: 'Sales Orders',
                    href: `/${teamSlug}/sales/orders`,
                    icon: ShoppingCart,
                },
                {
                    title: 'Invoices',
                    href: `/${teamSlug}/sales/invoices`,
                    icon: FileText,
                },
                {
                    title: 'Payments',
                    href: `/${teamSlug}/sales/payments`,
                    icon: CreditCard,
                },
                {
                    title: 'Surat Jalan',
                    href: `/${teamSlug}/sales/surat-jalans`,
                    icon: Truck,
                },
                {
                    title: 'Commissions',
                    href: `/${teamSlug}/sales/commissions`,
                    icon: BadgeDollarSign,
                },
            ],
        },
        {
            title: 'APAR Management',
            icon: Flame,
            isActive: false,
            href: '#',
            children: [
                {
                    title: 'APAR Units',
                    href: `/${teamSlug}/apar/units`,
                    icon: Flame,
                },
                {
                    title: 'Inspections',
                    href: `/${teamSlug}/apar/inspections`,
                    icon: ClipboardCheck,
                },
                {
                    title: 'Service History',
                    href: `/${teamSlug}/apar/service-histories`,
                    icon: History,
                },
                {
                    title: 'Certificates',
                    href: `/${teamSlug}/apar/certificates`,
                    icon: Award,
                },
            ],
        },
        {
            title: 'Inventory',
            icon: Warehouse,
            isActive: false,
            href: '#',
            children: [
                {
                    title: 'Stock',
                    href: `/${teamSlug}/inventory/stock`,
                    icon: Package,
                },
                {
                    title: 'Adjustments',
                    href: `/${teamSlug}/inventory/adjustments`,
                    icon: ListChecks,
                },
            ],
        },
    ];

    const footerNavItems: NavItem[] = [];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <TeamSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
