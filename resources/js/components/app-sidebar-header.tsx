import { Link, usePage } from '@inertiajs/react';
import { Bell, ExternalLink, Plus, Mail, Clock, CheckCircle2, Building2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const page = usePage<any>();
    const notifications = page.props.inquiryNotifications || { unread_count: 0, recent: [] };
    const unreadCount = notifications.unread_count || 0;
    const recentInquiries = notifications.recent || [];

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/[0.06] bg-white px-4 lg:px-6 transition-[width,height] ease-linear">
            {/* Left: Sidebar trigger & Breadcrumbs */}
            <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1" />
                <div className="h-4 w-px bg-black/[0.08] hidden sm:block" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Right: Quick Actions & Notification Bell */}
            <div className="flex items-center gap-2.5 sm:gap-3">
                {/* View Showroom Link */}
                <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-8 gap-1.5 text-xs border-black/[0.08] bg-white hover:bg-[#FAF9F5] text-[#171512] font-semibold"
                >
                    <a href="/products" target="_blank" rel="noreferrer">
                        <span>Live Showroom</span>
                        <ExternalLink className="size-3 text-[#8E755F]" />
                    </a>
                </Button>

                {/* Quick Add Product */}
                <Button
                    size="sm"
                    asChild
                    className="h-8 gap-1 text-xs bg-[#171512] text-white hover:bg-[#2b2722] font-semibold"
                >
                    <Link href="/admin/products/create">
                        <Plus className="size-3.5" />
                        <span className="hidden sm:inline">Add Product</span>
                    </Link>
                </Button>

                {/* Notification Bell Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative size-8 rounded-full border border-black/[0.08] hover:bg-[#FAF9F5] cursor-pointer"
                            aria-label="Inquiry Notifications"
                        >
                            <Bell className="size-4 text-[#4E483D]" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#8E755F] text-[9px] font-bold text-white shadow-xs">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-80 sm:w-96 p-2 bg-white border border-black/[0.08] shadow-lg rounded-sm"
                    >
                        <div className="flex items-center justify-between px-2 py-1.5">
                            <DropdownMenuLabel className="p-0 text-xs font-bold uppercase tracking-wider text-[#171512]">
                                Quotation Inquiries
                            </DropdownMenuLabel>
                            {unreadCount > 0 ? (
                                <span className="rounded-full bg-amber-50 border border-amber-200/60 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                                    {unreadCount} New Leads
                                </span>
                            ) : (
                                <span className="text-[10px] text-muted-foreground">All caught up</span>
                            )}
                        </div>
                        <DropdownMenuSeparator className="my-1.5 bg-black/[0.06]" />

                        <div className="max-h-72 overflow-y-auto space-y-1">
                            {recentInquiries.length > 0 ? (
                                recentInquiries.map((inq: any) => (
                                    <DropdownMenuItem
                                        key={inq.id}
                                        asChild
                                        className="cursor-pointer p-2.5 rounded hover:bg-[#FAF9F5] focus:bg-[#FAF9F5]"
                                    >
                                        <Link href="/admin/inquiries" className="flex flex-col gap-1 w-full">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-bold text-[#171512] truncate">
                                                    {inq.name}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                    <Clock className="size-2.5" />
                                                    {new Date(inq.created_at).toLocaleDateString(undefined, {
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-[#716C64]">
                                                {inq.company && (
                                                    <span className="flex items-center gap-1 truncate">
                                                        <Building2 className="size-3 text-[#8E755F]" />
                                                        {inq.company}
                                                    </span>
                                                )}
                                                {inq.project_type && (
                                                    <span className="rounded bg-black/[0.03] px-1.5 py-0.2 text-[10px] text-[#5C564C] truncate">
                                                        {inq.project_type}
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <div className="py-6 text-center text-xs text-muted-foreground">
                                    <Mail className="mx-auto size-6 text-black/20 mb-2" />
                                    No pending unread inquiries.
                                </div>
                            )}
                        </div>

                        <DropdownMenuSeparator className="my-1.5 bg-black/[0.06]" />
                        <DropdownMenuItem asChild className="p-2 text-center text-xs font-semibold text-[#8E755F] hover:bg-[#FAF9F5] justify-center cursor-pointer">
                            <Link href="/admin/inquiries">
                                View All Leads in Inbox &rarr;
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
