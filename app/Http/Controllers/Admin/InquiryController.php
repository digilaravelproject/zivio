<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(Request $request): Response
    {
        $query = ContactInquiry::with(['product', 'variant'])
            ->orderBy('id', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $inquiries = $query->paginate(20)->withQueryString();

        return Inertia::render('admin/inquiries/index', [
            'inquiries' => $inquiries,
            'currentStatus' => $request->status,
        ]);
    }

    public function update(Request $request, ContactInquiry $inquiry)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:new,in_progress,contacted,closed',
            'notes' => 'nullable|string',
        ]);

        $inquiry->update($validated);

        return back()->with('success', 'Inquiry status updated successfully.');
    }

    public function destroy(ContactInquiry $inquiry)
    {
        $inquiry->delete();
        return back()->with('success', 'Inquiry deleted successfully.');
    }
}

