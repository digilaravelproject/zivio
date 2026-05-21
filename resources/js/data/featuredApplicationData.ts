export type FeaturedApplicationImage = {
    title: string;
    caption: string;
    image: string;
};

export type FeaturedProduct = {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    href: string;
    collectionHref: string;
    specs: string[];
    applications: FeaturedApplicationImage[];
};

export const featuredApplicationIntro = {
    label: 'Featured Application',
    heading: 'See how light transforms outdoor spaces.',
    secondaryCta: {
        label: 'View Outdoor Collection',
        href: '/products/outdoor-lighting',
    },
};

export const featuredProducts: FeaturedProduct[] = [
    {
        id: 'led-g5043',
        name: 'LED G5043 Garden Light',
        category: 'Outdoor / Garden Lighting',
        description:
            'Designed to enhance outdoor landscapes with a warm architectural glow, the LED G5043 Garden Light brings elegance, safety, and atmosphere to gardens, pathways, and premium exterior spaces.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85',
        href: '/products/led-g5043-garden-light',
        collectionHref: '/products/outdoor-lighting',
        specs: ['Outdoor Ready', 'Energy Efficient', 'Premium Finish'],
        applications: [
            {
                title: 'Garden Ambience',
                caption: 'Warm lighting that shapes evening landscapes.',
                image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85',
            },
            {
                title: 'Pathway Guidance',
                caption: 'Elegant illumination for movement and safety.',
                image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=85',
            },
            {
                title: 'Villa Exterior',
                caption: 'Architectural glow for premium outdoor spaces.',
                image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
            },
            {
                title: 'Landscape Detail',
                caption: 'Focused lighting that highlights texture and depth.',
                image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=85',
            },
        ],
    },
    {
        id: 'arclume-pole',
        name: 'Arclume Pole Light',
        category: 'Pole Lighting',
        description:
            'A refined pole lighting system built for pathways, campuses, villas, and commercial landscapes where broad coverage must still feel architectural.',
        image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=85',
        href: '/products/arclume-pole-light',
        collectionHref: '/products/pole-lighting',
        specs: ['High Coverage', 'Durable Build', 'Architectural Finish'],
        applications: [
            {
                title: 'Campus Walkways',
                caption: 'Wide, comfortable coverage for open pedestrian zones.',
                image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85',
            },
            {
                title: 'Urban Edge',
                caption: 'A crisp vertical presence for modern public spaces.',
                image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85',
            },
            {
                title: 'Resort Arrival',
                caption: 'Soft guidance for high-end entrances and drives.',
                image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=85',
            },
            {
                title: 'Landscape Rhythm',
                caption: 'Repeated lighting points that create depth and order.',
                image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=85',
            },
        ],
    },
    {
        id: 'sigma-outdoor',
        name: 'Sigma Outdoor Light',
        category: 'Outdoor Lighting',
        description:
            'A compact outdoor luminaire shaped for clean facades, garden edges, and exterior walls that need an elegant beam without visual noise.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85',
        href: '/products/sigma-outdoor-light',
        collectionHref: '/products/outdoor-lighting',
        specs: ['Weather Resistant', 'Elegant Beam', 'Energy Efficient'],
        applications: [
            {
                title: 'Facade Wash',
                caption: 'Balanced illumination for architectural surfaces.',
                image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
            },
            {
                title: 'Exterior Detail',
                caption: 'Light that reveals stone, texture, and shadow.',
                image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85',
            },
            {
                title: 'Courtyard Mood',
                caption: 'Low-glare ambience for relaxed evening spaces.',
                image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=85',
            },
            {
                title: 'Garden Wall',
                caption: 'Focused glow for perimeter walls and planting zones.',
                image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85',
            },
        ],
    },
    {
        id: 'stela-solar',
        name: 'Stela Solar Light',
        category: 'Solar Lighting',
        description:
            'A sustainable lighting solution for outdoor environments where clean energy, low maintenance, and warm visual comfort matter equally.',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85',
        href: '/products/stela-solar-light',
        collectionHref: '/products/solar-lighting',
        specs: ['Solar Powered', 'Sustainable', 'Low Maintenance'],
        applications: [
            {
                title: 'Solar Pathways',
                caption: 'Self-powered guidance for gardens and outdoor routes.',
                image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=85',
            },
            {
                title: 'Green Estates',
                caption: 'Sustainable lighting for premium landscape planning.',
                image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85',
            },
            {
                title: 'Quiet Corners',
                caption: 'Gentle illumination without heavy infrastructure.',
                image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=85',
            },
            {
                title: 'Evening Gardens',
                caption: 'A warm solar glow for slow outdoor evenings.',
                image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85',
            },
        ],
    },
];
