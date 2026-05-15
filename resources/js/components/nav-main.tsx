import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    if (item.children && item.children.length > 0) {
                        return (
                            <CollapsibleGroup key={item.title} item={item} />
                        );
                    }

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(item.href)}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function CollapsibleGroup({ item }: { item: NavItem }) {
    const { currentUrl } = useCurrentUrl();

    const childHrefs = (item.children ?? []).map((c) => toUrl(c.href));
    const isActive = childHrefs.some((href) => currentUrl.startsWith(href));

    return (
        <Collapsible defaultOpen={isActive} className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={{ children: item.title }}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronDown className="ml-auto rotate-[-90deg] transition-transform group-data-[state=open]/collapsible:rotate-0" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.children?.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={currentUrl.startsWith(
                                        toUrl(child.href),
                                    )}
                                >
                                    <Link href={child.href} prefetch>
                                        {child.icon && <child.icon />}
                                        <span>{child.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}
