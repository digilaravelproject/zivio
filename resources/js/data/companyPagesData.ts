export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
}

export interface Brand {
    id: string;
    name: string;
    description: string;
    image: string;
}

export const teamsPageData = {
    hero: {
        label: 'OUR TEAM',
        heading: 'The people shaping light with precision and imagination.',
        paragraph: 'Behind every ZIVIO solution is a team of designers, engineers, consultants, and project specialists working together to transform spaces through light.',
        backgroundImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    },
    collaboration: {
        heading: 'Built on collaboration.',
        text: 'Our team combines technical expertise, design sensitivity, and on-site execution to deliver lighting solutions that perform beautifully and last reliably.',
    },
    members: [
        {
            id: '1',
            name: 'Cs Jirapure',
            role: 'Chief Executive Officer',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=480&q=80',
        },
        {
            id: '2',
            name: 'Marcus Leong',
            role: 'Head of Design & Innovation',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=480&q=80',
        },
        {
            id: '3',
            name: 'Sophia Grant',
            role: 'Lighting Design Specialist',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=480&q=80',
        },
        {
            id: '4',
            name: 'Isabella Moreau',
            role: 'Creative Director',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=480&q=80',
        },
        {
            id: '5',
            name: 'Arjun Patel',
            role: 'Senior Electrical Engineer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=480&q=80',
        },
        {
            id: '6',
            name: 'David Kim',
            role: 'Project Operations Manager',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=480&q=80',
        },
    ] as TeamMember[],
};

export const brandsPageData = {
    hero: {
        label: 'OUR BRANDS',
        heading: 'Lighting brands crafted for modern architecture.',
        paragraph: 'ZIVIO brings together product innovation, architectural design, and sustainable lighting technologies to serve residential, commercial, outdoor, pole, and solar applications.',
        backgroundImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1920&q=80',
    },
    cta: {
        heading: 'Explore the complete lighting collection.',
    },
    brands: [
        {
            id: '1',
            name: 'ZIVIO Life',
            description: 'Architectural & Modern Lighting Solutions',
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&h=540&q=80',
        },
        {
            id: '2',
            name: 'ZIVIO Outdoor',
            description: 'Outdoor, landscape, and façade lighting',
            image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&h=540&q=80',
        },
        {
            id: '3',
            name: 'ZIVIO Solar',
            description: 'Sustainable solar lighting systems',
            image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&h=540&q=80',
        },
        {
            id: '4',
            name: 'ZIVIO Poles',
            description: 'Pole lighting and high-mast solutions',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=540&q=80',
        },
    ] as Brand[],
};
