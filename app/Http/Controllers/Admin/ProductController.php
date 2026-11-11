<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Category;
use App\Models\Environment;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $environments = Environment::with('categories')->orderBy('sort_order')->get();

        $query = Product::with(['category.environment', 'variants.attributeValues.attribute'])
            ->withCount('variants');

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        } elseif ($request->filled('environment_id')) {
            $catIds = Category::where('environment_id', $request->environment_id)->pluck('id');
            $query->whereIn('category_id', $catIds);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                    ->orWhere('slug', 'like', "%{$s}%");
            });
        }

        $products = $query->orderBy('sort_order')->paginate(15)->withQueryString();

        $stats = [
            'total_products' => Product::count(),
            'active_products' => Product::where('is_active', true)->count(),
            'total_variants' => ProductVariant::count(),
            'featured_products' => Product::where('is_featured', true)->count(),
        ];

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'environments' => $environments,
            'stats' => $stats,
            'filters' => $request->only(['environment_id', 'category_id', 'search']),
        ]);
    }

    public function create(): Response
    {
        $environments = Environment::with(['categories' => function ($q) {
            $q->orderBy('sort_order');
        }])->orderBy('sort_order')->get();

        $attributes = Attribute::with(['values' => function ($q) {
            $q->orderBy('sort_order');
        }])->orderBy('sort_order')->get();

        return Inertia::render('admin/products/create', [
            'environments' => $environments,
            'attributes' => $attributes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|max:5120',
            'gallery' => 'nullable|array',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'specs' => 'nullable|array',
            'technical_specs' => 'nullable|array',
            'applications' => 'nullable|array',
            'brochure_file' => 'nullable|string',
            'ies_file' => 'nullable|string',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'variants' => 'nullable|array',
            'variants.*.sku' => 'nullable|string|max:255',
            'variants.*.title' => 'nullable|string|max:255',
            'variants.*.price' => 'nullable|numeric',
            'variants.*.is_default' => 'nullable|boolean',
            'variants.*.attribute_values' => 'nullable|array', // [attribute_id => attribute_value_id]
        ]);

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/products'), $filename);
            $validated['image'] = '/uploads/products/' . $filename;
        }

        if ($request->hasFile('brochure_upload')) {
            $bFile = $request->file('brochure_upload');
            $bFilename = 'datasheet_' . time() . '_' . Str::random(8) . '.' . $bFile->getClientOriginalExtension();
            $bFile->move(public_path('uploads/brochures'), $bFilename);
            $validated['brochure_file'] = '/uploads/brochures/' . $bFilename;
        }

        if ($request->hasFile('ies_upload')) {
            $iFile = $request->file('ies_upload');
            $iFilename = 'photometric_' . time() . '_' . Str::random(8) . '.' . $iFile->getClientOriginalExtension();
            $iFile->move(public_path('uploads/ies'), $iFilename);
            $validated['ies_file'] = '/uploads/ies/' . $iFilename;
        }

        $galleryPaths = $request->input('gallery', []);
        if (!is_array($galleryPaths)) {
            $galleryPaths = [];
        }
        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $gFile) {
                $gFilename = time() . '_' . Str::random(8) . '.' . $gFile->getClientOriginalExtension();
                $gFile->move(public_path('uploads/gallery'), $gFilename);
                $galleryPaths[] = '/uploads/gallery/' . $gFilename;
            }
        }
        $validated['gallery'] = array_values(array_filter($galleryPaths));

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $product = Product::create($validated);

        // Create variants if supplied
        if (!empty($validated['variants'])) {
            foreach ($validated['variants'] as $vData) {
                $variant = $product->variants()->create([
                    'sku' => $vData['sku'] ?? strtoupper(Str::random(8)),
                    'title' => $vData['title'] ?? null,
                    'price' => $vData['price'] ?? null,
                    'is_default' => $vData['is_default'] ?? false,
                    'is_active' => true,
                ]);

                if (!empty($vData['attribute_values'])) {
                    $syncData = [];
                    foreach ($vData['attribute_values'] as $attrId => $valId) {
                        if ($valId) {
                            $syncData[$valId] = ['attribute_id' => $attrId];
                        }
                    }
                    $variant->attributeValues()->sync($syncData);
                }
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product): Response
    {
        $product->load(['category.environment', 'variants.attributeValues.attribute']);

        $environments = Environment::with(['categories' => function ($q) {
            $q->orderBy('sort_order');
        }])->orderBy('sort_order')->get();

        $attributes = Attribute::with(['values' => function ($q) {
            $q->orderBy('sort_order');
        }])->orderBy('sort_order')->get();

        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'environments' => $environments,
            'attributes' => $attributes,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug,' . $product->id,
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|max:5120',
            'gallery' => 'nullable|array',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'specs' => 'nullable|array',
            'technical_specs' => 'nullable|array',
            'applications' => 'nullable|array',
            'brochure_file' => 'nullable|string',
            'ies_file' => 'nullable|string',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'variants' => 'nullable|array',
        ]);

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/products'), $filename);
            $validated['image'] = '/uploads/products/' . $filename;
        }

        if ($request->hasFile('brochure_upload')) {
            $bFile = $request->file('brochure_upload');
            $bFilename = 'datasheet_' . time() . '_' . Str::random(8) . '.' . $bFile->getClientOriginalExtension();
            $bFile->move(public_path('uploads/brochures'), $bFilename);
            $validated['brochure_file'] = '/uploads/brochures/' . $bFilename;
        }

        if ($request->hasFile('ies_upload')) {
            $iFile = $request->file('ies_upload');
            $iFilename = 'photometric_' . time() . '_' . Str::random(8) . '.' . $iFile->getClientOriginalExtension();
            $iFile->move(public_path('uploads/ies'), $iFilename);
            $validated['ies_file'] = '/uploads/ies/' . $iFilename;
        }

        $galleryPaths = $request->input('gallery', []);
        if (!is_array($galleryPaths)) {
            $galleryPaths = [];
        }
        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $gFile) {
                $gFilename = time() . '_' . Str::random(8) . '.' . $gFile->getClientOriginalExtension();
                $gFile->move(public_path('uploads/gallery'), $gFilename);
                $galleryPaths[] = '/uploads/gallery/' . $gFilename;
            }
        }
        $validated['gallery'] = array_values(array_filter($galleryPaths));

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $product->update($validated);

        // Update variants if provided
        if (isset($validated['variants'])) {
            $submittedVariantIds = [];
            foreach ($validated['variants'] as $vData) {
                if (!empty($vData['id'])) {
                    $variant = ProductVariant::find($vData['id']);
                    if ($variant && $variant->product_id === $product->id) {
                        $variant->update([
                            'sku' => $vData['sku'] ?? $variant->sku,
                            'title' => $vData['title'] ?? $variant->title,
                            'price' => $vData['price'] ?? $variant->price,
                            'is_default' => $vData['is_default'] ?? false,
                        ]);
                        $submittedVariantIds[] = $variant->id;
                    }
                } else {
                    $variant = $product->variants()->create([
                        'sku' => $vData['sku'] ?? strtoupper(Str::random(8)),
                        'title' => $vData['title'] ?? null,
                        'price' => $vData['price'] ?? null,
                        'is_default' => $vData['is_default'] ?? false,
                        'is_active' => true,
                    ]);
                    $submittedVariantIds[] = $variant->id;
                }

                if ($variant && !empty($vData['attribute_values'])) {
                    $syncData = [];
                    foreach ($vData['attribute_values'] as $attrId => $valId) {
                        if ($valId) {
                            $syncData[$valId] = ['attribute_id' => $attrId];
                        }
                    }
                    $variant->attributeValues()->sync($syncData);
                }
            }

            // Delete variants that were removed
            $product->variants()->whereNotIn('id', $submittedVariantIds)->delete();
        }

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
    }
}

