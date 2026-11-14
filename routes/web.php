<?php

use App\Http\Controllers\Admin\AttributeController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\EnvironmentController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\CatalogueController;
use App\Http\Controllers\Admin\InquiryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\PublicCatalogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Static & Brand Pages
Route::get('/', [PublicCatalogController::class, 'home'])->name('home');
Route::inertia('/about-company', 'about-company')->name('about-company');
Route::inertia('/teams', 'teams')->name('teams');
Route::inertia('/our-brands', 'our-brands')->name('our-brands');
Route::inertia('/contact', 'contact')->name('contact');

// Public Dynamic Product Showroom & Details (LIGMAN style hierarchical catalog)
Route::get('/products', [PublicCatalogController::class, 'showroom'])->name('products');
Route::get('/products/{environmentSlug}', [PublicCatalogController::class, 'showroom'])->name('products.environment');
Route::get('/products/{environmentSlug}/{categorySlug}', [PublicCatalogController::class, 'showroom'])->name('products.category');
Route::get('/product/{slug}', [PublicCatalogController::class, 'productDetail'])->name('products.detail');
// Also maintain backward-compatible fallback for /products/detail/{slug} or /products/{slug}
Route::get('/products/detail/{slug}', [PublicCatalogController::class, 'productDetail'])->name('products.detail.alt');

// B2B Inquiry submission
Route::post('/inquiry', [PublicCatalogController::class, 'submitInquiry'])->name('inquiry.submit');

// Admin Management Dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $stats = [
            'environments_count' => \App\Models\Environment::count(),
            'categories_count' => \App\Models\Category::count(),
            'products_count' => \App\Models\Product::count(),
            'variants_count' => \App\Models\ProductVariant::count(),
            'inquiries_count' => \App\Models\ContactInquiry::count(),
            'new_inquiries_count' => \App\Models\ContactInquiry::where('status', 'new')->count(),
            'in_progress_count' => \App\Models\ContactInquiry::where('status', 'in_progress')->count(),
            'contacted_count' => \App\Models\ContactInquiry::where('status', 'contacted')->count(),
            'closed_count' => \App\Models\ContactInquiry::where('status', 'closed')->count(),
            'catalogues_count' => \App\Models\Catalogue::count(),
        ];

        // Catalog environment distribution
        $environments = \App\Models\Environment::where('is_active', true)
            ->with(['categories' => function ($q) {
                $q->withCount('products');
            }])
            ->get();

        $catalogBreakdown = $environments->map(function ($env) {
            $productSum = $env->categories->sum('products_count');
            return [
                'name' => $env->name,
                'slug' => $env->slug,
                'categories_count' => $env->categories->count(),
                'products_count' => $productSum,
            ];
        });

        $recentInquiries = \App\Models\ContactInquiry::with(['product', 'variant'])
            ->latest()
            ->take(8)
            ->get();

        return inertia('dashboard', [
            'stats' => $stats,
            'catalogBreakdown' => $catalogBreakdown,
            'recentInquiries' => $recentInquiries,
        ]);
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        // Environments (Indoor, Outdoor, Solar, etc.)
        Route::resource('environments', EnvironmentController::class)->except(['create', 'show', 'edit']);

        // Hero Slides (Homepage Carousel)
        Route::resource('hero-slides', HeroSlideController::class)->except(['create', 'show', 'edit']);

        // Testimonials & Client Reviews
        Route::resource('testimonials', TestimonialController::class)->except(['create', 'show', 'edit']);

        // Categories (Bollards, Surface Ceiling, etc.)
        Route::resource('categories', CategoryController::class)->except(['create', 'show', 'edit']);

        // Dynamic Technical Attributes & Values
        Route::resource('attributes', AttributeController::class)->except(['create', 'show', 'edit']);
        Route::post('attributes/{attribute}/values', [AttributeController::class, 'storeValue'])->name('attributes.values.store');
        Route::delete('attribute-values/{attributeValue}', [AttributeController::class, 'destroyValue'])->name('attributes.values.destroy');

        // Products & Variants
        Route::resource('products', ProductController::class);

        // B2B Inquiries & Leads
        Route::get('inquiries', [InquiryController::class, 'index'])->name('inquiries.index');
        Route::patch('inquiries/{inquiry}', [InquiryController::class, 'update'])->name('inquiries.update');
        Route::delete('inquiries/{inquiry}', [InquiryController::class, 'destroy'])->name('inquiries.destroy');

        // Architecture & Projects Showcase
        Route::resource('projects', ProjectController::class)->except(['create', 'show', 'edit']);

        // Catalogues & Downloads
        Route::resource('catalogues', CatalogueController::class)->except(['create', 'show', 'edit']);
    });
});

require __DIR__.'/settings.php';
