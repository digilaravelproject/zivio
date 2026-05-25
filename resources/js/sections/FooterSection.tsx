import { Link } from '@inertiajs/react';

import { footerData } from '@/data/footerData';

function FooterLinkList({
    title,
    links,
}: {
    title: string;
    links: { label: string; href: string }[];
}) {
    return (
        <div>
            <h3 className="mb-4 font-sans text-[0.66rem] font-semibold tracking-[0.24em] text-[#B88A2A] uppercase">
                {title}
            </h3>
            <ul className="grid gap-3 font-sans text-sm text-[#CFCFCB]">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                            className="transition duration-300 hover:text-[#D2B276]"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function FooterSection() {
    return (
        <footer className="relative overflow-hidden bg-[#050505] px-4 pt-14 pb-8 text-[#F5F5F2] sm:px-6 sm:pt-18 lg:px-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B88A2A]/30 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(184,138,42,0.06),transparent_28%),linear-gradient(180deg,#080808_0%,#050505_100%)]" />

            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-10 border-b border-white/[0.08] pb-10 md:grid-cols-2 lg:grid-cols-[1.05fr_0.65fr_0.75fr_0.95fr] lg:gap-12">
                    <div>
                        <Link
                            href="/"
                            className="text-3xl leading-none font-semibold tracking-[0.04em] text-[#F8F5EC]"
                        >
                            {footerData.logo}
                        </Link>
                        <p className="mt-5 max-w-sm font-sans text-sm leading-7 text-[#CFCFCB]">
                            {footerData.description}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {footerData.socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="border border-white/[0.09] px-3 py-2 font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-[#F5F5F2] uppercase transition duration-300 hover:border-[#B88A2A]/60 hover:text-[#D2B276]"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <FooterLinkList
                        title="Quick Links"
                        links={footerData.quickLinks}
                    />
                    <FooterLinkList
                        title="Products"
                        links={footerData.productCategories}
                    />

                    <div>
                        <h3 className="mb-4 font-sans text-[0.66rem] font-semibold tracking-[0.24em] text-[#B88A2A] uppercase">
                            Contact
                        </h3>
                        <div className="grid gap-4 font-sans text-sm leading-7 text-[#CFCFCB]">
                            <p>
                                {footerData.address.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </p>
                            <p>
                                {footerData.phones.map((phone) => (
                                    <a
                                        key={phone}
                                        href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                                        className="block transition duration-300 hover:text-[#D2B276]"
                                    >
                                        {phone}
                                    </a>
                                ))}
                            </p>
                            <a
                                href={`mailto:${footerData.email}`}
                                className="transition duration-300 hover:text-[#D2B276]"
                            >
                                {footerData.email}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 pt-7 font-sans text-xs tracking-[0.12em] text-[#8F8A80] uppercase sm:flex-row sm:items-center sm:justify-between">
                    <p>{footerData.copyright}</p>
                    <p>Architectural Lighting Solutions</p>
                </div>
            </div>
        </footer>
    );
}
