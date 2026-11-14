import { Link } from '@inertiajs/react';
import {
    BookOpen,
    FolderGit2,
    LayoutGrid,
    Globe2,
    Layers,
    Sliders,
    Lightbulb,
    Mail,
    SlidersHorizontal,
    MessageSquareQuote,
    Building2,
    ExternalLink,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Environments',
        href: '/admin/environments',
        icon: Globe2,
    },
    {
        title: 'Categories',
        href: '/admin/categories',
        icon: Layers,
    },
    {
        title: 'Attributes & Values',
        href: '/admin/attributes',
        icon: Sliders,
    },
    {
        title: 'Products & Variants',
        href: '/admin/products',
        icon: Lightbulb,
    },
    {
        title: 'Hero Slides',
        href: '/admin/hero-slides',
        icon: SlidersHorizontal,
    },
    {
        title: 'Testimonials',
        href: '/admin/testimonials',
        icon: MessageSquareQuote,
    },
    {
        title: 'Projects & Showcase',
        href: '/admin/projects',
        icon: Building2,
    },
    {
        title: 'Catalogues & Downloads',
        href: '/admin/catalogues',
        icon: BookOpen,
    },
    {
        title: 'Inquiries & Leads',
        href: '/admin/inquiries',
        icon: Mail,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'View Showroom',
        href: '/products',
        icon: ExternalLink,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="border-b border-black/[0.06] py-2 px-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent h-auto py-1">
                            <Link href={dashboard()} prefetch className="flex items-center">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
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
