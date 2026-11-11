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
                        className="rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs focus-visible:outline-none"
                    >
                        <option value="">All Environments</option>
                        {environments.map((env) => (
                            <option key={env.id} value={env.id}>
                                {env.name}
                            </option>
                        ))}
                    </select>

                    <Button onClick={openCreate} className="gap-2">
                        <Plus className="size-4" /> Add Category
                    </Button>
                </div>
            </div>

            {/* Modal / Form Drawer */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
                        <div className="flex justify-between items-center border-b border-border/40 pb-3">
                            <h2 className="text-lg font-semibold text-foreground">
                                {editingCat ? 'Edit Category' : 'Create Category'}
                            </h2>
                            <button
                                onClick={() => setIsCreateOpen(false)}
                                className="text-muted-foreground hover:text-foreground text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="environment_id">Environment Scope</Label>
                                <select
                                    id="environment_id"
                                    value={form.data.environment_id}
                                    onChange={(e) => form.setData('environment_id', parseInt(e.target.value))}
                                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs focus-visible:outline-none"
                                    required
                                >
                                    <option value="" disabled>Select Environment</option>
                                    {environments.map((env) => (
                                        <option key={env.id} value={env.id}>
                                            {env.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.environment_id && <p className="text-xs text-destructive mt-1">{form.errors.environment_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="name">Category Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Surface Ceiling Luminaires, Bollards"
                                    value={form.data.name}
                                    onChange={(e) => {
                                        form.setData('name', e.target.value);
                                        if (!editingCat) {
                                            form.setData('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                                        }
                                    }}
                                    required
                                />
                                {form.errors.name && <p className="text-xs text-destructive mt-1">{form.errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    placeholder="e.g. surface-ceiling-luminaires"
                                    value={form.data.slug}
                                    onChange={(e) => form.setData('slug', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="image_file">Category Image / Photo</Label>
                                <div className="mt-1 flex flex-col gap-2">
                                    {imagePreview && (
                                        <div className="relative w-full h-32 rounded border border-black/10 overflow-hidden bg-[#FAF9F5] flex items-center justify-center">
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

                                    <div className="relative flex items-center justify-center rounded-md border-2 border-dashed border-input bg-card p-4 hover:border-primary/50 transition">
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
                                            <ImageIcon className="size-6 text-muted-foreground mb-1" />
                                            <span className="text-xs font-semibold text-foreground">
                                                {form.data.image_file ? form.data.image_file.name : 'Click to upload or drag photo'}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground mt-0.5">
                                                PNG, JPG, WEBP up to 5MB
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    rows={2}
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none"
                                    placeholder="Short description..."
                                    value={form.data.description}
                                    onChange={(e) => form.setData('description', e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="sort_order">Sort Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={form.data.sort_order}
                                        onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="flex items-center gap-2 pt-6">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={form.data.is_active}
                                        onChange={(e) => form.setData('is_active', e.target.checked)}
                                        className="size-4 rounded border-gray-300"
                                    />
                                    <Label htmlFor="is_active" className="cursor-pointer">Active</Label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-border/40">
                                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={form.processing}>
                                    {editingCat ? 'Save Changes' : 'Create'}
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
                        className="bg-card border border-border rounded-xl overflow-hidden shadow-xs hover:border-primary/50 transition flex flex-col justify-between"
                    >
                        {cat.image ? (
                            <div className="h-36 w-full overflow-hidden bg-muted relative">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                    {cat.environment?.name}
                                </div>
                                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-semibold text-white">
                                    {cat.products_count} Products
                                </div>
                            </div>
                        ) : (
                            <div className="h-36 w-full bg-muted/30 flex items-center justify-center text-muted-foreground relative">
                                <ImageIcon className="size-8 stroke-1" />
                                <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                    {cat.environment?.name}
                                </div>
                            </div>
                        )}

                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-semibold text-base text-foreground leading-tight">{cat.name}</h3>
                                <p className="text-[11px] text-muted-foreground font-mono mt-1">/{cat.slug}</p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                                <span className="text-[11px] text-muted-foreground">Order: #{cat.sort_order}</span>
                                <div className="flex items-center gap-1">
                                    <Button size="sm" variant="ghost" onClick={() => openEdit(cat)} className="size-7 p-0">
                                        <Edit2 className="size-3.5" />
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => handleDelete(cat.id)} className="size-7 p-0 text-destructive hover:text-destructive">
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

