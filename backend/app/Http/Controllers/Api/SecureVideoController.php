<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Services\VimeoSecurityService;
use Illuminate\Http\Request;

class SecureVideoController extends Controller
{
    /**
     * Get secure video URL for a specific lesson
     * This endpoint validates enrollment and returns a time-limited secure URL
     */
    public function getSecureUrl(Request $request, $lessonId)
    {
        $user = $request->user();
        $lesson = Lesson::with('curriculum.course')->findOrFail($lessonId);

        // Check if user has access to this video
        if (!VimeoSecurityService::canAccessVideo($lesson, $user)) {
            return response()->json([
                'message' => 'You do not have access to this video. Please enroll in the course first.'
            ], 403);
        }

        // Get secure video URL
        $secureVideo = VimeoSecurityService::getSecureVideoUrl($lesson, $user->id);

        if (!$secureVideo) {
            return response()->json([
                'message' => 'Invalid video URL'
            ], 400);
        }

        return response()->json([
            'video' => $secureVideo,
            'lesson' => [
                'id' => $lesson->id,
                'title' => $lesson->title,
                'duration_minutes' => $lesson->duration_minutes,
            ]
        ]);
    }

    /**
     * Verify video access token
     * This can be called by frontend to check if token is still valid
     */
    public function verifyToken(Request $request)
    {
        $validated = $request->validate([
            'lesson_id' => 'required|integer',
            'token' => 'required|string',
            'expires_at' => 'required|integer',
        ]);

        $user = $request->user();
        $lesson = Lesson::findOrFail($validated['lesson_id']);

        // Verify user still has access
        if (!VimeoSecurityService::canAccessVideo($lesson, $user)) {
            return response()->json([
                'valid' => false,
                'message' => 'Access revoked'
            ], 403);
        }

        // Verify token
        $isValid = VimeoSecurityService::verifySecureToken(
            $validated['token'],
            $validated['lesson_id'],
            $user->id,
            $validated['expires_at']
        );

        return response()->json([
            'valid' => $isValid,
            'message' => $isValid ? 'Token is valid' : 'Token expired or invalid'
        ]);
    }
}
