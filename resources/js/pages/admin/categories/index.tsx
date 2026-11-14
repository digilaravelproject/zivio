import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Edit2, Trash2, Layers, Image as ImageIcon, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Environment {
    id: number;
    name: string;
    slug: string;
}

interface Category {
    id: number;
    environment_id: number;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
    sort_order: number;
    is_active: boolean;
    products_count: number;
    environment?: Environment;
}

interface Props {
    categories: Category[];
    environments: Environment[];
    selectedEnvironmentId?: string;
}

export default function CategoriesIndex({ categories, environments, selectedEnvironmentId }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingCat, setEditingCat] = useState<Category | null>(null);

    const form = useForm({
        environment_id: environments[0]?.id || '',
        name: '',
        slug: '',
        image: '',
        image_file: null as File | null,
        description: '',
        sort_order: 0,
        is_active: true,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const openCreate = () => {
        setEditingCat(null);
        form.reset();
        setImagePreview(null);
        if (selectedEnvironmentId) {
            form.setData('environment_id', parseInt(selectedEnvironmentId));
        }
        setIsCreateOpen(true);
    };

    const openEdit = (cat: Category) => {
        setEditingCat(cat);
        setImagePreview(cat.image || null);
        form.setData({
            environment_id: cat.environment_id,
            name: cat.name,
            slug: cat.slug,
            image: cat.image || '',
            image_file: null,
            description: cat.description || '',
            sort_order: cat.sort_order,
            is_active: cat.is_active,
        });
        setIsCreateOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCat) {
            form.transform((data) => ({
                ...data,
                _method: 'put',
            })).post(`/admin/categories/${editingCat.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    setIsCreateOpen(false);
                    setEditingCat(null);
                    setImagePreview(null);
                },
            });
        } else {
            form.post('/admin/categories', {
                forceFormData: true,
                onSuccess: () => {
                    setIsCreateOpen(false);
                    form.reset();
                    setImagePreview(null);
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category? Associated products may be affected.')) {
            router.delete(`/admin/categories/${id}`);
        }
    };

    const handleFilterEnv = (envId: string) => {
        router.get('/admin/categories', envId ? { environment_id: envId } : {}, {
            preserveState: true,
        });
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <Head title="Categories Management" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <Layers className="size-6 text-primary" /> Product Categories (Mounting & Form Factor)
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Bollards, Surface Ceiling Luminaires, Pendants, Floodlights assigned to Environments.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={selectedEnvironmentId || ''}
                        onChange={(e) => handleFilterEnv(e.target.value)}
                        className="rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 shadow-xs focus-visible:outline-none"
                    >
                        <option value="">All Environments</option>
                        {environments.map((env) => (
                            <option key={env.id} value={env.id}>
                                {env.name}
                            </option>
                        ))}
                    </select>

                    <Button onClick={openCreate} className="gap-2 bg-[#B5722A] hover:bg-[#8C4E18] text-white font-bold cursor-pointer">
                        <Plus className="size-4" /> Add Category
                    </Button>
                </div>
            </div>

            {/* Modal / Form Drawer */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
                        <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-3">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                <Edit2 className="size-4 text-[#B5722A]" />
                                {editingCat ? 'Edit Category' : 'Create Category'}
                            </h2>
                            <button
                                onClick={() => setIsCreateOpen(false)}
                                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-bold p-1 rounded transition"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="environment_id" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                                    Environment Scope *
                                </Label>
                                <select
                                    id="environment_id"
                                    value={form.data.environment_id}
                                    onChange={(e) => form.setData('environment_id', parseInt(e.target.value))}
                                    className="w-full rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 shadow-xs focus-visible:outline-none"
                                    required
                                >
                                    <option value="" disabled>Select Environment</option>
                                    {environments.map((env) => (
                                        <option key={env.id} value={env.id}>
                                            {env.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.environment_id && <p className="text-xs text-red-600 mt-1">{form.errors.environment_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="name" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                                    Category Name *
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Surface Ceiling Luminaires, Bollards"
                                    value={form.data.name}
                                    className="bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-slate-100 font-medium placeholder:text-slate-400"
                                    onChange={(e) => {
                                        form.setData('name', e.target.value);
                                        if (!editingCat) {
                                            form.setData('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                                        }
                                    }}
                                    required
                                />
                                {form.errors.name && <p className="text-xs text-red-600 mt-1">{form.errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="slug" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                                    Slug *
                                </Label>
                                <Input
                                    id="slug"
                                    placeholder="e.g. surface-ceiling-luminaires"
                                    value={form.data.slug}
                                    className="bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-slate-100 font-medium placeholder:text-slate-400"
                                    onChange={(e) => form.setData('slug', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="image_file" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                                    Category Image / Photo
                                </Label>
                                <div className="mt-1 flex flex-col gap-2">
                                    {imagePreview && (
                                        <div className="relative w-full h-32 rounded border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    form.setData('image_file', null);
                                                    form.setData('image', '');
                                                    setImagePreview(null);
                                                }}
                                                className="absolute top-2 right-2 bg-black/75 text-white rounded-full p-1 text-xs hover:bg-black cursor-pointer"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}

                                    <div className="relative flex items-center justify-center rounded-md border-2 border-dashed border-slate-300 dark:border-zinc-700 bg-slate-50/60 dark:bg-zinc-800/50 p-4 hover:border-[#B5722A] transition">
                                        <input
                                            id="image_file"
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] || null;
                                                form.setData('image_file', file);
                                                if (file) {
                                                    setImagePreview(URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                        <div className="flex flex-col items-center text-center">
                                            <ImageIcon className="size-6 text-[#B5722A] mb-1" />
                                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                {form.data.image_file ? form.data.image_file.name : 'Click to upload or drag photo'}
                                            </span>
                                            <span className="text-[11px] text-slate-500 mt-0.5">
                                                PNG, JPG, WEBP up to 5MB
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                                    Description
                                </Label>
                                <textarea
                                    id="description"
                                    rows={2}
                                    className="w-full rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 shadow-xs focus-visible:outline-none placeholder:text-slate-400"
                                    placeholder="Short description..."
                                    value={form.data.description}
                                    onChange={(e) => form.setData('description', e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="sort_order" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                                        Sort Order
                                    </Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={form.data.sort_order}
                                        className="bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-slate-100 font-medium"
                                        onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="flex items-center gap-2 pt-6">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={form.data.is_active}
                                        onChange={(e) => form.setData('is_active', e.target.checked)}
                                        className="size-4 rounded border-slate-300 accent-[#B5722A] cursor-pointer"
                                    />
                                    <Label htmlFor="is_active" className="cursor-pointer text-sm font-bold text-slate-800 dark:text-slate-200">
                                        Active
                                    </Label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-zinc-800">
                                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="cursor-pointer font-medium">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={form.processing} className="bg-[#B5722A] hover:bg-[#8C4E18] text-white font-bold cursor-pointer">
                                    {editingCat ? 'Save Changes' : 'Create Category'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs hover:border-[#B5722A]/60 transition flex flex-col justify-between group"
                    >
                        {cat.image ? (
                            <div className="h-40 w-full overflow-hidden bg-slate-100 dark:bg-zinc-800 relative">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-2 left-2 bg-[#B5722A] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-xs">
                                    {cat.environment?.name}
                                </div>
                                <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-semibold text-white">
                                    {cat.products_count} Products
                                </div>
                            </div>
                        ) : (
                            <div className="h-40 w-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-400 relative">
                                <ImageIcon className="size-8 stroke-1 text-[#B5722A]/60" />
                                <div className="absolute top-2 left-2 bg-[#B5722A] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-xs">
                                    {cat.environment?.name}
                                </div>
                            </div>
                        )}

                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug">{cat.name}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">/{cat.slug}</p>
                                {cat.description && (
                                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                                        {cat.description}
                                    </p>
                                )}
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                                <span className="text-[11px] font-semibold text-slate-500">Order #{cat.sort_order}</span>
                                <div className="flex items-center gap-1.5">
                                    <Button
                                        size="sm"
                                        onClick={() => openEdit(cat)}
                                        className="h-8 px-3 text-xs font-bold gap-1.5 bg-[#B5722A] hover:bg-[#8C4E18] text-white shadow-xs transition cursor-pointer"
                                    >
                                        <Edit2 className="size-3.5" /> Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDelete(cat.id)}
                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                                        title="Delete Category"
                                    >
                                        <Trash2 className="size-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

CategoriesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Categories', href: '/admin/categories' },
    ],
};

