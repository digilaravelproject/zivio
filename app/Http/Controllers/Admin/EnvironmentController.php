<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Environment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EnvironmentController extends Controller
{
    public function index(): Response
    {
        $environments = Environment::withCount('categories')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('admin/environments/index', [
            'environments' => $environments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:environments,slug',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|max:5120',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/environments'), $filename);
            $validated['image'] = '/uploads/environments/' . $filename;
        }

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        Environment::create($validated);

        return redirect()->route('admin.environments.index')->with('success', 'Environment created successfully.');
    }

    public function update(Request $request, Environment $environment)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:environments,slug,' . $environment->id,
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|max:5120',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/environments'), $filename);
            $validated['image'] = '/uploads/environments/' . $filename;
        }

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $environment->update($validated);

        return redirect()->route('admin.environments.index')->with('success', 'Environment updated successfully.');
    }

    public function destroy(Environment $environment)
    {
        $environment->delete();
        return redirect()->route('admin.environments.index')->with('success', 'Environment deleted successfully.');
    }
}

