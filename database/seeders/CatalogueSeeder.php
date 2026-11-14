<?php

namespace Database\Seeders;

use App\Models\Catalogue;
use Illuminate\Database\Seeder;

class CatalogueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $catalogues = [
            [
                'title' => 'ZiVIO LIFE — Our Story',
                'category' => 'Company Profile',
                'file_path' => '/zivio-company-profile.pdf',
                'file_size' => '16.0 MB',
                'pages' => '48 pages',
                'format' => 'PDF',
                'downloads_count' => 1420,
                'sort_order' => 1,
                'is_active' => true,
                'description' => 'Philosophy, vision, global presence and sustainability commitment across European and Middle East operations.',
                'cover_image' => '1497366216548-37526070297c',
            ],
            [
                'title' => 'Master Architectural Luminaire Catalogue 2026',
                'category' => 'Full Range',
                'file_path' => '/zivio-product-catalogue.pdf',
                'file_size' => '16.0 MB',
                'pages' => '284 pages',
                'format' => 'PDF',
                'downloads_count' => 3890,
                'sort_order' => 2,
                'is_active' => true,
                'description' => '500+ luminaires across six families — detailed specifications, photometrics, optical matrices, and project applications.',
                'cover_image' => '1558618666-fcd25c85cd64',
            ],
            [
                'title' => 'Architectural Outdoor Luminaires & Urban Poles',
                'category' => 'Outdoor',
                'file_path' => '/zivio-product-catalogue.pdf',
                'file_size' => '24.5 MB',
                'pages' => '142 pages',
                'format' => 'PDF',
                'downloads_count' => 1120,
                'sort_order' => 3,
                'is_active' => true,
                'description' => 'IP66/67 façade projectors, inground uplights, bollards, architectural street luminaires and smart solar poles.',
                'cover_image' => '1509198397868-475647b2a1e5',
            ],
            [
                'title' => 'Indoor Commercial & High-End Retail Range',
                'category' => 'Indoor',
                'file_path' => '/zivio-product-catalogue.pdf',
                'file_size' => '32.1 MB',
                'pages' => '196 pages',
                'format' => 'PDF',
                'downloads_count' => 1840,
                'sort_order' => 4,
                'is_active' => true,
                'description' => 'Architectural linear profiles, deep anti-glare downlights, suspended rings and magnetic track modular fixtures.',
                'cover_image' => '1513506003901-1e6a229e2d15',
            ],
            [
                'title' => 'Technical Optical Guide & Dialux IES Plugins',
                'category' => 'Technical',
                'file_path' => '/zivio-product-catalogue.pdf',
                'file_size' => '12.8 MB',
                'pages' => '88 pages',
                'format' => 'PDF',
                'downloads_count' => 870,
                'sort_order' => 5,
                'is_active' => true,
                'description' => 'Full photometric data documentation, UGR calculations, colour consistency, emergency modules and control protocols.',
                'cover_image' => '1518770660439-4636190af475',
            ],
        ];

        foreach ($catalogues as $data) {
            Catalogue::updateOrCreate(
                ['title' => $data['title']],
                $data
            );
        }
    }
}
