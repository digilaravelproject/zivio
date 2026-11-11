<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Category;
use App\Models\ContactInquiry;
use App\Models\Environment;
use App\Models\Product;
use Illuminate\Http\Request;
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
            $currentCategory = $currentEnvironment->categories->firstWhere('slug', strtolower($categorySlug));
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

        if ($currentCategory) {
            $query->where('category_id', $currentCategory->id);
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
            'message' => 'required|string|max:3000',
            'specs_snapshot' => 'nullable|array',
        ]);

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
            ->take(8)
            ->get();

        $environments = Environment::where('is_active', true)
            ->with(['categories' => function ($q) {
                $q->where('is_active', true)->withCount('products');
            }])
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('welcome', [
            'featuredProducts' => $featuredProducts,
            'environments' => $environments,
        ]);
    }
}

