import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    Plus,
    Edit2,
    Trash2,
    SlidersHorizontal,
    Image as ImageIcon,
    Video as VideoIcon,
    Play,
    CheckCircle2,
    XCircle,
    Eye,
    Layers,
    Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface HeroSlide {
    id: number;
    label: string;
    headline: string[];
    sub: string;
    location: string;
    type: 'image' | 'video';
    image: string | null;
    video: string | null;
    poster: string | null;
    sort_order: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

interface Props {
    slides: HeroSlide[];
}

const resolveMediaUrl = (val: string | null | undefined, w = 600, h = 340) => {
    if (!val) return '';
    if (val.startsWith('http') || val.startsWith('/')) {
        return val;
    }
    return `https://images.unsplash.com/photo-${val}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
};

export default function HeroSlidesIndex({ slides }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [posterPreview, setPosterPreview] = useState<string | null>(null);

    const form = useForm({
        label: '',
        headline: '',
        sub: '',
        location: '',
        type: 'image' as 'image' | 'video',
        image: '',
        image_file: null as File | null,
        video: '',
        video_file: null as File | null,
        poster: '',
        poster_file: null as File | null,
        sort_order: 0,
        is_active: true,
    });

    const openCreate = () => {
        setEditingSlide(null);
        form.reset();
        setImagePreview(null);
        setPosterPreview(null);
        form.setData({
            label: '',
            headline: '',
            sub: '',
            location: '',
            type: 'image',
            image: '',
            image_file: null,
            video: '',
            video_file: null,
            poster: '',
            poster_file: null,
            sort_order: slides.length > 0 ? Math.max(...slides.map((s) => s.sort_order)) + 1 : 0,
            is_active: true,
        });
        setIsModalOpen(true);
    };

    const openEdit = (slide: HeroSlide) => {
        setEditingSlide(slide);
        setImagePreview(slide.image ? resolveMediaUrl(slide.image) : null);
        setPosterPreview(slide.poster ? resolveMediaUrl(slide.poster) : null);

        const headlineStr = Array.isArray(slide.headline)
            ? slide.headline.join('\n')
            : (slide.headline as any) || '';

        form.setData({
            label: slide.label || '',
            headline: headlineStr,
            sub: slide.sub || '',
            location: slide.location || '',
            type: slide.type || 'image',
            image: slide.image || '',
            image_file: null,
            video: slide.video || '',
            video_file: null,
            poster: slide.poster || '',
            poster_file: null,
            sort_order: slide.sort_order ?? 0,
            is_active: Boolean(slide.is_active),
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingSlide) {
            form.transform((data) => ({
                ...data,
                _method: 'put',
            })).post(`/admin/hero-slides/${editingSlide.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingSlide(null);
                    setImagePreview(null);
                    setPosterPreview(null);
                },
            });
        } else {
            form.post('/admin/hero-slides', {
                forceFormData: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                    setImagePreview(null);
                    setPosterPreview(null);
                },
            });
        }
    };

    const handleDelete = (slide: HeroSlide) => {
        if (confirm(`Are you sure you want to delete slide "${slide.label}"?`)) {
            router.delete(`/admin/hero-slides/${slide.id}`);
        }
    };

    const activeCount = slides.filter((s) => s.is_active).length;
    const videoCount = slides.filter((s) => s.type === 'video').length;
    const imageCount = slides.filter((s) => s.type === 'image').length;

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <Head title="Hero Slides Management" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
                        <SlidersHorizontal className="size-6 text-primary" />
                        Hero Slides Management
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Control homepage hero carousel slides, headlines, cinematic video loops, and responsive photography.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={openCreate} className="gap-2 shadow-sm">
                        <Plus className="size-4" /> Add New Slide
                    </Button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-border bg-card shadow-xs">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Slides</div>
                    <div className="text-2xl font-bold text-foreground mt-1">{slides.length}</div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card shadow-xs">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Slides</div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{activeCount}</div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card shadow-xs">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Video Loops</div>
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{videoCount}</div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card shadow-xs">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Photography</div>
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{imageCount}</div>
                </div>
            </div>

            {/* Slides Table */}
            <div className="border border-border rounded-xl bg-card overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 border-b border-border/60 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-3.5 w-16 text-center">Order</th>
                                <th className="px-4 py-3.5 w-36">Media</th>
                                <th className="px-4 py-3.5">Label & Headline</th>
                                <th className="px-4 py-3.5">Location / Specs</th>
                                <th className="px-4 py-3.5 w-24">Type</th>
                                <th className="px-4 py-3.5 w-24">Status</th>
                                <th className="px-4 py-3.5 w-28 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {slides.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                                        No hero slides found. Click "Add New Slide" to seed your carousel.
                                    </td>
                                </tr>
                            ) : (
                                slides.map((slide) => {
                                    const thumbUrl = slide.type === 'video'
                                        ? (slide.poster ? resolveMediaUrl(slide.poster, 300, 180) : '')
                                        : (slide.image ? resolveMediaUrl(slide.image, 300, 180) : '');

                                    return (
                                        <tr key={slide.id} className="hover:bg-muted/30 transition-colors">
                                            {/* Order */}
                                            <td className="px-4 py-3 text-center">
                                                <span className="inline-flex items-center justify-center size-7 rounded-md bg-muted text-foreground text-xs font-bold font-mono">
                                                    #{slide.sort_order}
                                                </span>
                                            </td>

                                            {/* Thumbnail / Media */}
                                            <td className="px-4 py-3">
                                                <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-muted border border-border/60 shadow-xs group flex items-center justify-center">
                                                    {thumbUrl ? (
                                                        <img
                                                            src={thumbUrl}
                                                            alt={slide.label}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center text-muted-foreground text-[10px]">
                                                            {slide.type === 'video' ? <VideoIcon className="size-5 mb-0.5" /> : <ImageIcon className="size-5 mb-0.5" />}
                                                            <span>No Media</span>
                                                        </div>
                                                    )}

                                                    {slide.type === 'video' && (
                                                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center pointer-events-none">
                                                            <div className="size-7 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white border border-white/20">
                                                                <Play className="size-3.5 fill-current ml-0.5" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Label & Headline */}
                                            <td className="px-4 py-3">
                                                <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                                                    {slide.label}
                                                </div>
                                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                                    {Array.isArray(slide.headline) &&
                                                        slide.headline.map((line, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                                                            >
                                                                {line}
                                                            </span>
                                                        ))}
                                                </div>
                                                <p className="text-xs text-muted-foreground line-clamp-1 mt-1.5 max-w-md">
                                                    {slide.sub}
                                                </p>
                                            </td>

                                            {/* Location */}
                                            <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
                                                <span className="bg-muted px-2 py-1 rounded border border-border/50 inline-block">
                                                    {slide.location}
                                                </span>
                                            </td>

                                            {/* Type */}
                                            <td className="px-4 py-3">
                                                {slide.type === 'video' ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                                        <VideoIcon className="size-3" /> Video
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                                        <ImageIcon className="size-3" /> Image
                                                    </span>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3">
                                                {slide.is_active ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                                        <CheckCircle2 className="size-3" /> Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-muted text-muted-foreground">
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
                                                        onClick={() => openEdit(slide)}
                                                        className="size-8 p-0"
                                                        title="Edit slide"
                                                    >
                                                        <Edit2 className="size-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleDelete(slide)}
                                                        className="size-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                        title="Delete slide"
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

            {/* Modal Dialog */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
                    <div className="bg-card border border-border rounded-xl p-6 max-w-2xl w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 my-8">
                        <div className="flex justify-between items-center border-b border-border/40 pb-3">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <Sparkles className="size-5 text-primary" />
                                {editingSlide ? 'Edit Hero Slide' : 'Create New Hero Slide'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-muted-foreground hover:text-foreground text-sm font-mono px-2 py-1 rounded hover:bg-muted"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Label */}
                                <div>
                                    <Label htmlFor="label">Slide Label / Identifier</Label>
                                    <Input
                                        id="label"
                                        placeholder="e.g. 01 · Natural Light"
                                        value={form.data.label}
                                        onChange={(e) => form.setData('label', e.target.value)}
                                        required
                                    />
                                    {form.errors.label && (
                                        <p className="text-xs text-destructive mt-1">{form.errors.label}</p>
                                    )}
                                </div>

                                {/* Media Type */}
                                <div>
                                    <Label htmlFor="type">Media Format</Label>
                                    <select
                                        id="type"
                                        className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                        value={form.data.type}
                                        onChange={(e) => form.setData('type', e.target.value as 'image' | 'video')}
                                    >
                                        <option value="image">Static Image / Photo</option>
                                        <option value="video">Cinematic Video Loop (MP4/WebM)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Headline Lines */}
                            <div>
                                <Label htmlFor="headline">
                                    Headline (Separate lines with Enter)
                                </Label>
                                <textarea
                                    id="headline"
                                    rows={2}
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-medium"
                                    placeholder="Born from&#10;Natural Light."
                                    value={form.data.headline}
                                    onChange={(e) => form.setData('headline', e.target.value)}
                                    required
                                />
                                <span className="text-[11px] text-muted-foreground">
                                    Each line creates a distinct animated typographic segment on the hero header.
                                </span>
                                {form.errors.headline && (
                                    <p className="text-xs text-destructive mt-1">{form.errors.headline}</p>
                                )}
                            </div>

                            {/* Subtitle / Description */}
                            <div>
                                <Label htmlFor="sub">Subtitle Narrative</Label>
                                <textarea
                                    id="sub"
                                    rows={3}
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring leading-relaxed"
                                    placeholder="Architectural luminaires inspired by the quality of daylight..."
                                    value={form.data.sub}
                                    onChange={(e) => form.setData('sub', e.target.value)}
                                    required
                                />
                                {form.errors.sub && (
                                    <p className="text-xs text-destructive mt-1">{form.errors.sub}</p>
                                )}
                            </div>

                            {/* Location / Tagline */}
                            <div>
                                <Label htmlFor="location">Specs / Location Tagline</Label>
                                <Input
                                    id="location"
                                    placeholder="e.g. Bollard Series · IP67 · IK10 · 3000K–4000K"
                                    value={form.data.location}
                                    onChange={(e) => form.setData('location', e.target.value)}
                                    required
                                />
                                {form.errors.location && (
                                    <p className="text-xs text-destructive mt-1">{form.errors.location}</p>
                                )}
                            </div>

                            {/* Media Section based on type */}
                            {form.data.type === 'video' ? (
                                <div className="space-y-4 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                                        <VideoIcon className="size-4" /> Video Configuration
                                    </h4>

                                    <div>
                                        <Label htmlFor="video">Video URL (Direct MP4 / CDN Link)</Label>
                                        <Input
                                            id="video"
                                            placeholder="https://videos.pexels.com/video-files/.../hd_1920_1080.mp4"
                                            value={form.data.video}
                                            onChange={(e) => form.setData('video', e.target.value)}
                                        />
                                        <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                                            <span>Or upload video file:</span>
                                            <input
                                                type="file"
                                                accept="video/mp4,video/webm,video/ogg"
                                                className="text-xs"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    form.setData('video_file', file);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="poster">Poster Image (URL or Unsplash Photo ID)</Label>
                                        <Input
                                            id="poster"
                                            placeholder="e.g. 1470252329-01cb79fc2caf or /uploads/..."
                                            value={form.data.poster}
                                            onChange={(e) => {
                                                form.setData('poster', e.target.value);
                                                setPosterPreview(resolveMediaUrl(e.target.value));
                                            }}
                                        />
                                        <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                                            <span>Or upload poster photo:</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="text-xs"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    form.setData('poster_file', file);
                                                    if (file) {
                                                        setPosterPreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </div>

                                        {posterPreview && (
                                            <div className="mt-2 w-36 h-20 rounded border border-border overflow-hidden bg-black/5">
                                                <img src={posterPreview} alt="Poster preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                                        <ImageIcon className="size-4" /> Photography Configuration
                                    </h4>

                                    <div>
                                        <Label htmlFor="image">Image URL or Unsplash Photo ID</Label>
                                        <Input
                                            id="image"
                                            placeholder="e.g. 1785162413090-475d4368ebe9 or https://..."
                                            value={form.data.image}
                                            onChange={(e) => {
                                                form.setData('image', e.target.value);
                                                setImagePreview(resolveMediaUrl(e.target.value));
                                            }}
                                        />
                                        <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                                            <span>Or upload custom photo:</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="text-xs"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    form.setData('image_file', file);
                                                    if (file) {
                                                        setImagePreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </div>

                                        {imagePreview && (
                                            <div className="mt-2 w-44 h-24 rounded border border-border overflow-hidden bg-black/5">
                                                <img src={imagePreview} alt="Image preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Sort Order & Active */}
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <Label htmlFor="sort_order">Sort / Sequence Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={form.data.sort_order}
                                        onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)}
                                    />
                                    <span className="text-[11px] text-muted-foreground">
                                        Lower numbers appear earlier in the hero carousel.
                                    </span>
                                </div>

                                <div className="flex items-center gap-2.5 pt-6">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={form.data.is_active}
                                        onChange={(e) => form.setData('is_active', e.target.checked)}
                                        className="size-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                    />
                                    <Label htmlFor="is_active" className="cursor-pointer font-medium">
                                        Slide is Active on Homepage
                                    </Label>
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div className="flex justify-end gap-2.5 pt-4 border-t border-border/40">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={form.processing}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={form.processing}>
                                    {form.processing ? 'Saving...' : editingSlide ? 'Save Slide Changes' : 'Create Slide'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

HeroSlidesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Hero Slides', href: '/admin/hero-slides' },
    ],
};
