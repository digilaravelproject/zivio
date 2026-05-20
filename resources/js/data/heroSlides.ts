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
        image: 'https://images.unsplash.com/photo-1648821744121-e9d1c72a6c43?auto=format&fit=crop&w=2200&q=90',
        title: 'Light That Shapes A Space',
        subtitle: 'Lighting solutions that adapt to your life',
        buttonText: 'View Collection',
        buttonHref: '/products',
        showText: true,
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90',
        title: 'Future of Lighting',
        subtitle:
            'Architectural lighting solutions designed to transform modern spaces.',
        buttonText: 'Explore Collection',
        buttonHref: '/products',
        showText: true,
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=90',
        title: 'Light That Shapes Emotion',
        subtitle:
            'Innovative, sustainable, and energy-efficient lighting for every space.',
        buttonText: 'View Products',
        buttonHref: '/products',
        showText: true,
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2200&q=90',
        title: 'Designed for Architecture',
        subtitle: 'Where technology, design, and functionality meet.',
        buttonText: 'Start a Project',
        buttonHref: '/contact',
        showText: true,
    },

];
