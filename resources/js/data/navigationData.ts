export type NavigationLink = {
    label: string;
    href?: string;
    children?: {
        label: string;
        href: string;
    }[];
};

export const navigationLinks: NavigationLink[] = [
    { label: 'Home', href: '/' },
    { 
        label: 'Company', 
        children: [
            { label: 'About Company', href: '/about-company' },
            { label: 'Teams', href: '/teams' },
            { label: 'Our Brands', href: '/our-brands' },
        ]
    },
    { 
        label: 'Products', 
        children: [
            { label: 'Indoor', href: '/products/indoor' },
            { label: 'Outdoor', href: '/products/outdoor' },
            { label: 'Solar', href: '/products/solar' },
            { label: 'All Products', href: '/products' },
        ]
    },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
];
