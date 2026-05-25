export type ContactFormField =
    | 'name'
    | 'email'
    | 'phone'
    | 'projectType'
    | 'message';

export type ContactData = {
    label: string;
    heading: string;
    paragraph: string;
    address: string[];
    phones: string[];
    email: string;
    projectTypes: string[];
    submitLabel: string;
    successMessage: string;
};

export const contactData: ContactData = {
    label: 'Contact Us',
    heading: "Let’s illuminate your next space.",
    paragraph:
        'Share your project details and our team will connect with you for lighting consultation, product selection, and design support.',
    address: [
        'Infinity Square, Unit No. 110, 1st Floor,',
        'Golani Naka, Vasai East, Waliv,',
        'Maharashtra 401208, India',
    ],
    phones: ['+91-9552152384', '+91-8237572384'],
    email: 'shree@ziviolife.com',
    projectTypes: [
        'Residential',
        'Commercial',
        'Architectural',
        'Outdoor / Landscape',
        'Solar Lighting',
        'Other',
    ],
    submitLabel: 'Send Inquiry',
    successMessage:
        'Thank you. Your inquiry has been noted and our team will connect with you soon.',
};
