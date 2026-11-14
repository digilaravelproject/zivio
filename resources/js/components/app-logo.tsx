import { BrandLogo } from '@/components/common/BrandLogo';

export default function AppLogo() {
    return (
        <div className="flex items-center px-1 py-1">
            <BrandLogo theme="light" size="sm" showByArtize={false} />
        </div>
    );
}
