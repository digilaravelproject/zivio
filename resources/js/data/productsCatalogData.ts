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
        id: 'archis',
        slug: 'archis',
        name: 'Archis',
        category: 'Outdoor',
        type: 'Wall Lights',
        image: '/images/products-uses-images/archis/archis-product.jpg',
        gallery: [
            '/images/products-uses-images/archis/archis-product.jpg',
            '/images/products-uses-images/archis/archis-use-1.jpg',
            '/images/products-uses-images/archis/archis-use-2.jpg',
            '/images/products-uses-images/archis/archis-use-3.jpg',
            '/images/products-uses-images/archis/archis-use-4.jpg',
        ],
        shortDescription: 'High-performance architectural wall luminaire with precise optic beam control.',
        description: 'Engineered for modern building envelopes, Archis projects defined upward and downward sheets of light to accentuate vertical scale and materials while keeping glare at a minimum.',
        specs: ['IP65 Waterproof', 'Dual Beam Optic', 'Anodized Finish'],
        technicalSpecs: [
            { label: 'Input Voltage', value: '220-240V AC, 50/60Hz' },
            { label: 'Color Rendering Index (CRI)', value: '>90 Ra' },
            { label: 'Luminous Flux', value: '1200 Lumens' },
            { label: 'Beam Angle', value: '15° / 45° Configuration' },
            { label: 'Power Consumption', value: '18 Watts' },
            { label: 'Operating Temp', value: '-20°C to +50°C' },
        ],
        applications: ['Commercial Facades', 'Residential Envelopes', 'Luxury Hotels', 'Pillars & Columns'],
    },
    {
        id: 'canva',
        slug: 'canva',
        name: 'Canva',
        category: 'Indoor',
        type: 'Spotlights',
        image: '/images/products-uses-images/canva/canva-product.jpg',
        gallery: [
            '/images/products-uses-images/canva/canva-product.jpg',
            '/images/products-uses-images/canva/canva-use-1.jpg',
            '/images/products-uses-images/canva/canva-use-2.jpg',
        ],
        shortDescription: 'Sleek recessed architectural spotlight with low glare baffle.',
        description: 'Canva offers deep-recessed glare control for high-end residential, hospitality, and gallery spaces. Designed to integrate cleanly into modern ceiling designs.',
        specs: ['Low Glare', 'CRI >90', 'Triac Dimmable'],
        technicalSpecs: [
            { label: 'Input Voltage', value: '100-240V AC' },
            { label: 'Color Rendering Index (CRI)', value: '>95 Ra' },
            { label: 'Luminous Flux', value: '850 Lumens' },
            { label: 'Beam Angle', value: '24° Spot' },
            { label: 'Power Consumption', value: '10 Watts' },
            { label: 'Color Temperature', value: '3000K Warm White' },
        ],
        applications: ['Boutique Showrooms', 'Luxury Living Rooms', 'Art Galleries', 'Executive Offices'],
    },
    {
        id: 'lectus',
        slug: 'lectus',
        name: 'Lectus',
        category: 'Indoor',
        type: 'Linear Lights',
        image: '/images/products-uses-images/lectus/lectus-product.jpg',
        gallery: [
            '/images/products-uses-images/lectus/lectus-product.jpg',
            '/images/products-uses-images/lectus/lectus-use-1.jpg',
        ],
        shortDescription: 'Minimalist linear suspension light with direct/indirect light emission.',
        description: 'Lectus features a seamless, continuous profile designed to deliver uniform task and ambient lighting in modern workspaces, boardrooms, and minimalist dining areas.',
        specs: ['Direct/Indirect Light', 'Seamless Profile', 'High Efficiency'],
        technicalSpecs: [
            { label: 'Input Voltage', value: '220-240V AC' },
            { label: 'Color Rendering Index (CRI)', value: '>90 Ra' },
            { label: 'Luminous Flux', value: '3200 Lumens' },
            { label: 'Beam Angle', value: '110° Diffused' },
            { label: 'Power Consumption', value: '28 Watts' },
            { label: 'Color Temperature', value: '4000K Neutral White' },
        ],
        applications: ['Office Workspaces', 'Conference Rooms', 'Minimalist Kitchens', 'Design Studios'],
    },
    {
        id: 'magna',
        slug: 'magna',
        name: 'Magna',
        category: 'Outdoor',
        type: 'Flood Lights',
        image: '/images/products-uses-images/magna/magna-product.jpg',
        gallery: [
            '/images/products-uses-images/magna/magna-product.jpg',
            '/images/products-uses-images/magna/magna-use-1.jpg',
            '/images/products-uses-images/magna/magna-use-2.jpg',
            '/images/products-uses-images/magna/magna-use-3.jpg',
            '/images/products-uses-images/magna/magna-use-4.jpg',
        ],
        shortDescription: 'Heavy-duty exterior flood light with superior surge protection.',
        description: 'Engineered for industrial scale, sports, and wide landscape security illumination. Magna is enclosed in a thermal decay casing with protective tempered glass lenses.',
        specs: ['High Lumens', 'Surge Protection', 'Tempered Glass'],
        technicalSpecs: [
            { label: 'Total Power', value: '250 Watts' },
            { label: 'Color Rendering Index (CRI)', value: '80 Ra' },
            { label: 'Luminous Flux', value: '35000 Lumens' },
            { label: 'Ingress Protection', value: 'IP67 Sealed' },
            { label: 'Surge Immunity', value: '10kV Standard' },
            { label: 'Operating Temp', value: '-30°C to +55°C' },
        ],
        applications: ['Warehouse Yards', 'Industrial Facilities', 'Building Perimeters', 'Outdoor Work Zones'],
    },
    {
        id: 'nova',
        slug: 'nova',
        name: 'Nova',
        category: 'Indoor',
        type: 'Spotlights',
        image: '/images/products-uses-images/nova/nova-product.jpg',
        gallery: [
            '/images/products-uses-images/nova/nova-product.jpg',
            '/images/products-uses-images/nova/nova-use-1.jpg',
        ],
        shortDescription: 'Low-voltage magnetic track light for dynamic, tool-free position adjustments.',
        description: 'Nova provides unmatched flexibility for interior spaces. Spotlights can be inserted, rotated, and shifted along the magnetic track system instantly.',
        specs: ['Magnetic Mounting', 'Smart Controls', 'Ultra Slim Design'],
        technicalSpecs: [
            { label: 'System Voltage', value: '48V DC Low Voltage' },
            { label: 'Color Rendering Index (CRI)', value: '>90 Ra' },
            { label: 'Luminous Flux', value: '980 Lumens per module' },
            { label: 'Beam Angle', value: '30° Spot' },
            { label: 'Power Consumption', value: '12 Watts' },
            { label: 'Control Protocol', value: 'DALI / Zigbee Compatible' },
        ],
        applications: ['Retail Showrooms', 'Art Galleries', 'Luxury Walk-in Closets', 'Modern Dining Zones'],
    },
    {
        id: 'spectra',
        slug: 'spectra',
        name: 'Spectra',
        category: 'Poles',
        type: 'Pole Lights',
        image: '/images/products-uses-images/spectra/spectra-product.jpg',
        gallery: [
            '/images/products-uses-images/spectra/spectra-product.jpg',
            '/images/products-uses-images/spectra/spectra-use-1.jpg',
            '/images/products-uses-images/spectra/spectra-use-2.jpg',
        ],
        shortDescription: 'Modern post-top pole luminaire featuring dark-sky friendly optics.',
        description: 'Spectra balances broad ground coverage with architectural aesthetic order, projecting uniform pedestrian pathways while preventing upward light pollution.',
        specs: ['Dark Sky Optics', 'Wind Resistant', 'Modular Design'],
        technicalSpecs: [
            { label: 'System Wattage', value: '60 Watts' },
            { label: 'Color Rendering Index (CRI)', value: '80 Ra' },
            { label: 'Luminous Flux', value: '7800 Lumens' },
            { label: 'Wind Resistance', value: 'Up to 45 m/s' },
            { label: 'Impact Resistance', value: 'IK08 Certified' },
            { label: 'IP Rating', value: 'IP66 Rated' },
        ],
        applications: ['Pedestrian Walkways', 'Public Plazas', 'Villa Entrances', 'Resort Avenues'],
    },
    {
        id: 'zuvi',
        slug: 'zuvi',
        name: 'Zuvi',
        category: 'Outdoor',
        type: 'Garden Lights',
        image: '/images/products-uses-images/zuvi/zuvi-product.jpg',
        gallery: [
            '/images/products-uses-images/zuvi/zuvi-product.jpg',
            '/images/products-uses-images/zuvi/zuvi-use-1.jpg',
            '/images/products-uses-images/zuvi/zuvi-use-2.jpg',
            '/images/products-uses-images/zuvi/zuvi-use-3.jpg',
        ],
        shortDescription: 'Adjustable spike-mounted garden spotlight for premium landscapes.',
        description: 'Zuvi is designed to withstand harsh outdoor elements while projecting a warm spot beam. The 360-degree rotatable head offers creative freedom for uplighting plants and architectural elements.',
        specs: ['Spike Mounted', '360° Rotation', 'Corrosion Proof'],
        technicalSpecs: [
            { label: 'Input Voltage', value: '12V / 24V DC Low Voltage' },
            { label: 'Color Rendering Index (CRI)', value: '>85 Ra' },
            { label: 'Luminous Flux', value: '450 Lumens' },
            { label: 'Color Temperature', value: '2700K Warm Gold' },
            { label: 'Power Consumption', value: '6 Watts' },
            { label: 'Housing Material', value: 'Heavy Duty Anodized Aluminum' },
        ],
        applications: ['Tree Uplighting', 'Garden Pathways', 'Lawn Perimeters', 'Bespoke Landscape Planning'],
    },
];
