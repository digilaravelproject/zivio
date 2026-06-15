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
        id: 'archis',
        name: 'Archis',
        categories: ['Outdoor', 'New Product'],
        image: '/images/products-uses-images/archis/archis-product.jpg',
        href: '/products/archis',
        subtitle: 'High-Performance Architectural Wall Luminaire',
    },
    {
        id: 'canva',
        name: 'Canva',
        categories: ['Indoor'],
        image: '/images/products-uses-images/canva/canva-product.jpg',
        href: '/products/canva',
        subtitle: 'Sleek Recessed Architectural Spotlight',
    },
    {
        id: 'lectus',
        name: 'Lectus',
        categories: ['Indoor', 'New Product'],
        image: '/images/products-uses-images/lectus/lectus-product.jpg',
        href: '/products/lectus',
        subtitle: 'Minimalist Linear Suspension Light',
    },
    {
        id: 'magna',
        name: 'Magna',
        categories: ['Outdoor'],
        image: '/images/products-uses-images/magna/magna-product.jpg',
        href: '/products/magna',
        subtitle: 'Heavy-Duty Exterior Flood Light',
    },
    {
        id: 'nova',
        name: 'Nova',
        categories: ['Indoor'],
        image: '/images/products-uses-images/nova/nova-product.jpg',
        href: '/products/nova',
        subtitle: 'Magnetic Low-Voltage Track System',
    },
    {
        id: 'spectra',
        name: 'Spectra',
        categories: ['Poles'],
        image: '/images/products-uses-images/spectra/spectra-product.jpg',
        href: '/products/spectra',
        subtitle: 'Modern Post-Top Pole Luminaire',
    },
    {
        id: 'zuvi',
        name: 'Zuvi',
        categories: ['Outdoor', 'New Product'],
        image: '/images/products-uses-images/zuvi/zuvi-product.jpg',
        href: '/products/zuvi',
        subtitle: 'Adjustable Landscape Spike Light',
    },
];
