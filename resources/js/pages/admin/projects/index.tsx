import { Head, router, useForm } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import {
    Plus,
    Edit2,
    Trash2,
    Building2,
    Image as ImageIcon,
    Search,
    SlidersHorizontal,
    Sparkles,
    CheckCircle2,
    Eye,
    Globe,
    Calendar,
    Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface Project {
    id: number;
    name: string;
    country: string;
    type: string;
    year: string | null;
    scope: string | null;
    image: string;
    image_url: string;
    is_marquee_row1: boolean;
    is_marquee_row2: boolean;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    projects: Project[];
}

export default function ProjectsIndex({ projects }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('ALL');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const form = useForm({
        name: '',
        country: '',
        type: 'Commercial',
        year: new Date().getFullYear().toString(),
        scope: '',
        image: '',
        image_file: null as File | null,
        is_marquee_row1: true,
        is_marquee_row2: false,
        sort_order: 0,
        is_active: true,
    });

    const openCreate = () => {
        setEditingProject(null);
        form.reset();
        setImagePreview(null);
        setIsCreateOpen(true);
    };

    const openEdit = (project: Project) => {
        setEditingProject(project);
        setImagePreview(project.image_url || null);
        form.setData({
            name: project.name,
            country: project.country,
            type: project.type,
            year: project.year || '',
            scope: project.scope || '',
            image: project.image || '',
            image_file: null,
            is_marquee_row1: project.is_marquee_row1,
            is_marquee_row2: project.is_marquee_row2,
            sort_order: project.sort_order,
            is_active: project.is_active,
        });
        setIsCreateOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProject) {
            form.transform((data) => ({
                ...data,
                _method: 'put',
            })).post(`/admin/projects/${editingProject.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    setIsCreateOpen(false);
                    setEditingProject(null);
                    setImagePreview(null);
                },
            });
        } else {
            form.post('/admin/projects', {
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
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(`/admin/projects/${id}`);
        }
    };

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projects.filter((p) => {
            const matchesSearch =
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.scope && p.scope.toLowerCase().includes(searchQuery.toLowerCase())) ||
                p.type.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesType = selectedType === 'ALL' || p.type.toLowerCase() === selectedType.toLowerCase();

            return matchesSearch && matchesType;
        });
    }, [projects, searchQuery, selectedType]);

    // Unique types for filter bar
    const availableTypes = useMemo(() => {
        const types = Array.from(new Set(projects.map((p) => p.type)));
        return ['ALL', ...types];
    }, [projects]);

    const stats = useMemo(() => {
        return {
            total: projects.length,
            active: projects.filter((p) => p.is_active).length,
            row1: projects.filter((p) => p.is_marquee_row1).length,
            row2: projects.filter((p) => p.is_marquee_row2).length,
        };
    }, [projects]);

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <Head title="Projects & Architecture Showcase" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
                        <Building2 className="size-6 text-primary" /> Projects & Architecture Showcase
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Curate landmark projects, client installations, and high-impact architectural marquees shown across Zivio.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={openCreate} className="gap-2 shadow-xs cursor-pointer">
                        <Plus className="size-4" /> Add Project
                    </Button>
                </div>
            </div>

            {/* Metric Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border/70 rounded-xl p-4 shadow-xs">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Projects</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
                </div>
                <div className="bg-card border border-border/70 rounded-xl p-4 shadow-xs">
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Active Published</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{stats.active}</p>
                </div>
                <div className="bg-card border border-border/70 rounded-xl p-4 shadow-xs">
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Marquee Row 1</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stats.row1}</p>
                </div>
                <div className="bg-card border border-border/70 rounded-xl p-4 shadow-xs">
                    <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Marquee Row 2</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stats.row2}</p>
                </div>
            </div>

            {/* Search & Type Filter Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-card border border-border/60 p-3 rounded-xl">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Search projects, client, country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9"
                    />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                    {availableTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all shrink-0 cursor-pointer ${
                                selectedType === type
                                    ? 'bg-primary text-primary-foreground shadow-xs font-semibold'
                                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Modal / Form Drawer */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-card border border-border rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 my-8">
                        <div className="flex justify-between items-center border-b border-border/40 pb-3">
                            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                <Building2 className="size-5 text-primary" />
                                {editingProject ? 'Edit Project' : 'Add New Project'}
                            </h2>
                            <button
                                onClick={() => setIsCreateOpen(false)}
                                className="text-muted-foreground hover:text-foreground text-sm cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Project / Client Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Tata Realty — Intelian Park"
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    required
                                />
                                {form.errors.name && <p className="text-xs text-destructive mt-1">{form.errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="country">Location / Country</Label>
                                    <Input
                                        id="country"
                                        placeholder="e.g. Mumbai, India"
                                        value={form.data.country}
                                        onChange={(e) => form.setData('country', e.target.value)}
                                        required
                                    />
                                    {form.errors.country && <p className="text-xs text-destructive mt-1">{form.errors.country}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="type">Building / Project Type</Label>
                                    <Input
                                        id="type"
                                        placeholder="e.g. Commercial / Residential / Retail / Hospitality"
                                        value={form.data.type}
                                        onChange={(e) => form.setData('type', e.target.value)}
                                        required
                                    />
                                    {form.errors.type && <p className="text-xs text-destructive mt-1">{form.errors.type}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="year">Year Completed</Label>
                                    <Input
                                        id="year"
                                        placeholder="e.g. 2024"
                                        value={form.data.year}
                                        onChange={(e) => form.setData('year', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="scope">Lighting Scope</Label>
                                    <Input
                                        id="scope"
                                        placeholder="e.g. Facade & Landscape"
                                        value={form.data.scope}
                                        onChange={(e) => form.setData('scope', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Image Upload & Unsplash ID */}
                            <div className="space-y-2">
                                <Label>Project Image</Label>
                                {imagePreview && (
                                    <div className="relative w-full h-36 rounded-lg border border-border overflow-hidden bg-muted flex items-center justify-center">
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

                                <div className="grid grid-cols-1 gap-2">
                                    <div className="relative flex items-center justify-center rounded-lg border-2 border-dashed border-input bg-card p-4 hover:border-primary/50 transition">
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
                                            <ImageIcon className="size-5 text-muted-foreground mb-1" />
                                            <span className="text-xs font-semibold text-foreground">
                                                {form.data.image_file ? form.data.image_file.name : 'Upload Project Photo (File)'}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground mt-0.5">
                                                JPG, PNG, WEBP up to 10MB
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="image_alt" className="text-xs text-muted-foreground">Or Unsplash Photo ID / Image URL</Label>
                                        <Input
                                            id="image_alt"
                                            placeholder="e.g. 1512453979798-5ea266f8880c or https://..."
                                            value={form.data.image}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                form.setData('image', val);
                                                if (val && !form.data.image_file) {
                                                    if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('/')) {
                                                        setImagePreview(val);
                                                    } else {
                                                        setImagePreview(`https://images.unsplash.com/photo-${val}?auto=format&fit=crop&w=800&q=80`);
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Placement Toggles */}
                            <div className="p-3 bg-muted/40 rounded-lg space-y-2 border border-border/50">
                                <span className="text-xs font-semibold text-foreground block">Marquee Section Placements</span>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.data.is_marquee_row1}
                                            onChange={(e) => form.setData('is_marquee_row1', e.target.checked)}
                                            className="size-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                                        />
                                        <span className="text-xs font-medium text-foreground">Show in Marquee Row 1</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.data.is_marquee_row2}
                                            onChange={(e) => form.setData('is_marquee_row2', e.target.checked)}
                                            className="size-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                                        />
                                        <span className="text-xs font-medium text-foreground">Show in Marquee Row 2</span>
                                    </label>
                                </div>
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
                                        className="size-4 rounded border-gray-300 cursor-pointer"
                                    />
                                    <Label htmlFor="is_active" className="cursor-pointer">Active / Published</Label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-border/40">
                                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={form.processing}>
                                    {editingProject ? 'Save Changes' : 'Create Project'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Projects Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase font-semibold text-muted-foreground tracking-wider">
                            <tr>
                                <th className="px-5 py-3.5">Project</th>
                                <th className="px-4 py-3.5">Location</th>
                                <th className="px-4 py-3.5">Type</th>
                                <th className="px-4 py-3.5">Year & Scope</th>
                                <th className="px-4 py-3.5">Marquee Placement</th>
                                <th className="px-4 py-3.5 text-center">Order</th>
                                <th className="px-4 py-3.5 text-center">Status</th>
                                <th className="px-5 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {filteredProjects.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                                        No projects found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredProjects.map((p) => (
                                    <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-16 rounded-md overflow-hidden bg-muted shrink-0 border border-border">
                                                    <img
                                                        src={p.image_url}
                                                        alt={p.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-foreground block leading-tight">{p.name}</span>
                                                    <span className="text-xs text-muted-foreground block mt-0.5">{p.scope || 'Full Lighting Design'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Globe className="size-3.5 shrink-0 text-muted-foreground/80" />
                                                <span>{p.country}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                                                {p.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1 font-mono">
                                                <Calendar className="size-3 text-muted-foreground" />
                                                <span>{p.year || '—'}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex flex-wrap gap-1">
                                                {p.is_marquee_row1 && (
                                                    <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                                                        Row 1
                                                    </span>
                                                )}
                                                {p.is_marquee_row2 && (
                                                    <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                                                        Row 2
                                                    </span>
                                                )}
                                                {!p.is_marquee_row1 && !p.is_marquee_row2 && (
                                                    <span className="text-[11px] text-muted-foreground italic">None</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5 text-center text-xs font-mono text-muted-foreground">
                                            #{p.sort_order}
                                        </td>
                                        <td className="px-4 py-3.5 text-center">
                                            <span
                                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    p.is_active
                                                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                                        : 'bg-muted text-muted-foreground border border-border'
                                                }`}
                                            >
                                                {p.is_active ? 'Active' : 'Hidden'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => openEdit(p)}
                                                    className="size-8 p-0 cursor-pointer hover:bg-muted"
                                                    title="Edit Project"
                                                >
                                                    <Edit2 className="size-3.5" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(p.id)}
                                                    className="size-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                                                    title="Delete Project"
                                                >
                                                    <Trash2 className="size-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

ProjectsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Projects Showcase', href: '/admin/projects' },
    ],
};
