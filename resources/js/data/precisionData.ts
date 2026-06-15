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
    label: 'Flora Spotlight',
    heading: 'Designed To Illuminate Outdoor Landscapes.',
    paragraph:
        'The Flora Spotlight (Zuvi) is a professional spike-mounted landscape luminaire engineered to highlight foliage, tree canopies, and garden pathways with 360-degree adjustable beam control.',
    ctaLabel: 'Explore Flora Spotlight',
    ctaHref: '/products/zuvi',
    mainImage: '/images/products-uses-images/zuvi/zuvi-use-1.jpg',
    detailImage: '/images/products-uses-images/zuvi/zuvi-product.jpg',
    features: [
        { title: '360° Rotation & Precision Tilt Control' },
        { title: 'Spike Mounted For Flexible Landscaping' },
        { title: 'Corrosion-Proof Heavy Duty Construction' },
        { title: 'Weatherproof Design For Year-Round Performance' },
    ],
};
