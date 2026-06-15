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
        image: '/images/projects/oberoi-sky-city-mall.png',
        href: '/projects/oberoi-sky-city-mall',
    },
    {
        id: 'barc-mumbai',
        title: 'BARC Mumbai',
        location: 'Mumbai, Maharashtra',
        category: 'Institutional Lighting',
        description:
            'Precision lighting solutions crafted for scale, safety, and long-lasting performance.',
        image: '/images/projects/barc-mumbai.png',
        href: '/projects/barc-mumbai',
    },
];
