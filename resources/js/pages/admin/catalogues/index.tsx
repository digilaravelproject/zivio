import { Head, router, useForm } from '@inertiajs/react';
import {
    Plus,
    Edit2,
    Trash2,
    BookOpen,
    DownloadCloud,
    CheckCircle2,
    Tag,
    Search,
    FileText,
    ExternalLink,
    UploadCloud,
    Layers,
    FileDown,
    SlidersHorizontal,
    LayoutGrid,
    Table as TableIcon,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface Catalogue {
    id: number;
    title: string;
    category: string;
    file_path: string;
    file_size: string;
    pages: string | null;
    format: string;
    downloads_count: number;
    sort_order: number;
    is_active: boolean;
    description: string | null;
    cover_image: string | null;
    file_url: string;
    cover_image_url: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    catalogues: Catalogue[];
    categories: string[];
    stats: {
        total: number;
        active: number;
        total_downloads: number;
        categories_count: number;
    };
    filters: {
        category: string;
        search: string;
    };
}

const CATEGORY_PRESETS = [
    'Full Range',
    'Outdoor',
    'Indoor',
    'Technical',
    'Company Profile',
];

export default function CataloguesIndex({ catalogues, categories, stats, filters }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingCatalogue, setEditingCatalogue] = useState<Catalogue | null>(null);
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || 'all');
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    const form = useForm({
        title: '',
        category: 'Full Range',
        file_path: '',
        catalogue_file: null as File | null,
        file_size: '16.0 MB',
        pages: '',
        format: 'PDF',
        downloads_count: 0,
        sort_order: (catalogues.length || 0) + 1,
        is_active: true,
        description: '',
        cover_image: '',
        cover_image_file: null as File | null,
    });

    const openCreate = () => {
        setEditingCatalogue(null);
        form.reset();
        form.setData({
            title: '',
            category: 'Full Range',
            file_path: '/zivio-product-catalogue.pdf',
            catalogue_file: null,
            file_size: '16.0 MB',
            pages: '120 pages',
            format: 'PDF',
            downloads_count: 0,
            sort_order: (catalogues.length || 0) + 1,
            is_active: true,
            description: '',
            cover_image: '',
            cover_image_file: null,
        });
        setCoverPreview(null);
        setIsCreateOpen(true);
    };

    const openEdit = (cat: Catalogue) => {
        setEditingCatalogue(cat);
        setCoverPreview(cat.cover_image_url || null);
        form.setData({
            title: cat.title,
            category: cat.category,
            file_path: cat.file_path,
            catalogue_file: null,
            file_size: cat.file_size,
            pages: cat.pages || '',
            format: cat.format || 'PDF',
            downloads_count: cat.downloads_count,
            sort_order: cat.sort_order,
            is_active: cat.is_active,
            description: cat.description || '',
            cover_image: cat.cover_image || '',
            cover_image_file: null,
        });
        setIsCreateOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCatalogue) {
            form.transform((data) => ({
                ...data,
                _method: 'put',
            })).post(`/admin/catalogues/${editingCatalogue.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    setIsCreateOpen(false);
                    setEditingCatalogue(null);
                    setCoverPreview(null);
                },
            });
        } else {
            form.post('/admin/catalogues', {
                forceFormData: true,
                onSuccess: () => {
                    setIsCreateOpen(false);
                    form.reset();
                    setCoverPreview(null);
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this catalogue? This cannot be undone.')) {
            router.delete(`/admin/catalogues/${id}`);
        }
    };

    // Filter catalogues client-side for ultra-fast response
    const filteredCatalogues = useMemo(() => {
        return catalogues.filter((item) => {
            const matchesSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory =
                selectedCategory === 'all' ||
                item.category.toLowerCase() === selectedCategory.toLowerCase();

            return matchesSearch && matchesCategory;
        });
    }, [catalogues, searchQuery, selectedCategory]);

    const allCategoriesList = useMemo(() => {
        const set = new Set<string>();
        CATEGORY_PRESETS.forEach((c) => set.add(c));
        categories?.forEach((c) => set.add(c));
        catalogues?.forEach((c) => set.add(c.category));

        return Array.from(set);
    }, [categories, catalogues]);

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <Head title="Catalogues & Downloads Management" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <BookOpen className="size-6 text-primary" /> Catalogues & PDF Downloads
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage B2B architectural luminaires catalogues, technical Dialux guides, brochures, and track download counts.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={openCreate} className="gap-2 shadow-sm">
                        <Plus className="size-4" /> Add Catalogue
                    </Button>
                </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Docs</span>
                        <BookOpen className="size-4 text-primary" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-foreground">{stats?.total ?? catalogues.length}</span>
                        <span className="text-xs text-muted-foreground">files</span>
                    </div>
                </div>

                <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active</span>
                        <CheckCircle2 className="size-4 text-emerald-500" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-emerald-500">{stats?.active ?? catalogues.filter(c => c.is_active).length}</span>
                        <span className="text-xs text-muted-foreground">live</span>
                    </div>
                </div>

                <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Downloads</span>
                        <DownloadCloud className="size-4 text-amber-500" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-foreground">
                            {(stats?.total_downloads ?? catalogues.reduce((acc, c) => acc + (c.downloads_count || 0), 0)).toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">retrievals</span>
                    </div>
                </div>

                <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Categories</span>
                        <Tag className="size-4 text-blue-500" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-foreground">{allCategoriesList.length}</span>
                        <span className="text-xs text-muted-foreground">groups</span>
                    </div>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card border border-border/50 rounded-xl p-3">
                <div className="flex flex-1 items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="Search catalogue by title or tag..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-9 text-sm bg-background"
                        />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                        <button
                            type="button"
                            onClick={() => setSelectedCategory('all')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                                selectedCategory === 'all'
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                            }`}
                        >
                            All ({catalogues.length})
                        </button>
                        {allCategoriesList.map((cat) => {
                            const count = catalogues.filter((c) => c.category === cat).length;

                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                                        selectedCategory.toLowerCase() === cat.toLowerCase()
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                                    }`}
                                >
                                    {cat} {count > 0 && `(${count})`}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center gap-1 border-t sm:border-t-0 sm:border-l border-border/40 pt-2 sm:pt-0 sm:pl-3">
                    <Button
                        size="sm"
                        variant={viewMode === 'table' ? 'default' : 'ghost'}
                        className="size-8 p-0"
                        onClick={() => setViewMode('table')}
                        title="Table View"
                    >
                        <TableIcon className="size-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        className="size-8 p-0"
                        onClick={() => setViewMode('grid')}
                        title="Card Grid View"
                    >
                        <LayoutGrid className="size-4" />
                    </Button>
                </div>
            </div>

            {/* Catalogues Listing */}
            {filteredCatalogues.length === 0 ? (
                <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center space-y-3">
                    <FileDown className="size-10 text-muted-foreground/40 mx-auto" />
                    <h3 className="font-semibold text-lg text-foreground">No Catalogues Found</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        No download documents match your search or filter. Try clearing filters or create a new catalogue document.
                    </p>
                    <Button onClick={openCreate} variant="outline" className="gap-2 mt-2">
                        <Plus className="size-4" /> Add Catalogue Document
                    </Button>
                </div>
            ) : viewMode === 'table' ? (
                <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-border/60 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    <th className="py-3 px-4 w-12 text-center">#</th>
                                    <th className="py-3 px-4">Document / Title</th>
                                    <th className="py-3 px-4">Category</th>
                                    <th className="py-3 px-4">Specs & Size</th>
                                    <th className="py-3 px-4 text-center">Downloads</th>
                                    <th className="py-3 px-4 text-center">Status</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40">
                                {filteredCatalogues.map((item) => (
                                    <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="py-3 px-4 text-center text-xs text-muted-foreground font-mono">
                                            {item.sort_order}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                {item.cover_image_url ? (
                                                    <img
                                                        src={item.cover_image_url}
                                                        alt={item.title}
                                                        className="w-10 h-12 object-cover rounded border border-border/60 shadow-xs"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-12 rounded bg-red-500/10 border border-red-500/20 flex flex-col items-center justify-center text-red-500 font-bold text-[9px] uppercase tracking-wider">
                                                        <FileText className="size-4 mb-0.5" />
                                                        {item.format}
                                                    </div>
                                                )}
                                                <div className="space-y-0.5">
                                                    <div className="font-medium text-foreground flex items-center gap-2">
                                                        <span>{item.title}</span>
                                                    </div>
                                                    {item.description && (
                                                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                    <span className="text-[11px] text-muted-foreground/70 font-mono block">
                                                        {item.file_path}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border/40">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                                                    <span className="px-1.5 py-0.2 rounded bg-muted text-[10px] font-bold font-mono">
                                                        {item.format}
                                                    </span>
                                                    <span>{item.file_size}</span>
                                                </div>
                                                {item.pages && (
                                                    <div className="text-[11px] text-muted-foreground">
                                                        {item.pages}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                                <DownloadCloud className="size-3" />
                                                {(item.downloads_count || 0).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span
                                                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                                    item.is_active
                                                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                        : 'bg-muted text-muted-foreground'
                                                }`}
                                            >
                                                {item.is_active ? 'Active' : 'Disabled'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <a
                                                    href={item.file_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    download
                                                    className="size-8 inline-flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                                    title="Direct Download / Preview"
                                                >
                                                    <ExternalLink className="size-4" />
                                                </a>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => openEdit(item)}
                                                    className="size-8 p-0"
                                                    title="Edit Catalogue"
                                                >
                                                    <Edit2 className="size-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(item.id)}
                                                    className="size-8 p-0 text-destructive hover:text-destructive"
                                                    title="Delete Catalogue"
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredCatalogues.map((item) => (
                        <div
                            key={item.id}
                            className="bg-card border border-border/70 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
                        >
                            <div className="p-5 space-y-4">
                                <div className="flex items-start justify-between gap-3">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border/40">
                                        {item.category}
                                    </span>
                                    <span
                                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                            item.is_active
                                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                : 'bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        {item.is_active ? 'Active' : 'Disabled'}
                                    </span>
                                </div>

                                <div className="flex gap-4">
                                    {item.cover_image_url ? (
                                        <img
                                            src={item.cover_image_url}
                                            alt={item.title}
                                            className="w-16 h-20 object-cover rounded border border-border/60 shadow-xs flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-16 h-20 rounded bg-red-500/10 border border-red-500/20 flex flex-col items-center justify-center text-red-500 font-bold text-xs uppercase tracking-wider flex-shrink-0">
                                            <FileText className="size-6 mb-1" />
                                            {item.format}
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-base text-foreground line-clamp-2 leading-snug">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-lg">
                                    <div>
                                        <span className="block text-[10px] uppercase font-mono text-muted-foreground/70">Format & Size</span>
                                        <span className="font-medium text-foreground">{item.format} · {item.file_size}</span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] uppercase font-mono text-muted-foreground/70">Pages</span>
                                        <span className="font-medium text-foreground">{item.pages || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-t border-border/40 bg-muted/15 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                                    <DownloadCloud className="size-3.5" />
                                    {(item.downloads_count || 0).toLocaleString()} DLs
                                </span>

                                <div className="flex items-center gap-1.5">
                                    <a
                                        href={item.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="size-8 inline-flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                        title="Download"
                                    >
                                        <ExternalLink className="size-4" />
                                    </a>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => openEdit(item)}
                                        className="size-8 p-0"
                                    >
                                        <Edit2 className="size-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDelete(item.id)}
                                        className="size-8 p-0 text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Dialog for Add / Edit */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
                    <div className="bg-card border border-border rounded-xl p-6 max-w-xl w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 my-8">
                        <div className="flex justify-between items-center border-b border-border/40 pb-3">
                            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                <BookOpen className="size-5 text-primary" />
                                {editingCatalogue ? 'Edit Catalogue Document' : 'Add New Catalogue Document'}
                            </h2>
                            <button
                                onClick={() => setIsCreateOpen(false)}
                                className="text-muted-foreground hover:text-foreground text-sm font-bold p-1"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Catalogue Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g. Master Architectural Luminaire Catalogue 2026"
                                    value={form.data.title}
                                    onChange={(e) => form.setData('title', e.target.value)}
                                    required
                                    className="mt-1"
                                />
                                {form.errors.title && <p className="text-xs text-destructive mt-1">{form.errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    placeholder="e.g. Full Range, Outdoor, Indoor, Technical"
                                    value={form.data.category}
                                    onChange={(e) => form.setData('category', e.target.value)}
                                    required
                                />
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    <span className="text-[10px] text-muted-foreground uppercase font-mono self-center mr-1">Presets:</span>
                                    {CATEGORY_PRESETS.map((preset) => (
                                        <button
                                            key={preset}
                                            type="button"
                                            onClick={() => form.setData('category', preset)}
                                            className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                                                form.data.category === preset
                                                    ? 'bg-primary text-primary-foreground border-primary font-medium'
                                                    : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted'
                                            }`}
                                        >
                                            {preset}
                                        </button>
                                    ))}
                                </div>
                                {form.errors.category && <p className="text-xs text-destructive mt-1">{form.errors.category}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="catalogue_file">Upload PDF / Document</Label>
                                    <div className="mt-1">
                                        <Input
                                            id="catalogue_file"
                                            type="file"
                                            accept=".pdf,.zip,.doc,.docx"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    const file = e.target.files[0];
                                                    form.setData('catalogue_file', file);
                                                    const mb = (file.size / (1024 * 1024)).toFixed(1);
                                                    form.setData('file_size', `${mb} MB`);
                                                    const ext = file.name.split('.').pop()?.toUpperCase() || 'PDF';
                                                    form.setData('format', ext);
                                                }
                                            }}
                                        />
                                        <span className="text-[11px] text-muted-foreground mt-1 block">
                                            Supported: PDF, ZIP up to 100MB
                                        </span>
                                    </div>
                                    {form.errors.catalogue_file && <p className="text-xs text-destructive mt-1">{form.errors.catalogue_file}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="file_path">Or Existing File Path / URL</Label>
                                    <Input
                                        id="file_path"
                                        placeholder="e.g. /zivio-product-catalogue.pdf"
                                        value={form.data.file_path}
                                        onChange={(e) => form.setData('file_path', e.target.value)}
                                        className="mt-1"
                                    />
                                    {form.errors.file_path && <p className="text-xs text-destructive mt-1">{form.errors.file_path}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <Label htmlFor="file_size">File Size</Label>
                                    <Input
                                        id="file_size"
                                        placeholder="e.g. 48.2 MB"
                                        value={form.data.file_size}
                                        onChange={(e) => form.setData('file_size', e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="pages">Pages (optional)</Label>
                                    <Input
                                        id="pages"
                                        placeholder="e.g. 284 pages"
                                        value={form.data.pages}
                                        onChange={(e) => form.setData('pages', e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="format">Format</Label>
                                    <Input
                                        id="format"
                                        placeholder="PDF"
                                        value={form.data.format}
                                        onChange={(e) => form.setData('format', e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="sort_order">Sort Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={form.data.sort_order}
                                        onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="downloads_count">Initial Downloads Count</Label>
                                    <Input
                                        id="downloads_count"
                                        type="number"
                                        value={form.data.downloads_count}
                                        onChange={(e) => form.setData('downloads_count', parseInt(e.target.value) || 0)}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Short Description / Subtitle</Label>
                                <textarea
                                    id="description"
                                    rows={2}
                                    placeholder="e.g. Detailed photometrics, luminaire specs and optical matrices across 6 families."
                                    value={form.data.description}
                                    onChange={(e) => form.setData('description', e.target.value)}
                                    className="w-full mt-1 px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-ring"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cover_image_file">Cover Image Thumbnail (Optional)</Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                                    <Input
                                        id="cover_image_file"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                const file = e.target.files[0];
                                                form.setData('cover_image_file', file);
                                                setCoverPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                    <Input
                                        placeholder="Or Unsplash photo ID / URL"
                                        value={form.data.cover_image}
                                        onChange={(e) => {
                                            form.setData('cover_image', e.target.value);
                                            setCoverPreview(e.target.value);
                                        }}
                                    />
                                </div>
                                {coverPreview && (
                                    <div className="mt-2 flex items-center gap-3 p-2 bg-muted/40 rounded-lg border border-border/50">
                                        <img
                                            src={
                                                coverPreview.startsWith('blob:') || coverPreview.startsWith('http') || coverPreview.startsWith('/')
                                                    ? coverPreview
                                                    : `https://images.unsplash.com/photo-${coverPreview}?auto=format&fit=crop&w=400&q=80`
                                            }
                                            alt="Cover preview"
                                            className="w-12 h-16 object-cover rounded border border-border"
                                        />
                                        <span className="text-xs text-muted-foreground">Preview of document cover thumbnail</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={form.data.is_active}
                                    onChange={(e) => form.setData('is_active', e.target.checked)}
                                    className="rounded border-input text-primary shadow-xs focus:ring-primary size-4"
                                />
                                <Label htmlFor="is_active" className="cursor-pointer font-medium">
                                    Active (Visible for public download in showroom & footer)
                                </Label>
                            </div>

                            <div className="flex justify-end gap-3 border-t border-border/40 pt-4 mt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsCreateOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={form.processing}>
                                    {form.processing ? 'Saving...' : editingCatalogue ? 'Save Changes' : 'Create Catalogue'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

CataloguesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Catalogues & Downloads', href: '/admin/catalogues' },
    ],
};
