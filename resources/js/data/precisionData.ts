export type PrecisionFeature = {
    title: string;
};

export type PrecisionData = {
    label: string;
    heading: string;
    paragraph: string;
    ctaLabel: string;
    ctaHref: string;
    mainImage: string;
    detailImage: string;
    features: PrecisionFeature[];
};

export const precisionData: PrecisionData = {
    label: 'Archis Wall Luminaire',
    heading: 'Designed For Exterior Facade Brilliance.',
    paragraph:
        'Archis is a high-performance architectural wall luminaire engineered to accentuate facades, columns, and architectural boundaries with exceptional bi-directional lighting control.',
    ctaLabel: 'Explore Archis Luminaire',
    ctaHref: '/products/archis',
    mainImage: '/images/products-uses-images/archis/archis-use-1.jpg',
    detailImage: '/images/products-uses-images/archis/archis-use-2.jpg',
    features: [
        { title: 'Bi-Directional Up & Down Light Distribution' },
        { title: 'Facade Accenting & Pathway Wash Lighting' },
        { title: 'IP65 Weatherproof & Corrosion Resistance' },
        { title: 'Glare-Free Precision Optical Beam Control' },
    ],
};
