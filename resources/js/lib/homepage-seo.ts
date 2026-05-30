const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '');

const siteUrl = trimTrailingSlash(
    import.meta.env.VITE_SITE_URL || 'https://ziviolife.com',
);

const absoluteUrl = (path: string) =>
    `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

export const homepageSeo = {
    title: 'ZIVIO LIFE | Premium Architectural Lighting Solutions',
    description:
        'ZIVIO LIFE delivers premium architectural lighting solutions for residential, commercial, outdoor, indoor, pole, and solar lighting applications. Explore innovative lighting designed for elegance, performance, and lasting impact.',
    keywords:
        'ZIVIO LIFE, Architectural Lighting, Premium Lighting, Indoor Lighting, Outdoor Lighting, Pole Lighting, Solar Lighting, Commercial Lighting, Residential Lighting, Luxury Lighting Solutions',
    siteName: 'ZIVIO LIFE',
    url: siteUrl,
    logoUrl: absoluteUrl('/images/zivio-life-logo.svg'),
    imageUrl: absoluteUrl('/images/zivio-social-preview.png'),
    imageWidth: '1200',
    imageHeight: '630',
    locale: 'en_IN',
    phone: '+91-9552152384',
    email: 'shree@ziviolife.com',
    address: {
        streetAddress: 'Infinity Square, Unit No. 110, 1st Floor, Golani Naka, Vasai East, Waliv',
        addressLocality: 'Vasai East',
        addressRegion: 'Maharashtra',
        postalCode: '401208',
        addressCountry: 'IN',
    },
};

export const homepageStructuredData = [
    {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: homepageSeo.siteName,
        url: homepageSeo.url,
        logo: homepageSeo.logoUrl,
        image: homepageSeo.imageUrl,
        email: homepageSeo.email,
        telephone: homepageSeo.phone,
        address: {
            '@type': 'PostalAddress',
            ...homepageSeo.address,
        },
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: homepageSeo.phone,
                contactType: 'customer service',
                areaServed: 'IN',
                availableLanguage: ['en', 'hi'],
            },
        ],
    },
    {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: homepageSeo.siteName,
        url: homepageSeo.url,
    },
];
