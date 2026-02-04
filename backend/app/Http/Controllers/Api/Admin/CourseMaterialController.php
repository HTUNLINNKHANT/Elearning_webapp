<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\CourseMaterial;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CourseMaterialController extends Controller
{
    public function index($lessonId)
    {
        $lesson = Lesson::findOrFail($lessonId);
        $materials = $lesson->materials()->orderBy('order')->get();
        
        return response()->json($materials);
    }

    public function store(Request $request, $lessonId)
    {
        $lesson = Lesson::findOrFail($lessonId);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'title_my' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_my' => 'nullable|string',
            'description_ja' => 'nullable|string',
            'file' => 'required|file|max:51200', // 50MB max
            'order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('course-materials', $fileName, 'public');

            $material = CourseMaterial::create([
                'lesson_id' => $lessonId,
                'title' => $request->title,
                'title_my' => $request->title_my,
                'title_ja' => $request->title_ja,
                'description' => $request->description,
                'description_my' => $request->description_my,
                'description_ja' => $request->description_ja,
                'file_name' => $fileName,
                'file_path' => $filePath,
                'file_type' => $file->getClientOriginalExtension(),
                'file_size' => $file->getSize(),
                'order' => $request->order ?? 0,
            ]);

            return response()->json($material, 201);
        }

        return response()->json(['error' => 'File upload failed'], 400);
    }

    public function update(Request $request, $lessonId, $materialId)
    {
        $material = CourseMaterial::where('lesson_id', $lessonId)
            ->findOrFail($materialId);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'title_my' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_my' => 'nullable|string',
            'description_ja' => 'nullable|string',
            'file' => 'nullable|file|max:51200',
            'order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = [
            'title' => $request->title,
            'title_my' => $request->title_my,
            'title_ja' => $request->title_ja,
            'description' => $request->description,
            'description_my' => $request->description_my,
            'description_ja' => $request->description_ja,
            'order' => $request->order ?? $material->order,
        ];

        // If new file is uploaded, replace the old one
        if ($request->hasFile('file')) {
            // Delete old file
            if (Storage::disk('public')->exists($material->file_path)) {
                Storage::disk('public')->delete($material->file_path);
            }

            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('course-materials', $fileName, 'public');

            $data['file_name'] = $fileName;
            $data['file_path'] = $filePath;
            $data['file_type'] = $file->getClientOriginalExtension();
            $data['file_size'] = $file->getSize();
        }

        $material->update($data);

        return response()->json($material);
    }

    public function destroy($lessonId, $materialId)
    {
        $material = CourseMaterial::where('lesson_id', $lessonId)
            ->findOrFail($materialId);

        // Delete file from storage
        if (Storage::disk('public')->exists($material->file_path)) {
            Storage::disk('public')->delete($material->file_path);
        }

        $material->delete();

        return response()->json(['message' => 'Material deleted successfully']);
    }

    public function reorder(Request $request, $lessonId)
    {
        $validator = Validator::make($request->all(), [
            'materials' => 'required|array',
            'materials.*.id' => 'required|exists:course_materials,id',
            'materials.*.order' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        foreach ($request->materials as $materialData) {
            CourseMaterial::where('id', $materialData['id'])
                ->where('lesson_id', $lessonId)
                ->update(['order' => $materialData['order']]);
        }

        return response()->json(['message' => 'Materials reordered successfully']);
    }
}
