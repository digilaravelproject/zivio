<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class HeroSlideController extends Controller
{
    public function index(): Response
    {
        $slides = HeroSlide::orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('admin/hero-slides/index', [
            'slides' => $slides,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'headline' => 'required',
            'sub' => 'required|string',
            'location' => 'required|string|max:255',
            'type' => 'required|in:image,video',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|max:10240',
            'video' => 'nullable|string',
            'video_file' => 'nullable|mimes:mp4,mov,ogg,webm|max:51200',
            'poster' => 'nullable|string',
            'poster_file' => 'nullable|image|max:10240',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if (is_string($validated['headline'])) {
            $lines = preg_split('/\r\n|\r|\n/', trim($validated['headline']));
            $validated['headline'] = array_values(array_filter(array_map('trim', $lines)));
        }

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/hero-slides'), $filename);
            $validated['image'] = '/uploads/hero-slides/' . $filename;
        }

        if ($request->hasFile('poster_file')) {
            $file = $request->file('poster_file');
            $filename = 'poster_' . time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/hero-slides'), $filename);
            $validated['poster'] = '/uploads/hero-slides/' . $filename;
        }

        if ($request->hasFile('video_file')) {
            $file = $request->file('video_file');
            $filename = 'video_' . time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/hero-slides'), $filename);
            $validated['video'] = '/uploads/hero-slides/' . $filename;
        }

        $validated['sort_order'] = $validated['sort_order'] ?? 0;
        $validated['is_active'] = $request->boolean('is_active', true);

        HeroSlide::create($validated);

        return redirect()->route('admin.hero-slides.index')->with('success', 'Hero slide created successfully.');
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'headline' => 'required',
            'sub' => 'required|string',
            'location' => 'required|string|max:255',
            'type' => 'required|in:image,video',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|max:10240',
            'video' => 'nullable|string',
            'video_file' => 'nullable|mimes:mp4,mov,ogg,webm|max:51200',
            'poster' => 'nullable|string',
            'poster_file' => 'nullable|image|max:10240',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if (is_string($validated['headline'])) {
            $lines = preg_split('/\r\n|\r|\n/', trim($validated['headline']));
            $validated['headline'] = array_values(array_filter(array_map('trim', $lines)));
        }

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/hero-slides'), $filename);
            $validated['image'] = '/uploads/hero-slides/' . $filename;
        }

        if ($request->hasFile('poster_file')) {
            $file = $request->file('poster_file');
            $filename = 'poster_' . time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/hero-slides'), $filename);
            $validated['poster'] = '/uploads/hero-slides/' . $filename;
        }

        if ($request->hasFile('video_file')) {
            $file = $request->file('video_file');
            $filename = 'video_' . time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/hero-slides'), $filename);
            $validated['video'] = '/uploads/hero-slides/' . $filename;
        }

        $validated['sort_order'] = $validated['sort_order'] ?? $heroSlide->sort_order;
        $validated['is_active'] = $request->boolean('is_active', true);

        $heroSlide->update($validated);

        return redirect()->route('admin.hero-slides.index')->with('success', 'Hero slide updated successfully.');
    }

    public function destroy(HeroSlide $heroSlide)
    {
        $heroSlide->delete();

        return redirect()->route('admin.hero-slides.index')->with('success', 'Hero slide deleted successfully.');
    }
}
