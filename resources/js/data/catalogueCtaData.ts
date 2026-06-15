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
    heading: 'Explore The Complete ZIVIO LIFE Lighting Collection.',
    paragraph:
        'Discover architectural, indoor, outdoor, pole, and solar lighting solutions crafted for modern spaces.',
    catalogueImage: '/images/catalouge/catalogue.png',
    downloadHref: '/images/catalouge/downlight-spotlight-catalogue.pdf',
    secondaryHref: '/products',
    primaryCta: 'View Catalogue',
    secondaryCta: 'View Products',
};
