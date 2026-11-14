import { Head, Link, useForm } from '@inertiajs/react';
import { useMemo, useState, useEffect, lazy, Suspense } from 'react';
import { ArrowLeft, Check, Send, Download, Sliders, ShieldCheck } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from '@/components/layout/Navbar';
import { ProductDetailGallery } from '@/components/products/ProductDetailGallery';
import { ProductListingCard } from '@/components/products/ProductListingCard';
import { Reveal } from '@/components/animations/Reveal';
import { SplashScreen } from '@/components/common/SplashScreen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VariantAttributeValue {
    id: number;
    attribute_id: number;
    value: string;
    attribute?: {
        id: number;
        name: string;
        slug: string;
        unit: string | null;
    };
}

interface ProductVariant {
    id: number;
    sku: string;
    title: string | null;
    price: string | null;
    is_default: boolean;
    attribute_values?: VariantAttributeValue[];
}

interface VariantAttributeGroup {
    id: number;
    name: string;
    slug: string;
    unit: string | null;
    values: string[];
}

interface DatabaseProduct {
    id: number;
    name: string;
    slug: string;
    image: string;
    gallery: string[];
    short_description: string;
    description: string;
    specs: string[];
    technical_specs: { label: string; value: string }[];
    applications: string[];
    brochure_file: string | null;
    ies_file: string | null;
    category?: {
        id: number;
        name: string;
        slug: string;
        environment?: {
            id: number;
            name: string;
            slug: string;
        };
    };
    variants?: ProductVariant[];
}

type ProductDetailsPageProps = {
    slug?: string;
    product?: DatabaseProduct;
    variantAttributes?: VariantAttributeGroup[];
    relatedProducts?: any[];
};

const FooterSection = lazy(() =>
    import('@/sections/FooterSection').then((module) => ({
        default: module.FooterSection,
    })),
);

