<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Sushil Kadam',
                'role' => 'Project Head',
                'company' => 'Tata Realty',
                'quote' => 'ZiVIO delivered exceptional quality for our residential towers. Their attention to detail and on-time execution made all the difference.',
                'avatar' => '1472099645785-5658abf4ff4e',
                'rating' => 5,
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Parshuram',
                'role' => 'Sr. Project Manager',
                'company' => 'Piramal Realty',
                'quote' => 'Working with ZiVIO on the Mahalaxmi facade was seamless. Their technical expertise and custom fixture solutions elevated the entire project.',
                'avatar' => '1507003211169-0a1dd7228f2d',
                'rating' => 5,
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Sanchita Shinde',
                'role' => 'Principal Lighting Consultant',
                'company' => 'Shaviya Lighting Consultants',
                'quote' => 'ZiVIO consistently delivers specification-grade luminaires with outstanding support. They are our go-to partner for every lighting design.',
                'avatar' => '1494790108755-2616b612b786',
                'rating' => 5,
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Vinayak Pawar',
                'role' => 'Head of Projects',
                'company' => 'KRC Infrastructure',
                'quote' => 'From Hyderabad to Chennai and Pune, ZiVIO has been a reliable and technically superior partner across all our developments.',
                'avatar' => '1500648767791-00dcc994a43e',
                'rating' => 5,
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Vaibhav Chandre',
                'role' => 'Project Manager',
                'company' => 'Tata Projects Ltd.',
                'quote' => 'The ZiVIO team brought great professionalism and product quality to our sites. Delivery timelines and after-sales support are excellent.',
                'avatar' => '1560250097-0b93528c311a',
                'rating' => 5,
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Basawraj',
                'role' => 'Site Engineer',
                'company' => 'Tata Projects Ltd.',
                'quote' => "ZiVIO's lighting solutions for our commercial sites have been outstanding. Their on-site coordination is truly world-class.",
                'avatar' => '1519085360753-af0119f7cbe7',
                'rating' => 5,
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($testimonials as $item) {
            Testimonial::updateOrCreate(
                [
                    'name' => $item['name'],
                    'company' => $item['company'],
                ],
                $item
            );
        }
    }
}
