export type ContactFormField =
    | 'name'
    | 'email'
    | 'phone'
    | 'company'
    | 'projectType'
    | 'message';

export type ContactPageData = {
    hero: {
        label: string;
        heading: string;
        paragraph: string;
        backgroundImage: string;
    };
    details: {
        address: string[];
        phones: string[];
        email: string;
        studioHeading: string;
        mapEmbedQuery: string;
        mapLink: string;
    };
    form: {
        projectTypes: string[];
        submitLabel: string;
        successMessage: string;
    };
};

export const contactPageData: ContactPageData = {
    hero: {
        label: 'CONTACT ZIVIO',
        heading: 'Let’s illuminate your next space.',
        paragraph: 'Share your project details and our team will connect with you for lighting consultation, product selection, and design support.',
        backgroundImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1920&q=80',
    },
    details: {
        address: [
            'Infinity Square, Unit No. 110, 1st Floor,',
            'Golani Naka, Vasai East, Waliv,',
            'Maharashtra 401208, India',
        ],
        phones: ['+91-9552152384', '+91-8237572384'],
        email: 'shree@ziviolife.com',
        studioHeading: 'Visit Our Studio',
        mapEmbedQuery: 'Infinity+Square+Vasai+East+Maharashtra',
        mapLink: 'https://maps.google.com/?q=Infinity+Square,+Vasai+East,+Waliv,+Maharashtra+401208,+India',
    },
    form: {
        projectTypes: [
            'Residential',
            'Commercial',
            'Architectural',
            'Outdoor / Landscape',
            'Solar Lighting',
            'Other',
        ],
        submitLabel: 'Send Inquiry',
        successMessage: 'Thank you. Your inquiry has been noted and our team will connect with you soon.',
    },
};
