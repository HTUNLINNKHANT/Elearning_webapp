<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Instructor;
use Illuminate\Http\Request;

class InstructorController extends Controller
{
    public function index()
    {
        $instructors = Instructor::withCount('courses')
            ->orderBy('name')
            ->get();

        return response()->json($instructors);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_my' => 'nullable|string|max:255',
            'name_ja' => 'nullable|string|max:255',
            'email' => 'required|email|unique:instructors,email',
            'bio' => 'nullable|string',
            'bio_my' => 'nullable|string',
            'bio_ja' => 'nullable|string',
            'avatar' => 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:2048',
            'expertise' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatarName = time() . '_' . uniqid() . '.' . $avatar->getClientOriginalExtension();
            $avatar->move(public_path('uploads/instructors'), $avatarName);
            $validated['avatar'] = '/uploads/instructors/' . $avatarName;
        }

        $instructor = Instructor::create($validated);

        return response()->json($instructor, 201);
    }

    public function show($id)
    {
        $instructor = Instructor::with('courses')->findOrFail($id);
        return response()->json($instructor);
    }

    public function update(Request $request, $id)
    {
        $instructor = Instructor::findOrFail($id);

        $validated = $request->validate([
            'name' => 'string|max:255',
            'name_my' => 'nullable|string|max:255',
            'name_ja' => 'nullable|string|max:255',
            'email' => 'email|unique:instructors,email,' . $id,
            'bio' => 'nullable|string',
            'bio_my' => 'nullable|string',
            'bio_ja' => 'nullable|string',
            'avatar' => 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:2048',
            'expertise' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($instructor->avatar && file_exists(public_path($instructor->avatar))) {
                unlink(public_path($instructor->avatar));
            }
            
            $avatar = $request->file('avatar');
            $avatarName = time() . '_' . uniqid() . '.' . $avatar->getClientOriginalExtension();
            $avatar->move(public_path('uploads/instructors'), $avatarName);
            $validated['avatar'] = '/uploads/instructors/' . $avatarName;
        } else {
            unset($validated['avatar']);
        }

        $instructor->update($validated);

        return response()->json($instructor);
    }

    public function destroy($id)
    {
        $instructor = Instructor::findOrFail($id);
        $instructor->delete();

        return response()->json(['message' => 'Instructor deleted successfully']);
    }
}
