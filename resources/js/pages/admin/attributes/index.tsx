import { Head, router, useForm } from '@inertiajs/react';
import { Plus, Trash2, Sliders, X, Tag } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AttributeValue {
    id: number;
    attribute_id: number;
    value: string;
    label: string | null;
    sort_order: number;
}

interface Attribute {
    id: number;
    name: string;
    slug: string;
    unit: string | null;
    type: string;
    sort_order: number;
    is_filterable: boolean;
    is_active: boolean;
    values: AttributeValue[];
}

interface Props {
    attributes: Attribute[];
}

export default function AttributesIndex({ attributes }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [activeAddingAttrId, setActiveAddingAttrId] = useState<number | null>(null);
    const [newValueString, setNewValueString] = useState('');

    const form = useForm({
        name: '',
        slug: '',
        unit: '',
        type: 'select',
        sort_order: 0,
        is_filterable: true,
        is_active: true,
        initial_values: '',
    });

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/admin/attributes', {
            onSuccess: () => {
                setIsCreateOpen(false);
                form.reset();
            },
        });
    };

    const handleDeleteAttribute = (id: number) => {
        if (confirm('Are you sure you want to delete this attribute and all its values?')) {
            router.delete(`/admin/attributes/${id}`);
        }
    };

    const handleAddValue = (attributeId: number) => {
        if (!newValueString.trim()) {
return;
}

        router.post(`/admin/attributes/${attributeId}/values`, {
            value: newValueString.trim(),
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setNewValueString('');
                setActiveAddingAttrId(null);
            },
        });
    };

    const handleDeleteValue = (valId: number) => {
        if (confirm('Delete this value?')) {
            router.delete(`/admin/attribute-values/${valId}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <Head title="Technical Attributes & Variant Filters" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <Sliders className="size-6 text-primary" /> Technical Attributes & Variant Filters
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Power, Optic, Driver option, Class, IP, IK, CCT — manage technical parameters and their predefined values.
                    </p>
                </div>
                <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                    <Plus className="size-4" /> Add Attribute
                </Button>
            </div>

            {/* Modal for Creating New Attribute */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
                        <div className="flex justify-between items-center border-b border-border/40 pb-3">
                            <h2 className="text-lg font-semibold text-foreground">Create Technical Attribute</h2>
                            <button onClick={() => setIsCreateOpen(false)} className="text-muted-foreground hover:text-foreground text-sm">
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Attribute Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Power, Optic, CRI, Body Finish"
                                    value={form.data.name}
                                    onChange={(e) => {
                                        form.setData('name', e.target.value);
                                        form.setData('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                                    }}
                                    required
                                />
                                {form.errors.name && <p className="text-xs text-destructive mt-1">{form.errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        placeholder="e.g. power"
                                        value={form.data.slug}
                                        onChange={(e) => form.setData('slug', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="unit">Unit (Optional)</Label>
                                    <Input
                                        id="unit"
                                        placeholder="e.g. W, °, K, Ra"
                                        value={form.data.unit}
                                        onChange={(e) => form.setData('unit', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="initial_values">Initial Values (Comma separated)</Label>
                                <Input
                                    id="initial_values"
                                    placeholder="e.g. 15W, 25W, 50W, 100W"
                                    value={form.data.initial_values}
                                    onChange={(e) => form.setData('initial_values', e.target.value)}
                                />
                                <p className="text-[11px] text-muted-foreground mt-1">You can also add more values later.</p>
                            </div>

                            <div className="flex items-center gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-sm">
                                    <input
                                        type="checkbox"
                                        checked={form.data.is_filterable}
                                        onChange={(e) => form.setData('is_filterable', e.target.checked)}
                                        className="size-4 rounded"
                                    />
                                    <span>Show in Showroom Filters</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-border/40">
                                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={form.processing}>
                                    Create Attribute
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Attributes Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {attributes.map((attr) => (
                    <div
                        key={attr.id}
                        className="bg-card border border-border rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4"
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                        {attr.unit || '#'}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-base text-foreground leading-tight">{attr.name}</h3>
                                        <p className="text-[11px] text-muted-foreground font-mono">slug: {attr.slug}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {attr.is_filterable && (
                                        <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 font-semibold px-2 py-0.5 rounded-full">
                                            Filterable
                                        </span>
                                    )}
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDeleteAttribute(attr.id)}
                                        className="size-8 p-0 text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Values Pills */}
                            <div className="mt-4">
                                <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground block mb-2">
                                    Values ({attr.values.length}):
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {attr.values.map((v) => (
                                        <span
                                            key={v.id}
                                            className="inline-flex items-center gap-1.5 bg-muted/60 hover:bg-muted text-foreground text-xs px-2.5 py-1 rounded-md border border-border/50 group"
                                        >
                                            <span>{v.value}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteValue(v.id)}
                                                className="text-muted-foreground hover:text-destructive transition opacity-60 group-hover:opacity-100"
                                            >
                                                <X className="size-3" />
                                            </button>
                                        </span>
                                    ))}
                                    {attr.values.length === 0 && (
                                        <p className="text-xs text-muted-foreground italic">No values added yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Inline Add Value Input */}
                        <div className="pt-3 border-t border-border/40">
                            {activeAddingAttrId === attr.id ? (
                                <div className="flex items-center gap-2">
                                    <Input
                                        className="h-8 text-xs"
                                        placeholder={`Add value for ${attr.name}...`}
                                        value={newValueString}
                                        onChange={(e) => setNewValueString(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddValue(attr.id);
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <Button size="sm" onClick={() => handleAddValue(attr.id)}>
                                        Add
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => setActiveAddingAttrId(null)}>
                                        Cancel
                                    </Button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        setActiveAddingAttrId(attr.id);
                                        setNewValueString('');
                                    }}
                                    className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
                                >
                                    <Plus className="size-3" /> Add Value
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

AttributesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Attributes & Values', href: '/admin/attributes' },
    ],
};

