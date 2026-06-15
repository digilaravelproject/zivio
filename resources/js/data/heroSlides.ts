export type HeroSlide = {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonHref: string;
    showText: boolean;
};

export const heroSlides: HeroSlide[] = [
    {
        id: 1,
        image: '/images/hero-sections/hero-slide-1.jpeg',
        title: 'Light That Shapes A Space',
        subtitle: 'Lighting solutions that adapt to your life',
        buttonText: 'View Collection',
        buttonHref: '/products',
        showText: true,
    },
    {
        id: 5,
        image: '/images/hero-sections/hero-slide-5.webp',
        title: 'Elegance In Every Corner',
        subtitle: 'Premium indoor lighting designed for luxury living',
        buttonText: 'Explore Indoor',
        buttonHref: '/products',
        showText: true,
    },
    {
        id: 2,
        image: '/images/hero-sections/hero-slide-2.jpeg',
        title: 'Future Of Lighting',
        subtitle:
            'Architectural lighting solutions designed to transform modern spaces.',
        buttonText: 'Explore Collection',
        buttonHref: '/products',
        showText: true,
    },
    {
        id: 6,
        image: '/images/hero-sections/hero-slide-6.webp',
        title: 'A Touch Of Brilliance',
        subtitle: 'Sleek architectural indoor fixtures for modern spaces',
        buttonText: 'View Indoor',
        buttonHref: '/products',
        showText: true,
    },
    {
        id: 3,
        image: '/images/hero-sections/hero-slide-3.jpeg',
        title: 'Light That Shapes Emotion',
        subtitle:
            'Innovative, sustainable, and energy-efficient lighting for every space.',
        buttonText: 'View Products',
        buttonHref: '/products',
        showText: true,
    },
    {
        id: 4,
        image: '/images/hero-sections/hero-slide-4.jpeg',
        title: 'Designed For Architecture',
        subtitle: 'Where technology, design, and functionality meet.',
        buttonText: 'Start a Project',
        buttonHref: '/contact',
        showText: true,
    },
];
