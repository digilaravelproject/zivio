<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use Illuminate\Database\Seeder;

class HeroSlideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slides = [
            [
                'label' => '01 · Natural Light',
                'headline' => ['Born from', 'Natural Light.'],
                'sub' => 'Architectural luminaires inspired by the quality of daylight — warm, dimensioned, alive. Crafted for 15+ countries across four continents.',
                'location' => 'Natural · Precision · 15 Countries',
                'type' => 'video',
                'image' => null,
                'video' => 'https://videos.pexels.com/video-files/3971832/3971832-hd_1920_1080_30fps.mp4',
                'poster' => '1470252329-01cb79fc2caf',
                'sort_order' => 0,
                'is_active' => true,
            ],
            [
                'label' => '02 · Bollard Lighting',
                'headline' => ['Paths', 'Illuminated.'],
                'sub' => 'Cast-iron and stainless bollard luminaires defining walkways, driveways and public plazas with precise cutoff optics.',
                'location' => 'Bollard Series · IP67 · IK10 · 3000K–4000K',
                'type' => 'image',
                'image' => '1785162413090-475d4368ebe9',
                'video' => null,
                'poster' => null,
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'label' => '03 · Facade Lighting',
                'headline' => ['Buildings', 'That Glow.'],
                'sub' => 'IP66-rated facade wash and grazing systems that sculpt architecture with controlled, glare-free beams of light.',
                'location' => 'Facade Systems · IP66 · DALI-2 · RGBW',
                'type' => 'image',
                'image' => '1601785491008-d1153dfadd57',
                'video' => null,
                'poster' => null,
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'label' => '04 · Post Top Lanterns',
                'headline' => ['Elegance', 'Overhead.'],
                'sub' => 'Heritage and contemporary post-top lanterns for boulevards, promenades, residential avenues and civic squares.',
                'location' => 'Post Top · Heritage Series · IP65 · 15W–60W',
                'type' => 'image',
                'image' => '1560692659-467e4f0f3deb',
                'video' => null,
                'poster' => null,
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'label' => '05 · Landscape Lighting',
                'headline' => ['Gardens', 'Come Alive.'],
                'sub' => 'Inground uplights, tree spotlights and low-glare pathway fittings for luxury villas, resorts and urban green spaces.',
                'location' => 'Landscape · Inground · CRI >92 · IP68',
                'type' => 'image',
                'image' => '1668575648926-7a372cf8206a',
                'video' => null,
                'poster' => null,
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'label' => '06 · R&D · Innovation',
                'headline' => ['Innovation,', 'Engineered.'],
                'sub' => 'Dedicated photometric labs and thermal testing facilities driving next-generation luminaire design and IEC-certified performance.',
                'location' => 'R&D · Photometric Lab · IEC 60598 · LM-80',
                'type' => 'image',
                'image' => '1748000970909-845f4aa144d2',
                'video' => null,
                'poster' => null,
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($slides as $slide) {
            HeroSlide::updateOrCreate(
                ['label' => $slide['label']],
                $slide
            );
        }
    }
}
