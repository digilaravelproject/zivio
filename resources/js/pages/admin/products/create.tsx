import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Trash2, ArrowLeft, Lightbulb, Sliders, Check, FileText, Upload, Image as ImageIcon, Images, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Environment {
    id: number;
    name: string;
    categories: { id: number; name: string }[];
}

interface AttributeValue {
    id: number;
    value: string;
}

interface Attribute {
    id: number;
    name: string;
    slug: string;
    unit: string | null;
    values: AttributeValue[];
}

interface Props {
    environments: Environment[];
    attributes: Attribute[];
}

interface VariantRow {
    id?: number;
    sku: string;
    title: string;
    price: string;
    is_default: boolean;
    attribute_values: Record<number, number>; // attribute_id => attribute_value_id
}

interface TechSpecRow {
    label: string;
    value: string;
}

export default function ProductCreate({ environments = [], attributes = [] }: Props) {
    const safeEnvironments = environments || [];
    const safeAttributes = attributes || [];
    const [selectedEnvId, setSelectedEnvId] = useState<number>(safeEnvironments[0]?.id || 0);
    const [specPillInput, setSpecPillInput] = useState('');
    const [appTagInput, setAppTagInput] = useState('');

    const availableCategories = useMemo(() => {
        const env = safeEnvironments.find((e) => e.id === selectedEnvId);

        return env ? (env.categories || []) : [];
    }, [safeEnvironments, selectedEnvId]);

    const form = useForm({
        category_id: availableCategories[0]?.id || '',
        name: '',
        slug: '',
        image: '',
        image_file: null as File | null,
        gallery_files: [] as File[],
        short_description: '',
        description: '',
        specs: ['IP65 Waterproof', 'CRI >90'] as string[],
        technical_specs: [
            { label: 'Input Voltage', value: '220-240V AC' },
            { label: 'Beam Angle', value: '24° Spot' },
        ] as TechSpecRow[],
        applications: ['Architectural Facades', 'Luxury Hotels'] as string[],
        brochure_file: '',
        brochure_upload: null as File | null,
        ies_file: '',
        ies_upload: null as File | null,
        is_featured: false,
        is_active: true,
        variants: [] as VariantRow[],
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<{ id: string; file: File; url: string }[]>([]);

    const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) {
return;
}

        const newItems = files.map((file) => ({
            id: Math.random().toString(36).substring(2, 9),
            file,
            url: URL.createObjectURL(file),
        }));

        const updatedPreviews = [...galleryPreviews, ...newItems];
        setGalleryPreviews(updatedPreviews);
        form.setData('gallery_files', updatedPreviews.map((item) => item.file));
        e.target.value = '';
    };

    const removeGalleryItem = (id: string) => {
        const updated = galleryPreviews.filter((item) => item.id !== id);
        setGalleryPreviews(updated);
        form.setData('gallery_files', updated.map((item) => item.file));
    };

    // Add empty variant
    const addVariant = () => {
        const newVar: VariantRow = {
            sku: '',
            title: '',
            price: '',
            is_default: form.data.variants.length === 0,
            attribute_values: {},
        };
        form.setData('variants', [...form.data.variants, newVar]);
    };

    const removeVariant = (index: number) => {
        const updated = [...form.data.variants];
        updated.splice(index, 1);
        form.setData('variants', updated);
    };

    const updateVariantField = (index: number, field: keyof VariantRow, value: any) => {
        const updated = [...form.data.variants];
        updated[index] = { ...updated[index], [field]: value };
        form.setData('variants', updated);
    };

    const updateVariantAttribute = (variantIndex: number, attributeId: number, valueId: number) => {
        const updated = [...form.data.variants];
        updated[variantIndex] = {
            ...updated[variantIndex],
            attribute_values: {
                ...updated[variantIndex].attribute_values,
                [attributeId]: valueId,
            },
        };
        form.setData('variants', updated);
    };

    // Tech specs handlers
    const addTechSpecRow = () => {
        form.setData('technical_specs', [
            ...form.data.technical_specs,
            { label: '', value: '' },
        ]);
    };

    const removeTechSpecRow = (idx: number) => {
        const updated = [...form.data.technical_specs];
        updated.splice(idx, 1);
        form.setData('technical_specs', updated);
    };

    const updateTechSpec = (idx: number, field: 'label' | 'value', val: string) => {
        const updated = [...form.data.technical_specs];
        updated[idx][field] = val;
        form.setData('technical_specs', updated);
    };

    const addSpecPill = () => {
        if (!specPillInput.trim()) {
return;
}

        form.setData('specs', [...form.data.specs, specPillInput.trim()]);
        setSpecPillInput('');
    };

    const removeSpecPill = (idx: number) => {
        const updated = [...form.data.specs];
        updated.splice(idx, 1);
        form.setData('specs', updated);
    };

    const addAppTag = () => {
        if (!appTagInput.trim()) {
return;
}

        form.setData('applications', [...form.data.applications, appTagInput.trim()]);
        setAppTagInput('');
    };

    const removeAppTag = (idx: number) => {
        const updated = [...form.data.applications];
        updated.splice(idx, 1);
        form.setData('applications', updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/admin/products', { forceFormData: true });
    };

    return (
        <div className="p-6 space-y-6 max-w-5xl mx-auto">
            <Head title="Create Lighting Product" />

            <div className="flex items-center gap-4 border-b border-border/40 pb-5">
                <Button variant="ghost" size="sm" asChild className="size-8 p-0">
                    <Link href="/admin/products">
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <Lightbulb className="size-6 text-primary" /> Create Lighting Product Family
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Define product specifications, environment scope, and selectable technical variants.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Taxonomy & Basic Info */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-5">
                    <h2 className="text-base font-semibold text-foreground border-b border-border/40 pb-2">
                        1. Scope & Categorization
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="env">Environment</Label>
                            <select
                                id="env"
                                value={selectedEnvId}
                                onChange={(e) => {
                                    const envId = parseInt(e.target.value);
                                    setSelectedEnvId(envId);
                                    const cats = environments.find((env) => env.id === envId)?.categories || [];

                                    if (cats.length > 0) {
                                        form.setData('category_id', cats[0].id);
                                    }
                                }}
                                className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs"
                            >
                                {environments.map((env) => (
                                    <option key={env.id} value={env.id}>{env.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="category_id">Category / Mounting Type</Label>
                            <select
                                id="category_id"
                                value={form.data.category_id}
                                onChange={(e) => form.setData('category_id', parseInt(e.target.value))}
                                className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs"
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                {availableCategories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {form.errors.category_id && <p className="text-xs text-destructive mt-1">{form.errors.category_id}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Product Name (e.g. ATLANTIC Bollards)</Label>
                            <Input
                                id="name"
                                placeholder="e.g. GAVLE Surface ceiling luminaires"
                                value={form.data.name}
                                onChange={(e) => {
                                    form.setData('name', e.target.value);
                                    form.setData('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                                }}
                                required
                            />
                            {form.errors.name && <p className="text-xs text-destructive mt-1">{form.errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="slug">Product Slug</Label>
                            <Input
                                id="slug"
                                value={form.data.slug}
                                onChange={(e) => form.setData('slug', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Primary Cover Image & Multi-Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* 1. Primary Luminaire Cover Photo */}
                        <div>
                            <Label htmlFor="image_file" className="font-semibold text-xs flex items-center gap-1.5">
                                <ImageIcon className="size-4 text-[#8E755F]" />
                                Primary Luminaire Cover Photo *
                            </Label>
                            <p className="text-[11px] text-muted-foreground mt-0.5 mb-2">
                                Main photo shown in catalogue, cards, and primary hero view.
                            </p>

                            <div className="flex flex-col gap-2">
                                {imagePreview && (
                                    <div className="relative w-full h-44 rounded-md border border-black/10 overflow-hidden bg-[#FAF9F5] flex items-center justify-center shadow-xs">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-full w-full object-contain p-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                form.setData('image_file', null);
                                                form.setData('image', '');
                                                setImagePreview(null);
                                            }}
                                            className="absolute top-2 right-2 bg-black/75 hover:bg-black text-white rounded-full p-1 text-xs cursor-pointer"
                                            title="Remove image"
                                        >
                                            <X className="size-3.5" />
                                        </button>
                                    </div>
                                )}

                                <div className="relative flex items-center justify-center rounded-md border-2 border-dashed border-input bg-card p-5 hover:border-primary/50 transition">
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
                                        <ImageIcon className="size-7 text-muted-foreground mb-1.5" />
                                        <span className="text-xs font-semibold text-foreground">
                                            {form.data.image_file ? form.data.image_file.name : 'Click or Drag to Upload Cover Photo'}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground mt-0.5">
                                            PNG, JPG, WEBP (Square 1:1 or isolated product cut-out)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Product Gallery (Multiple Images) */}
                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="gallery_files" className="font-semibold text-xs flex items-center gap-1.5">
                                    <Images className="size-4 text-[#8E755F]" />
                                    Product Gallery (Multiple Photos)
                                </Label>
                                {galleryPreviews.length > 0 && (
                                    <span className="text-[10px] font-semibold bg-[#8E755F]/10 text-[#8E755F] px-2 py-0.5 rounded-full border border-[#8E755F]/20">
                                        {galleryPreviews.length} {galleryPreviews.length === 1 ? 'image' : 'images'} selected
                                    </span>
                                )}
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5 mb-2">
                                Multiple photos: dimension diagrams, light distribution, architectural renders.
                            </p>

                            <div className="space-y-2">
                                <div className="relative flex items-center justify-center rounded-md border-2 border-dashed border-input bg-card p-5 hover:border-primary/50 transition">
                                    <input
                                        id="gallery_files"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                        onChange={handleGalleryUpload}
                                    />
                                    <div className="flex flex-col items-center text-center">
                                        <Upload className="size-7 text-muted-foreground mb-1.5" />
                                        <span className="text-xs font-semibold text-foreground">
                                            Click or Drag Multiple Images Here
                                        </span>
                                        <span className="text-[10px] text-muted-foreground mt-0.5">
                                            Select multiple JPG, PNG, WEBP files simultaneously
                                        </span>
                                    </div>
                                </div>

                                {/* Gallery Thumbnails Grid */}
                                {galleryPreviews.length > 0 && (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1 max-h-48 overflow-y-auto p-1 bg-black/[0.02] rounded-md border border-black/5">
                                        {galleryPreviews.map((item) => (
                                            <div
                                                key={item.id}
                                                className="relative group rounded border border-black/10 overflow-hidden bg-white aspect-square flex items-center justify-center shadow-2xs"
                                            >
                                                <img
                                                    src={item.url}
                                                    alt="Gallery"
                                                    className="w-full h-full object-contain p-1"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeGalleryItem(item.id)}
                                                    className="absolute top-1 right-1 bg-black/75 hover:bg-black text-white rounded-full p-0.5 transition cursor-pointer"
                                                    title="Remove from gallery"
                                                >
                                                    <X className="size-3" />
                                                </button>
                                                <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] truncate px-1 py-0.5 text-center">
                                                    {(item.file.size / 1024).toFixed(0)} KB
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="short_description">Short Summary</Label>
                        <textarea
                            id="short_description"
                            rows={2}
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none"
                            placeholder="Architectural overview..."
                            value={form.data.short_description}
                            onChange={(e) => form.setData('short_description', e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Detailed Architectural Description</Label>
                        <textarea
                            id="description"
                            rows={3}
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none"
                            placeholder="Full design and engineering specifics..."
                            value={form.data.description}
                            onChange={(e) => form.setData('description', e.target.value)}
                        />
                    </div>
                </div>

                {/* 2. Technical Variants Builder */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-5">
                    <div className="flex items-center justify-between border-b border-border/40 pb-3">
                        <div>
                            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                                <Sliders className="size-4 text-primary" /> 2. Technical Variants Matrix
                            </h2>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Select Power (W), Optic, Driver, Class, IP, IK, etc. for each variant.
                            </p>
                        </div>
                        <Button type="button" size="sm" onClick={addVariant} className="gap-1.5">
                            <Plus className="size-3.5" /> Add Variant
                        </Button>
                    </div>

                    {form.data.variants.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                            <p className="text-sm">No variants added yet.</p>
                            <Button type="button" variant="outline" size="sm" onClick={addVariant} className="mt-3">
                                Add First Variant
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {form.data.variants.map((v, vIdx) => (
                                <div
                                    key={vIdx}
                                    className="border border-border/70 rounded-lg p-4 bg-muted/20 space-y-3 relative group"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Variant #{vIdx + 1}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(vIdx)}
                                            className="text-muted-foreground hover:text-destructive text-xs"
                                        >
                                            <Trash2 className="size-3.5" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs">Variant Title</Label>
                                            <Input
                                                className="text-xs h-8"
                                                placeholder="e.g. 18W 24° Spot DALI IP65"
                                                value={v.title}
                                                onChange={(e) => updateVariantField(vIdx, 'title', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs">SKU Code</Label>
                                            <Input
                                                className="text-xs h-8"
                                                placeholder="e.g. ATL-18W-DALI-65"
                                                value={v.sku}
                                                onChange={(e) => updateVariantField(vIdx, 'sku', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Dynamic Attributes Grid */}
                                    <div className="pt-2 border-t border-border/40">
                                        <Label className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-1.5">
                                            Select Technical Parameters:
                                        </Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                                            {attributes.map((attr) => (
                                                <div key={attr.id} className="space-y-1">
                                                    <span className="text-[11px] font-medium text-foreground block truncate">
                                                        {attr.name}
                                                    </span>
                                                    <select
                                                        value={v.attribute_values[attr.id] || ''}
                                                        onChange={(e) => updateVariantAttribute(vIdx, attr.id, parseInt(e.target.value))}
                                                        className="w-full rounded border border-input bg-card px-2 py-1 text-xs text-foreground shadow-xs"
                                                    >
                                                        <option value="">— Any / None —</option>
                                                        {attr.values.map((val) => (
                                                            <option key={val.id} value={val.id}>{val.value}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 3. Specifications, Datasheet & Applications */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                    <h2 className="text-base font-semibold text-foreground border-b border-border/40 pb-2">
                        3. Datasheet, Downloads & Applications
                    </h2>

                    {/* Key Highlight Pills */}
                    <div>
                        <Label className="text-xs font-semibold">Key Specs Highlight Pills</Label>
                        <div className="flex flex-wrap gap-2 mt-2 mb-3">
                            {form.data.specs.map((pill, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-xs px-2.5 py-1 rounded-full"
                                >
                                    <span>{pill}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSpecPill(idx)}
                                        className="text-primary hover:text-destructive"
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="e.g. IP66 Waterproof, Low UGR <19"
                                value={specPillInput}
                                onChange={(e) => setSpecPillInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addSpecPill();
                                    }
                                }}
                                className="text-xs h-8 max-w-sm"
                            />
                            <Button type="button" size="sm" variant="outline" onClick={addSpecPill} className="h-8 text-xs">
                                Add Spec Pill
                            </Button>
                        </div>
                    </div>

                    {/* Technical Specs Key-Value Table */}
                    <div className="space-y-3 pt-4 border-t border-border/40">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-semibold">Technical Specifications Table</Label>
                            <button
                                type="button"
                                onClick={addTechSpecRow}
                                className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
                            >
                                <Plus className="size-3" /> Add Row
                            </button>
                        </div>

                        <div className="space-y-2">
                            {form.data.technical_specs.map((row, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <Input
                                        placeholder="Label (e.g. Input Voltage, CRI)"
                                        value={row.label}
                                        onChange={(e) => updateTechSpec(idx, 'label', e.target.value)}
                                        className="text-xs h-8 flex-1"
                                    />
                                    <Input
                                        placeholder="Value (e.g. 220-240V AC, >90 Ra)"
                                        value={row.value}
                                        onChange={(e) => updateTechSpec(idx, 'value', e.target.value)}
                                        className="text-xs h-8 flex-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeTechSpecRow(idx)}
                                        className="text-muted-foreground hover:text-destructive p-1"
                                    >
                                        <Trash2 className="size-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Applications */}
                    <div className="space-y-3 pt-4 border-t border-border/40">
                        <Label className="text-xs font-semibold">Suitable Applications</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {form.data.applications.map((app, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 bg-muted text-foreground text-xs px-2.5 py-1 rounded-md border border-border"
                                >
                                    <span>{app}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeAppTag(idx)}
                                        className="text-muted-foreground hover:text-destructive"
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="e.g. Commercial Facades, Civic Plazas"
                                value={appTagInput}
                                onChange={(e) => setAppTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addAppTag();
                                    }
                                }}
                                className="text-xs h-8 max-w-sm"
                            />
                            <Button type="button" size="sm" variant="outline" onClick={addAppTag} className="h-8 text-xs">
                                Add Application
                            </Button>
                        </div>
                    </div>

                    {/* Brochure PDF & IES Photometrics Direct Upload */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/40">
                        <div>
                            <Label htmlFor="brochure_upload" className="text-xs font-semibold">Upload PDF Datasheet / Brochure</Label>
                            <Input
                                id="brochure_upload"
                                type="file"
                                accept=".pdf"
                                onChange={(e) => form.setData('brochure_upload', e.target.files?.[0] || null)}
                                className="text-xs h-9 cursor-pointer file:cursor-pointer mt-1"
                            />
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                                {form.data.brochure_upload ? form.data.brochure_upload.name : 'PDF format up to 20MB'}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="ies_upload" className="text-xs font-semibold">Upload Photometric (.IES / .LDT) File</Label>
                            <Input
                                id="ies_upload"
                                type="file"
                                accept=".ies,.ldt"
                                onChange={(e) => form.setData('ies_upload', e.target.files?.[0] || null)}
                                className="text-xs h-9 cursor-pointer file:cursor-pointer mt-1"
                            />
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                                {form.data.ies_upload ? form.data.ies_upload.name : 'IES or LDT architectural photometric file'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" asChild>
                        <Link href="/admin/products">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={form.processing}>
                        Save Product & Variants
                    </Button>
                </div>
            </form>
        </div>
    );
}

ProductCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Products', href: '/admin/products' },
        { title: 'Create', href: '/admin/products/create' },
    ],
};
