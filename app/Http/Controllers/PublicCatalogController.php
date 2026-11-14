<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Category;
use App\Models\Catalogue;
use App\Models\ContactInquiry;
use App\Models\Environment;
use App\Models\HeroSlide;
use App\Models\Product;
use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PublicCatalogController extends Controller
{
    /**
     * Showroom catalog page with dynamic environments, categories, and technical attribute filters.
     */
    public function showroom(Request $request, ?string $environmentSlug = null, ?string $categorySlug = null): Response
    {
        // 1. Fetch all active environments with their categories and product counts
        $environments = Environment::where('is_active', true)
            ->with(['categories' => function ($q) {
                $q->where('is_active', true)->withCount('products');
            }])
            ->withCount(['categories'])
            ->orderBy('sort_order')
            ->get();

        // 2. Identify selected Environment & Category
        $currentEnvironment = null;
        if ($environmentSlug) {
            $currentEnvironment = $environments->firstWhere('slug', strtolower($environmentSlug));
        }

        $currentCategory = null;
        if ($currentEnvironment && $categorySlug) {
            $catSlugLower = strtolower($categorySlug);
            $currentCategory = $currentEnvironment->categories->firstWhere('slug', $catSlugLower);
            
            if (!$currentCategory) {
                // Try loose match against existing categories in this environment
                $currentCategory = $currentEnvironment->categories->first(function ($c) use ($catSlugLower) {
                    $cSlug = strtolower($c->slug);
                    $cName = strtolower(str_replace(' ', '-', $c->name));
                    return str_contains($catSlugLower, $cSlug) || str_contains($cSlug, $catSlugLower)
                        || str_contains($catSlugLower, $cName) || str_contains($cName, $catSlugLower);
                });
            }

            // If still no category record exists in DB, create virtual category object so showroom header and breadcrumb render gracefully
            if (!$currentCategory) {
                $categoryTitle = ucwords(str_replace(['-', 'and', 'proj'], [' ', '&', 'Projectors'], $categorySlug));
                $currentCategory = (object) [
                    'id' => 0,
                    'name' => $categoryTitle,
                    'slug' => $categorySlug,
                    'environment_id' => $currentEnvironment->id,
                    'environment' => $currentEnvironment,
                ];
            }
        } elseif (!$currentEnvironment && $environmentSlug) {
            // Check if $environmentSlug is actually a category slug
            $currentCategory = Category::where('slug', strtolower($environmentSlug))
                ->with('environment')
                ->first();
            if ($currentCategory) {
                $currentEnvironment = $currentCategory->environment;
            } else {
                // Check if $environmentSlug is a direct product slug (e.g. /products/canva, /products/archis)
                $productMatch = Product::where('slug', strtolower($environmentSlug))->first();
                if ($productMatch) {
                    return $this->productDetail($request, $productMatch->slug);
                }
            }
        }

        // 3. Fetch filterable attributes and values
        $filterableAttributes = Attribute::where('is_active', true)
            ->where('is_filterable', true)
            ->with(['values' => function ($q) {
                $q->orderBy('sort_order');
            }])
            ->orderBy('sort_order')
            ->get();

        // 4. Query products with filters
        $query = Product::where('is_active', true)
            ->with([
                'category.environment',
                'variants.attributeValues.attribute',
            ]);

        if ($currentCategory && !empty($currentCategory->id)) {
            $query->where('category_id', $currentCategory->id);
        } elseif ($currentCategory && empty($currentCategory->id) && $currentEnvironment) {
            // Virtual category: search in environment for matching keywords (e.g. bollards, downlights)
            $keywords = explode('-', $categorySlug);
            $query->whereIn('category_id', $currentEnvironment->categories->pluck('id'))
                  ->where(function ($q) use ($keywords, $categorySlug) {
                      $clean = str_replace('-', ' ', $categorySlug);
                      $q->where('name', 'like', "%{$clean}%")
                        ->orWhere('short_description', 'like', "%{$clean}%")
                        ->orWhere('description', 'like', "%{$clean}%");
                      foreach ($keywords as $kw) {
                          if (strlen($kw) > 3) {
                              $q->orWhere('name', 'like', "%{$kw}%")
                                ->orWhere('short_description', 'like', "%{$kw}%");
                          }
                      }
                  });
        } elseif ($currentEnvironment) {
            $categoryIds = $currentEnvironment->categories->pluck('id');
            $query->whereIn('category_id', $categoryIds);
        }

        // Apply attribute filters from query string (e.g. ?power=18W&optic=15°&ip=IP65)
        $selectedFilters = [];
        foreach ($filterableAttributes as $attr) {
            $paramVal = $request->query($attr->slug);
            if ($paramVal) {
                $selectedFilters[$attr->slug] = is_array($paramVal) ? $paramVal : explode(',', $paramVal);
                $query->whereHas('variants.attributeValues', function ($q) use ($attr, $selectedFilters) {
                    $q->where('attribute_values.attribute_id', $attr->id)
                        ->whereIn('attribute_values.value', $selectedFilters[$attr->slug]);
                });
            }
        }

        // Search query
        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('short_description', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $products = $query->orderBy('sort_order')
            ->orderBy('id', 'desc')
            ->get();

        // If a specific virtual subcategory was queried but returned 0 results, fall back to environment products
        if ($products->isEmpty() && $currentCategory && empty($currentCategory->id) && $currentEnvironment) {
            $products = Product::where('is_active', true)
                ->whereIn('category_id', $currentEnvironment->categories->pluck('id'))
                ->with(['category.environment', 'variants.attributeValues.attribute'])
                ->orderBy('sort_order')
                ->orderBy('id', 'desc')
                ->get();
        }

        return Inertia::render('products', [
            'environments' => $environments,
            'currentEnvironment' => $currentEnvironment,
            'currentCategory' => $currentCategory,
            'filterableAttributes' => $filterableAttributes,
            'selectedFilters' => (object) $selectedFilters,
            'products' => $products,
        ]);
    }

    /**
     * Product details page with variant configurator and technical specs.
     */
    public function productDetail(Request $request, string $slug): Response
    {
        $product = Product::where('slug', $slug)
            ->where('is_active', true)
            ->with([
                'category.environment',
                'variants.attributeValues.attribute',
            ])
            ->firstOrFail();

        // Collect all distinct attributes used across the product's variants
        $variantAttributes = [];
        foreach ($product->variants as $variant) {
            foreach ($variant->attributeValues as $val) {
                $attr = $val->attribute;
                if (!isset($variantAttributes[$attr->slug])) {
                    $variantAttributes[$attr->slug] = [
                        'id' => $attr->id,
                        'name' => $attr->name,
                        'slug' => $attr->slug,
                        'unit' => $attr->unit,
                        'values' => [],
                    ];
                }
                if (!in_array($val->value, $variantAttributes[$attr->slug]['values'])) {
                    $variantAttributes[$attr->slug]['values'][] = $val->value;
                }
            }
        }

        // Related products in the same category
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->with('category.environment')
            ->take(4)
            ->get();

        return Inertia::render('product-details', [
            'product' => $product,
            'variantAttributes' => array_values($variantAttributes),
            'relatedProducts' => $relatedProducts,
        ]);
    }

    /**
     * Handle B2B specification and quotation inquiry.
     */
    public function submitInquiry(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'nullable|exists:products,id',
            'product_variant_id' => 'nullable|exists:product_variants,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'company' => 'nullable|string|max:255',
            'project_type' => 'nullable|string|max:255',
            'message' => 'nullable|string|max:3000',
            'specs_snapshot' => 'nullable|array',
        ]);

        $validated['message'] = $validated['message'] ?: 'Project Inquiry submitted from website';

        $inquiry = ContactInquiry::create($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Thank you for contacting ZIVIO LIFE. Our lighting technical team will reach out shortly.',
                'inquiry_id' => $inquiry->id,
            ]);
        }

        return back()->with('success', 'Your inquiry has been submitted successfully.');
    }

    /**
     * Homepage with dynamic featured products and architectural collections.
     */
    public function home(): Response
    {
        $featuredProducts = Product::where('is_active', true)
            ->with(['category.environment'])
            ->orderBy('is_featured', 'desc')
            ->orderBy('sort_order')
            ->take(12)
            ->get();

        $environments = Environment::where('is_active', true)
            ->with(['categories' => function ($q) {
                $q->where('is_active', true)->withCount('products');
            }])
            ->orderBy('sort_order')
            ->get();

        $heroSlides = HeroSlide::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        $projects = Project::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        $testimonials = Testimonial::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        $catalogues = Catalogue::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('welcome', [
            'featuredProducts' => $featuredProducts,
            'environments'     => $environments,
            'heroSlides'       => $heroSlides,
            'projects'         => $projects,
            'testimonials'     => $testimonials,
            'catalogues'       => $catalogues,
        ]);
    }
}

