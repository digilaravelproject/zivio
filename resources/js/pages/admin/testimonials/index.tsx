import { Head, router, useForm } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import {
    Plus,
    Edit2,
    Trash2,
    MessageSquareQuote,
    Star,
    Search,
    Building2,
    Briefcase,
    Upload,
    CheckCircle2,
    XCircle,
    Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar: string | null;
    rating: number;
    sort_order: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

interface Props {
    testimonials: Testimonial[];
}

export default function TestimonialsIndex({ testimonials }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const form = useForm({
        name: '',
        role: '',
        company: '',
        quote: '',
        avatar: '',
        avatar_file: null as File | null,
        rating: 5,
        sort_order: 0,
        is_active: true,
    });

    const openCreate = () => {
        setEditingItem(null);
        form.reset();
        setImagePreview(null);
        setIsModalOpen(true);
    };

    const openEdit = (item: Testimonial) => {
        setEditingItem(item);
        setImagePreview(getAvatarUrl(item.avatar));
        form.setData({
            name: item.name,
            role: item.role,
            company: item.company,
            quote: item.quote,
            avatar: item.avatar || '',
            avatar_file: null,
            rating: item.rating,
            sort_order: item.sort_order,
            is_active: item.is_active,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            form.transform((data) => ({
                ...data,
                _method: 'put',
            })).post(`/admin/testimonials/${editingItem.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                    setImagePreview(null);
                },
            });
        } else {
            form.post('/admin/testimonials', {
                forceFormData: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                    setImagePreview(null);
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            router.delete(`/admin/testimonials/${id}`);
        }
    };

    const getAvatarUrl = (avatar: string | null) => {
        if (!avatar) return null;
        if (avatar.startsWith('http') || avatar.startsWith('/')) return avatar;
        return `https://images.unsplash.com/photo-${avatar}?w=120&h=120&fit=crop&crop=faces`;
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
    };

    const filteredTestimonials = useMemo(() => {
        return testimonials.filter((t) => {
            const matchesSearch =
                t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.quote.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === 'all'
                    ? true
                    : statusFilter === 'active'
                      ? t.is_active
                      : !t.is_active;

            return matchesSearch && matchesStatus;
        });
    }, [testimonials, searchQuery, statusFilter]);

    const activeCount = useMemo(() => testimonials.filter((t) => t.is_active).length, [testimonials]);
    const avgRating = useMemo(() => {
        if (testimonials.length === 0) return 0;
        const total = testimonials.reduce((acc, curr) => acc + curr.rating, 0);
        return (total / testimonials.length).toFixed(1);
    }, [testimonials]);

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <Head title="Testimonials & Reviews Management" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <MessageSquareQuote className="size-6 text-primary" /> Testimonials & Client Reviews
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage executive reviews, architect feedback, and client testimonials featured across the showroom and landing page.
                    </p>
                </div>
                <Button onClick={openCreate} className="gap-2">
                    <Plus className="size-4" /> Add Testimonial
                </Button>
            </div>

            {/* Summary KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Testimonials</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{testimonials.length}</p>
                    </div>
                    <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Quote className="size-5" />
                    </div>
                </div>

                <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Published</p>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{activeCount}</p>
                    </div>
                    <div className="size-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="size-5" />
                    </div>
                </div>

                <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Average Rating</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl font-bold text-foreground">{avgRating}</span>
                            <div className="flex text-amber-500">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="size-3.5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="size-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <Star className="size-5 fill-amber-500" />
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/30 p-3 rounded-lg border border-border/40">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by name, company, or quote..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9 text-sm"
                    />
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-xs text-muted-foreground font-medium">Status:</span>
                    <div className="inline-flex rounded-md border border-border bg-card p-0.5 text-xs">
                        <button
                            type="button"
                            onClick={() => setStatusFilter('all')}
                            className={`px-2.5 py-1 rounded transition-colors ${
                                statusFilter === 'all'
                                    ? 'bg-primary text-primary-foreground font-medium shadow-xs'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            All ({testimonials.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setStatusFilter('active')}
                            className={`px-2.5 py-1 rounded transition-colors ${
                                statusFilter === 'active'
                                    ? 'bg-emerald-600 text-white font-medium shadow-xs'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Active ({activeCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setStatusFilter('inactive')}
                            className={`px-2.5 py-1 rounded transition-colors ${
                                statusFilter === 'inactive'
                                    ? 'bg-zinc-600 text-white font-medium shadow-xs'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Inactive ({testimonials.length - activeCount})
                        </button>
                    </div>
                </div>
            </div>

            {/* Testimonials Table */}
            <div className="border border-border/60 rounded-xl bg-card shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 border-b border-border/60 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-3.5 w-16 text-center">Order</th>
                                <th className="px-4 py-3.5 min-w-[220px]">Client / Stakeholder</th>
                                <th className="px-4 py-3.5 min-w-[280px]">Quote</th>
                                <th className="px-4 py-3.5 w-32">Rating</th>
                                <th className="px-4 py-3.5 w-28 text-center">Status</th>
                                <th className="px-4 py-3.5 w-24 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {filteredTestimonials.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                                        <MessageSquareQuote className="size-8 mx-auto text-muted-foreground/40 mb-2" />
                                        <p className="font-medium">No testimonials found</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {searchQuery ? 'Try adjusting your search criteria.' : 'Click "Add Testimonial" to create your first review.'}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filteredTestimonials.map((item) => {
                                    const avatarUrl = getAvatarUrl(item.avatar);
                                    return (
                                        <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                                            {/* Sort Order */}
                                            <td className="px-4 py-3 text-center">
                                                <span className="inline-block px-2 py-0.5 text-xs font-mono font-medium rounded bg-muted text-muted-foreground">
                                                    #{item.sort_order}
                                                </span>
                                            </td>

                                            {/* Client Info */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-full flex-shrink-0 overflow-hidden bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold flex items-center justify-center text-xs border border-amber-500/30">
                                                        {avatarUrl ? (
                                                            <img
                                                                src={avatarUrl}
                                                                alt={item.name}
                                                                className="size-full object-cover"
                                                                onError={(e) => {
                                                                    (e.target as HTMLElement).style.display = 'none';
                                                                }}
                                                            />
                                                        ) : (
                                                            getInitials(item.name)
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-foreground truncate">{item.name}</p>
                                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                                                            <Briefcase className="size-3 flex-shrink-0" />
                                                            <span className="truncate">{item.role}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-primary font-medium mt-0.5">
                                                            <Building2 className="size-3 flex-shrink-0" />
                                                            <span className="truncate">{item.company}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Quote */}
                                            <td className="px-4 py-3">
                                                <p className="text-xs text-foreground/90 italic leading-relaxed line-clamp-3">
                                                    "{item.quote}"
                                                </p>
                                            </td>

                                            {/* Rating */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`size-3.5 ${
                                                                star <= item.rating
                                                                    ? 'fill-amber-400 text-amber-400'
                                                                    : 'fill-muted text-muted-foreground/30'
                                                            }`}
                                                        />
                                                    ))}
                                                    <span className="text-xs font-semibold text-muted-foreground ml-1">
                                                        {item.rating}/5
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3 text-center">
                                                {item.is_active ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                                        <CheckCircle2 className="size-3" /> Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                                        <XCircle className="size-3" /> Inactive
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => openEdit(item)}
                                                        className="size-8 p-0"
                                                        title="Edit Testimonial"
                                                    >
                                                        <Edit2 className="size-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleDelete(item.id)}
                                                        className="size-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                        title="Delete Testimonial"
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal / Form Drawer */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-card border border-border rounded-xl p-6 max-w-xl w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 my-8">
                        <div className="flex justify-between items-center border-b border-border/40 pb-3">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                    <MessageSquareQuote className="size-5 text-primary" />
                                    {editingItem ? 'Edit Testimonial' : 'Create New Testimonial'}
                                </h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Fill in the client credentials and feedback quote.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-muted-foreground hover:text-foreground text-sm p-1 rounded-md hover:bg-muted"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Client / Author Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. Sushil Kadam"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        required
                                    />
                                    {form.errors.name && <p className="text-xs text-destructive mt-1">{form.errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="role">Role / Designation *</Label>
                                    <Input
                                        id="role"
                                        placeholder="e.g. Project Head, Principal Architect"
                                        value={form.data.role}
                                        onChange={(e) => form.setData('role', e.target.value)}
                                        required
                                    />
                                    {form.errors.role && <p className="text-xs text-destructive mt-1">{form.errors.role}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="company">Company / Client Organization *</Label>
                                    <Input
                                        id="company"
                                        placeholder="e.g. Tata Realty, Piramal Realty"
                                        value={form.data.company}
                                        onChange={(e) => form.setData('company', e.target.value)}
                                        required
                                    />
                                    {form.errors.company && <p className="text-xs text-destructive mt-1">{form.errors.company}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="rating">Star Rating (1 - 5) *</Label>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    type="button"
                                                    key={star}
                                                    onClick={() => form.setData('rating', star)}
                                                    className="p-1 focus:outline-none"
                                                >
                                                    <Star
                                                        className={`size-6 ${
                                                            star <= form.data.rating
                                                                ? 'fill-amber-400 text-amber-400'
                                                                : 'fill-muted text-muted-foreground/30'
                                                        } hover:scale-110 transition-transform`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <span className="text-xs font-semibold text-muted-foreground">
                                            {form.data.rating} Stars
                                        </span>
                                    </div>
                                    {form.errors.rating && <p className="text-xs text-destructive mt-1">{form.errors.rating}</p>}
                                </div>
                            </div>

                            {/* Quote Textarea */}
                            <div>
                                <Label htmlFor="quote">Client Quote / Testimonial Text *</Label>
                                <textarea
                                    id="quote"
                                    rows={4}
                                    placeholder="Write the full testimonial quote here..."
                                    value={form.data.quote}
                                    onChange={(e) => form.setData('quote', e.target.value)}
                                    className="w-full mt-1.5 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                />
                                {form.errors.quote && <p className="text-xs text-destructive mt-1">{form.errors.quote}</p>}
                            </div>

                            {/* Avatar File / URL */}
                            <div className="space-y-2">
                                <Label htmlFor="avatar_file">Client Avatar / Photo</Label>
                                <div className="flex items-start gap-4">
                                    {imagePreview ? (
                                        <div className="size-16 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0 bg-muted">
                                            <img src={imagePreview} alt="Preview" className="size-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="size-16 rounded-full border-2 border-dashed border-border flex items-center justify-center flex-shrink-0 bg-muted/40 text-muted-foreground">
                                            <Upload className="size-5" />
                                        </div>
                                    )}

                                    <div className="flex-1 space-y-2">
                                        <Input
                                            id="avatar_file"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    form.setData('avatar_file', file);
                                                    setImagePreview(URL.createObjectURL(file));
                                                }
                                            }}
                                            className="text-xs"
                                        />
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground">or URL / Unsplash ID:</span>
                                            <Input
                                                placeholder="e.g. 1472099645785-5658abf4ff4e or https://..."
                                                value={form.data.avatar}
                                                onChange={(e) => {
                                                    form.setData('avatar', e.target.value);
                                                    if (e.target.value) {
                                                        setImagePreview(getAvatarUrl(e.target.value));
                                                    }
                                                }}
                                                className="text-xs h-8"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {form.errors.avatar_file && (
                                    <p className="text-xs text-destructive">{form.errors.avatar_file}</p>
                                )}
                            </div>

                            {/* Sort Order and Active Toggle */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/40">
                                <div>
                                    <Label htmlFor="sort_order">Display Sort Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        placeholder="0"
                                        value={form.data.sort_order}
                                        onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)}
                                    />
                                    <p className="text-[11px] text-muted-foreground mt-1">Lower numbers appear first (e.g. 1, 2, 3).</p>
                                </div>

                                <div className="flex flex-col justify-center">
                                    <Label className="mb-2">Visibility Status</Label>
                                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input
                                            type="checkbox"
                                            checked={form.data.is_active}
                                            onChange={(e) => form.setData('is_active', e.target.checked)}
                                            className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <span className="font-medium text-foreground">Published & Active</span>
                                    </label>
                                    <p className="text-[11px] text-muted-foreground mt-1">
                                        Inactive testimonials are hidden from the public website.
                                    </p>
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={form.processing}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={form.processing} className="min-w-[120px]">
                                    {form.processing ? 'Saving...' : editingItem ? 'Update Testimonial' : 'Create Testimonial'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

TestimonialsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Testimonials', href: '/admin/testimonials' },
    ],
};