export default function ProductDetailsPage({
    slug: initialSlug,
    product: dbProduct,
    variantAttributes = [],
    relatedProducts = [],
}: ProductDetailsPageProps) {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, []);

    const product = dbProduct;

    // Selected attribute state (e.g. { power: '18W', optic: '24° Spot', 'driver-option': 'DALI-2', ip: 'IP65' })
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
    const [inquirySuccess, setInquirySuccess] = useState(false);
    const [splash, setSplash] = useState(true);

    // Initialize default selections from available attributes
    useEffect(() => {
        if (variantAttributes.length > 0) {
            const defaults: Record<string, string> = {};
            variantAttributes.forEach((group) => {
                if (group.values.length > 0) {
                    defaults[group.slug] = group.values[0];
                }
            });
            setSelectedAttributes(defaults);
        }
    }, [variantAttributes]);

    // Find the closest matching variant based on selected attributes
    const matchedVariant = useMemo(() => {
        if (!product?.variants || product.variants.length === 0) return null;

        // Try exact match
        const exact = product.variants.find((v) => {
            if (!v.attribute_values) return false;
            return Object.entries(selectedAttributes).every(([attrSlug, attrVal]) => {
                return v.attribute_values?.some(
                    (av) => av.attribute?.slug === attrSlug && av.value === attrVal
                );
            });
        });

        if (exact) return exact;

        // Fallback to default variant or first variant
        return product.variants.find((v) => v.is_default) || product.variants[0];
    }, [product, selectedAttributes]);

    // Inquiry Form
    const inquiryForm = useForm({
        product_id: product?.id || '',
        product_variant_id: matchedVariant?.id || '',
        name: '',
        email: '',
        phone: '',
        company: '',
        project_type: 'Architectural Commercial',
        message: '',
        specs_snapshot: {} as any,
    });

    useEffect(() => {
        if (matchedVariant) {
            inquiryForm.setData((prev) => ({
                ...prev,
                product_id: product?.id || '',
                product_variant_id: matchedVariant.id,
                message: `Hi ZIVIO, I would like to request technical specifications, photometric files (.IES), and a commercial proposal for ${product?.name} (SKU: ${matchedVariant.sku}). Selected options: ${Object.entries(selectedAttributes).map(([k, v]) => `${k.toUpperCase()}: ${v}`).join(', ')}.`,
                specs_snapshot: {
                    sku: matchedVariant.sku,
                    title: matchedVariant.title,
                    attributes: selectedAttributes,
                },
            }));
        }
    }, [matchedVariant, selectedAttributes, product]);

    const handleInquirySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        inquiryForm.post('/inquiry', {
            preserveScroll: true,
            onSuccess: () => {
                setInquirySuccess(true);
                setTimeout(() => {
                    setIsInquiryModalOpen(false);
                    setInquirySuccess(false);
                }, 2500);
            },
        });
    };

    if (!product) {
        return (
            <>
                <Head title="Product Not Found | ZIVIO LIFE" />
                <main className="min-h-screen bg-[#0B0B0B] text-[#F4EFE6] flex flex-col justify-between antialiased">
                    <Navbar />
                    <div className="flex-1 flex flex-col items-center justify-center py-40 px-4 text-center">
                        <div className="h-[1.5px] w-16 bg-[#B5722A] mb-6" />
                        <h1 className="text-3xl font-bold mb-4 text-white">Product Not Found</h1>
                        <Link
                            href="/products"
                            className="border border-[#B5722A] bg-[#B5722A] px-6 py-3 font-sans text-xs font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-[#8C4E18]"
                        >
                            Return to Collection
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    const pageTitle = `${product.name} | ZIVIO LIFE Architectural`;
    const envName = product.category?.environment?.name || 'Architectural';
    const catName = product.category?.name || 'Luminaires';

    return (
        <>
            <Head title={pageTitle}>
                <meta name="description" content={product.short_description || ''} />
                <meta property="og:title" content={pageTitle} />
            </Head>

            <AnimatePresence>
                {splash && <SplashScreen onDone={() => setSplash(false)} fast />}
            </AnimatePresence>

            <main className="min-h-screen bg-[#0B0B0B] text-[#F4EFE6] antialiased">
                <Navbar />

                {/* Breadcrumbs (Dark Luxury Theme) */}
                <section className="relative px-4 py-2.5 sm:px-6 lg:px-10 border-b border-white/[0.08] bg-[#111114]">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-1.5 font-sans text-[0.68rem] font-bold tracking-[0.16em] text-white/50 uppercase">
                                <Link href="/" className="transition hover:text-[#B5722A]">Home</Link>
                                <span className="text-white/20">/</span>
                                <Link href="/products" className="transition hover:text-[#B5722A]">Catalogue</Link>
                                <span className="text-white/20">/</span>
                                <Link href={`/products/${product.category?.environment?.slug || ''}`} className="transition hover:text-[#B5722A] text-white/70">{envName}</Link>
                                <span className="text-white/20">/</span>
                                <Link href={`/products/${product.category?.environment?.slug || ''}/${product.category?.slug || ''}`} className="transition hover:text-[#B5722A] text-white/70">{catName}</Link>
                                <span className="text-white/20">/</span>
                                <span className="text-[#B5722A]">{product.name}</span>
                            </div>

                            <Link
                                href={product.category?.environment?.slug ? `/products/${product.category.environment.slug}/${product.category.slug}` : '/products'}
                                className="font-sans text-[0.68rem] font-bold tracking-[0.14em] text-[#B5722A] uppercase transition hover:opacity-80 flex items-center gap-1"
                            >
                                <ArrowLeft className="size-3" /> Back to {catName}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Main Product Section (Engineered for Single-Screen Luxury Viewport) */}
                <section className="px-4 py-5 sm:py-6 lg:py-7 sm:px-6 lg:px-10">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-6 lg:gap-10 lg:grid-cols-12 items-start">
                            {/* Left: Gallery & Quick Technical Downloads (5 Cols) */}
                            <div className="lg:col-span-5 flex flex-col gap-3">
                                <ProductDetailGallery
                                    images={(() => {
                                        const list: string[] = [];
                                        if (product.image) list.push(product.image);
                                        if (Array.isArray(product.gallery)) {
                                            product.gallery.forEach((img) => {
                                                if (img && !list.includes(img)) list.push(img);
                                            });
                                        }
                                        return list.length > 0 ? list : [product.image || '/images/placeholder.png'];
                                    })()}
                                    name={product.name}
                                />

                                {/* Direct Document Downloads Bar */}
                                <div className="grid grid-cols-2 gap-2 pt-1">
                                    {product.ies_file ? (
                                        <a
                                            href={product.ies_file}
                                            download
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center gap-1.5 border border-white/[0.08] bg-[#121215] hover:border-[#B5722A] px-3 py-2 text-[11px] font-semibold text-white/90 rounded transition shadow-2xs"
                                        >
                                            <Download className="size-3.5 text-[#B5722A]" /> .IES Photometrics
                                        </a>
                                    ) : (
                                        <div className="inline-flex items-center justify-center gap-1.5 border border-white/[0.05] bg-[#16161A] px-3 py-2 text-[11px] text-white/40 rounded">
                                            <ShieldCheck className="size-3.5 text-[#B5722A]" /> IES On Request
                                        </div>
                                    )}

                                    {product.brochure_file ? (
                                        <a
                                            href={product.brochure_file}
                                            download
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center gap-1.5 border border-white/[0.08] bg-[#121215] hover:border-[#B5722A] px-3 py-2 text-[11px] font-semibold text-white/90 rounded transition shadow-2xs"
                                        >
                                            <Download className="size-3.5 text-[#B5722A]" /> PDF Datasheet
                                        </a>
                                    ) : (
                                        <div className="inline-flex items-center justify-center gap-1.5 border border-white/[0.05] bg-[#16161A] px-3 py-2 text-[11px] text-white/40 rounded">
                                            <Download className="size-3.5 text-[#B5722A]" /> CE / CB Compliant
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right: Product Master Info & Compact Amazon/Flipkart Variant Selector (7 Cols) */}
                            <div className="lg:col-span-7 flex flex-col justify-start">
                                {/* Category Tag + SKU Badge row */}
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[0.66rem] font-bold tracking-[0.18em] text-[#B5722A] uppercase">
                                            {envName}
                                        </span>
                                        <span className="text-white/20 text-xs">•</span>
                                        <span className="font-sans text-[0.66rem] font-bold tracking-[0.16em] text-white/60 uppercase">
                                            {catName}
                                        </span>
                                    </div>

                                    {matchedVariant && (
                                        <span className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded font-mono text-[11px] text-white/90">
                                            <span className="text-white/40 uppercase text-[9px] font-sans">SKU:</span>
                                            <span className="font-bold text-[#B5722A]">{matchedVariant.sku}</span>
                                        </span>
                                    )}
                                </div>

                                {/* Product Title */}
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-2">
                                    {product.name}
                                </h1>

                                {/* Short Description */}
                                <p className="font-sans text-xs sm:text-sm leading-relaxed text-white/70 mb-3 max-w-2xl">
                                    {product.short_description}
                                </p>

                                {/* Key Highlight Specs Pills */}
                                {product.specs && product.specs.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                                        {product.specs.map((spec) => (
                                            <span
                                                key={spec}
                                                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 font-sans text-[11px] font-semibold text-white/80"
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Interactive Technical Variant Selector */}
                                {variantAttributes.length > 0 && (
                                    <div className="border border-white/[0.08] bg-[#121215] p-3.5 sm:p-4 rounded-sm mb-3.5 space-y-3 shadow-2xs">
                                        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                                            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#B5722A] flex items-center gap-1.5">
                                                <Sliders className="size-3.5" /> Technical Configuration
                                            </span>
                                            <span className="text-[10px] text-white/40">
                                                {product.variants?.length || 0} Variants Available
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                                            {variantAttributes.map((attrGroup) => {
                                                const currentValue = selectedAttributes[attrGroup.slug] || '';
                                                const isShortList = attrGroup.values.length <= 4;

                                                return (
                                                    <div key={attrGroup.id} className="space-y-1">
                                                        <div className="text-[10px] uppercase tracking-wider font-bold text-white/70 flex items-center justify-between">
                                                            <span>{attrGroup.name}</span>
                                                            {attrGroup.unit && <span className="text-white/40 lowercase">({attrGroup.unit})</span>}
                                                        </div>

                                                        {isShortList ? (
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {attrGroup.values.map((val) => {
                                                                    const isSelected = currentValue === val;
                                                                    return (
                                                                        <button
                                                                            key={val}
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setSelectedAttributes({
                                                                                    ...selectedAttributes,
                                                                                    [attrGroup.slug]: val,
                                                                                });
                                                                            }}
                                                                            className={`px-2.5 py-1 text-[11px] font-semibold rounded border transition-all cursor-pointer ${
                                                                                isSelected
                                                                                    ? 'border-[#B5722A] bg-[#B5722A] text-white shadow-2xs'
                                                                                    : 'border-white/[0.08] bg-white/[0.03] text-white/70 hover:border-[#B5722A] hover:bg-white/[0.06]'
                                                                            }`}
                                                                        >
                                                                            {val}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        ) : (
                                                            <select
                                                                value={currentValue}
                                                                onChange={(e) => {
                                                                    setSelectedAttributes({
                                                                        ...selectedAttributes,
                                                                        [attrGroup.slug]: e.target.value,
                                                                    });
                                                                }}
                                                                className="w-full bg-[#18181D] border border-white/[0.08] rounded px-2.5 py-1.5 text-xs text-white/90 focus:border-[#B5722A] focus:outline-none"
                                                            >
                                                                {attrGroup.values.map((val) => (
                                                                    <option key={val} value={val} className="bg-[#18181D] text-white">
                                                                        {val}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* B2B Specification & Quotation Box */}
                                <div className="border border-white/[0.08] bg-[#121215] p-3.5 sm:p-4 rounded-sm shadow-2xs relative overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B5722A]" />
                                    
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                        <Button
                                            onClick={() => setIsInquiryModalOpen(true)}
                                            className="flex-1 bg-[#B5722A] text-white hover:bg-[#8C4E18] font-bold text-xs uppercase tracking-[0.16em] h-11 flex items-center justify-center gap-2 cursor-pointer shadow-sm transition"
                                        >
                                            <Send className="size-3.5 text-white/90" />
                                            Request Specification & Quote
                                        </Button>
                                        <Link
                                            href={`/contact?product=${encodeURIComponent(product.name)}`}
                                            className="inline-flex items-center justify-center border border-white/[0.15] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold tracking-wider text-white uppercase hover:border-[#B5722A] hover:bg-white/[0.08] rounded transition"
                                        >
                                            Consult Engineer
                                        </Link>
                                    </div>

                                    {/* Reassurance highlights */}
                                    <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-[11px] text-white/50 gap-2">
                                        <span className="flex items-center gap-1">
                                            <Check className="size-3 text-emerald-400" /> B2B Architectural Schedules
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Check className="size-3 text-emerald-400" /> Photometrics & 3D BIM
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Check className="size-3 text-emerald-400" /> 24h Turnaround
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Technical Specifications Table */}
                        {product.technical_specs && product.technical_specs.length > 0 && (
                            <div className="mt-20 border-t border-white/[0.08] pt-16">
                                <div className="grid gap-12 lg:grid-cols-12">
                                    <div className="lg:col-span-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="h-[1px] w-6 bg-[#B5722A]" />
                                            <span className="text-[0.66rem] font-semibold tracking-[0.2em] text-[#B5722A] uppercase">
                                                DATASHEET
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-semibold text-white sm:text-3xl leading-tight">
                                            Technical Specifications
                                        </h2>
                                        <p className="mt-4 font-sans text-xs leading-5 text-white/60">
                                            Engineered compliance standards, physical tolerances, and photometric configurations for architectural consistency.
                                        </p>
                                    </div>
                                    <div className="lg:col-span-8">
                                        <div className="border border-white/[0.08] bg-[#121215] shadow-xs overflow-hidden rounded-xs">
                                            <table className="w-full text-left font-sans text-[0.78rem] border-collapse">
                                                <tbody>
                                                    {product.technical_specs.map((spec, idx) => (
                                                        <tr
                                                            key={idx}
                                                            className={`border-b border-white/[0.06] ${idx % 2 === 0 ? 'bg-[#121215]' : 'bg-[#15151A]'}`}
                                                        >
                                                            <td className="px-5 py-4 font-bold text-white w-1/3">
                                                                {spec.label}
                                                            </td>
                                                            <td className="px-5 py-4 text-white/70">
                                                                {spec.value}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Related Products Showcase */}
                        {relatedProducts && relatedProducts.length > 0 && (
                            <div className="mt-24 border-t border-white/[0.08] pt-20">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="h-[1px] w-6 bg-[#B5722A]" />
                                            <span className="text-[0.66rem] font-semibold tracking-[0.2em] text-[#B5722A] uppercase">
                                                CATALOG
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white sm:text-3xl tracking-tight">
                                            Related Lighting Systems
                                        </h2>
                                    </div>
                                    <Link
                                        href="/products"
                                        className="font-sans text-[0.74rem] font-bold tracking-[0.14em] text-[#B5722A] uppercase transition hover:text-[#C9944A]"
                                    >
                                        View Full Collection →
                                    </Link>
                                </div>

                                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {relatedProducts.map((p, idx) => (
                                        <ProductListingCard
                                            key={p.id}
                                            product={{
                                                id: String(p.id),
                                                slug: p.slug,
                                                name: p.name,
                                                category: p.category?.environment?.name || p.category?.name || 'Architectural',
                                                type: p.category?.name || 'Luminaire',
                                                image: p.image,
                                                gallery: p.gallery || [p.image],
                                                shortDescription: p.short_description || p.shortDescription || '',
                                                description: p.description,
                                                specs: p.specs || [],
                                                technicalSpecs: p.technical_specs || [],
                                                applications: p.applications || [],
                                            } as any}
                                            index={idx}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Inquiry Modal */}
                {isInquiryModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                        <div className="bg-[#121215] border border-white/[0.08] rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 text-white">
                            <div className="flex justify-between items-start border-b border-white/[0.08] pb-4">
                                <div>
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#B5722A] uppercase block">
                                        SPECIFICATION INQUIRY
                                    </span>
                                    <h2 className="text-xl font-bold text-white mt-1">{product.name}</h2>
                                    {matchedVariant && (
                                        <p className="text-xs text-white/50 font-mono mt-0.5">SKU: {matchedVariant.sku}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsInquiryModalOpen(false)}
                                    className="text-white/50 hover:text-white text-lg p-1"
                                >
                                    ✕
                                </button>
                            </div>

                            {inquirySuccess ? (
                                <div className="py-12 text-center space-y-3">
                                    <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                                        <Check className="size-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Inquiry Submitted</h3>
                                    <p className="text-xs text-white/60 max-w-xs mx-auto">
                                        Our lighting technical engineers will review your specification requirements and respond with CAD/photometric files and a quotation.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleInquirySubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs text-white/70">Your Name *</Label>
                                            <Input
                                                required
                                                className="bg-[#18181D] border-white/[0.1] text-xs h-9 text-white focus:border-[#B5722A]"
                                                value={inquiryForm.data.name}
                                                onChange={(e) => inquiryForm.setData('name', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs text-white/70">Corporate Email *</Label>
                                            <Input
                                                type="email"
                                                required
                                                className="bg-[#18181D] border-white/[0.1] text-xs h-9 text-white focus:border-[#B5722A]"
                                                value={inquiryForm.data.email}
                                                onChange={(e) => inquiryForm.setData('email', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs text-white/70">Company / Studio</Label>
                                            <Input
                                                className="bg-[#18181D] border-white/[0.1] text-xs h-9 text-white focus:border-[#B5722A]"
                                                placeholder="Architecture firm / Contractor"
                                                value={inquiryForm.data.company}
                                                onChange={(e) => inquiryForm.setData('company', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs text-white/70">Phone Number</Label>
                                            <Input
                                                className="bg-[#18181D] border-white/[0.1] text-xs h-9 text-white focus:border-[#B5722A]"
                                                value={inquiryForm.data.phone}
                                                onChange={(e) => inquiryForm.setData('phone', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-xs text-white/70">Project Scope / Message</Label>
                                        <textarea
                                            rows={3}
                                            required
                                            className="w-full rounded-md border border-white/[0.1] bg-[#18181D] px-3 py-2 text-xs text-white focus:border-[#B5722A] focus:outline-none"
                                            value={inquiryForm.data.message}
                                            onChange={(e) => inquiryForm.setData('message', e.target.value)}
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 pt-3 border-t border-white/[0.08]">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setIsInquiryModalOpen(false)}
                                            className="text-xs text-white/60 hover:text-white"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={inquiryForm.processing}
                                            className="bg-[#B5722A] text-white hover:bg-[#8C4E18] font-bold text-xs"
                                        >
                                            Send Specification Request
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                <Suspense fallback={<div className="min-h-32 bg-[#0B0B0B]" />}>
                    <FooterSection />
                </Suspense>
            </main>
        </>
    );
}
