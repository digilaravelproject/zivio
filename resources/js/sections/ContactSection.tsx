import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

import { Reveal } from '@/components/animations/Reveal';
import { contactData } from '@/data/contactData';
import type { ContactFormField } from '@/data/contactData';

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
        <section className="relative overflow-hidden bg-editorial-light px-4 py-16 text-[#171512] sm:px-6 sm:py-24 lg:px-10 lg:py-[8rem]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(123,96,58,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(123,96,58,0.03)_1px,transparent_1px)] bg-[size:20rem_100%,100%_8rem] opacity-[0.32]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-warm-divider" />

            <Reveal
                className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_0.78fr] lg:items-start lg:gap-16"
                threshold={0.15}
            >
                <div className="max-w-2xl">
                    <div className="mb-5 flex items-center gap-4">
                        <span className="h-[1px] w-10 bg-[#B8945F]" />
                        <p className="text-luxury-label">
                            {contactData.label}
                        </p>
                    </div>

                    <h2 className="text-editorial-heading-dark max-w-xl">
                        {contactData.heading}
                    </h2>

                    <p className="mt-5 max-w-xl text-editorial-paragraph">
                        {contactData.paragraph}
                    </p>

                    <div className="mt-8 grid gap-5 border-l border-[#8D6B38]/22 pl-5 font-sans text-sm leading-7 text-[#665F53]">
                        <div className="flex gap-4">
                            <MapPin className="mt-1 size-4 shrink-0 text-[#8D6B38]" />
                            <p>
                                {contactData.address.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Phone className="mt-1 size-4 shrink-0 text-[#8D6B38]" />
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
                            <Mail className="mt-1 size-4 shrink-0 text-[#8D6B38]" />
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
                    className="relative overflow-hidden border border-[#8D6B38]/14 bg-[#F8F4EC]/68 p-5 shadow-[0_34px_100px_rgba(42,34,24,0.14)] backdrop-blur-xl sm:p-7 lg:p-8"
                >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B8945F]/55 to-transparent" />

                    <div className="grid gap-4">
                        <label className="grid gap-2 font-sans text-[0.6rem] font-semibold tracking-[0.16em] text-[#8D6B38] uppercase">
                            Name
                            <input
                                id="contact-name"
                                name="name"
                                value={formData.name}
                                onChange={(event) =>
                                    updateField('name', event.target.value)
                                }
                                required
                                className="border border-[#8D6B38]/14 bg-[#F7F1E8]/82 px-4 py-3.5 font-sans text-sm tracking-normal text-[#171512] outline-none transition duration-300 placeholder:text-[#8F877A] focus:border-[#8D6B38]/50 focus:shadow-[0_0_0_1px_rgba(141,107,56,0.14)]"
                                placeholder="Your name"
                            />
                        </label>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="grid gap-2 font-sans text-[0.6rem] font-semibold tracking-[0.16em] text-[#8D6B38] uppercase">
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
                                    className="border border-[#8D6B38]/14 bg-[#F7F1E8]/82 px-4 py-3.5 font-sans text-sm tracking-normal text-[#171512] outline-none transition duration-300 placeholder:text-[#8F877A] focus:border-[#8D6B38]/50 focus:shadow-[0_0_0_1px_rgba(141,107,56,0.14)]"
                                    placeholder="you@example.com"
                                />
                            </label>

                            <label className="grid gap-2 font-sans text-[0.6rem] font-semibold tracking-[0.16em] text-[#8D6B38] uppercase">
                                Phone
                                <input
                                    id="contact-phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(event) =>
                                        updateField('phone', event.target.value)
                                    }
                                    className="border border-[#8D6B38]/14 bg-[#F7F1E8]/82 px-4 py-3.5 font-sans text-sm tracking-normal text-[#171512] outline-none transition duration-300 placeholder:text-[#8F877A] focus:border-[#8D6B38]/50 focus:shadow-[0_0_0_1px_rgba(141,107,56,0.14)]"
                                    placeholder="+91..."
                                />
                            </label>
                        </div>

                        <label className="grid gap-2 font-sans text-[0.6rem] font-semibold tracking-[0.16em] text-[#8D6B38] uppercase">
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
                                className="border border-[#8D6B38]/14 bg-[#F7F1E8]/82 px-4 py-3.5 font-sans text-sm tracking-normal text-[#171512] outline-none transition duration-300 focus:border-[#8D6B38]/50 focus:shadow-[0_0_0_1px_rgba(141,107,56,0.14)]"
                            >
                                {contactData.projectTypes.map((projectType) => (
                                    <option key={projectType} value={projectType}>
                                        {projectType}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="grid gap-2 font-sans text-[0.6rem] font-semibold tracking-[0.16em] text-[#8D6B38] uppercase">
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
                                className="resize-none border border-[#8D6B38]/14 bg-[#F7F1E8]/82 px-4 py-3.5 font-sans text-sm tracking-normal text-[#171512] outline-none transition duration-300 placeholder:text-[#8F877A] focus:border-[#8D6B38]/50 focus:shadow-[0_0_0_1px_rgba(141,107,56,0.14)]"
                                placeholder="Tell us about your space, lighting goals, and timeline."
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 border border-[#171512] bg-[#171512] px-5 py-3.5 font-sans text-[0.64rem] font-semibold tracking-[0.17em] text-[#F8F5EC] uppercase transition duration-500 hover:border-[#8D6B38]/45 hover:bg-[#F8F4EC] hover:text-[#171512]"
                    >
                        {contactData.submitLabel}
                        <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </button>

                    {isSubmitted && (
                        <p className="mt-4 border border-[#8D6B38]/20 bg-[#F7F1E8]/72 px-4 py-3 font-sans text-sm leading-6 text-[#665F53]">
                            {contactData.successMessage}
                        </p>
                    )}
                </form>
            </Reveal>
        </section>
    );
}
