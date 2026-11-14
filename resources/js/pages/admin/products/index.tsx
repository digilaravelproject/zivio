import { Head, Link, router } from '@inertiajs/react';
import {
    Plus,
    Edit2,
    Trash2,
    Lightbulb,
    Search,
    ExternalLink,
    Image as ImageIcon,
    Layers,
    Grid,
    List,
    CheckCircle2,
    Sliders,
    X,
    Sparkles,
    Eye,
    Globe2,
    Filter,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Category {
    id: number;
    name: string;
    slug: string;
    environment?: {
        id: number;
        name: string;
    };
}

interface Product {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    is_active: boolean;
    is_featured: boolean;
    category?: Category;
    variants_count: number;
    created_at: string;
}

interface Environment {
    id: number;
    name: string;
    categories: { id: number; name: string }[];
}

interface Props {
    products: {
        data: Product[];
        links: { url: string | null; label: string; active: boolean }[];
        total: number;
        from?: number;
        to?: number;
    };
    environments: Environment[];
    stats?: {
        total_products: number;
        active_products: number;
        total_variants: number;
        featured_products: number;
    };
    filters: {
        environment_id?: string;
        category_id?: string;
        search?: string;
    };
}

export default function ProductsIndex({
    products = { data: [], links: [], total: 0 },
    environments = [],
    stats,
    filters = {},
}: Props) {
    const safeFilters = filters || {};
    const safeProducts = products?.data || [];
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [searchTerm, setSearchTerm] = useState(safeFilters.search || '');

    const handleFilterChange = (key: string, val: string) => {
        router.get(
            '/admin/products',
            {
                ...safeFilters,
                [key]: val,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleSearchSubmit = (e?: React.FormEvent) => {
        if (e) {
e.preventDefault();
}

        handleFilterChange('search', searchTerm);
    };

    const clearSearch = () => {
        setSearchTerm('');
        handleFilterChange('search', '');
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        router.get('/admin/products');
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"? All associated technical variants will also be permanently removed.`)) {
            router.delete(`/admin/products/${id}`);
        }
    };

    const allCategories = (environments || [])
        .flatMap((e) => e.categories || [])
        .filter(Boolean);

    const hasActiveFilters = Boolean(safeFilters.environment_id || safeFilters.category_id || safeFilters.search);

    const totalCount = stats?.total_products ?? products.total ?? safeProducts.length;
    const activeCount = stats?.active_products ?? safeProducts.filter((p) => p.is_active).length;
    const variantsCount = stats?.total_variants ?? safeProducts.reduce((acc, p) => acc + (p.variants_count || 0), 0);
    const featuredCount = stats?.featured_products ?? safeProducts.filter((p) => p.is_featured).length;

    return (
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 antialiased">
            <Head title="Products & Luminaire Catalog - ZIVIO Admin" />

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-5">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-[#8E755F]/10 text-[#8E755F] flex items-center justify-center shadow-2xs">
                            <Lightbulb className="size-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2.5">
                                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#171512]">
                                    Products & Luminaire Catalog
                                </h1>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#8E755F]/10 text-[#8E755F] border border-[#8E755F]/20">
                                    {totalCount} Systems
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#716C64] mt-0.5">
                                Architectural luminaire families, technical photometry, and configurable variant matrices.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2.5">
                    <Button
                        size="sm"
                        asChild
                        className="h-9 gap-1.5 text-xs bg-[#171512] hover:bg-[#8E755F] text-white font-semibold transition-all shadow-sm px-4"
                    >
                        <Link href="/admin/products/create">
                            <Plus className="size-4" />
                            <span>Add New Luminaire</span>
                        </Link>
                    </Button>
                </div>
            </div>

            {/* KPI Metric Tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                <div className="bg-white border border-black/[0.07] rounded-lg p-4 sm:p-5 shadow-2xs hover:border-[#8E755F]/40 transition-colors">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#716C64]">Total Luminaires</span>
                        <div className="size-7 rounded bg-[#8E755F]/10 flex items-center justify-center text-[#8E755F]">
                            <Lightbulb className="size-3.5" />
                        </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-[#171512] mt-2 tracking-tight">{totalCount}</div>
                    <div className="text-[11px] text-[#716C64] mt-1 flex items-center gap-1">
                        <span>Architectural lighting lines</span>
                    </div>
                </div>

                <div className="bg-white border border-black/[0.07] rounded-lg p-4 sm:p-5 shadow-2xs hover:border-[#8E755F]/40 transition-colors">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#716C64]">Active in Showroom</span>
                        <span className="flex size-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-700 mt-2 tracking-tight">{activeCount}</div>
                    <div className="text-[11px] text-[#716C64] mt-1">
                        Live for architect quotation
                    </div>
                </div>

                <div className="bg-white border border-black/[0.07] rounded-lg p-4 sm:p-5 shadow-2xs hover:border-[#8E755F]/40 transition-colors">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#716C64]">Configured Variants</span>
                        <div className="size-7 rounded bg-[#8E755F]/10 flex items-center justify-center text-[#8E755F]">
                            <Layers className="size-3.5" />
                        </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-[#171512] mt-2 tracking-tight">{variantsCount}</div>
                    <div className="text-[11px] text-[#716C64] mt-1">
                        Optics, Drivers & CCT SKUs
                    </div>
                </div>

                <div className="bg-white border border-black/[0.07] rounded-lg p-4 sm:p-5 shadow-2xs hover:border-[#8E755F]/40 transition-colors">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#716C64]">Featured Highlights</span>
                        <div className="size-7 rounded bg-amber-50 flex items-center justify-center text-amber-600">
                            <Sparkles className="size-3.5" />
                        </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-[#171512] mt-2 tracking-tight">{featuredCount}</div>
                    <div className="text-[11px] text-[#716C64] mt-1">
                        Curated hero luminaires
                    </div>
                </div>
            </div>

            {/* Smart Search & Filter Toolbar */}
            <div className="bg-white border border-black/[0.07] rounded-lg p-3 sm:p-4 shadow-2xs">
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                    {/* Filter Dropdowns */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                        {/* Environment Selector */}
                        <div className="relative">
                            <select
                                value={safeFilters.environment_id || ''}
                                onChange={(e) => handleFilterChange('environment_id', e.target.value)}
                                className="appearance-none rounded-md border border-black/15 bg-white pl-3.5 pr-8 py-2 text-xs font-medium text-[#171512] shadow-2xs hover:border-[#8E755F] focus:border-[#8E755F] focus:outline-none cursor-pointer"
                            >
                                <option value="">All Environments ({environments.length})</option>
                                {(environments || []).map((env) => (
                                    <option key={env.id} value={env.id}>
                                        {env.name}
                                    </option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-2.5 top-2.5 text-black/40 text-[10px]">▼</span>
                        </div>

                        {/* Category Selector */}
                        <div className="relative">
                            <select
                                value={safeFilters.category_id || ''}
                                onChange={(e) => handleFilterChange('category_id', e.target.value)}
                                className="appearance-none rounded-md border border-black/15 bg-white pl-3.5 pr-8 py-2 text-xs font-medium text-[#171512] shadow-2xs hover:border-[#8E755F] focus:border-[#8E755F] focus:outline-none cursor-pointer"
                            >
                                <option value="">All Categories ({allCategories.length})</option>
                                {allCategories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-2.5 top-2.5 text-black/40 text-[10px]">▼</span>
                        </div>

                        {/* Reset Pill */}
                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={clearAllFilters}
                                className="inline-flex items-center gap-1 text-xs text-[#8E755F] hover:text-[#171512] font-semibold px-2.5 py-1.5 rounded-md hover:bg-black/5 transition cursor-pointer"
                            >
                                <X className="size-3.5" />
                                <span>Clear Filters</span>
                            </button>
                        )}
                    </div>

                    {/* Search & View Switcher */}
                    <div className="flex items-center gap-2.5">
                        <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-72">
                            <Search className="size-4 text-black/40 absolute left-3 top-2.5" />
                            <Input
                                placeholder="Search by name, slug..."
                                className="pl-9 pr-8 text-xs h-9 bg-[#FAF9F5]/50 border-black/15 focus:border-[#8E755F] focus:bg-white transition"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute right-2.5 top-2.5 text-black/40 hover:text-black cursor-pointer"
                                    title="Clear search"
                                >
                                    <X className="size-3.5" />
                                </button>
                            )}
                        </form>

                        <div className="flex items-center rounded-md border border-black/15 bg-[#FAF9F5] p-0.5">
                            <button
                                type="button"
                                onClick={() => setViewMode('table')}
                                className={`p-1.5 rounded text-xs transition cursor-pointer ${
                                    viewMode === 'table'
                                        ? 'bg-white text-[#171512] shadow-2xs font-semibold'
                                        : 'text-[#716C64] hover:text-[#171512]'
                                }`}
                                title="Table View"
                            >
                                <List className="size-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded text-xs transition cursor-pointer ${
                                    viewMode === 'grid'
                                        ? 'bg-white text-[#171512] shadow-2xs font-semibold'
                                        : 'text-[#716C64] hover:text-[#171512]'
                                }`}
                                title="Visual Cards View"
                            >
                                <Grid className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table View */}
            {viewMode === 'table' && (
                <div className="bg-white border border-black/[0.07] rounded-lg overflow-hidden shadow-2xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead className="bg-[#FAF9F5] text-[11px] font-bold uppercase tracking-wider text-[#716C64] border-b border-black/[0.06]">
                                <tr>
                                    <th className="px-6 py-4">Luminaire System</th>
                                    <th className="px-6 py-4">Environment / Profile</th>
                                    <th className="px-6 py-4">Variants & Photometry</th>
                                    <th className="px-6 py-4">Catalog Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/[0.04]">
                                {safeProducts.map((p) => (
                                    <tr key={p.id} className="hover:bg-[#FAF9F5]/70 transition-colors group">
                                        {/* Product Details */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative size-14 shrink-0 rounded-lg border border-black/10 bg-[#FAF9F5] overflow-hidden p-1.5 shadow-2xs group-hover:border-[#8E755F]/60 transition">
                                                    {p.image ? (
                                                        <img
                                                            src={p.image}
                                                            alt={p.name}
                                                            className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="size-full flex items-center justify-center text-black/25">
                                                            <ImageIcon className="size-6 stroke-1" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={`/admin/products/${p.id}/edit`}
                                                            className="font-bold text-sm text-[#171512] hover:text-[#8E755F] transition"
                                                        >
                                                            {p.name}
                                                        </Link>
                                                        {p.is_featured && (
                                                            <span className="inline-flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                                                <Sparkles className="size-2.5 text-amber-500" /> Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-[11px] text-[#716C64] block mt-0.5">
                                                        /{p.slug}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Environment & Category */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-semibold text-xs text-[#171512]">
                                                    {p.category?.name || 'Unassigned Category'}
                                                </span>
                                                <span className="text-[11px] font-medium text-[#8E755F]">
                                                    {p.category?.environment?.name || 'General'}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Variants count */}
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#FAF9F5] text-[#171512] border border-black/10">
                                                <Layers className="size-3 text-[#8E755F]" />
                                                <span>{p.variants_count} {p.variants_count === 1 ? 'Variant' : 'Variants'}</span>
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                                                    p.is_active
                                                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/70'
                                                        : 'bg-stone-100 text-stone-600 border border-stone-200'
                                                }`}
                                            >
                                                <span
                                                    className={`size-1.5 rounded-full ${
                                                        p.is_active ? 'bg-emerald-600' : 'bg-stone-400'
                                                    }`}
                                                />
                                                {p.is_active ? 'Active' : 'Draft'}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    asChild
                                                    className="size-8 p-0 border-black/10 bg-white hover:border-[#8E755F] hover:text-[#8E755F]"
                                                    title="View in Live Showroom"
                                                >
                                                    <a href={`/product/${p.slug}`} target="_blank" rel="noreferrer">
                                                        <Eye className="size-3.5" />
                                                    </a>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    asChild
                                                    className="size-8 p-0 border-black/10 bg-white hover:border-[#171512] hover:text-[#171512]"
                                                    title="Edit Luminaire"
                                                >
                                                    <Link href={`/admin/products/${p.id}/edit`}>
                                                        <Edit2 className="size-3.5" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDelete(p.id, p.name)}
                                                    className="size-8 p-0 border-black/10 bg-white hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                                                    title="Delete Luminaire"
                                                >
                                                    <Trash2 className="size-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {safeProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                                                <div className="size-12 rounded-full bg-[#FAF9F5] flex items-center justify-center text-[#8E755F] mb-3">
                                                    <Lightbulb className="size-6" />
                                                </div>
                                                <h3 className="font-bold text-sm text-[#171512]">No Luminaires Found</h3>
                                                <p className="text-xs text-[#716C64] mt-1 mb-4 leading-relaxed">
                                                    {hasActiveFilters
                                                        ? 'No products match your active search or filter criteria.'
                                                        : 'Start curating your lighting catalogue by adding your first architectural luminaire.'}
                                                </p>
                                                {hasActiveFilters ? (
                                                    <Button size="sm" variant="outline" onClick={clearAllFilters} className="text-xs">
                                                        Clear Filters
                                                    </Button>
                                                ) : (
                                                    <Button size="sm" asChild className="text-xs bg-[#171512] text-white">
                                                        <Link href="/admin/products/create">
                                                            <Plus className="size-3.5 mr-1" /> Add First Luminaire
                                                        </Link>
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Visual Grid Cards View */}
            {viewMode === 'grid' && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                        {safeProducts.map((p) => (
                            <div
                                key={p.id}
                                className="group bg-white border border-black/[0.08] rounded-lg overflow-hidden shadow-2xs hover:shadow-md hover:border-[#8E755F]/50 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="relative aspect-4/3 w-full bg-[#FAF9F5] p-5 flex items-center justify-center overflow-hidden border-b border-black/[0.05]">
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="size-full flex items-center justify-center text-black/20">
                                            <ImageIcon className="size-10 stroke-1" />
                                        </div>
                                    )}

                                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                        <span
                                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs ${
                                                p.is_active
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'bg-stone-500 text-white'
                                            }`}
                                        >
                                            {p.is_active ? 'ACTIVE' : 'DRAFT'}
                                        </span>
                                        {p.is_featured && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-2xs flex items-center gap-1">
                                                <Sparkles className="size-2.5" /> HOT
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between text-[11px] text-[#8E755F] font-semibold mb-1">
                                            <span>{p.category?.environment?.name || 'GENERAL'}</span>
                                            <span>{p.category?.name || 'LUMINAIRE'}</span>
                                        </div>
                                        <h3 className="font-bold text-sm text-[#171512] group-hover:text-[#8E755F] transition line-clamp-1">
                                            {p.name}
                                        </h3>
                                        <p className="text-[11px] text-[#716C64] mt-0.5 truncate">
                                            /{p.slug}
                                        </p>
                                    </div>

                                    <div className="pt-3.5 mt-3.5 border-t border-black/[0.06] flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#171512] bg-[#FAF9F5] px-2.5 py-1 rounded-md border border-black/10">
                                            <Layers className="size-3 text-[#8E755F]" />
                                            {p.variants_count} {p.variants_count === 1 ? 'Variant' : 'Variants'}
                                        </span>

                                        <div className="flex items-center gap-1">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                asChild
                                                className="size-7 p-0 border-black/10 bg-white hover:border-[#8E755F] hover:text-[#8E755F]"
                                                title="View"
                                            >
                                                <a href={`/product/${p.slug}`} target="_blank" rel="noreferrer">
                                                    <ExternalLink className="size-3" />
                                                </a>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                asChild
                                                className="size-7 p-0 border-black/10 bg-white hover:border-[#171512] hover:text-[#171512]"
                                                title="Edit"
                                            >
                                                <Link href={`/admin/products/${p.id}/edit`}>
                                                    <Edit2 className="size-3" />
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDelete(p.id, p.name)}
                                                className="size-7 p-0 border-black/10 bg-white hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                                                title="Delete"
                                            >
                                                <Trash2 className="size-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {safeProducts.length === 0 && (
                        <div className="bg-white border border-black/[0.07] rounded-lg p-16 text-center shadow-2xs">
                            <Lightbulb className="size-8 mx-auto text-[#8E755F] mb-2" />
                            <h3 className="font-bold text-sm text-[#171512]">No Luminaires Found</h3>
                            <p className="text-xs text-[#716C64] mt-1 mb-4">
                                No products match your active search or filters.
                            </p>
                            <Button size="sm" variant="outline" onClick={clearAllFilters} className="text-xs">
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Pagination */}
            {products.links && products.links.length > 3 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <span className="text-xs text-[#716C64]">
                        Showing <span className="font-semibold text-[#171512]">{products.from || 1}</span> to{' '}
                        <span className="font-semibold text-[#171512]">{products.to || safeProducts.length}</span> of{' '}
                        <span className="font-semibold text-[#171512]">{products.total}</span> products
                    </span>

                    <div className="flex items-center gap-1">
                        {products.links.map((link, idx) => {
                            if (!link.url) {
                                return (
                                    <span
                                        key={idx}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className="px-2.5 py-1 text-xs text-black/30 select-none"
                                    />
                                );
                            }

                            return (
                                <Link
                                    key={idx}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 text-xs rounded-md transition ${
                                        link.active
                                            ? 'bg-[#171512] text-white font-semibold shadow-2xs'
                                            : 'bg-white border border-black/15 text-[#171512] hover:bg-[#FAF9F5]'
                                    }`}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
