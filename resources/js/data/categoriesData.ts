export type Category = {
    title: string;
    image: string;
    href: string;
};

export const categories: Category[] = [
    {
        title: 'Indoor Lighting',
        image: '/images/category/indoor.jpeg',
        href: '/products/indoor-lighting',
    },
    {
        title: 'Outdoor Lighting',
        image: '/images/category/outdoor.png',
        href: '/products/outdoor-lighting',
    },
    {
        title: 'Pole Lighting',
        image: '/images/category/pole.jpeg',
        href: '/products/pole-lighting',
    },
    {
        title: 'Solar Lighting',
        image: '/images/category/solar.png',
        href: '/products/solar-lighting',
    },
];
