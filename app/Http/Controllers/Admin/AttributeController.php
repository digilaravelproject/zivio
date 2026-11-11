<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AttributeController extends Controller
{
    public function index(): Response
    {
        $attributes = Attribute::with(['values' => function ($q) {
            $q->orderBy('sort_order');
        }])
        ->orderBy('sort_order')
        ->get();

        return Inertia::render('admin/attributes/index', [
            'attributes' => $attributes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:attributes,slug',
            'unit' => 'nullable|string|max:50',
            'type' => 'required|string|in:select,text',
            'sort_order' => 'nullable|integer',
            'is_filterable' => 'boolean',
            'is_active' => 'boolean',
            'initial_values' => 'nullable|string', // comma separated values
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $attribute = Attribute::create($validated);

        if (!empty($validated['initial_values'])) {
            $vals = array_filter(array_map('trim', explode(',', $validated['initial_values'])));
            foreach ($vals as $idx => $v) {
                $attribute->values()->create([
                    'value' => $v,
                    'sort_order' => $idx + 1,
                ]);
            }
        }

        return redirect()->route('admin.attributes.index')->with('success', 'Attribute created successfully.');
    }

    public function update(Request $request, Attribute $attribute)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:attributes,slug,' . $attribute->id,
            'unit' => 'nullable|string|max:50',
            'type' => 'required|string|in:select,text',
            'sort_order' => 'nullable|integer',
            'is_filterable' => 'boolean',
            'is_active' => 'boolean',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $attribute->update($validated);

        return redirect()->route('admin.attributes.index')->with('success', 'Attribute updated successfully.');
    }

    public function destroy(Attribute $attribute)
    {
        $attribute->delete();
        return redirect()->route('admin.attributes.index')->with('success', 'Attribute deleted successfully.');
    }

    public function storeValue(Request $request, Attribute $attribute)
    {
        $validated = $request->validate([
            'value' => 'required|string|max:255',
            'label' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        $attribute->values()->create($validated);

        return redirect()->route('admin.attributes.index')->with('success', 'Attribute value added successfully.');
    }

    public function destroyValue(AttributeValue $attributeValue)
    {
        $attributeValue->delete();
        return redirect()->route('admin.attributes.index')->with('success', 'Attribute value deleted successfully.');
    }
}

