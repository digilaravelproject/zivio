import { ArrowUpRight, Check, Mail, MapPin, Phone } from 'lucide-react';
import { type FormEvent, useState, useEffect } from 'react';
import { contactPageData } from '@/data/contactPageData';
import { Reveal } from '@/components/animations/Reveal';

type ContactFormState = {
    name: string;
    email: string;
    phone: string;
    company: string;
    projectType: string;
    message: string;
};

const initialFormState: ContactFormState = {
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: contactPageData.form.projectTypes[0],
    message: '',
};

export function ContactFormSection() {
    const [formData, setFormData] = useState<ContactFormState>(initialFormState);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Dynamic pre-filling of form based on URL queries (e.g. ?product=Halocore-ARCL13)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const productParam = params.get('product');
            if (productParam) {
                setFormData((prev) => ({
                    ...prev,
                    message: `Hi ZIVIO, I would like to request detailed specifications, pricing guides, and technical planning support for the ${productParam} architectural lighting system. Please connect me with a lighting consultant.`,
                    projectType: 'Architectural',
                }));
            }
        }
    }, []);

    const updateField = (field: keyof ContactFormState, value: string) => {
        setFormData((current) => ({ ...current, [field]: value }));
        setIsSubmitted(false);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(true);
        setFormData(initialFormState);
    };

    return (
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-24 lg:px-10 lg:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:items-start lg:gap-16">
                    {/* Left: Contact Information */}
                    <div className="flex flex-col justify-start">
                        <Reveal threshold={0.15}>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="h-[1px] w-6 bg-[#BDA18A]" />
                                <span className="text-[0.66rem] font-semibold tracking-[0.2em] text-[#BDA18A] uppercase">
                                    INQUIRY CHANNELS
                                </span>
                            </div>
                            <h2 className="text-3xl leading-[1.1] font-semibold text-[#F8F5EC] sm:text-4xl md:text-5xl">
                                Let’s connect.
                            </h2>
                            <p className="mt-4 font-sans text-sm sm:text-base leading-7 text-[#D8D3C8] max-w-lg">
                                Have an architectural project that requires precise light balancing? Reach out through our direct channels or locate our regional showroom below.
                            </p>
                        </Reveal>

                        {/* Info cards list */}
                        <div className="mt-10 grid gap-6">
                            {/* Address Card */}
                            <Reveal threshold={0.15} delay={50} className="flex gap-4 border border-white/[0.04] bg-[#111111]/20 p-5 transition hover:border-white/[0.08]">
                                <div className="grid size-10 place-items-center bg-[#BDA18A]/8 text-[#BDA18A] border border-[#BDA18A]/18 rounded-sm shrink-0">
                                    <MapPin className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-sans text-[0.64rem] font-bold tracking-[0.16em] text-[#A6A6A2] uppercase mb-1">
                                        STUDIO HEADQUARTERS
                                    </span>
                                    <p className="font-sans text-sm leading-6 text-[#F8F5EC]">
                                        {contactPageData.details.address.map((line) => (
                                            <span key={line} className="block">
                                                {line}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </Reveal>

                            {/* Phone Card */}
                            <Reveal threshold={0.15} delay={100} className="flex gap-4 border border-white/[0.04] bg-[#111111]/20 p-5 transition hover:border-white/[0.08]">
                                <div className="grid size-10 place-items-center bg-[#BDA18A]/8 text-[#BDA18A] border border-[#BDA18A]/18 rounded-sm shrink-0">
                                    <Phone className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-sans text-[0.64rem] font-bold tracking-[0.16em] text-[#A6A6A2] uppercase mb-1">
                                        TELEPHONE ENQUIRIES
                                    </span>
                                    <p className="font-sans text-sm leading-6 text-[#F8F5EC]">
                                        {contactPageData.details.phones.map((phone) => (
                                            <a
                                                key={phone}
                                                href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                                                className="block transition duration-300 hover:text-[#BDA18A]"
                                            >
                                                {phone}
                                            </a>
                                        ))}
                                    </p>
                                </div>
                            </Reveal>

                            {/* Email Card */}
                            <Reveal threshold={0.15} delay={150} className="flex gap-4 border border-white/[0.04] bg-[#111111]/20 p-5 transition hover:border-white/[0.08]">
                                <div className="grid size-10 place-items-center bg-[#BDA18A]/8 text-[#BDA18A] border border-[#BDA18A]/18 rounded-sm shrink-0">
                                    <Mail className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-sans text-[0.64rem] font-bold tracking-[0.16em] text-[#A6A6A2] uppercase mb-1">
                                        DIGITAL CORRESPONDENCE
                                    </span>
                                    <a
                                        href={`mailto:${contactPageData.details.email}`}
                                        className="font-sans text-sm text-[#F8F5EC] transition duration-300 hover:text-[#BDA18A]"
                                    >
                                        {contactPageData.details.email}
                                    </a>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Right: Premium glassmorphic form card */}
                    <Reveal threshold={0.1}>
                        <form
                            onSubmit={handleSubmit}
                            className="relative overflow-hidden border border-white/[0.06] bg-[#111111]/30 p-6 shadow-[0_34px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8 rounded-sm"
                        >
                            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#BDA18A]/50 to-transparent" />

                            {isSubmitted ? (
                                <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
                                    <div className="grid size-16 place-items-center bg-[#BDA18A]/10 text-[#BDA18A] border border-[#BDA18A]/30 rounded-full mb-6 shadow-[0_0_24px_rgba(184,138,42,0.14)]">
                                        <Check className="size-8" strokeWidth={2.4} />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-[#F8F5EC] mb-3">Inquiry Sent Successfully</h3>
                                    <p className="font-sans text-sm leading-6 text-[#CFCFCB] max-w-md mb-8">
                                        {contactPageData.form.successMessage}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setIsSubmitted(false)}
                                        className="border border-white/10 bg-white/[0.015] px-6 py-3 font-sans text-xs font-semibold tracking-[0.2em] text-[#F8F5EC] uppercase transition duration-300 hover:border-[#BDA18A] hover:text-[#BDA18A]"
                                    >
                                        Send Another Inquiry
                                    </button>
                                </div>
                            ) : (
                                <div className="grid gap-5">
                                    {/* Name */}
                                    <label className="grid gap-2 font-sans text-[0.66rem] font-bold tracking-[0.16em] text-[#BDA18A] uppercase">
                                        Full Name
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => updateField('name', e.target.value)}
                                            required
                                            className="border border-white/[0.08] bg-[#0A0A0A]/80 px-4 py-3.5 font-sans text-sm tracking-normal text-[#F8F5EC] outline-none transition duration-300 placeholder:text-[#666] focus:border-[#BDA18A]/60 focus:shadow-[0_0_0_1px_rgba(184,138,42,0.15)]"
                                            placeholder="John Doe"
                                        />
                                    </label>

                                    {/* Email & Phone grid */}
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <label className="grid gap-2 font-sans text-[0.66rem] font-bold tracking-[0.16em] text-[#BDA18A] uppercase">
                                            Email Address
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => updateField('email', e.target.value)}
                                                required
                                                className="border border-white/[0.08] bg-[#0A0A0A]/80 px-4 py-3.5 font-sans text-sm tracking-normal text-[#F8F5EC] outline-none transition duration-300 placeholder:text-[#666] focus:border-[#BDA18A]/60 focus:shadow-[0_0_0_1px_rgba(184,138,42,0.15)]"
                                                placeholder="you@example.com"
                                            />
                                        </label>

                                        <label className="grid gap-2 font-sans text-[0.66rem] font-bold tracking-[0.16em] text-[#BDA18A] uppercase">
                                            Phone Number
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => updateField('phone', e.target.value)}
                                                required
                                                className="border border-white/[0.08] bg-[#0A0A0A]/80 px-4 py-3.5 font-sans text-sm tracking-normal text-[#F8F5EC] outline-none transition duration-300 placeholder:text-[#666] focus:border-[#BDA18A]/60 focus:shadow-[0_0_0_1px_rgba(184,138,42,0.15)]"
                                                placeholder="+91-0000000000"
                                            />
                                        </label>
                                    </div>

                                    {/* Company & Project Type grid */}
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <label className="grid gap-2 font-sans text-[0.66rem] font-bold tracking-[0.16em] text-[#BDA18A] uppercase">
                                            Company / Org
                                            <input
                                                type="text"
                                                value={formData.company}
                                                onChange={(e) => updateField('company', e.target.value)}
                                                className="border border-white/[0.08] bg-[#0A0A0A]/80 px-4 py-3.5 font-sans text-sm tracking-normal text-[#F8F5EC] outline-none transition duration-300 placeholder:text-[#666] focus:border-[#BDA18A]/60 focus:shadow-[0_0_0_1px_rgba(184,138,42,0.15)]"
                                                placeholder="Architects Inc."
                                            />
                                        </label>

                                        <label className="grid gap-2 font-sans text-[0.66rem] font-bold tracking-[0.16em] text-[#BDA18A] uppercase">
                                            Project Type
                                            <select
                                                value={formData.projectType}
                                                onChange={(e) => updateField('projectType', e.target.value)}
                                                className="border border-white/[0.08] bg-[#0A0A0A]/80 px-4 py-3.5 font-sans text-sm tracking-normal text-[#F8F5EC] outline-none transition duration-300 focus:border-[#BDA18A]/60 focus:shadow-[0_0_0_1px_rgba(184,138,42,0.15)]"
                                            >
                                                {contactPageData.form.projectTypes.map((t) => (
                                                    <option key={t} value={t} className="bg-[#0A0A0A]">
                                                        {t}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>

                                    {/* Message */}
                                    <label className="grid gap-2 font-sans text-[0.66rem] font-bold tracking-[0.16em] text-[#BDA18A] uppercase">
                                        Project Message
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => updateField('message', e.target.value)}
                                            required
                                            rows={5}
                                            className="resize-none border border-white/[0.08] bg-[#0A0A0A]/80 px-4 py-3.5 font-sans text-sm tracking-normal text-[#F8F5EC] outline-none transition duration-300 placeholder:text-[#666] focus:border-[#BDA18A]/60 focus:shadow-[0_0_0_1px_rgba(184,138,42,0.15)]"
                                            placeholder="Describe your spatial scope, lighting requirements, and estimated timeline."
                                        />
                                    </label>

                                    <button
                                        type="submit"
                                        className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-[#BDA18A]/60 bg-[#BDA18A]/10 px-5 py-3.5 font-sans text-[0.74rem] font-bold tracking-[0.2em] text-[#F8F5EC] uppercase transition duration-500 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A]"
                                    >
                                        {contactPageData.form.submitLabel}
                                        <ArrowUpRight className="size-4" strokeWidth={1.5} />
                                    </button>
                                </div>
                            )}
                        </form>
                    </Reveal>
                </div>

                {/* Visit Our Studio Section (Embed Maps) */}
                <div className="mt-24 border-t border-white/[0.06] pt-20 sm:mt-32 sm:pt-28">
                    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
                        <div className="lg:col-span-4 flex flex-col justify-start">
                            <Reveal threshold={0.15}>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="h-[1px] w-6 bg-[#BDA18A]" />
                                    <span className="text-[0.66rem] font-semibold tracking-[0.2em] text-[#BDA18A] uppercase">
                                        STUDIO LOCATION
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-[#F8F5EC] sm:text-3xl leading-tight">
                                    {contactPageData.details.studioHeading}
                                </h2>
                                <p className="mt-4 font-sans text-xs leading-5 text-[#A6A6A2]">
                                    Experience our architectural and modern lighting solutions live in our interactive showroom. Reach out to schedule a guided curation walk.
                                </p>
                                <div className="mt-8">
                                    <a
                                        href={contactPageData.details.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 border border-[#BDA18A]/60 bg-[#BDA18A]/8 px-5 py-3 font-sans text-xs font-bold tracking-[0.16em] text-[#F8F5EC] uppercase transition duration-300 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A]"
                                    >
                                        Open in Google Maps
                                        <ArrowUpRight className="size-4" strokeWidth={1.5} />
                                    </a>
                                </div>
                            </Reveal>
                        </div>
                        <div className="lg:col-span-8">
                            <Reveal threshold={0.15} delay={80}>
                                <div className="relative border border-white/[0.08] bg-[#0E0E0E] aspect-[16/10] sm:aspect-[21/9] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                    {/* Google Maps embed with gray-invert dark design filters */}
                                    <iframe
                                        src={`https://maps.google.com/maps?q=${contactPageData.details.mapEmbedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                                        className="absolute inset-0 w-full h-full border-none grayscale invert opacity-72 hover:opacity-90 transition duration-700"
                                        allowFullScreen
                                        loading="lazy"
                                        title="ZIVIO Studio Headquarters Map"
                                    />
                                    
                                    {/* Border outline overlay */}
                                    <div className="pointer-events-none absolute inset-0 border border-white/[0.08] z-10" />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
