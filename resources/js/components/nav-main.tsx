import { Link, usePage } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();
    const page = usePage<any>();
    const unreadInquiries = page.props.inquiryNotifications?.unread_count || 0;

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground/80">Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isInquiries = item.href === '/admin/inquiries';

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(item.href)}
                                tooltip={{ children: item.title }}
                                className="transition-colors hover:bg-black/[0.04] text-xs font-medium"
                            >
                                <Link href={item.href} prefetch className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        {item.icon && <item.icon className="size-4 text-[#8E755F]" />}
                                        <span>{item.title}</span>
                                    </div>

                                    {isInquiries && unreadInquiries > 0 && (
                                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-100 border border-amber-300 px-1.5 text-[10px] font-bold text-amber-900 shadow-2xs">
                                            {unreadInquiries}
                                        </span>
                                    )}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
