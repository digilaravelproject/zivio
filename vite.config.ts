import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/css/welcome.css',
                'resources/js/app.tsx',
            ],
            refresh: true,
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) {
                        return;
                    }

                    if (
                        id.includes('@radix-ui') ||
                        id.includes('@headlessui') ||
                        id.includes('sonner')
                    ) {
                        return 'ui';
                    }

                    if (
                        id.includes('lucide-react') ||
                        id.includes('class-variance-authority') ||
                        id.includes('clsx') ||
                        id.includes('tailwind-merge')
                    ) {
                        return 'utilities';
                    }

                    if (id.includes('@inertiajs')) {
                        return 'inertia';
                    }

                    if (id.includes('framer-motion')) {
                        return 'motion';
                    }

                    if (id.includes('swiper')) {
                        return 'swiper';
                    }

                    if (
                        /node_modules[/\\](react|react-dom|scheduler)[/\\]/.test(
                            id,
                        )
                    ) {
                        return 'react';
                    }
                },
            },
        },
    },
});
