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
    heading: 'See How Light Transforms Outdoor Spaces.',
    secondaryCta: {
        label: 'View Outdoor Collection',
        href: '/products/outdoor-lighting',
    },
};

export const featuredProducts: FeaturedProduct[] = [
    {
        id: 'archis',
        name: 'Archis',
        category: 'Outdoor / Wall Lighting',
        description:
            'A high-performance architectural wall luminaire designed to project precise beams, creating striking light-and-shadow patterns on exterior facades.',
        image: '/images/products-uses-images/archis/archis-product.jpg',
        href: '/products/archis',
        collectionHref: '/products/outdoor-lighting',
        specs: ['IP65 Waterproof', 'Die-Cast Aluminum', 'Optic Beam Control'],
        applications: [
            {
                title: 'Facade Illumination',
                caption: 'Stunning accent lighting highlighting structural details.',
                image: '/images/products-uses-images/archis/archis-use-1.jpg',
            },
            {
                title: 'Entryway Ambience',
                caption: 'Warm guidance at modern residential and commercial entrances.',
                image: '/images/products-uses-images/archis/archis-use-2.jpg',
            },
            {
                title: 'Architectural Pillars',
                caption: 'Symmetrical upward beams that accentuate vertical scale.',
                image: '/images/products-uses-images/archis/archis-use-3.jpg',
            },
            {
                title: 'Outer Wall Wash',
                caption: 'Low-glare perimeter illumination for safety and style.',
                image: '/images/products-uses-images/archis/archis-use-4.jpg',
            },
        ],
    },
    {
        id: 'canva',
        name: 'Canva',
        category: 'Indoor Spotlight',
        description:
            'A sleek recessed architectural spotlight offering excellent color rendering (CRI >90) and low-glare properties for high-end interiors.',
        image: '/images/products-uses-images/canva/canva-product.jpg',
        href: '/products/canva',
        collectionHref: '/products/indoor-lighting',
        specs: ['Low Glare', 'CRI >90', 'Dimmable Triac'],
        applications: [
            {
                title: 'Living Spaces',
                caption: 'Comfortable recessed spot light creating relaxed atmospheres.',
                image: '/images/products-uses-images/canva/canva-use-1.jpg',
            },
            {
                title: 'Accent Focus',
                caption: 'Precise spotlighting for premium furniture and interior features.',
                image: '/images/products-uses-images/canva/canva-use-2.jpg',
            },
        ],
    },
    {
        id: 'lectus',
        name: 'Lectus',
        category: 'Indoor / Linear Lighting',
        description:
            'A minimalist linear suspension light featuring a seamless profile and direct/indirect light emission, ideal for modern office and dining layouts.',
        image: '/images/products-uses-images/lectus/lectus-product.jpg',
        href: '/products/lectus',
        collectionHref: '/products/indoor-lighting',
        specs: ['Direct/Indirect Light', 'Seamless Profile', 'High Efficiency'],
        applications: [
            {
                title: 'Office Workspace',
                caption: 'Even, glare-free task light over office tables and desks.',
                image: '/images/products-uses-images/lectus/lectus-use-1.jpg',
            },
        ],
    },
    {
        id: 'magna',
        name: 'Magna',
        category: 'Outdoor / Flood Lighting',
        description:
            'A rugged, heavy-duty exterior flood light designed to deliver high lumen outputs with superior heat dissipation and surge protection.',
        image: '/images/products-uses-images/magna/magna-product.jpg',
        href: '/products/magna',
        collectionHref: '/products/outdoor-lighting',
        specs: ['High Lumens', 'Surge Protected', 'Tempered Glass'],
        applications: [
            {
                title: 'High-Mast Yard',
                caption: 'Broad, high-intensity coverage for large external yards.',
                image: '/images/products-uses-images/magna/magna-use-1.jpg',
            },
            {
                title: 'Security Flood',
                caption: 'Reliable security light for warehouses and building corners.',
                image: '/images/products-uses-images/magna/magna-use-2.jpg',
            },
            {
                title: 'Outdoor Work Area',
                caption: 'Bright, uniform lighting for late evening industrial activities.',
                image: '/images/products-uses-images/magna/magna-use-3.jpg',
            },
            {
                title: 'Perimeter Security',
                caption: 'Wide angle coverage along building edges.',
                image: '/images/products-uses-images/magna/magna-use-4.jpg',
            },
        ],
    },
    {
        id: 'nova',
        name: 'Nova',
        category: 'Indoor / Track Lighting',
        description:
            'A low-voltage magnetic track lighting system that allows quick, tool-free repositioning of spotlights and diffusers for flexible interior styling.',
        image: '/images/products-uses-images/nova/nova-product.jpg',
        href: '/products/nova',
        collectionHref: '/products/indoor-lighting',
        specs: ['Magnetic Mounting', 'Smart Controls', 'Ultra Slim Design'],
        applications: [
            {
                title: 'Retail Showroom',
                caption: 'Flexible spotlight placement to highlight seasonal merchandise.',
                image: '/images/products-uses-images/nova/nova-use-1.jpg',
            },
        ],
    },
    {
        id: 'spectra',
        name: 'Spectra',
        category: 'Pole / Post-Top Lighting',
        description:
            'A modern post-top luminaire designed for public walkways, villa campuses, and city parks, featuring dark-sky friendly optics.',
        image: '/images/products-uses-images/spectra/spectra-product.jpg',
        href: '/products/spectra',
        collectionHref: '/products/pole-lighting',
        specs: ['Dark Sky Friendly', 'Wind Resistant', 'Modular Design'],
        applications: [
            {
                title: 'Pedestrian Walkway',
                caption: 'Soft, uniform horizontal distribution along public walking paths.',
                image: '/images/products-uses-images/spectra/spectra-use-1.jpg',
            },
            {
                title: 'Campus Plaza',
                caption: 'Clean vertical lighting posts adding rhythm and scale to public spaces.',
                image: '/images/products-uses-images/spectra/spectra-use-2.jpg',
            },
        ],
    },
    {
        id: 'zuvi',
        name: 'Zuvi',
        category: 'Outdoor / Landscape Lighting',
        description:
            'An adjustable spike-mounted garden spotlight, engineered to resist harsh weather while highlighting trees, flora, and architectural details.',
        image: '/images/products-uses-images/zuvi/zuvi-product.jpg',
        href: '/products/zuvi',
        collectionHref: '/products/outdoor-lighting',
        specs: ['Spike Mounted', '360° Rotation', 'Corrosion Proof'],
        applications: [
            {
                title: 'Flora Spotlight',
                caption: 'Accentuating landscape details, tree leaves, and garden structures.',
                image: '/images/products-uses-images/zuvi/zuvi-use-1.jpg',
            },
            {
                title: 'Pathway Borders',
                caption: 'Focused low-level beams along landscape walking routes.',
                image: '/images/products-uses-images/zuvi/zuvi-use-2.jpg',
            },
            {
                title: 'Lawn Uplighting',
                caption: 'Strategic landscape uplighting highlighting outdoor depth.',
                image: '/images/products-uses-images/zuvi/zuvi-use-3.jpg',
            },
        ],
    },
];
