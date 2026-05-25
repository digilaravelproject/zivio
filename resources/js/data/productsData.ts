export type ProductCategory =
    | 'All'
    | 'New Product'
    | 'Outdoor'
    | 'Indoor'
    | 'Poles';

export type Product = {
    id: string;
    name: string;
    categories: Exclude<ProductCategory, 'All'>[];
    image: string;
    imageFit?: 'cover' | 'contain';
    href: string;
    subtitle: string;
};

export const productCategories: ProductCategory[] = [
    'All',
    'New Product',
    'Outdoor',
    'Indoor',
    'Poles',
];

export const productsData: Product[] = [
    {
        id: 'halocore-arcl13',
        name: 'Halocore ARCL13',
        categories: ['Outdoor', 'New Product'],
        image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85',
        href: '/products/halocore-arcl13',
        subtitle: 'Architectural Outdoor Lighting',
    },
    {
        id: 'luxpod-ascl1',
        name: 'Luxpod ASCL1',
        categories: ['Indoor'],
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85',
        href: '/products/luxpod-ascl1',
        subtitle: 'Compact Interior Illumination',
    },
    {
        id: 'orionis-ascl7',
        name: 'Orionis ASCL7',
        categories: ['Indoor', 'New Product'],
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85',
        href: '/products/orionis-ascl7',
        subtitle: 'Premium Indoor Lighting',
    },
    {
        id: 'flarex-arcl8',
        name: 'FlareX ARCL8',
        categories: ['Outdoor'],
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
        href: '/products/flarex-arcl8',
        subtitle: 'High-Performance Facade Lighting',
    },
    {
        id: 'brightcore-arcl10',
        name: 'Brightcore ARCL10',
        categories: ['Outdoor', 'Poles'],
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
        href: '/products/brightcore-arcl10',
        subtitle: 'Pole-Mounted Outdoor Lighting',
    },
    {
        id: 'lumicube-ascl2',
        name: 'Lumicube ASCL2',
        categories: ['Indoor'],
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
        href: '/products/lumicube-ascl2',
        subtitle: 'Minimal Interior Cube Light',
    },
    {
        id: 'led-roof-ascl2',
        name: 'Led Roof ASCL2',
        categories: ['Poles', 'New Product'],
        image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85',
        href: '/products/led-roof-ascl2',
        subtitle: 'Clean Roofline Lighting System',
    },
];
