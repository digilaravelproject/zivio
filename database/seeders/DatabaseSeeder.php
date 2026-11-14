<?php

namespace Database\Seeders;

use App\Models\ContactInquiry;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Default Admin Credentials as requested: admin@admin.com / 12345678
        User::updateOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        // Also keep admin@zivio.com
        User::updateOrCreate(
            ['email' => 'admin@zivio.com'],
            [
                'name' => 'Zivio Admin',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            CatalogSeeder::class,
            LandingPageProductsSeeder::class,
        ]);

        // 2. Seed Sample Inquiries so Admin Panel has realistic leads
        $p1 = Product::where('slug', 'gavle-surface-ceiling-luminaires')->first();
        $v1 = $p1 ? $p1->variants()->first() : null;

        $p2 = Product::where('slug', 'atlantic-bollards')->first();
        $v2 = $p2 ? $p2->variants()->first() : null;

        $sampleInquiries = [
            [
                'product_id' => $p1?->id,
                'product_variant_id' => $v1?->id,
                'name' => 'Rajesh Sharma',
                'email' => 'rajesh.sharma@archdesign.com',
                'phone' => '+91 98765 43210',
                'company' => 'Studio Morph Architects',
                'project_type' => 'Corporate Headquarters',
                'message' => 'Requesting technical photometric IES files and pricing quotation for 120 units of GAVLE Surface Ceiling Luminaires for an upcoming 6-story atrium project in Mumbai.',
                'specs_snapshot' => [
                    'sku' => $v1?->sku,
                    'title' => $v1?->title,
                    'attributes' => ['Power' => '25W', 'Driver' => 'DALI-2', 'IP' => 'IP44'],
                ],
                'status' => 'new',
                'notes' => 'High-priority commercial lead. Follow up with lighting layout proposal.',
            ],
            [
                'product_id' => $p2?->id,
                'product_variant_id' => $v2?->id,
                'name' => 'Amina Al-Mansoor',
                'email' => 'amina@gulfconsultants.ae',
                'phone' => '+971 50 123 4567',
                'company' => 'Gulf Urban Landscape Design',
                'project_type' => 'Waterfront Promenade',
                'message' => 'We are specifying bollards for a luxury marine boulevard. Need salt-spray test certificates, C5-M coating data, and quotation for 80 units of ATLANTIC Bollards.',
                'specs_snapshot' => [
                    'sku' => $v2?->sku,
                    'title' => $v2?->title,
                    'attributes' => ['Power' => '18W', 'Optic' => '120° Diffused', 'IP' => 'IP66', 'IK' => 'IK10'],
                ],
                'status' => 'in_progress',
                'notes' => 'Sent marine test reports and technical catalog. Awaiting BOQ confirmation.',
            ],
            [
                'product_id' => null,
                'product_variant_id' => null,
                'name' => 'Vikram Patel',
                'email' => 'vikram@pateldevelopers.in',
                'phone' => '+91 99887 76655',
                'company' => 'Patel Realty Group',
                'project_type' => 'Residential Township',
                'message' => 'Looking for complete outdoor and pole lighting solution for our upcoming 50-acre township. Would like to meet your technical representative.',
                'specs_snapshot' => null,
                'status' => 'contacted',
                'notes' => 'Introductory call completed. Scheduled on-site demonstration.',
            ],
        ];

        foreach ($sampleInquiries as $inq) {
            ContactInquiry::firstOrCreate(
                ['email' => $inq['email'], 'name' => $inq['name']],
                $inq
            );
        }
    }
}
