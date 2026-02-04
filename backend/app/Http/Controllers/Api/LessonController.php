<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Curriculum;
use App\Services\VimeoSecurityService;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index($curriculumId)
    {
        $lessons = Lesson::where('curriculum_id', $curriculumId)
            ->orderBy('order')
            ->get();

        return response()->json($lessons);
    }

    public function store(Request $request, $curriculumId)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_my' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'content_my' => 'nullable|string',
            'content_ja' => 'nullable|string',
            'type' => 'required|in:video,text,quiz,assignment',
            'video_url' => 'nullable|string',
            'duration_minutes' => 'nullable|integer',
            'order' => 'integer',
            'is_free' => 'boolean',
        ]);

        $validated['curriculum_id'] = $curriculumId;

        // Sanitize video URL for consistent storage
        if (!empty($validated['video_url'])) {
            $validated['video_url'] = VimeoSecurityService::sanitizeVimeoUrl($validated['video_url']);
        }

        $lesson = Lesson::create($validated);

        // Update course total_lessons count
        $curriculum = Curriculum::find($curriculumId);
        if ($curriculum && $curriculum->course) {
            $curriculum->course->increment('total_lessons');
        }

        return response()->json($lesson, 201);
    }

    public function show($curriculumId, $id)
    {
        $lesson = Lesson::where('curriculum_id', $curriculumId)->findOrFail($id);
        return response()->json($lesson);
    }

    public function update(Request $request, $curriculumId, $id)
    {
        $lesson = Lesson::where('curriculum_id', $curriculumId)->findOrFail($id);

        $validated = $request->validate([
            'title' => 'string|max:255',
            'title_my' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'content_my' => 'nullable|string',
            'content_ja' => 'nullable|string',
            'type' => 'in:video,text,quiz,assignment',
            'video_url' => 'nullable|string',
            'duration_minutes' => 'nullable|integer',
            'order' => 'integer',
            'is_free' => 'boolean',
        ]);

        // Sanitize video URL for consistent storage
        if (!empty($validated['video_url'])) {
            $validated['video_url'] = VimeoSecurityService::sanitizeVimeoUrl($validated['video_url']);
        }

        $lesson->update($validated);

        return response()->json($lesson);
    }

    public function destroy($curriculumId, $id)
    {
        $lesson = Lesson::where('curriculum_id', $curriculumId)->findOrFail($id);
        $lesson->delete();

        // Update course total_lessons count
        $curriculum = Curriculum::find($curriculumId);
        if ($curriculum && $curriculum->course) {
            $curriculum->course->decrement('total_lessons');
        }

        return response()->json(['message' => 'Lesson deleted successfully']);
    }
}
