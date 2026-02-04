<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CourseMaterial;
use App\Models\Lesson;
use Illuminate\Http\Request;


class CourseMaterialController extends Controller
{
    public function index(Request $request, $lessonId)
    {
        $lesson = Lesson::with(['curriculum.course'])->findOrFail($lessonId);

        // Check if lesson has curriculum and course
        if (!$lesson->curriculum || !$lesson->curriculum->course) {
            return response()->json(['error' => 'Invalid lesson structure'], 404);
        }

        $course = $lesson->curriculum->course;

        // Check if user is enrolled in the course
        if (!$request->user()->courses()->where('courses.id', $course->id)->exists()) {
            return response()->json(['error' => 'Not enrolled in this course'], 403);
        }

        $materials = $lesson->materials()
            ->orderBy('order')
            ->get()
            ->map(function ($material) {
                return [
                    'id' => $material->id,
                    'title' => $material->title,
                    'title_my' => $material->title_my,
                    'title_ja' => $material->title_ja,
                    'description' => $material->description,
                    'description_my' => $material->description_my,
                    'description_ja' => $material->description_ja,
                    'file_name' => $material->file_name,
                    'file_type' => $material->file_type,
                    'file_size' => $material->file_size,
                    'file_size_formatted' => $material->file_size_formatted,
                    'download_count' => $material->download_count,
                    'order' => $material->order,
                ];
            });

        return response()->json($materials);
    }

    public function download(Request $request, $lessonId, $materialId)
    {
        $material = CourseMaterial::with(['lesson.curriculum.course'])
            ->where('lesson_id', $lessonId)
            ->findOrFail($materialId);

        // Check if material has valid lesson structure
        if (!$material->lesson || !$material->lesson->curriculum || !$material->lesson->curriculum->course) {
            return response()->json(['error' => 'Invalid material structure'], 404);
        }

        $course = $material->lesson->curriculum->course;

        // Check if user is enrolled in the course
        if (!$request->user()->courses()->where('courses.id', $course->id)->exists()) {
            return response()->json(['error' => 'Not enrolled in this course'], 403);
        }

        // Increment download count
        $material->incrementDownloadCount();

        // Return file download
        $filePath = storage_path('app/public/' . $material->file_path);

        if (!file_exists($filePath)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        return response()->download($filePath, $material->file_name);
    }
}
