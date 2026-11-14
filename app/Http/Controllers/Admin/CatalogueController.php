<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Catalogue;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CatalogueController extends Controller
{
    /**
     * Display a listing of catalogues and downloads.
     */
    public function index(Request $request): Response
    {
        $query = Catalogue::query();

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $catalogues = $query->orderBy('sort_order', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        $allCategories = Catalogue::select('category')
            ->distinct()
            ->whereNotNull('category')
            ->pluck('category');

        $stats = [
            'total' => Catalogue::count(),
            'active' => Catalogue::where('is_active', true)->count(),
            'total_downloads' => (int) Catalogue::sum('downloads_count'),
            'categories_count' => $allCategories->count(),
        ];

        return Inertia::render('admin/catalogues/index', [
            'catalogues' => $catalogues,
            'categories' => $allCategories,
            'stats' => $stats,
            'filters' => [
                'category' => $request->category ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Store a newly created catalogue in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'file_path' => 'nullable|string|max:500',
            'catalogue_file' => 'nullable|file|mimes:pdf,zip,doc,docx|max:102400',
            'file_size' => 'nullable|string|max:50',
            'pages' => 'nullable|string|max:50',
            'format' => 'nullable|string|max:20',
            'downloads_count' => 'nullable|integer|min:0',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
            'description' => 'nullable|string|max:1000',
            'cover_image' => 'nullable|string|max:500',
            'cover_image_file' => 'nullable|image|max:10240',
        ]);

        // Handle PDF/Document upload
        if ($request->hasFile('catalogue_file')) {
            $file = $request->file('catalogue_file');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('uploads/catalogues');

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $validated['file_path'] = '/uploads/catalogues/' . $filename;

            // Auto-calculate size if not supplied
            if (empty($validated['file_size'])) {
                $bytes = filesize($destinationPath . '/' . $filename);
                $validated['file_size'] = round($bytes / (1024 * 1024), 1) . ' MB';
            }

            // Auto-detect format
            if (empty($validated['format'])) {
                $validated['format'] = strtoupper($file->getClientOriginalExtension());
            }
        }

        // Handle Cover Image upload
        if ($request->hasFile('cover_image_file')) {
            $file = $request->file('cover_image_file');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('uploads/catalogues/covers');

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $validated['cover_image'] = '/uploads/catalogues/covers/' . $filename;
        }

        if (empty($validated['file_path'])) {
            $validated['file_path'] = '/zivio-product-catalogue.pdf';
        }

        if (empty($validated['file_size'])) {
            $validated['file_size'] = '16.0 MB';
        }

        if (empty($validated['format'])) {
            $validated['format'] = 'PDF';
        }

        if (!isset($validated['downloads_count'])) {
            $validated['downloads_count'] = 0;
        }

        if (!isset($validated['sort_order'])) {
            $validated['sort_order'] = (Catalogue::max('sort_order') ?? 0) + 1;
        }

        if (!isset($validated['is_active'])) {
            $validated['is_active'] = true;
        }

        Catalogue::create($validated);

        return redirect()->route('admin.catalogues.index')->with('success', 'Catalogue added successfully.');
    }

    /**
     * Update the specified catalogue in storage.
     */
    public function update(Request $request, Catalogue $catalogue)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'file_path' => 'nullable|string|max:500',
            'catalogue_file' => 'nullable|file|mimes:pdf,zip,doc,docx|max:102400',
            'file_size' => 'nullable|string|max:50',
            'pages' => 'nullable|string|max:50',
            'format' => 'nullable|string|max:20',
            'downloads_count' => 'nullable|integer|min:0',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
            'description' => 'nullable|string|max:1000',
            'cover_image' => 'nullable|string|max:500',
            'cover_image_file' => 'nullable|image|max:10240',
        ]);

        // Handle PDF/Document upload
        if ($request->hasFile('catalogue_file')) {
            $file = $request->file('catalogue_file');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('uploads/catalogues');

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $validated['file_path'] = '/uploads/catalogues/' . $filename;

            // Auto-calculate size
            if (empty($validated['file_size'])) {
                $bytes = filesize($destinationPath . '/' . $filename);
                $validated['file_size'] = round($bytes / (1024 * 1024), 1) . ' MB';
            }

            if (empty($validated['format'])) {
                $validated['format'] = strtoupper($file->getClientOriginalExtension());
            }
        }

        // Handle Cover Image upload
        if ($request->hasFile('cover_image_file')) {
            $file = $request->file('cover_image_file');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('uploads/catalogues/covers');

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $validated['cover_image'] = '/uploads/catalogues/covers/' . $filename;
        }

        $catalogue->update($validated);

        return redirect()->route('admin.catalogues.index')->with('success', 'Catalogue updated successfully.');
    }

    /**
     * Remove the specified catalogue from storage.
     */
    public function destroy(Catalogue $catalogue)
    {
        $catalogue->delete();

        return redirect()->route('admin.catalogues.index')->with('success', 'Catalogue deleted successfully.');
    }
}
