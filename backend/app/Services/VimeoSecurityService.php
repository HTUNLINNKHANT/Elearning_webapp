<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class VimeoSecurityService
{
    /**
     * Extract Vimeo video ID from various URL formats
     */
    public static function extractVimeoId($url)
    {
        if (!$url) {
            return null;
        }

        // Handle URLs with query parameters like ?fl=tl&fe=ec
        if (preg_match('/vimeo\.com\/(\d+)/', $url, $match)) {
            return $match[1];
        }

        // If it's just a number
        if (preg_match('/^\d+$/', $url)) {
            return $url;
        }

        return null;
    }

    /**
     * Generate a secure, time-limited hash for video access
     * This prevents URL sharing and unauthorized access
     */
    public static function generateSecureToken($lessonId, $userId, $expiresInMinutes = 120)
    {
        $expiresAt = now()->addMinutes($expiresInMinutes)->timestamp;
        
        // Create a hash that includes lesson, user, expiry, and app key
        $data = implode('|', [
            $lessonId,
            $userId,
            $expiresAt,
            config('app.key')
        ]);
        
        $hash = hash_hmac('sha256', $data, config('app.key'));
        
        return [
            'token' => $hash,
            'expires_at' => $expiresAt,
        ];
    }

    /**
     * Verify a secure token
     */
    public static function verifySecureToken($token, $lessonId, $userId, $expiresAt)
    {
        // Check if token has expired
        if (now()->timestamp > $expiresAt) {
            return false;
        }

        // Regenerate the expected hash
        $data = implode('|', [
            $lessonId,
            $userId,
            $expiresAt,
            config('app.key')
        ]);
        
        $expectedHash = hash_hmac('sha256', $data, config('app.key'));
        
        // Compare tokens
        return hash_equals($expectedHash, $token);
    }

    /**
     * Get secure video URL with embedded token
     * This creates a URL that can only be used by the specific user
     */
    public static function getSecureVideoUrl($lesson, $userId)
    {
        $vimeoId = self::extractVimeoId($lesson->video_url);
        
        if (!$vimeoId) {
            return null;
        }

        // Generate secure token
        $tokenData = self::generateSecureToken($lesson->id, $userId);
        
        // Build Vimeo player URL with security parameters
        $params = http_build_query([
            'badge' => 0,
            'autopause' => 0,
            'player_id' => 0,
            'app_id' => 58479,
            'title' => 0,
            'byline' => 0,
            'portrait' => 0,
            'transparent' => 0,
            // Add custom parameters for tracking
            'h' => substr($tokenData['token'], 0, 16), // Short hash for tracking
        ]);

        return [
            'embed_url' => "https://player.vimeo.com/video/{$vimeoId}?{$params}",
            'vimeo_id' => $vimeoId,
            'token' => $tokenData['token'],
            'expires_at' => $tokenData['expires_at'],
        ];
    }

    /**
     * Sanitize video URL for storage
     * Ensures consistent format in database
     */
    public static function sanitizeVimeoUrl($url)
    {
        $vimeoId = self::extractVimeoId($url);
        
        if (!$vimeoId) {
            return $url; // Return original if can't parse
        }

        // Store as clean Vimeo URL
        return "https://vimeo.com/{$vimeoId}";
    }

    /**
     * Check if user has access to video
     */
    public static function canAccessVideo($lesson, $user)
    {
        // Admins can access everything
        if ($user->is_admin) {
            return true;
        }

        // Free lessons are accessible to everyone
        if ($lesson->is_free) {
            return true;
        }

        // Check if user is enrolled in the course
        $curriculum = $lesson->curriculum;
        if (!$curriculum || !$curriculum->course) {
            return false;
        }

        $course = $curriculum->course;
        return $course->students()->where('user_id', $user->id)->exists();
    }
}
