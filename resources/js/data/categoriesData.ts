export type Category = {
    title: string;
    image: string;
    href: string;
};

export const categories: Category[] = [
    {
        title: 'Indoor Lighting',
        image: '/images/category/indoor.png',
        href: '/products/indoor',
    },
    {
        title: 'Outdoor Lighting',
        image: '/images/category/outdoor.png',
        href: '/products/outdoor',
    },
    {
        title: 'Pole Lighting',
        image: '/images/category/pole.png',
        href: '/products/poles',
    },
    {
        title: 'Facade Lighting',
        image: '/images/category/facade.png',
        href: '/products/decorative', // Facade fallback / products page
    },
    {
        title: 'Solar Lighting',
        image: '/images/category/solar.png',
        href: '/products/solar',
    },
    {
        title: 'Decorative Lighting',
        image: '/images/category/outdoor.png',
        href: '/products/decorative',
    },
];
