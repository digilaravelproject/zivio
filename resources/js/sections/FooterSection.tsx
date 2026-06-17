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
            <h3 className="mb-4 font-sans text-[0.62rem] font-semibold tracking-[0.2em] text-[#BDA18A] uppercase">
                {title}
            </h3>
            <ul className="grid gap-3 font-sans text-sm text-[#CFCFCB]">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                            className="transition duration-300 hover:text-[#BDA18A]"
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
        <footer className="relative overflow-hidden bg-[#080808]/85 px-4 sm:px-8 lg:px-12 pt-16 pb-8 text-[#F5F5F2] sm:pt-20">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#BDA18A]/30 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(184,148,95,0.07),transparent_28%),linear-gradient(180deg,rgba(8,8,8,0.25)_0%,#080808_100%)]" />

            <div className="relative mx-auto max-w-[1440px]">
                <div className="grid gap-10 border-b border-white/[0.08] pb-12 md:grid-cols-2 lg:grid-cols-[1.05fr_0.65fr_0.75fr_0.95fr] lg:gap-14">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex w-fit items-center"
                            aria-label="ZIVIO LIFE home"
                        >
                            <img
                                src="/images/zivio-life-logo.svg"
                                alt="ZIVIO LIFE"
                                className="block h-auto w-[9.5rem] object-contain drop-shadow-[0_12px_34px_rgba(218,152,7,0.16)] sm:w-[11rem]"
                                width={180}
                                height={44}
                            />
                        </Link>
                        <p className="mt-5 max-w-sm font-sans text-sm leading-7 text-[#CFCFCB]">
                            {footerData.description}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {footerData.socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="border border-white/[0.09] px-3 py-2 font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-[#F5F5F2] uppercase transition duration-300 hover:border-[#BDA18A]/60 hover:text-[#BDA18A]"
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
                        <h3 className="mb-4 font-sans text-[0.62rem] font-semibold tracking-[0.2em] text-[#BDA18A] uppercase">
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
                                        className="block transition duration-300 hover:text-[#BDA18A]"
                                    >
                                        {phone}
                                    </a>
                                ))}
                            </p>
                            <a
                                href={`mailto:${footerData.email}`}
                                className="transition duration-300 hover:text-[#BDA18A]"
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
