export type NavigationLink = {
    label: string;
    href?: string;
    children?: {
        label: string;
        href: string;
    }[];
};

export const navigationLinks: NavigationLink[] = [
    { 
        label: 'Products', 
        children: [
            { label: 'Indoor', href: '/products/indoor' },
            { label: 'Outdoor', href: '/products/outdoor' },
            { label: 'Solar', href: '/products/solar' },
            { label: 'Poles', href: '/products/poles' },
            { label: 'Decorative', href: '/products/decorative' },
            { label: 'Highmast', href: '/products/highmast' },
            { label: 'All Products', href: '/products' },
        ]
    },
    { label: 'Projects', href: '/projects' },
    { label: 'Downloads', href: '#downloads' },
    { label: 'Contact Us', href: '/contact' },
];
