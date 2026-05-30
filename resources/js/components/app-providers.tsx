import { lazy, Suspense, type ReactNode } from 'react';

const TooltipProvider = lazy(() =>
    import('@/components/ui/tooltip').then((module) => ({
        default: module.TooltipProvider,
    })),
);

const Toaster = lazy(() =>
    import('@/components/ui/sonner').then((module) => ({
        default: module.Toaster,
    })),
);

type AppProvidersProps = {
    children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <Suspense fallback={children}>
            <TooltipProvider delayDuration={0}>
                {children}
                <Toaster />
            </TooltipProvider>
        </Suspense>
    );
}
