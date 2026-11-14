import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Edit2, Trash2, Globe2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Environment {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
    sort_order: number;
    is_active: boolean;
    categories_count: number;
}

interface Props {
    environments: Environment[];
}

export default function EnvironmentsIndex({ environments }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingEnv, setEditingEnv] = useState<Environment | null>(null);

    const form = useForm({
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
        setEditingEnv(null);
        form.reset();
        setImagePreview(null);
        setIsCreateOpen(true);
    };

    const openEdit = (env: Environment) => {
        setEditingEnv(env);
        setImagePreview(env.image || null);
        form.setData({
            name: env.name,
            slug: env.slug,
            image: env.image || '',
            image_file: null,
            description: env.description || '',
            sort_order: env.sort_order,
            is_active: env.is_active,
        });
        setIsCreateOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingEnv) {
            form.transform((data) => ({
                ...data,
                _method: 'put',
            })).post(`/admin/environments/${editingEnv.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    setIsCreateOpen(false);
                    setEditingEnv(null);
                    setImagePreview(null);
                },
            });
        } else {
            form.post('/admin/environments', {
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
        if (confirm('Are you sure you want to delete this environment? Associated categories and products may be affected.')) {
            router.delete(`/admin/environments/${id}`);
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <Head title="Environments Management" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <Globe2 className="size-6 text-primary" /> Environments (Top-Level Scope)
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Dynamic master environments (Indoor, Outdoor, Solar, Poles, etc.) with custom photos and descriptions.
                    </p>
                </div>
                <Button onClick={openCreate} className="gap-2">
                    <Plus className="size-4" /> Add Environment
                </Button>
            </div>

            {/* Modal / Form Drawer */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
                        <div className="flex justify-between items-center border-b border-border/40 pb-3">
                            <h2 className="text-lg font-semibold text-foreground">
                                {editingEnv ? 'Edit Environment' : 'Create Environment'}
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
                                <Label htmlFor="name">Environment Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Architectural Facade, Tunnel"
                                    value={form.data.name}
                                    onChange={(e) => {
                                        form.setData('name', e.target.value);
                                        if (!editingEnv) {
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
                                    placeholder="e.g. architectural-facade"
                                    value={form.data.slug}
                                    onChange={(e) => form.setData('slug', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="image_file">Environment Image / Photo</Label>
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
                                    rows={3}
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    placeholder="Describe the application scope..."
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
                                    {editingEnv ? 'Save Changes' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Environments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {environments.map((env) => (
                    <div
                        key={env.id}
                        className="bg-card border border-border rounded-xl overflow-hidden shadow-xs hover:border-primary/50 transition flex flex-col justify-between"
                    >
                        {env.image ? (
                            <div className="h-44 w-full overflow-hidden bg-muted relative">
                                <img
                                    src={env.image}
                                    alt={env.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-white">
                                    {env.categories_count} Categories
                                </div>
                            </div>
                        ) : (
                            <div className="h-44 w-full bg-muted/40 flex items-center justify-center text-muted-foreground">
                                <ImageIcon className="size-10 stroke-1" />
                            </div>
                        )}

                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg text-foreground">{env.name}</h3>
                                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                        env.is_active ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-muted text-muted-foreground'
                                    }`}>
                                        {env.is_active ? 'Active' : 'Disabled'}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground font-mono mt-0.5">/products/{env.slug}</p>
                                {env.description && (
                                    <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                                        {env.description}
                                    </p>
                                )}
                            </div>

                            <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold text-muted-foreground">Order: #{env.sort_order}</span>
                                <div className="flex items-center gap-1.5">
                                    <Button
                                        size="sm"
                                        onClick={() => openEdit(env)}
                                        className="h-8 px-3 text-xs font-bold gap-1.5 bg-[#B5722A] hover:bg-[#8C4E18] text-white shadow-xs transition cursor-pointer"
                                    >
                                        <Edit2 className="size-3.5" /> Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDelete(env.id)}
                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                                        title="Delete Environment"
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

EnvironmentsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Environments', href: '/admin/environments' },
    ],
};

