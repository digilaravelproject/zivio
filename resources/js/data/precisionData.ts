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
    label: 'Precision In Every Detail',
    heading: 'Crafted For Architectural Excellence.',
    paragraph:
        'Every fixture is engineered to balance performance, longevity, and visual elegance - delivering lighting solutions that elevate modern residential, commercial, and architectural spaces.',
    ctaLabel: 'Explore Our Expertise',
    ctaHref: '/about',
    mainImage:
        'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=85',
    detailImage:
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=85',
    features: [
        { title: 'Precision Beam Control' },
        { title: 'Premium Materials' },
        { title: 'Long Lifecycle' },
        { title: 'Technical Lighting Layouts' },
    ],
};
