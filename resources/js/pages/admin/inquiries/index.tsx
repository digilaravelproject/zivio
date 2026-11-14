import { Head, router } from '@inertiajs/react';
import { Mail, CheckCircle2, Clock, Phone, Building2, ExternalLink, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    project_type: string | null;
    message: string;
    specs_snapshot: any;
    status: string;
    notes: string | null;
    created_at: string;
    product?: {
        id: number;
        name: string;
        slug: string;
    };
    variant?: {
        id: number;
        sku: string;
        title: string | null;
    };
}

interface Props {
    inquiries: {
        data: Inquiry[];
        links: any[];
        total: number;
    };
    currentStatus?: string;
}

export default function InquiriesIndex({ inquiries, currentStatus }: Props) {
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [editingStatus, setEditingStatus] = useState<string>('new');
    const [editingNotes, setEditingNotes] = useState<string>('');

    const openDetails = (inq: Inquiry) => {
        setSelectedInquiry(inq);
        setEditingStatus(inq.status);
        setEditingNotes(inq.notes || '');
    };

    const handleStatusFilter = (status: string) => {
        router.get('/admin/inquiries', status ? { status } : {}, { preserveState: true });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedInquiry) {
return;
}

        router.patch(`/admin/inquiries/${selectedInquiry.id}`, {
            status: editingStatus,
            notes: editingNotes,
        }, {
            onSuccess: () => {
                setSelectedInquiry(null);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this inquiry?')) {
            router.delete(`/admin/inquiries/${id}`);
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <Head title="B2B Specification Inquiries & Leads" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <Mail className="size-6 text-primary" /> B2B Project Inquiries & Leads
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Specification requests, quotation inquiries, and architect consultations submitted from products.
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 bg-muted/50 p-1 rounded-lg border border-border">
                    {['', 'new', 'in_progress', 'contacted', 'closed'].map((st) => (
                        <button
                            key={st}
                            onClick={() => handleStatusFilter(st)}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                (currentStatus || '') === st
                                    ? 'bg-card text-foreground shadow-xs'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {st === '' ? 'All Leads' : st.replace('_', ' ').toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                            <tr>
                                <th className="px-5 py-3.5">Client & Contact</th>
                                <th className="px-5 py-3.5">Company / Project</th>
                                <th className="px-5 py-3.5">Requested Product / Specs</th>
                                <th className="px-5 py-3.5">Status</th>
                                <th className="px-5 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                            {inquiries.data.map((inq) => (
                                <tr key={inq.id} className="hover:bg-muted/20 transition cursor-pointer" onClick={() => openDetails(inq)}>
                                    <td className="px-5 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground">{inq.name}</span>
                                            <span className="text-xs text-muted-foreground">{inq.email}</span>
                                            {inq.phone && <span className="text-[11px] text-muted-foreground">{inq.phone}</span>}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-xs text-foreground">{inq.company || '—'}</span>
                                            <span className="text-[11px] text-muted-foreground">{inq.project_type || 'General'}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        {inq.product ? (
                                            <div>
                                                <span className="font-medium text-xs text-foreground block">{inq.product.name}</span>
                                                {inq.variant && (
                                                    <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono">
                                                        SKU: {inq.variant.sku}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-muted-foreground italic">General Contact Form</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                            inq.status === 'new'
                                                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                                : inq.status === 'contacted'
                                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                : 'bg-muted text-muted-foreground'
                                        }`}>
                                            {inq.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-1.5">
                                            <Button size="sm" variant="outline" onClick={() => openDetails(inq)} className="text-xs h-7">
                                                Review
                                            </Button>
                                            <Button size="sm" variant="ghost" onClick={() => handleDelete(inq.id)} className="size-7 p-0 text-destructive">
                                                <Trash2 className="size-3.5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {inquiries.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-5 py-12 text-center text-muted-foreground">
                                        No inquiries found in this status.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
                        <div className="flex justify-between items-center border-b border-border/40 pb-3">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Inquiry Details #{selectedInquiry.id}</h2>
                                <span className="text-xs text-muted-foreground">{new Date(selectedInquiry.created_at).toLocaleString()}</span>
                            </div>
                            <button onClick={() => setSelectedInquiry(null)} className="text-muted-foreground hover:text-foreground text-sm">
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-3 bg-muted/30 p-3 rounded-lg border border-border/50">
                                <div>
                                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Contact</span>
                                    <p className="font-semibold text-foreground text-sm">{selectedInquiry.name}</p>
                                    <p className="text-muted-foreground">{selectedInquiry.email}</p>
                                    {selectedInquiry.phone && <p className="text-muted-foreground">{selectedInquiry.phone}</p>}
                                    <div className="flex items-center gap-2 mt-2">
                                        <Button size="sm" variant="outline" asChild className="text-[11px] h-6 px-2 gap-1 border-black/15 bg-white">
                                            <a href={`mailto:${selectedInquiry.email}?subject=RE: ZIVIO Architectural Inquiry - ${encodeURIComponent(selectedInquiry.product?.name || 'Lighting Solution')}`}>
                                                <Mail className="size-3 text-[#8E755F]" /> Email
                                            </a>
                                        </Button>
                                        {selectedInquiry.phone && (
                                            <Button size="sm" variant="outline" asChild className="text-[11px] h-6 px-2 gap-1 border-black/15 bg-white">
                                                <a href={`tel:${selectedInquiry.phone}`}>
                                                    <Phone className="size-3 text-[#8E755F]" /> Call
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Project & Company</span>
                                    <p className="font-semibold text-foreground">{selectedInquiry.company || 'Individual'}</p>
                                    <p className="text-muted-foreground">Type: {selectedInquiry.project_type || '—'}</p>
                                </div>
                            </div>

                            {selectedInquiry.product && (
                                <div className="border border-border/60 p-3 rounded-lg">
                                    <span className="text-muted-foreground block text-[10px] uppercase font-bold mb-1">Target Product</span>
                                    <p className="font-semibold text-foreground">{selectedInquiry.product.name}</p>
                                    {selectedInquiry.variant && (
                                        <p className="text-muted-foreground font-mono mt-0.5">
                                            SKU: {selectedInquiry.variant.sku} {selectedInquiry.variant.title && `(${selectedInquiry.variant.title})`}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div>
                                <span className="text-muted-foreground block text-[10px] uppercase font-bold mb-1">Message</span>
                                <div className="p-3 bg-muted/20 border border-border/40 rounded-lg text-foreground whitespace-pre-wrap leading-relaxed">
                                    {selectedInquiry.message}
                                </div>
                            </div>

                            {/* Status Update Form */}
                            <form onSubmit={handleUpdate} className="space-y-3 pt-3 border-t border-border/40">
                                <div>
                                    <label className="text-muted-foreground block text-[10px] uppercase font-bold mb-1">Update Status</label>
                                    <select
                                        value={editingStatus}
                                        onChange={(e) => setEditingStatus(e.target.value)}
                                        className="w-full rounded border border-input bg-card px-2.5 py-1.5 text-xs text-foreground"
                                    >
                                        <option value="new">NEW</option>
                                        <option value="in_progress">IN PROGRESS</option>
                                        <option value="contacted">CONTACTED</option>
                                        <option value="closed">CLOSED</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-muted-foreground block text-[10px] uppercase font-bold mb-1">Internal Notes</label>
                                    <textarea
                                        rows={2}
                                        value={editingNotes}
                                        onChange={(e) => setEditingNotes(e.target.value)}
                                        placeholder="Add notes about client response, quotation sent..."
                                        className="w-full rounded border border-input bg-transparent px-2.5 py-1.5 text-xs text-foreground"
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <Button type="button" variant="outline" size="sm" onClick={() => setSelectedInquiry(null)}>
                                        Close
                                    </Button>
                                    <Button type="submit" size="sm">
                                        Update Lead
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

InquiriesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Inquiries', href: '/admin/inquiries' },
    ],
};

