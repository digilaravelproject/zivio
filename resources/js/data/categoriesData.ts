export type Category = {
    title: string;
    image: string;
    href: string;
};

export const categories: Category[] = [
    {
        title: 'Indoor Lighting',
        image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=85',
        href: '/products/indoor-lighting',
    },
    {
        title: 'Outdoor Lighting',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
        href: '/products/outdoor-lighting',
    },
    {
        title: 'Pole Lighting',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85',
        href: '/products/pole-lighting',
    },
    {
        title: 'Solar Lighting',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=85',
        href: '/products/solar-lighting',
    },
];
