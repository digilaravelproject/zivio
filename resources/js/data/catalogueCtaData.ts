export type CatalogueCtaData = {
    label: string;
    heading: string;
    paragraph: string;
    catalogueImage: string;
    downloadHref: string;
    secondaryHref: string;
    primaryCta: string;
    secondaryCta: string;
};

export const catalogueCtaData: CatalogueCtaData = {
    label: 'Catalogue',
    heading: 'Explore the complete ZIVIO LIFE lighting collection.',
    paragraph:
        'Discover architectural, indoor, outdoor, pole, and solar lighting solutions crafted for modern spaces.',
    catalogueImage:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1100&q=85',
    downloadHref: '/catalogue/zivio-life-catalogue.pdf',
    secondaryHref: '/products',
    primaryCta: 'Download Catalogue',
    secondaryCta: 'View Products',
};
