<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Environment;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class LandingPageProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Ensure public/images/products directory exists and copy original assets
        $targetDir = public_path('images/products');
        if (!File::exists($targetDir)) {
            File::makeDirectory($targetDir, 0755, true);
        }

        $imageMapping = [
            'g5043.jpeg' => 'WhatsApp_Image_2026-08-03_at_1.38.59_PM.jpeg',
            'gl-classic.jpeg' => 'WhatsApp_Image_2026-08-03_at_1.49.55_PM__1_.jpeg',
            'lg-linear.jpeg' => 'WhatsApp_Image_2026-08-03_at_1.56.45_PM.jpeg',
            'ss-surface.jpeg' => 'WhatsApp_Image_2026-08-03_at_2.08.24_PM.jpeg',
            'gc-crown.jpeg' => 'WhatsApp_Image_2026-08-03_at_2.04.36_PM.jpeg',
            'gp-globe.jpeg' => 'WhatsApp_Image_2026-08-03_at_2.12.26_PM.jpeg',
            'hx-helix.png' => 'PT1.PNG',
            'go-globe.png' => 'PT2.PNG',
            'hx-helix-pro.png' => 'PT1-1.PNG',
            'sg-sphere.png' => 'PT2-1.PNG',
        ];

        $sourceDir = resource_path('js/pages/imports');
        foreach ($imageMapping as $destName => $srcName) {
            $srcPath = $sourceDir . '/' . $srcName;
            $destPath = $targetDir . '/' . $destName;
            if (File::exists($srcPath) && !File::exists($destPath)) {
                File::copy($srcPath, $destPath);
            }
        }

        // 2. Ensure Environments & Categories exist
        $outdoor = Environment::firstOrCreate(
            ['slug' => 'outdoor'],
            ['name' => 'Outdoor', 'sort_order' => 1, 'is_active' => true]
        );
        $indoor = Environment::firstOrCreate(
            ['slug' => 'indoor'],
            ['name' => 'Indoor', 'sort_order' => 2, 'is_active' => true]
        );
        $poles = Environment::firstOrCreate(
            ['slug' => 'poles'],
            ['name' => 'Poles', 'sort_order' => 4, 'is_active' => true]
        );

        $catMap = [
            'pathway-lights' => Category::firstOrCreate(
                ['slug' => 'pathway-lights'],
                ['environment_id' => $outdoor->id, 'name' => 'Pathway Lights', 'sort_order' => 5, 'is_active' => true]
            ),
            'post-top-luminaires' => Category::firstOrCreate(
                ['slug' => 'post-top-luminaires'],
                ['environment_id' => $outdoor->id, 'name' => 'Post Top Luminaires', 'sort_order' => 2, 'is_active' => true]
            ),
            'linear-lights' => Category::firstOrCreate(
                ['slug' => 'linear-lights'],
                ['environment_id' => $outdoor->id, 'name' => 'Linear Lights', 'sort_order' => 6, 'is_active' => true]
            ),
            'surface-ceiling-luminaires' => Category::firstOrCreate(
                ['slug' => 'surface-ceiling-luminaires'],
                ['environment_id' => $indoor->id, 'name' => 'Surface Ceiling Luminaires', 'sort_order' => 1, 'is_active' => true]
            ),
            'pole-lights' => Category::firstOrCreate(
                ['slug' => 'pole-lights'],
                ['environment_id' => $poles->id, 'name' => 'Pole Lights', 'sort_order' => 2, 'is_active' => true]
            ),
            'street-lights' => Category::firstOrCreate(
                ['slug' => 'street-lights'],
                ['environment_id' => $poles->id, 'name' => 'Street Lights', 'sort_order' => 1, 'is_active' => true]
            ),
        ];

        // Demote older sample catalog products so the 10 landing products take priority
        Product::whereIn('slug', [
            'gavle-surface-ceiling-luminaires',
            'atlantic-bollards',
            'duomo-bollards',
            'atlantic-pendant-luminaires',
            'archis',
            'canva'
        ])->update(['is_featured' => false, 'sort_order' => 50]);

        // 3. Products dataset matching Figma Make landing page
        $products = [
            [
                'sort_order' => 1,
                'category_slug' => 'pathway-lights',
                'name' => 'G5043 LED Garden Light',
                'slug' => 'g5043-led-garden-light',
                'image' => '/images/products/g5043.jpeg',
                'gallery' => [
                    'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=1600&h=900&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1600&h=900&fit=crop&auto=format',
                ],
                'short_description' => 'A sculptural luminaire engineered for premium outdoor spaces with architectural ring design.',
                'description' => 'A sculptural luminaire engineered for premium outdoor spaces. The G5043 combines architectural ring design with high-efficiency LED technology for boulevards, plazas, and landscaped environments.',
                'specs' => ['Garden Series', 'IP65 Rated', 'Anodised Aluminium', '3000K / 4000K'],
                'technical_specs' => [
                    ['label' => 'Model', 'value' => 'G5043'],
                    ['label' => 'Type', 'value' => 'LED Garden Light'],
                    ['label' => 'Finish', 'value' => 'Anodised Aluminium'],
                    ['label' => 'IP Rating', 'value' => 'IP65'],
                    ['label' => 'CCT', 'value' => '3000K / 4000K'],
                ],
                'applications' => ['Boulevards', 'Civic Plazas', 'Landscaped Environments', 'Resort Grounds'],
                'is_featured' => true,
                'default_variant' => ['sku' => 'G5043-30K-IP65', 'title' => 'G5043 Garden Light 3000K'],
            ],
            [
                'sort_order' => 2,
                'category_slug' => 'post-top-luminaires',
                'name' => 'GL Classic LED Lantern',
                'slug' => 'gl-classic-led-lantern',
                'image' => '/images/products/gl-classic.jpeg',
                'gallery' => [
                    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1565199975350-a723a63c053f?w=1600&h=900&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?w=1600&h=900&fit=crop&auto=format',
                ],
                'short_description' => 'A timeless lantern-style post light blending heritage craftsmanship with modern LED efficiency.',
                'description' => 'A timeless lantern-style post light blending heritage craftsmanship with modern LED efficiency. Ideal for boulevards, heritage districts, hotel driveways, and high-end residential streetscapes.',
                'specs' => ['Heritage Series', 'IP66 Waterproof', 'Cast Aluminium', '2700K / 3000K'],
                'technical_specs' => [
                    ['label' => 'Model', 'value' => 'GL Classic'],
                    ['label' => 'Type', 'value' => 'Post Lantern'],
                    ['label' => 'Body', 'value' => 'Cast Aluminium'],
                    ['label' => 'IP Rating', 'value' => 'IP66'],
                    ['label' => 'CCT', 'value' => '2700K / 3000K'],
                    ['label' => 'Finish', 'value' => 'Matte Black'],
                ],
                'applications' => ['Boulevards', 'Heritage Districts', 'Hotel Driveways', 'Luxury Streetscapes'],
                'is_featured' => true,
                'default_variant' => ['sku' => 'GL-CLS-30K-IP66', 'title' => 'GL Classic Post Lantern 3000K'],
            ],
            [
                'sort_order' => 3,
                'category_slug' => 'linear-lights',
                'name' => 'LG Linear Recessed Inground',
                'slug' => 'lg-linear-recessed-inground',
                'image' => '/images/products/lg-linear.jpeg',
                'gallery' => [
                    'https://images.unsplash.com/photo-1703289773827-7f838dbd5558?w=1600&h=900&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1571440727633-ca6b05da2008?w=1600&h=900&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1559173525-d16dfd7c17fe?w=1600&h=900&fit=crop&auto=format',
                ],
                'short_description' => 'Precision-engineered recessed linear luminaire transforming driveways into dramatic lit passages.',
                'description' => 'A precision-engineered recessed linear luminaire that transforms driveways, plazas, and pathways into dramatic lit passages. Flush-mounted aluminium profile with IP67 protection for demanding outdoor environments.',
                'specs' => ['Linear Series', 'IP67 Waterproof', 'Extruded Aluminium', '2700K / 4000K'],
                'technical_specs' => [
                    ['label' => 'Model', 'value' => 'LG Linear'],
                    ['label' => 'Type', 'value' => 'Recessed Linear'],
                    ['label' => 'Body', 'value' => 'Extruded Aluminium'],
                    ['label' => 'IP Rating', 'value' => 'IP67'],
                    ['label' => 'CCT', 'value' => '2700K / 4000K'],
                    ['label' => 'Install', 'value' => 'Flush Inground'],
                ],
                'applications' => ['Driveways', 'Civic Plazas', 'Architectural Walkways', 'Pedestrian Passages'],
                'is_featured' => true,
                'default_variant' => ['sku' => 'LG-LIN-40K-IP67', 'title' => 'LG Linear Inground 4000K'],
            ],
            [
                'sort_order' => 4,
                'category_slug' => 'surface-ceiling-luminaires',
                'name' => 'SS Surface LED Spotlight',
                'slug' => 'ss-surface-led-spotlight',
                'image' => '/images/products/ss-surface.jpeg',
                'gallery' => [
                    'https://images.unsplash.com/photo-1711107796112-e5b4fe9aa075?w=1600&h=900&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1608377205619-03a0b4c4e270?w=1600&h=900&fit=crop&auto=format',
                ],
                'short_description' => 'Modular surface-mounted COB spotlight series in 1, 2, 3, and 4 head configurations.',
                'description' => 'A modular surface-mounted COB spotlight series available in 1, 2, 3, and 4 head configurations. Engineered for precision accent lighting in bedrooms, dining rooms, living spaces, and commercial interiors.',
                'specs' => ['Interior Series', 'Modular COB', '1-4 Heads', 'IP20 Interior'],
                'technical_specs' => [
                    ['label' => 'Model', 'value' => 'SS Surface'],
                    ['label' => 'Type', 'value' => 'Surface Spotlight'],
                    ['label' => 'Heads', 'value' => '1 / 2 / 3 / 4'],
                    ['label' => 'IP Rating', 'value' => 'IP20'],
                    ['label' => 'CCT', 'value' => '3000K / 4000K'],
                    ['label' => 'Finish', 'value' => 'Black / White'],
                ],
                'applications' => ['Living Spaces', 'Executive Bedrooms', 'Boutique Showrooms', 'Commercial Interiors'],
                'is_featured' => true,
                'default_variant' => ['sku' => 'SS-SRF-2H-30K', 'title' => 'SS Surface 2-Head 3000K Black'],
            ],
            [
                'sort_order' => 5,
                'category_slug' => 'post-top-luminaires',
                'name' => 'GC Crown LED Lantern',
                'slug' => 'gc-crown-led-lantern',
                'image' => '/images/products/gc-crown.jpeg',
                'gallery' => [
                    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&h=900&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=900&fit=crop&auto=format',
                ],
                'short_description' => 'Regal ornamental lantern inspired by classical European street lighting.',
                'description' => 'A regal ornamental lantern inspired by classical European street lighting. Intricate crown-top casting in die-cast aluminium, paired with LED efficiency — designed for heritage districts, palace driveways, and luxury streetscapes.',
                'specs' => ['Royal Series', 'IP65 Rated', 'Die-Cast Aluminium', '2700K / 3000K'],
                'technical_specs' => [
                    ['label' => 'Model', 'value' => 'GC Crown'],
                    ['label' => 'Type', 'value' => 'Ornamental Post Top'],
                    ['label' => 'Body', 'value' => 'Die-Cast Aluminium'],
                    ['label' => 'IP Rating', 'value' => 'IP65'],
                    ['label' => 'CCT', 'value' => '2700K / 3000K'],
                    ['label' => 'Finish', 'value' => 'Matte Black'],
                ],
                'applications' => ['Heritage Districts', 'Palace Driveways', 'Luxury Streetscapes', 'Boutique Resorts'],
                'is_featured' => true,
                'default_variant' => ['sku' => 'GC-CRW-30K-IP65', 'title' => 'GC Crown Ornamental Lantern 3000K'],
            ],
            [
                'sort_order' => 6,
                'category_slug' => 'post-top-luminaires',
                'name' => 'GP Globe LED Post Light',
                'slug' => 'gp-globe-led-post-light',
                'image' => '/images/products/gp-globe.jpeg',
                'gallery' => [
                    'https://images.unsplash.com/photo-1564501838839-b8d1da6fd0e7?w=1600&h=900&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1529422085564-f38b543fb00e?w=1600&h=900&fit=crop&auto=format',
                ],
                'short_description' => 'Contemporary globe post light with clear borosilicate sphere and 360° uniform illumination.',
                'description' => 'A contemporary globe post light with a clear borosilicate sphere and precision die-cast aluminium housing. The iconic spherical form delivers 360° uniform illumination — perfectly suited for promenades, resort boulevards, and landscape avenues.',
                'specs' => ['Globe Series', '360° Illumination', 'Borosilicate Globe', 'IP65 Rated'],
                'technical_specs' => [
                    ['label' => 'Model', 'value' => 'GP Globe'],
                    ['label' => 'Type', 'value' => 'Globe Post Top'],
                    ['label' => 'Body', 'value' => 'Die-Cast Aluminium'],
                    ['label' => 'IP Rating', 'value' => 'IP65'],
                    ['label' => 'CCT', 'value' => '3000K / 4000K'],
                    ['label' => 'Finish', 'value' => 'Matte Black / Grey'],
                ],
                'applications' => ['Waterfront Promenades', 'Resort Boulevards', 'Landscape Avenues', 'Campus Parks'],
                'is_featured' => true,
                'default_variant' => ['sku' => 'GP-GLB-30K-IP65', 'title' => 'GP Globe Post Light 3000K'],
            ],
            [
                'sort_order' => 7,
                'category_slug' => 'pole-lights',
                'name' => 'HX Helix LED Post Top',
                'slug' => 'hx-helix-led-post-top',
                'image' => '/images/products/hx-helix.png',
                'gallery' => [
                    'https://images.unsplash.com/photo-1684395832652-bd82a6758d03?w=1600&h=900&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1480944657103-7fed22359e1d?w=1600&h=900&fit=crop&auto=format',
                ],
                'short_description' => 'Sculptural post-top luminaire featuring three interlocking LED rings in signature helix formation.',
                'description' => 'A sculptural post-top luminaire featuring three interlocking LED rings in a signature helix formation. Each ring is independently illuminated for a dynamic, jewel-like nighttime presence — designed for landmark avenues, luxury resorts, and architectural streetscapes.',
                'specs' => ['Helix Series', '3x LED Rings', 'Signature Helix Form', 'IP65 Rated'],
                'technical_specs' => [
                    ['label' => 'Model', 'value' => 'HX Helix'],
                    ['label' => 'Type', 'value' => 'Decorative Post Top'],
                    ['label' => 'Rings', 'value' => '3× LED Ring'],
                    ['label' => 'IP Rating', 'value' => 'IP65'],
                    ['label' => 'CCT', 'value' => '3000K / 4000K'],
                    ['label' => 'Finish', 'value' => 'Gun Metal / Silver'],
                ],
                'applications' => ['Landmark Avenues', 'Luxury Resorts', 'Architectural Streetscapes', 'Civic Plazas'],
                'is_featured' => true,
                'default_variant' => ['sku' => 'HX-HLX-3R-IP65', 'title' => 'HX Helix 3-Ring Post Top 3000K'],
            ],
            [
                'sort_order' => 8,
                'category_slug' => 'post-top-luminaires',
                'name' => 'GO Globe Park Lantern',
                'slug' => 'go-globe-park-lantern',
                'image' => '/images/products/go-globe.png',
                'gallery' => [
                    'https://images.unsplash.com/photo-1687730825065-4b8a46325333?w=1600&h=900&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1685459842175-788b5f24ccf2?w=1600&h=900&fit=crop&auto=format',
                ],
                'short_description' => 'Weather-hardened globe park lantern with clear borosilicate dome over die-cast aluminium spire.',
                'description' => 'A weather-hardened globe park lantern with a clear borosilicate dome over a precision die-cast aluminium spire body. IP66-rated for year-round outdoor endurance — ideal for public parks, garden walkways, urban plazas and resort landscaping.',
                'specs' => ['Globe Outdoor Series', 'IP66 Waterproof', 'Borosilicate Dome', '3000K / 4000K'],
                'technical_specs' => [
                    ['label' => 'Model', 'value' => 'GO Globe'],
                    ['label' => 'Type', 'value' => 'Globe Park Lantern'],
                    ['label' => 'Body', 'value' => 'Die-Cast Aluminium'],
                    ['label' => 'IP Rating', 'value' => 'IP66'],
                    ['label' => 'CCT', 'value' => '3000K / 4000K'],
                    ['label' => 'Finish', 'value' => 'Matte Black'],
                ],
                'applications' => ['Public Parks', 'Garden Walkways', 'Urban Plazas', 'Resort Landscaping'],
                'is_featured' => true,
                'default_variant' => ['sku' => 'GO-GLB-IP66-30K', 'title' => 'GO Globe Park Lantern 3000K'],
            ],
            [
                'sort_order' => 9,
                'category_slug' => 'street-lights',
                'name' => 'HX Helix Pro Street Light',
                'slug' => 'hx-helix-pro-street-light',
                'image' => '/images/products/hx-helix-pro.png',
                'gallery' => [
                    'https://images.unsplash.com/photo-1571440727633-ca6b05da2008?w=1600&h=900&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=900&fit=crop&auto=format',
                ],
                'short_description' => 'Triple-ring LED street luminaire with angled helix orientation for wide carriageway illumination.',
                'description' => 'An evolved triple-ring LED street luminaire with angled helix orientation for superior light distribution across wide carriageways. Engineered for landmark boulevards, airport avenues and five-star resort driveways requiring sculptural identity after dark.',
                'specs' => ['Helix Pro Series', '3x Angled LED Rings', 'Carriageway Optics', 'IP65 Rated'],
                'technical_specs' => [
                    ['label' => 'Model', 'value' => 'HX Helix Pro'],
                    ['label' => 'Type', 'value' => 'Decorative Street Light'],
                    ['label' => 'Rings', 'value' => '3× Angled LED Ring'],
                    ['label' => 'IP Rating', 'value' => 'IP65'],
                    ['label' => 'CCT', 'value' => '3000K / 4000K'],
                    ['label' => 'Finish', 'value' => 'Gun Metal'],
                ],
                'applications' => ['Landmark Boulevards', 'Airport Avenues', 'Five-Star Resort Driveways', 'Expressways'],
                'is_featured' => true,
                'default_variant' => ['sku' => 'HX-PRO-ST-40K', 'title' => 'HX Helix Pro Street Luminaire 4000K'],
            ],
            [
                'sort_order' => 10,
                'category_slug' => 'pathway-lights',
                'name' => 'SG Sphere Garden Post Light',
                'slug' => 'sg-sphere-garden-post-light',
                'image' => '/images/products/sg-sphere.png',
                'gallery' => [
                    'https://images.unsplash.com/photo-1763057802427-095bf233dc8a?w=1600&h=900&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1586766820393-556ca02e1bcd?w=1600&h=900&fit=crop&auto=format',
                ],
                'short_description' => 'All-weather sphere garden post light with rain-tested borosilicate globe and cast-iron mount.',
                'description' => 'A robust all-weather sphere garden post light with rain-tested borosilicate globe and a precision cast-iron spire mount. Designed for public parks, civic plazas, resort grounds and heritage garden landscapes where year-round weatherproofing is essential.',
                'specs' => ['Sphere Garden Series', 'IP66 All-Weather', 'Borosilicate Clear', 'Cast-Iron Spire'],
                'technical_specs' => [
                    ['label' => 'Model', 'value' => 'SG Sphere'],
                    ['label' => 'Type', 'value' => 'Sphere Garden Light'],
                    ['label' => 'Globe', 'value' => 'Borosilicate Clear'],
                    ['label' => 'IP Rating', 'value' => 'IP66'],
                    ['label' => 'CCT', 'value' => '3000K / 4000K'],
                    ['label' => 'Finish', 'value' => 'Matte Black'],
                ],
                'applications' => ['Public Parks', 'Civic Plazas', 'Resort Grounds', 'Heritage Gardens'],
                'is_featured' => true,
                'default_variant' => ['sku' => 'SG-SPH-30K-IP66', 'title' => 'SG Sphere Garden Light 3000K'],
            ],
        ];

        // 4. Upsert Products & Variants
        foreach ($products as $pData) {
            $cat = $catMap[$pData['category_slug']] ?? null;
            if (!$cat) continue;

            $product = Product::updateOrCreate(
                ['slug' => $pData['slug']],
                [
                    'category_id' => $cat->id,
                    'name' => $pData['name'],
                    'image' => $pData['image'],
                    'gallery' => $pData['gallery'],
                    'short_description' => $pData['short_description'],
                    'description' => $pData['description'],
                    'specs' => $pData['specs'],
                    'technical_specs' => $pData['technical_specs'],
                    'applications' => $pData['applications'],
                    'is_featured' => $pData['is_featured'],
                    'is_active' => true,
                    'sort_order' => $pData['sort_order'],
                ]
            );

            // Default variant for inquiries and quote configurator
            if (isset($pData['default_variant'])) {
                ProductVariant::updateOrCreate(
                    ['sku' => $pData['default_variant']['sku']],
                    [
                        'product_id' => $product->id,
                        'title' => $pData['default_variant']['title'],
                        'is_default' => true,
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}
