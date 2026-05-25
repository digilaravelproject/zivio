export type FooterLink = {
    label: string;
    href: string;
};

export type FooterData = {
    logo: string;
    description: string;
    quickLinks: FooterLink[];
    productCategories: FooterLink[];
    address: string[];
    phones: string[];
    email: string;
    socialLinks: FooterLink[];
    copyright: string;
};

export const footerData: FooterData = {
    logo: 'ZIVIO LIFE',
    description:
        'Premium architectural and modern lighting solutions crafted for residential, commercial, and outdoor spaces.',
    quickLinks: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Products', href: '/products' },
        { label: 'Projects', href: '/projects' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' },
    ],
    productCategories: [
        { label: 'Indoor Lighting', href: '/products/indoor-lighting' },
        { label: 'Outdoor Lighting', href: '/products/outdoor-lighting' },
        { label: 'Pole Lighting', href: '/products/pole-lighting' },
        { label: 'Solar Lighting', href: '/products/solar-lighting' },
        { label: 'Decorative Lighting', href: '/products/decorative-lighting' },
        { label: 'High Mast Lighting', href: '/products/high-mast-lighting' },
    ],
    address: [
        'Infinity Square, Unit No. 110, 1st Floor,',
        'Golani Naka, Vasai East, Waliv,',
        'Maharashtra 401208, India',
    ],
    phones: ['+91-9552152384', '+91-8237572384'],
    email: 'shree@ziviolife.com',
    socialLinks: [
        { label: 'LinkedIn', href: '/' },
        { label: 'Instagram', href: '/' },
        { label: 'Twitter', href: '/' },
    ],
    copyright: '© 2026 ZIVIO LIFE. All rights reserved.',
};
