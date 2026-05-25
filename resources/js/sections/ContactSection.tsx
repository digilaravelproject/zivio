import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { contactData, type ContactFormField } from '@/data/contactData';

type ContactFormState = Record<ContactFormField, string>;

const initialFormState: ContactFormState = {
    name: '',
    email: '',
    phone: '',
    projectType: contactData.projectTypes[0],
    message: '',
};

export function ContactSection() {
    const [formData, setFormData] =
        useState<ContactFormState>(initialFormState);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const updateField = (field: ContactFormField, value: string) => {
        setFormData((current) => ({ ...current, [field]: value }));
        setIsSubmitted(false);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(true);
        setFormData(initialFormState);
    };

    return (
        <section className="relative overflow-hidden bg-[#080808] px-4 py-14 text-[#F5F5F2] sm:px-6 sm:py-20 lg:px-10 lg:py-[7.5rem]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,138,42,0.08),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.04),transparent_26%),linear-gradient(140deg,#080808_0%,#101010_48%,#070707_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(184,138,42,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:20rem_100%,100%_7rem] opacity-[0.16]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B88A2A]/24 to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_0.78fr] lg:items-start lg:gap-16"
            >
                <div className="max-w-2xl">
                    <div className="mb-5 flex items-center gap-4">
                        <span className="h-px w-10 bg-[#B88A2A]" />
                        <p className="font-sans text-[0.62rem] font-semibold tracking-[0.32em] text-[#B88A2A] uppercase sm:text-[0.64rem]">
                            {contactData.label}
                        </p>
                    </div>

                    <h2 className="max-w-2xl text-[2.35rem] leading-[1.02] font-semibold text-balance text-[#F8F5EC] sm:text-5xl lg:text-[3.8rem]">
                        {contactData.heading}
                    </h2>

                    <p className="mt-5 max-w-xl font-sans text-sm leading-7 tracking-[0.01em] text-[#CFCFCB] sm:mt-6 sm:text-base sm:leading-8">
                        {contactData.paragraph}
                    </p>

                    <div className="mt-8 grid gap-5 border-l border-[#B88A2A]/26 pl-5 font-sans text-sm leading-7 text-[#D8D3C8]">
                        <div className="flex gap-4">
                            <MapPin className="mt-1 size-4 shrink-0 text-[#B88A2A]" />
                            <p>
                                {contactData.address.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Phone className="mt-1 size-4 shrink-0 text-[#B88A2A]" />
                            <p>
                                {contactData.phones.map((phone) => (
                                    <a
                                        key={phone}
                                        href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                                        className="block transition duration-300 hover:text-[#D2B276]"
                                    >
                                        {phone}
                                    </a>
                                ))}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Mail className="mt-1 size-4 shrink-0 text-[#B88A2A]" />
                            <a
                                href={`mailto:${contactData.email}`}
                                className="transition duration-300 hover:text-[#D2B276]"
                            >
                                {contactData.email}
                            </a>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="relative overflow-hidden border border-white/[0.09] bg-white/[0.035] p-5 shadow-[0_34px_100px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-7 lg:p-8"
                >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B88A2A]/55 to-transparent" />

                    <div className="grid gap-4">
                        <label className="grid gap-2 font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-[#B88A2A] uppercase">
                            Name
                            <input
                                id="contact-name"
                                name="name"
                                value={formData.name}
                                onChange={(event) =>
                                    updateField('name', event.target.value)
                                }
                                required
                                className="border border-white/[0.09] bg-[#080808]/72 px-4 py-3.5 font-sans text-sm tracking-normal text-[#F8F5EC] outline-none transition duration-300 placeholder:text-[#77736B] focus:border-[#B88A2A]/60 focus:shadow-[0_0_0_1px_rgba(184,138,42,0.18)]"
                                placeholder="Your name"
                            />
                        </label>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="grid gap-2 font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-[#B88A2A] uppercase">
                                Email
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(event) =>
                                        updateField('email', event.target.value)
                                    }
                                    required
                                    className="border border-white/[0.09] bg-[#080808]/72 px-4 py-3.5 font-sans text-sm tracking-normal text-[#F8F5EC] outline-none transition duration-300 placeholder:text-[#77736B] focus:border-[#B88A2A]/60 focus:shadow-[0_0_0_1px_rgba(184,138,42,0.18)]"
                                    placeholder="you@example.com"
                                />
                            </label>

                            <label className="grid gap-2 font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-[#B88A2A] uppercase">
                                Phone
                                <input
                                    id="contact-phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(event) =>
                                        updateField('phone', event.target.value)
                                    }
                                    className="border border-white/[0.09] bg-[#080808]/72 px-4 py-3.5 font-sans text-sm tracking-normal text-[#F8F5EC] outline-none transition duration-300 placeholder:text-[#77736B] focus:border-[#B88A2A]/60 focus:shadow-[0_0_0_1px_rgba(184,138,42,0.18)]"
                                    placeholder="+91..."
                                />
                            </label>
                        </div>

                        <label className="grid gap-2 font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-[#B88A2A] uppercase">
                            Project Type
                            <select
                                id="contact-project-type"
                                name="projectType"
                                value={formData.projectType}
                                onChange={(event) =>
                                    updateField(
                                        'projectType',
                                        event.target.value,
                                    )
                                }
                                className="border border-white/[0.09] bg-[#080808]/72 px-4 py-3.5 font-sans text-sm tracking-normal text-[#F8F5EC] outline-none transition duration-300 focus:border-[#B88A2A]/60 focus:shadow-[0_0_0_1px_rgba(184,138,42,0.18)]"
                            >
                                {contactData.projectTypes.map((projectType) => (
                                    <option key={projectType} value={projectType}>
                                        {projectType}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="grid gap-2 font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-[#B88A2A] uppercase">
                            Message
                            <textarea
                                id="contact-message"
                                name="message"
                                value={formData.message}
                                onChange={(event) =>
                                    updateField('message', event.target.value)
                                }
                                required
                                rows={5}
                                className="resize-none border border-white/[0.09] bg-[#080808]/72 px-4 py-3.5 font-sans text-sm tracking-normal text-[#F8F5EC] outline-none transition duration-300 placeholder:text-[#77736B] focus:border-[#B88A2A]/60 focus:shadow-[0_0_0_1px_rgba(184,138,42,0.18)]"
                                placeholder="Tell us about your space, lighting goals, and timeline."
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 border border-[#B88A2A]/60 bg-[#B88A2A]/10 px-5 py-3.5 font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-[#F8F5EC] uppercase transition duration-500 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A]"
                    >
                        {contactData.submitLabel}
                        <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </button>

                    {isSubmitted && (
                        <p className="mt-4 border border-[#B88A2A]/24 bg-[#B88A2A]/8 px-4 py-3 font-sans text-sm leading-6 text-[#D8D3C8]">
                            {contactData.successMessage}
                        </p>
                    )}
                </form>
            </motion.div>
        </section>
    );
}
