<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Category;
use App\Models\Environment;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Environments
        $environmentsData = [
            [
                'name' => 'Outdoor',
                'slug' => 'outdoor',
                'image' => '/images/products-uses-images/archis/archis-use-1.jpg',
                'description' => 'Architectural exterior luminaires engineered for durability, weather resistance and precise beam distribution.',
                'sort_order' => 1,
            ],
            [
                'name' => 'Indoor',
                'slug' => 'indoor',
                'image' => '/images/products-uses-images/canva/canva-use-1.jpg',
                'description' => 'Sophisticated interior architectural luminaires with low glare optics and superior visual comfort.',
                'sort_order' => 2,
            ],
            [
                'name' => 'Solar',
                'slug' => 'solar',
                'image' => '/images/products-uses-images/archis/archis-use-2.jpg',
                'description' => 'Autonomous and hybrid solar lighting solutions combining high-efficiency PV with smart battery management.',
                'sort_order' => 3,
            ],
            [
                'name' => 'Poles',
                'slug' => 'poles',
                'image' => '/images/products-uses-images/archis/archis-use-3.jpg',
                'description' => 'Engineered structural lighting columns and decorative poles for urban landscapes and highways.',
                'sort_order' => 4,
            ],
            [
                'name' => 'Decorative',
                'slug' => 'decorative',
                'image' => '/images/products-uses-images/canva/canva-use-2.jpg',
                'description' => 'Statement chandeliers, acoustic pendants and bespoke sculptural luminaires.',
                'sort_order' => 5,
            ],
            [
                'name' => 'Highmast',
                'slug' => 'highmast',
                'image' => '/images/products-uses-images/archis/archis-use-4.jpg',
                'description' => 'High-power floodlighting and motorized lowering system masts for stadiums, airports and ports.',
                'sort_order' => 6,
            ],
            [
                'name' => 'Smart-Connect',
                'slug' => 'smart-connect',
                'image' => '/images/products-uses-images/canva/canva-product.jpg',
                'description' => 'Connected lighting ecosystems with IoT sensors, mesh connectivity and centralized monitoring.',
                'sort_order' => 7,
            ],
        ];

        $envModels = [];
        foreach ($environmentsData as $env) {
            $envModels[$env['slug']] = Environment::updateOrCreate(
                ['slug' => $env['slug']],
                $env
            );
        }

        // 2. Seed Categories
        $categoriesData = [
            // Outdoor
            ['env' => 'outdoor', 'name' => 'Bollards', 'slug' => 'bollards', 'image' => '/images/products-uses-images/archis/archis-product.jpg'],
            ['env' => 'outdoor', 'name' => 'Pendant Luminaires', 'slug' => 'pendant-luminaires', 'image' => '/images/products-uses-images/archis/archis-use-1.jpg'],
            ['env' => 'outdoor', 'name' => 'Wall Lights', 'slug' => 'wall-lights', 'image' => '/images/products-uses-images/archis/archis-use-2.jpg'],
            ['env' => 'outdoor', 'name' => 'Flood Lights', 'slug' => 'flood-lights', 'image' => '/images/products-uses-images/archis/archis-use-3.jpg'],
            ['env' => 'outdoor', 'name' => 'Pathway Lights', 'slug' => 'pathway-lights', 'image' => '/images/products-uses-images/archis/archis-use-4.jpg'],

            // Indoor
            ['env' => 'indoor', 'name' => 'Surface Ceiling Luminaires', 'slug' => 'surface-ceiling-luminaires', 'image' => '/images/products-uses-images/canva/canva-product.jpg'],
            ['env' => 'indoor', 'name' => 'Spotlights', 'slug' => 'spotlights', 'image' => '/images/products-uses-images/canva/canva-use-1.jpg'],
            ['env' => 'indoor', 'name' => 'Downlights', 'slug' => 'downlights', 'image' => '/images/products-uses-images/canva/canva-use-2.jpg'],
            ['env' => 'indoor', 'name' => 'Panel Lights', 'slug' => 'panel-lights', 'image' => '/images/products-uses-images/canva/canva-product.jpg'],
            ['env' => 'indoor', 'name' => 'Linear Lights', 'slug' => 'linear-lights', 'image' => '/images/products-uses-images/canva/canva-use-1.jpg'],

            // Poles
            ['env' => 'poles', 'name' => 'Street Lights', 'slug' => 'street-lights', 'image' => '/images/products-uses-images/archis/archis-use-3.jpg'],
            ['env' => 'poles', 'name' => 'Pole Lights', 'slug' => 'pole-lights', 'image' => '/images/products-uses-images/archis/archis-use-1.jpg'],

            // Solar
            ['env' => 'solar', 'name' => 'Solar Street Lights', 'slug' => 'solar-street-lights', 'image' => '/images/products-uses-images/archis/archis-use-2.jpg'],
            ['env' => 'solar', 'name' => 'Solar Bollards', 'slug' => 'solar-bollards', 'image' => '/images/products-uses-images/archis/archis-product.jpg'],
        ];

        $catModels = [];
        foreach ($categoriesData as $idx => $cat) {
            $catModels[$cat['slug']] = Category::updateOrCreate(
                ['slug' => $cat['slug']],
                [
                    'environment_id' => $envModels[$cat['env']]->id,
                    'name' => $cat['name'],
                    'image' => $cat['image'],
                    'sort_order' => $idx + 1,
                    'is_active' => true,
                ]
            );
        }

        // 3. Seed Dynamic Attributes & Values
        $attributesData = [
            [
                'name' => 'Power (W)',
                'slug' => 'power',
                'unit' => 'W',
                'type' => 'select',
                'sort_order' => 1,
                'values' => ['10W', '18W', '25W', '36W', '50W', '70W', '100W'],
            ],
            [
                'name' => 'Optic',
                'slug' => 'optic',
                'unit' => '',
                'type' => 'select',
                'sort_order' => 2,
                'values' => ['15° Narrow Spot', '24° Spot', '45° Flood', 'Asymmetric Type II', '120° Diffused'],
            ],
            [
                'name' => 'Driver option',
                'slug' => 'driver-option',
                'unit' => '',
                'type' => 'select',
                'sort_order' => 3,
                'values' => ['Non-Dimmable', 'DALI-2', '1-10V Dimmable', 'Phase Cut / Triac'],
            ],
            [
                'name' => 'Class',
                'slug' => 'class',
                'unit' => '',
                'type' => 'select',
                'sort_order' => 4,
                'values' => ['Class I', 'Class II', 'Class III'],
            ],
            [
                'name' => 'IP Rating',
                'slug' => 'ip',
                'unit' => '',
                'type' => 'select',
                'sort_order' => 5,
                'values' => ['IP20', 'IP44', 'IP65', 'IP66', 'IP67'],
            ],
            [
                'name' => 'IK Rating',
                'slug' => 'ik',
                'unit' => '',
                'type' => 'select',
                'sort_order' => 6,
                'values' => ['IK06', 'IK08', 'IK10'],
            ],
            [
                'name' => 'Color Temperature (CCT)',
                'slug' => 'cct',
                'unit' => 'K',
                'type' => 'select',
                'sort_order' => 7,
                'values' => ['2700K Extra Warm', '3000K Warm White', '4000K Neutral White', '5700K Cool White'],
            ],
        ];

        $attrValLookup = []; // [attrSlug => [valString => AttributeValueModel]]
        $attrLookup = [];
        foreach ($attributesData as $aData) {
            $attr = Attribute::updateOrCreate(
                ['slug' => $aData['slug']],
                [
                    'name' => $aData['name'],
                    'unit' => $aData['unit'],
                    'type' => $aData['type'],
                    'sort_order' => $aData['sort_order'],
                    'is_filterable' => true,
                    'is_active' => true,
                ]
            );
            $attrLookup[$aData['slug']] = $attr;

            foreach ($aData['values'] as $vIdx => $valStr) {
                $valModel = AttributeValue::updateOrCreate(
                    [
                        'attribute_id' => $attr->id,
                        'value' => $valStr,
                    ],
                    [
                        'sort_order' => $vIdx + 1,
                    ]
                );
                $attrValLookup[$aData['slug']][$valStr] = $valModel;
            }
        }

        // 4. Seed Products with Variants
        $productsSeed = [
            [
                'category_slug' => 'surface-ceiling-luminaires',
                'name' => 'GAVLE Surface ceiling luminaires',
                'slug' => 'gavle-surface-ceiling-luminaires',
                'image' => '/images/products-uses-images/canva/canva-product.jpg',
                'gallery' => [
                    '/images/products-uses-images/canva/canva-product.jpg',
                    '/images/products-uses-images/canva/canva-use-1.jpg',
                    '/images/products-uses-images/canva/canva-use-2.jpg',
                ],
                'short_description' => 'Architectural surface mounted luminaire with uniform planar light diffusion.',
                'description' => 'The GAVLE family provides sleek minimalism combined with precision acoustic comfort and uniform micro-prismatic optics for high-end corporate and hospitality settings.',
                'specs' => ['Low UGR <19', 'IP44 Rated', 'DALI-2 Push DIM', 'CRI >90'],
                'technical_specs' => [
                    ['label' => 'Input Voltage', 'value' => '220-240V AC, 50/60Hz'],
                    ['label' => 'Housing Material', 'value' => 'Die-cast Aluminum'],
                    ['label' => 'Optic System', 'value' => 'Micro-prismatic PMMA Diffuser'],
                    ['label' => 'Operating Lifetime', 'value' => 'L80/B10 > 50,000 Hours'],
                ],
                'applications' => ['Executive Boardrooms', 'Architectural Atriums', 'Modern Galleries'],
                'variants' => [
                    [
                        'sku' => 'GVL-SRF-25W-DALI-IP44',
                        'title' => 'GAVLE 25W DALI IP44 3000K',
                        'attrs' => ['power' => '25W', 'driver-option' => 'DALI-2', 'ip' => 'IP44', 'class' => 'Class I', 'cct' => '3000K Warm White'],
                    ],
                    [
                        'sku' => 'GVL-SRF-36W-DALI-IP44',
                        'title' => 'GAVLE 36W DALI IP44 4000K',
                        'attrs' => ['power' => '36W', 'driver-option' => 'DALI-2', 'ip' => 'IP44', 'class' => 'Class I', 'cct' => '4000K Neutral White'],
                    ],
                    [
                        'sku' => 'GVL-SRF-50W-ND-IP44',
                        'title' => 'GAVLE 50W Non-Dim IP44 4000K',
                        'attrs' => ['power' => '50W', 'driver-option' => 'Non-Dimmable', 'ip' => 'IP44', 'class' => 'Class I', 'cct' => '4000K Neutral White'],
                    ],
                ],
            ],
            [
                'category_slug' => 'bollards',
                'name' => 'ATLANTIC Bollards',
                'slug' => 'atlantic-bollards',
                'image' => '/images/products-uses-images/archis/archis-product.jpg',
                'gallery' => [
                    '/images/products-uses-images/archis/archis-product.jpg',
                    '/images/products-uses-images/archis/archis-use-1.jpg',
                ],
                'short_description' => 'Heavy-duty architectural bollard with 360° glare-shielded pathway illumination.',
                'description' => 'Engineered for prestigious public landscapes, waterfront promenades, and pedestrian areas. Resistant to salt-spray and harsh atmospheric conditions.',
                'specs' => ['IP66 Waterproof', 'IK10 Impact', 'Zero Upward Light', 'Dark Sky Compliant'],
                'technical_specs' => [
                    ['label' => 'Input Voltage', 'value' => '120-277V AC'],
                    ['label' => 'Material', 'value' => 'Marine Grade Aluminum EN AB-44300'],
                    ['label' => 'Corrosion Protection', 'value' => 'Double Powder Coat C5-M'],
                ],
                'applications' => ['Waterfront Promenades', 'Civic Plazas', 'Campus Walkways'],
                'variants' => [
                    [
                        'sku' => 'ATL-BL-18W-IP66-IK10',
                        'title' => 'ATLANTIC 18W IP66 IK10 3000K',
                        'attrs' => ['power' => '18W', 'optic' => '120° Diffused', 'driver-option' => 'Non-Dimmable', 'ip' => 'IP66', 'ik' => 'IK10', 'class' => 'Class I', 'cct' => '3000K Warm White'],
                    ],
                    [
                        'sku' => 'ATL-BL-25W-DALI-IP66',
                        'title' => 'ATLANTIC 25W DALI IP66 IK10 4000K',
                        'attrs' => ['power' => '25W', 'optic' => '120° Diffused', 'driver-option' => 'DALI-2', 'ip' => 'IP66', 'ik' => 'IK10', 'class' => 'Class I', 'cct' => '4000K Neutral White'],
                    ],
                ],
            ],
            [
                'category_slug' => 'bollards',
                'name' => 'DUOMO Bollards',
                'slug' => 'duomo-bollards',
                'image' => '/images/products-uses-images/archis/archis-use-2.jpg',
                'gallery' => ['/images/products-uses-images/archis/archis-use-2.jpg'],
                'short_description' => 'Contemporary geometric column luminaire with asymmetric optic.',
                'description' => 'DUOMO delivers uniform ground-wash illumination for perimeter pathways and garden features without light spill into surrounding areas.',
                'specs' => ['IP65 Rated', 'IK08 Protection', 'Low Glare Baffle'],
                'technical_specs' => [
                    ['label' => 'Input Voltage', 'value' => '220-240V AC'],
                    ['label' => 'Height', 'value' => '900 mm'],
                ],
                'applications' => ['Hotel Gardens', 'Residential Resorts', 'Pedestrian Walkways'],
                'variants' => [
                    [
                        'sku' => 'DUO-BL-10W-IP65',
                        'title' => 'DUOMO 10W 3000K IP65',
                        'attrs' => ['power' => '10W', 'optic' => 'Asymmetric Type II', 'driver-option' => 'Non-Dimmable', 'ip' => 'IP65', 'ik' => 'IK08', 'class' => 'Class I', 'cct' => '3000K Warm White'],
                    ],
                ],
            ],
            [
                'category_slug' => 'pendant-luminaires',
                'name' => 'ATLANTIC Pendant luminaires',
                'slug' => 'atlantic-pendant-luminaires',
                'image' => '/images/products-uses-images/archis/archis-use-3.jpg',
                'gallery' => ['/images/products-uses-images/archis/archis-use-3.jpg'],
                'short_description' => 'Exterior grade IP65 suspended pendant luminaire for canopies and porticos.',
                'description' => 'Extending the ATLANTIC aesthetic to covered colonnades, grand entrances, and railway passenger terminals.',
                'specs' => ['IP65 Sealed', 'Stainless Steel Suspension', 'Dimmable Options'],
                'technical_specs' => [
                    ['label' => 'Max Suspension Length', 'value' => '3000 mm'],
                    ['label' => 'Wind Load Rating', 'value' => 'Category 4 Resistant'],
                ],
                'applications' => ['Grand Porticos', 'Covered Walkways', 'Transit Terminals'],
                'variants' => [
                    [
                        'sku' => 'ATL-PND-36W-DALI',
                        'title' => 'ATLANTIC Pendant 36W DALI 45°',
                        'attrs' => ['power' => '36W', 'optic' => '45° Flood', 'driver-option' => 'DALI-2', 'ip' => 'IP65', 'class' => 'Class I', 'cct' => '3000K Warm White'],
                    ],
                ],
            ],
            [
                'category_slug' => 'wall-lights',
                'name' => 'Archis',
                'slug' => 'archis',
                'image' => '/images/products-uses-images/archis/archis-product.jpg',
                'gallery' => [
                    '/images/products-uses-images/archis/archis-product.jpg',
                    '/images/products-uses-images/archis/archis-use-1.jpg',
                    '/images/products-uses-images/archis/archis-use-2.jpg',
                ],
                'short_description' => 'High-performance architectural wall luminaire with precise dual optic beam control.',
                'description' => 'Engineered for modern building envelopes, Archis projects defined upward and downward sheets of light to accentuate vertical scale.',
                'specs' => ['IP65 Waterproof', 'Dual Beam Optic', 'Anodized Finish'],
                'technical_specs' => [
                    ['label' => 'Luminous Flux', 'value' => '1200 Lumens'],
                    ['label' => 'Beam Angle', 'value' => '15° / 45° Configuration'],
                ],
                'applications' => ['Commercial Facades', 'Residential Envelopes', 'Luxury Hotels'],
                'variants' => [
                    [
                        'sku' => 'ARCH-18W-DB-IP65',
                        'title' => 'Archis 18W Dual Beam IP65',
                        'attrs' => ['power' => '18W', 'optic' => '15° Narrow Spot', 'driver-option' => 'Non-Dimmable', 'ip' => 'IP65', 'class' => 'Class I', 'cct' => '3000K Warm White'],
                    ],
                ],
            ],
            [
                'category_slug' => 'spotlights',
                'name' => 'Canva',
                'slug' => 'canva',
                'image' => '/images/products-uses-images/canva/canva-product.jpg',
                'gallery' => [
                    '/images/products-uses-images/canva/canva-product.jpg',
                    '/images/products-uses-images/canva/canva-use-1.jpg',
                ],
                'short_description' => 'Sleek recessed architectural spotlight with low glare baffle.',
                'description' => 'Canva offers deep-recessed glare control for high-end residential, hospitality, and gallery spaces.',
                'specs' => ['Low Glare', 'CRI >95', 'Triac Dimmable'],
                'technical_specs' => [
                    ['label' => 'Luminous Flux', 'value' => '850 Lumens'],
                    ['label' => 'Beam Angle', 'value' => '24° Spot'],
                ],
                'applications' => ['Boutique Showrooms', 'Luxury Living Rooms', 'Art Galleries'],
                'variants' => [
                    [
                        'sku' => 'CNV-10W-24-TRIAC',
                        'title' => 'Canva 10W 24° Spot Triac Dimmable',
                        'attrs' => ['power' => '10W', 'optic' => '24° Spot', 'driver-option' => 'Phase Cut / Triac', 'ip' => 'IP20', 'class' => 'Class II', 'cct' => '3000K Warm White'],
                    ],
                ],
            ],
        ];

        foreach ($productsSeed as $pData) {
            $cat = $catModels[$pData['category_slug']] ?? null;
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
                    'is_featured' => true,
                    'is_active' => true,
                ]
            );

            foreach ($pData['variants'] as $vIdx => $vData) {
                $variant = ProductVariant::updateOrCreate(
                    ['sku' => $vData['sku']],
                    [
                        'product_id' => $product->id,
                        'title' => $vData['title'],
                        'is_default' => $vIdx === 0,
                        'is_active' => true,
                    ]
                );

                // Attach attributes
                foreach ($vData['attrs'] as $attrSlug => $valStr) {
                    $attr = $attrLookup[$attrSlug] ?? null;
                    $valModel = $attrValLookup[$attrSlug][$valStr] ?? null;

                    if ($attr && $valModel) {
                        $variant->attributeValues()->syncWithoutDetaching([
                            $valModel->id => ['attribute_id' => $attr->id],
                        ]);
                    }
                }
            }
        }
    }
}

