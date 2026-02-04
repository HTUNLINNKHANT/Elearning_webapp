<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Curriculum;
use App\Models\Course;
use Illuminate\Http\Request;

class CurriculumController extends Controller
{
    public function index($courseIdentifier)
    {
        $course = Course::where(function($query) use ($courseIdentifier) {
                if (is_numeric($courseIdentifier)) {
                    $query->where('id', $courseIdentifier);
                } else {
                    $query->where('slug', $courseIdentifier);
                }
            })
            ->firstOrFail();
            
        $curriculums = Curriculum::where('course_id', $course->id)
            ->with('lessons')
            ->orderBy('order')
            ->get();

        return response()->json($curriculums);
    }

    public function store(Request $request, $courseIdentifier)
    {
        $course = Course::where(function($query) use ($courseIdentifier) {
                if (is_numeric($courseIdentifier)) {
                    $query->where('id', $courseIdentifier);
                } else {
                    $query->where('slug', $courseIdentifier);
                }
            })
            ->firstOrFail();
            
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_my' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_my' => 'nullable|string',
            'description_ja' => 'nullable|string',
            'order' => 'integer',
        ]);

        $validated['course_id'] = $course->id;

        $curriculum = Curriculum::create($validated);

        return response()->json($curriculum->load('lessons'), 201);
    }

    public function show($courseIdentifier, $id)
    {
        $course = Course::where(function($query) use ($courseIdentifier) {
                if (is_numeric($courseIdentifier)) {
                    $query->where('id', $courseIdentifier);
                } else {
                    $query->where('slug', $courseIdentifier);
                }
            })
            ->firstOrFail();
            
        $curriculum = Curriculum::where('course_id', $course->id)
            ->with('lessons')
            ->findOrFail($id);

        return response()->json($curriculum);
    }

    public function update(Request $request, $courseIdentifier, $id)
    {
        $course = Course::where(function($query) use ($courseIdentifier) {
                if (is_numeric($courseIdentifier)) {
                    $query->where('id', $courseIdentifier);
                } else {
                    $query->where('slug', $courseIdentifier);
                }
            })
            ->firstOrFail();
            
        $curriculum = Curriculum::where('course_id', $course->id)->findOrFail($id);

        $validated = $request->validate([
            'title' => 'string|max:255',
            'title_my' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_my' => 'nullable|string',
            'description_ja' => 'nullable|string',
            'order' => 'integer',
        ]);

        $curriculum->update($validated);

        return response()->json($curriculum->load('lessons'));
    }

    public function destroy($courseIdentifier, $id)
    {
        $course = Course::where(function($query) use ($courseIdentifier) {
                if (is_numeric($courseIdentifier)) {
                    $query->where('id', $courseIdentifier);
                } else {
                    $query->where('slug', $courseIdentifier);
                }
            })
            ->firstOrFail();
            
        $curriculum = Curriculum::where('course_id', $course->id)->findOrFail($id);
        $curriculum->delete();

        return response()->json(['message' => 'Curriculum deleted successfully']);
    }
}
