export type Project = {
    id: string;
    title: string;
    location: string;
    category: string;
    description: string;
    image: string;
    href: string;
};

export const projectsData: Project[] = [
    {
        id: 'oberoi-sky-city-mall',
        title: 'Oberoi Sky City Mall',
        location: 'Borivali, Maharashtra',
        category: 'Commercial Lighting',
        description:
            'Architectural lighting designed to enhance commercial movement, ambience, and visual impact.',
        image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1500&q=80',
        href: '/projects/oberoi-sky-city-mall',
    },
    {
        id: 'barc-mumbai',
        title: 'BARC Mumbai',
        location: 'Mumbai, Maharashtra',
        category: 'Institutional Lighting',
        description:
            'Precision lighting solutions crafted for scale, safety, and long-lasting performance.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1500&q=80',
        href: '/projects/barc-mumbai',
    },
];
