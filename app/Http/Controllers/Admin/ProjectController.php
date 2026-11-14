<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::orderBy('sort_order')->orderBy('id')->get();

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'country'         => 'required|string|max:255',
            'type'            => 'required|string|max:255',
            'year'            => 'nullable|string|max:50',
            'scope'           => 'nullable|string|max:255',
            'image'           => 'nullable|string|max:500',
            'image_file'      => 'nullable|image|max:10240',
            'is_marquee_row1' => 'nullable|boolean',
            'is_marquee_row2' => 'nullable|boolean',
            'sort_order'      => 'nullable|integer',
            'is_active'       => 'nullable|boolean',
        ]);

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $destination = public_path('uploads/projects');
            if (!file_exists($destination)) {
                mkdir($destination, 0755, true);
            }
            $file->move($destination, $filename);
            $validated['image'] = '/uploads/projects/' . $filename;
        }

        if (empty($validated['image'])) {
            $validated['image'] = '1512453979798-5ea266f8880c'; // default placeholder unsplash id
        }

        $validated['is_marquee_row1'] = $request->boolean('is_marquee_row1', true);
        $validated['is_marquee_row2'] = $request->boolean('is_marquee_row2', false);
        $validated['is_active']       = $request->boolean('is_active', true);
        $validated['sort_order']      = $validated['sort_order'] ?? 0;

        unset($validated['image_file']);

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'country'         => 'required|string|max:255',
            'type'            => 'required|string|max:255',
            'year'            => 'nullable|string|max:50',
            'scope'           => 'nullable|string|max:255',
            'image'           => 'nullable|string|max:500',
            'image_file'      => 'nullable|image|max:10240',
            'is_marquee_row1' => 'nullable|boolean',
            'is_marquee_row2' => 'nullable|boolean',
            'sort_order'      => 'nullable|integer',
            'is_active'       => 'nullable|boolean',
        ]);

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $destination = public_path('uploads/projects');
            if (!file_exists($destination)) {
                mkdir($destination, 0755, true);
            }
            $file->move($destination, $filename);
            $validated['image'] = '/uploads/projects/' . $filename;
        }

        if (empty($validated['image']) && empty($project->image)) {
            $validated['image'] = '1512453979798-5ea266f8880c';
        } elseif (empty($validated['image'])) {
            unset($validated['image']);
        }

        $validated['is_marquee_row1'] = $request->boolean('is_marquee_row1');
        $validated['is_marquee_row2'] = $request->boolean('is_marquee_row2');
        $validated['is_active']       = $request->boolean('is_active');
        $validated['sort_order']      = $validated['sort_order'] ?? $project->sort_order;

        unset($validated['image_file']);

        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
