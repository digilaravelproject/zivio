export interface ProductSpec {
    label: string;
    value: string;
}

export interface CatalogProduct {
    id: string;
    slug: string;
    name: string;
    category: 'Indoor' | 'Outdoor' | 'Solar' | 'Poles' | 'Decorative' | 'Highmast';
    type: string; // subcategory
    image: string;
    gallery: string[];
    shortDescription: string;
    description: string;
    specs: string[]; // key specs as pills
    technicalSpecs: ProductSpec[]; // detailed technical specs
    applications: string[]; // use cases
}

export const catalogCategories = [
    'Indoor',
    'Outdoor',
    'Solar',
    'Poles',
    'Decorative',
    'Highmast',
] as const;

export type CatalogCategory = (typeof catalogCategories)[number];

export const categorySubcategories: Record<CatalogCategory, string[]> = {
    Indoor: ['Downlights', 'Spotlights', 'Panel Lights', 'Linear Lights'],
    Outdoor: ['Garden Lights', 'Wall Lights', 'Flood Lights', 'Pathway Lights'],
    Poles: ['Pole Lights', 'Street Lights', 'High Mast'],
    Solar: ['Solar Garden Lights', 'Solar Street Lights', 'Solar Bollards'],
    Decorative: ['Chandeliers', 'Pendant Lights', 'Wall Sconces'],
    Highmast: ['Stadium Lighting', 'Airport Lighting', 'High Mast Poles'],
};

