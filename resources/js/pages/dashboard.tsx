import { Head, Link, router } from '@inertiajs/react';
import {
    Lightbulb,
    Globe2,
    Layers,
    Sliders,
    Mail,
    ArrowUpRight,
    Plus,
    Clock,
    CheckCircle2,
    Building2,
    ExternalLink,
    Filter,
    BarChart3,
    TrendingUp,
    Phone,
    Send,
    FileText,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

interface Stats {
    environments_count: number;
    categories_count: number;
    products_count: number;
    variants_count: number;
    inquiries_count: number;
    new_inquiries_count: number;
    in_progress_count?: number;
    contacted_count?: number;
    closed_count?: number;
}

interface CatalogEnvironment {
    name: string;
    slug: string;
    categories_count: number;
    products_count: number;
}

interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    project_type: string | null;
    message: string;
    status: string;
    created_at: string;
    product?: {
        name: string;
        slug: string;
    };
    variant?: {
        sku: string;
        title: string | null;
    };
}

interface Props {
    stats?: Stats;
    catalogBreakdown?: CatalogEnvironment[];
    recentInquiries?: Inquiry[];
}

export default function Dashboard({
    stats,
    catalogBreakdown = [],
    recentInquiries = [],
}: Props) {
    const defaultStats: Stats = {
        environments_count: 0,
        categories_count: 0,
        products_count: 0,
        variants_count: 0,
        inquiries_count: 0,
        new_inquiries_count: 0,
        in_progress_count: 0,
        contacted_count: 0,
        closed_count: 0,
        ...stats,
    };

    const [updatingId, setUpdatingId] = useState<number | null>(null);

    const handleQuickStatusChange = (id: number, newStatus: string) => {
        setUpdatingId(id);
        router.patch(
            `/admin/inquiries/${id}`,
            { status: newStatus },
            {
                preserveScroll: true,
                onFinish: () => setUpdatingId(null),
            }
        );
    };

    // Calculate lead pipeline percentage
    const totalLeads = defaultStats.inquiries_count || 1;
    const closedCount = defaultStats.closed_count || 0;
    const contactedCount = defaultStats.contacted_count || 0;
    const inProgressCount = defaultStats.in_progress_count || 0;
    const newCount = defaultStats.new_inquiries_count || 0;

    const totalProducts = defaultStats.products_count || 1;

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-[1440px] mx-auto antialiased">
            <Head title="Admin Dashboard | ZIVIO Control Center" />

            {/* Header with Quick Actions & Live Breadcrumbs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-5">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase font-bold tracking-[0.18em] text-[#8E755F]">
                            ZIVIO LIFE
                        </span>
                        <span className="text-black/20 text-xs">•</span>
                        <span className="text-xs text-[#716C64]">Admin Intelligence & Control Center</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171512] mt-1">
                        Architectural Operations & Leads Overview
                    </h1>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="gap-1.5 text-xs border-black/[0.1] bg-white hover:bg-[#FAF9F5] text-[#171512] font-semibold"
                    >
                        <a href="/products" target="_blank" rel="noreferrer">
                            View Showroom <ExternalLink className="size-3 text-[#8E755F]" />
                        </a>
                    </Button>
                    <Button
                        size="sm"
                        asChild
                        className="gap-1.5 text-xs bg-[#171512] text-white hover:bg-[#2b2722] font-semibold"
                    >
                        <Link href="/admin/products/create">
                            <Plus className="size-3.5" /> Add New Luminaire
                        </Link>
                    </Button>
                </div>
            </div>

            {/* 4 Stat KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1. Leads & Inquiries */}
                <Link
                    href="/admin/inquiries"
                    className="bg-white border border-black/[0.06] rounded-sm p-5 shadow-2xs hover:border-[#8E755F] hover:shadow-xs transition flex flex-col justify-between group"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#716C64]">
                            Specification Inquiries
                        </span>
                        <div className="size-8 rounded bg-amber-500/10 text-amber-700 flex items-center justify-center relative">
                            <Mail className="size-4" />
                            {newCount > 0 && (
                                <span className="absolute -top-1 -right-1 size-2.5 bg-amber-500 rounded-full animate-ping" />
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-extrabold text-[#171512] tracking-tight flex items-center gap-2">
                            {defaultStats.inquiries_count}
                            {newCount > 0 && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                    {newCount} New
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-[#716C64] mt-1">
                            B2B quotation & engineering leads
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-black/[0.04] flex items-center justify-between text-[11px] font-semibold text-[#8E755F] group-hover:underline">
                        <span>Review leads inbox</span>
                        <ArrowUpRight className="size-3" />
                    </div>
                </Link>

                {/* 2. Products & Variants */}
                <Link
                    href="/admin/products"
                    className="bg-white border border-black/[0.06] rounded-sm p-5 shadow-2xs hover:border-[#8E755F] hover:shadow-xs transition flex flex-col justify-between group"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#716C64]">
                            Luminaires & Variants
                        </span>
                        <div className="size-8 rounded bg-[#8E755F]/10 text-[#8E755F] flex items-center justify-center">
                            <Lightbulb className="size-4" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-extrabold text-[#171512] tracking-tight">
                            {defaultStats.products_count}
                        </div>
                        <p className="text-xs text-[#716C64] mt-1">
                            Matrix of <span className="text-[#171512] font-semibold">{defaultStats.variants_count}</span> technical variants
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-black/[0.04] flex items-center justify-between text-[11px] font-semibold text-[#8E755F] group-hover:underline">
                        <span>Manage luminaire catalog</span>
                        <ArrowUpRight className="size-3" />
                    </div>
                </Link>

                {/* 3. Taxonomy Hierarchy */}
                <Link
                    href="/admin/categories"
                    className="bg-white border border-black/[0.06] rounded-sm p-5 shadow-2xs hover:border-[#8E755F] hover:shadow-xs transition flex flex-col justify-between group"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#716C64]">
                            Taxonomy Structure
                        </span>
                        <div className="size-8 rounded bg-blue-500/10 text-blue-700 flex items-center justify-center">
                            <Layers className="size-4" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-extrabold text-[#171512] tracking-tight">
                            {defaultStats.categories_count}
                        </div>
                        <p className="text-xs text-[#716C64] mt-1">
                            Categories across <span className="text-[#171512] font-semibold">{defaultStats.environments_count}</span> environments
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-black/[0.04] flex items-center justify-between text-[11px] font-semibold text-blue-700 group-hover:underline">
                        <span>Explore categories</span>
                        <ArrowUpRight className="size-3" />
                    </div>
                </Link>

                {/* 4. Technical Attributes */}
                <Link
                    href="/admin/attributes"
                    className="bg-white border border-black/[0.06] rounded-sm p-5 shadow-2xs hover:border-[#8E755F] hover:shadow-xs transition flex flex-col justify-between group"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#716C64]">
                            Photometric Attributes
                        </span>
                        <div className="size-8 rounded bg-purple-500/10 text-purple-700 flex items-center justify-center">
                            <Sliders className="size-4" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-extrabold text-[#171512] tracking-tight">
                            Filterable
                        </div>
                        <p className="text-xs text-[#716C64] mt-1">
                            Power, Optics, Driver, IP, IK, CCT
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-black/[0.04] flex items-center justify-between text-[11px] font-semibold text-purple-700 group-hover:underline">
                        <span>Configure matrix</span>
                        <ArrowUpRight className="size-3" />
                    </div>
                </Link>
            </div>

            {/* Analytics Section: Lead Pipeline + Catalog Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Lead Pipeline & Status Funnel (6 Cols) */}
                <div className="lg:col-span-6 bg-white border border-black/[0.06] rounded-sm p-5 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="size-4 text-[#8E755F]" />
                            <h2 className="text-sm font-bold uppercase tracking-wider text-[#171512]">
                                Lead Pipeline & Conversion Funnel
                            </h2>
                        </div>
                        <Link
                            href="/admin/inquiries"
                            className="text-xs font-semibold text-[#8E755F] hover:underline"
                        >
                            View Inbox &rarr;
                        </Link>
                    </div>

                    {/* Progress Track */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-[#716C64]">
                            <span>Lead Processing Stage</span>
                            <span>{defaultStats.inquiries_count} Total Submissions</span>
                        </div>
                        <div className="h-3 w-full bg-[#FAF9F5] rounded-full overflow-hidden flex border border-black/[0.06]">
                            <div
                                style={{ width: `${(newCount / totalLeads) * 100}%` }}
                                className="bg-amber-400 h-full"
                                title={`New: ${newCount}`}
                            />
                            <div
                                style={{ width: `${(inProgressCount / totalLeads) * 100}%` }}
                                className="bg-blue-400 h-full"
                                title={`In Review: ${inProgressCount}`}
                            />
                            <div
                                style={{ width: `${(contactedCount / totalLeads) * 100}%` }}
                                className="bg-purple-400 h-full"
                                title={`Contacted: ${contactedCount}`}
                            />
                            <div
                                style={{ width: `${(closedCount / totalLeads) * 100}%` }}
                                className="bg-emerald-500 h-full"
                                title={`Closed: ${closedCount}`}
                            />
                        </div>
                    </div>

                    {/* Funnel 4 Pillars */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        <div className="bg-[#FAF9F5] border border-black/[0.05] p-3 rounded text-center">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block">
                                New Leads
                            </span>
                            <span className="text-xl font-bold text-[#171512] mt-0.5 block">
                                {newCount}
                            </span>
                        </div>
                        <div className="bg-[#FAF9F5] border border-black/[0.05] p-3 rounded text-center">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 block">
                                In Review
                            </span>
                            <span className="text-xl font-bold text-[#171512] mt-0.5 block">
                                {inProgressCount}
                            </span>
                        </div>
                        <div className="bg-[#FAF9F5] border border-black/[0.05] p-3 rounded text-center">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 block">
                                Quoted / Contacted
                            </span>
                            <span className="text-xl font-bold text-[#171512] mt-0.5 block">
                                {contactedCount}
                            </span>
                        </div>
                        <div className="bg-[#FAF9F5] border border-black/[0.05] p-3 rounded text-center">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 block">
                                Closed / Won
                            </span>
                            <span className="text-xl font-bold text-[#171512] mt-0.5 block">
                                {closedCount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Catalog Environment Distribution (6 Cols) */}
                <div className="lg:col-span-6 bg-white border border-black/[0.06] rounded-sm p-5 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="size-4 text-[#8E755F]" />
                            <h2 className="text-sm font-bold uppercase tracking-wider text-[#171512]">
                                Catalog Systems by Environment
                            </h2>
                        </div>
                        <Link
                            href="/admin/products"
                            className="text-xs font-semibold text-[#8E755F] hover:underline"
                        >
                            All Products &rarr;
                        </Link>
                    </div>

                    <div className="space-y-3 pt-1">
                        {catalogBreakdown.length > 0 ? (
                            catalogBreakdown.map((env) => {
                                const percent = Math.round((env.products_count / totalProducts) * 100);

                                return (
                                    <div key={env.slug} className="space-y-1">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-semibold text-[#171512]">
                                                {env.name}
                                            </span>
                                            <span className="text-[#716C64]">
                                                <span className="font-bold text-[#171512]">{env.products_count}</span> systems ({percent}%)
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-[#FAF9F5] rounded-full overflow-hidden border border-black/[0.04]">
                                            <div
                                                style={{ width: `${Math.max(percent, 4)}%` }}
                                                className="bg-[#8E755F] h-full rounded-full transition-all duration-500"
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-xs text-muted-foreground py-4 text-center">
                                No environment data available.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Leads / Inquiries Table with Inline Status Update */}
            <div className="bg-white border border-black/[0.06] rounded-sm overflow-hidden shadow-2xs">
                <div className="p-4 sm:p-5 border-b border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-base font-bold text-[#171512] flex items-center gap-2">
                            <Mail className="size-4 text-[#8E755F]" /> Recent Inquiries & Lead Submissions
                        </h2>
                        <p className="text-xs text-[#716C64] mt-0.5">
                            Real-time customer inquiries from product specification requests and contact forms.
                        </p>
                    </div>
                    <Button variant="outline" size="sm" asChild className="text-xs gap-1 border-black/[0.08] bg-white">
                        <Link href="/admin/inquiries">
                            View Full Inbox <ArrowUpRight className="size-3.5 text-[#8E755F]" />
                        </Link>
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-[#FAF9F5] text-[11px] font-bold uppercase tracking-wider text-[#716C64] border-b border-black/[0.06]">
                            <tr>
                                <th className="px-5 py-3">Client</th>
                                <th className="px-5 py-3">Company / Project</th>
                                <th className="px-5 py-3">Target Luminaire</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Submitted</th>
                                <th className="px-5 py-3 text-right">Quick Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/[0.04] text-xs">
                            {recentInquiries.length > 0 ? (
                                recentInquiries.map((inq) => {
                                    const statusClasses = {
                                        new: 'bg-amber-100 text-amber-900 border-amber-300',
                                        in_progress: 'bg-blue-100 text-blue-900 border-blue-300',
                                        contacted: 'bg-purple-100 text-purple-900 border-purple-300',
                                        closed: 'bg-emerald-100 text-emerald-900 border-emerald-300',
                                    }[inq.status] || 'bg-gray-100 text-gray-800 border-gray-300';

                                    return (
                                        <tr key={inq.id} className="hover:bg-[#FAF9F5]/70 transition">
                                            <td className="px-5 py-3.5">
                                                <div>
                                                    <span className="font-bold text-[#171512] block">
                                                        {inq.name}
                                                    </span>
                                                    <span className="text-[#716C64] text-[11px]">
                                                        {inq.email}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <div>
                                                    <span className="font-semibold text-[#171512] block flex items-center gap-1">
                                                        {inq.company ? (
                                                            <>
                                                                <Building2 className="size-3 text-[#8E755F]" />
                                                                {inq.company}
                                                            </>
                                                        ) : (
                                                            '—'
                                                        )}
                                                    </span>
                                                    <span className="text-[10px] text-[#716C64]">
                                                        {inq.project_type || 'General Architectural'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                {inq.product ? (
                                                    <div>
                                                        <a
                                                            href={`/products/${inq.product.slug}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="font-semibold text-[#171512] hover:text-[#8E755F] hover:underline flex items-center gap-1"
                                                        >
                                                            {inq.product.name}
                                                            <ExternalLink className="size-2.5 text-[#8E755F]" />
                                                        </a>
                                                        {inq.variant && (
                                                            <span className="font-mono text-[10px] text-[#8E755F] block">
                                                                SKU: {inq.variant.sku}
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-black/40 italic">General Inquiry</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                {/* Inline Status Dropdown */}
                                                <select
                                                    value={inq.status}
                                                    disabled={updatingId === inq.id}
                                                    onChange={(e) => handleQuickStatusChange(inq.id, e.target.value)}
                                                    className={`text-[11px] font-semibold px-2.5 py-1 rounded border focus:outline-none cursor-pointer transition ${statusClasses}`}
                                                >
                                                    <option value="new">● New Lead</option>
                                                    <option value="in_progress">● In Review</option>
                                                    <option value="contacted">● Contacted / Quoted</option>
                                                    <option value="closed">● Closed / Won</option>
                                                </select>
                                            </td>
                                            <td className="px-5 py-3.5 text-[#716C64] text-[11px]">
                                                {new Date(inq.created_at).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </td>
                                            <td className="px-5 py-3.5 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                    className="h-7 px-2.5 text-xs text-[#8E755F] hover:bg-black/[0.04]"
                                                >
                                                    <Link href="/admin/inquiries">
                                                        Open &rarr;
                                                    </Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-5 py-8 text-center text-xs text-[#716C64]">
                                        No recent quotation inquiries logged yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Management Shortcuts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-black/[0.06] rounded-sm p-5 space-y-2.5 shadow-2xs">
                    <div className="size-8 rounded bg-[#8E755F]/10 text-[#8E755F] flex items-center justify-center">
                        <Globe2 className="size-4" />
                    </div>
                    <h3 className="font-bold text-sm text-[#171512]">1. Environments & Applications</h3>
                    <p className="text-xs text-[#716C64] leading-relaxed">
                        Organize architectural placements into Outdoor, Indoor, Facade, Solar, and Streetscapes.
                    </p>
                    <Link
                        href="/admin/environments"
                        className="inline-block text-xs font-semibold text-[#8E755F] hover:underline pt-1"
                    >
                        Configure Environments &rarr;
                    </Link>
                </div>

                <div className="bg-white border border-black/[0.06] rounded-sm p-5 space-y-2.5 shadow-2xs">
                    <div className="size-8 rounded bg-[#8E755F]/10 text-[#8E755F] flex items-center justify-center">
                        <Layers className="size-4" />
                    </div>
                    <h3 className="font-bold text-sm text-[#171512]">2. Categories & Profiles</h3>
                    <p className="text-xs text-[#716C64] leading-relaxed">
                        Define product families (Bollards, Surface Ceiling, Pendant, Wall Lights, Floodlights).
                    </p>
                    <Link
                        href="/admin/categories"
                        className="inline-block text-xs font-semibold text-[#8E755F] hover:underline pt-1"
                    >
                        Manage Categories &rarr;
                    </Link>
                </div>

                <div className="bg-white border border-black/[0.06] rounded-sm p-5 space-y-2.5 shadow-2xs">
                    <div className="size-8 rounded bg-[#8E755F]/10 text-[#8E755F] flex items-center justify-center">
                        <Sliders className="size-4" />
                    </div>
                    <h3 className="font-bold text-sm text-[#171512]">3. Technical Filters & Variants</h3>
                    <p className="text-xs text-[#716C64] leading-relaxed">
                        Control Wattages, Optics, Drivers (DALI-2, 1-10V), IP/IK ratings, and Color Temperatures.
                    </p>
                    <Link
                        href="/admin/attributes"
                        className="inline-block text-xs font-semibold text-[#8E755F] hover:underline pt-1"
                    >
                        Setup Attributes &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}