export const productsCatalogData: CatalogProduct[] = [
    {
        id: 'halocore-arcl13',
        slug: 'halocore-arcl13',
        name: 'Halocore ARCL13',
        category: 'Outdoor',
        type: 'Wall Lights',
        image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&h=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&h=800&q=80',
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&h=800&q=80',
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&h=800&q=80',
        ],
        shortDescription: 'Architectural outdoor wall luminaire with refined dual-beam optic control.',
        description: 'Engineered for modern building envelopes, the Halocore ARCL13 features an anodized aluminum frame with narrow-beam precision optics to accent vertical architecture. Its dual emission paths project elegant sheets of light, redefining outdoor space structures at night.',
        specs: ['IP66 Waterproof', 'Dual Beam Optic', 'Anodized Finish'],
        technicalSpecs: [
            { label: 'Input Voltage', value: '220-240V AC, 50/60Hz' },
            { label: 'Color Rendering Index (CRI)', value: '>90 Ra' },
            { label: 'Luminous Flux', value: '1200 Lumens' },
            { label: 'Beam Angle', value: '15° / 45° Dual Configuration' },
            { label: 'Power Consumption', value: '18 Watts' },
            { label: 'Operating Temp', value: '-20°C to +50°C' },
        ],
        applications: ['Commercial Facades', 'Residential Envelopes', 'Luxury Hotels', 'Pathway Columns'],
    },
    {
        id: 'luxpod-ascl1',
        slug: 'luxpod-ascl1',
        name: 'Luxpod ASCL1',
        category: 'Indoor',
        type: 'Downlights',
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&h=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&h=800&q=80',
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&h=800&q=80',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&h=800&q=80',
        ],
        shortDescription: 'Compact interior architectural downlight with dark-light baffle design.',
        description: 'Luxpod ASCL1 delivers outstanding visual comfort with ultra-low UGR glare control. Designed to blend seamlessly into luxury modern ceilings, it offers deep-recessed light sourcing for dramatic focal illumination.',
        specs: ['Low UGR < 12', 'Triac Dimmable', 'Deep Recessed Baffle'],
        technicalSpecs: [
            { label: 'Input Voltage', value: '100-240V AC' },
            { label: 'Color Rendering Index (CRI)', value: '>95 Ra (R9 > 80)' },
            { label: 'Luminous Flux', value: '850 Lumens' },
            { label: 'Beam Angle', value: '24° Narrow Spot' },
            { label: 'Power Consumption', value: '10 Watts' },
            { label: 'Color Temperature', value: '3000K Warm White' },
        ],
        applications: ['High-end Residential', 'Art Galleries', 'Executive Offices', 'Boutique Showrooms'],
    },
    {
        id: 'solaris-bollard-x1',
        slug: 'solaris-bollard-x1',
        name: 'Solaris Bollard X1',
        category: 'Solar',
        type: 'Solar Bollards',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&h=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&h=800&q=80',
            'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&h=800&q=80',
        ],
        shortDescription: 'Sustainable architectural solar bollard with high-efficiency solar panel.',
        description: 'Combining modern structural design with monocrystalline solar technology, the Solaris Bollard X1 provides self-sustaining path guidance throughout the night. It gathers solar energy dynamically, regulating intensity based on battery levels.',
        specs: ['Monocrystalline Solar Panel', 'LiFePO4 Lithium Battery', 'Intelligent Dusk Sensor'],
        technicalSpecs: [
            { label: 'Battery Capacity', value: '3.2V 6Ah LiFePO4' },
            { label: 'Solar Panel Type', value: 'High Efficiency Monocrystalline' },
            { label: 'Luminous Flux', value: '300 Lumens max' },
            { label: 'Color Rendering Index (CRI)', value: '80 Ra' },
            { label: 'Autonomy', value: 'Up to 3 Nights on Full Charge' },
            { label: 'IP Rating', value: 'IP65 Rated' },
        ],
        applications: ['Façade Pathways', 'Eco Resorts', 'Luxury Gardens', 'Eco-friendly Walkways'],
    },
    {
        id: 'aeropole-streetlight-s4',
        slug: 'aeropole-streetlight-s4',
        name: 'AeroPole Streetlight S4',
        category: 'Poles',
        type: 'Street Lights',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=800&q=80',
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&h=800&q=80',
        ],
        shortDescription: 'Intelligent urban pole streetlight with aerodynamic design.',
        description: 'The AeroPole Streetlight S4 features highly efficient asymmetrical lens arrays for maximum ground coverage and visual comfort along major avenues. The integrated heat-sink chassis maximizes thermal decay and lifetime reliability.',
        specs: ['Asymmetric Lens', 'IK08 Impact Resistance', 'NEMA Socket Ready'],
        technicalSpecs: [
            { label: 'System Wattage', value: '120 Watts' },
            { label: 'Color Rendering Index (CRI)', value: '80 Ra' },
            { label: 'Luminous Flux', value: '16800 Lumens' },
            { label: 'Surge Protection', value: '10kV Standard' },
            { label: 'Wind Resistance', value: 'Up to 45 m/s' },
            { label: 'DALI Dimmable', value: 'Supported' },
        ],
        applications: ['Urban Avenues', 'Parking Plazas', 'Highways', 'Civic Districts'],
    },
    {
        id: 'chronos-chandelier-c1',
        slug: 'chronos-chandelier-c1',
        name: 'Chronos Chandelier C1',
        category: 'Decorative',
        type: 'Chandeliers',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&h=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&h=800&q=80',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&h=800&q=80',
        ],
        shortDescription: 'Sculptural geometric chandelier featuring warm-dim optical crystals.',
        description: 'Crafted from hand-finished gold-colored alloys and precision-cut visual crystals, the Chronos Chandelier C1 projects ambient architectural patterns. Fully dimmable to create intimate or majestic moods instantly.',
        specs: ['Warm Dim (2200K - 3000K)', 'Handcrafted Crystals', 'Adjustable Drop Cables'],
        technicalSpecs: [
            { label: 'Total Power', value: '45 Watts' },
            { label: 'Color Rendering Index (CRI)', value: '>97 Ra (Ultra High Color Accuracy)' },
            { label: 'Luminous Flux', value: '2400 Lumens' },
            { label: 'Dimmable Range', value: '1% - 100% (Warm Dim)' },
            { label: 'Material', value: 'Anodized Gold Alloys & Optical Glass' },
            { label: 'Mounting', value: 'Ceiling Hook with Cable Suspension' },
        ],
        applications: ['Luxury Dining Halls', 'Hotel Lobbies', 'Executive Boardrooms', 'High-end Dining Penthouses'],
    },
    {
        id: 'colosseum-floodlight-h12',
        slug: 'colosseum-floodlight-h12',
        name: 'Colosseum Floodlight H12',
        category: 'Highmast',
        type: 'Stadium Lighting',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&h=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&h=800&q=80',
            'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&h=800&q=80',
        ],
        shortDescription: 'Ultra-high-output architectural floodlight engineered for stadiums and aprons.',
        description: 'Designed to survive extreme environmental stresses, the Colosseum H12 uses isolated high-density driver enclosures and anti-glare visors. Built to satisfy professional HD television broadcast lighting criteria.',
        specs: ['Isolated Meanwell Driver', 'Windload Certified', 'TV Broadcast Grade'],
        technicalSpecs: [
            { label: 'Total System Power', value: '600 Watts' },
            { label: 'Color Rendering Index (CRI)', value: '>90 Ra' },
            { label: 'Luminous Flux', value: '84000 Lumens' },
            { label: 'Ingress Protection', value: 'IP67 Sealed optics' },
            { label: 'Surge Immunity', value: '20kV Line-to-Ground' },
            { label: 'Beam Option', value: '12° Narrow / 30° Medium' },
        ],
        applications: ['Sports Arenas', 'Airport Aprons', 'Industrial Ports', 'High-Mast Interchanges'],
    },
    {
        id: 'stella-spotlight-s3',
        slug: 'stella-spotlight-s3',
        name: 'Stella Spotlight S3',
        category: 'Indoor',
        type: 'Spotlights',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&h=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&h=800&q=80',
            'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&h=800&q=80',
        ],
        shortDescription: 'Architectural track spotlight with zoomable beam lens.',
        description: 'Stella S3 features an integrated adjustable optical barrel allowing user-controlled zoom ranges from 15° to 60°. This makes it exceptionally suited for galleries, showrooms, and fine residential collections.',
        specs: ['Zoomable 15°-60° Optics', 'CRI 98 Museum Grade', 'Universal Track Adapted'],
        technicalSpecs: [
            { label: 'Power Consumption', value: '15 Watts' },
            { label: 'Color Rendering Index (CRI)', value: '98 Ra (R9 > 90)' },
            { label: 'Luminous Flux', value: '1100 Lumens' },
            { label: 'Color Temperature', value: '2700K / 3000K / 4000K Selective' },
            { label: 'Rotation', value: '355° Horizontal / 90° Vertical' },
            { label: 'Lens Material', value: 'Optically Pure Borosilicate Glass' },
        ],
        applications: ['Fine Art Galleries', 'Luxury Boutiques', 'Museum Exhibitions', 'Luxury Walk-in Closets'],
    },
    {
        id: 'aura-wall-sconce-w2',
        slug: 'aura-wall-sconce-w2',
        name: 'Aura Wall Sconce W2',
        category: 'Decorative',
        type: 'Wall Sconces',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&h=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&h=800&q=80',
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&h=800&q=80',
        ],
        shortDescription: 'Minimalist ambient wall sconce casting direct-indirect gold halos.',
        description: 'The Aura Wall Sconce W2 is formed from textured sandblasted solid metals. It features dual direct-indirect LEDs which project a smooth warm-gold halo back onto vertical walls to deliver comforting ambient illumination.',
        specs: ['Direct-Indirect Emission', 'Textured Metal Body', 'Ambient Glow Effect'],
        technicalSpecs: [
            { label: 'System Wattage', value: '8 Watts' },
            { label: 'Color Rendering Index (CRI)', value: '90 Ra' },
            { label: 'Luminous Flux', value: '520 Lumens' },
            { label: 'Color Temperature', value: '2700K Warm Gold' },
            { label: 'Dimmable', value: 'Trailing Edge Dimmable' },
            { label: 'Finish Option', value: 'Sandblasted Charcoal / Brushed Brass' },
        ],
        applications: ['Luxury Hallways', 'Hotel Corridors', 'Bespoke Master Suites', 'Fine Dining Alcoves'],
    },
];
