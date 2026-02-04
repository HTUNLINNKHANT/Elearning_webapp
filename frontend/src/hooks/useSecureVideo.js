import { useState, useEffect, useCallback } from 'react';
import api from '../lib/axios';

/**
 * Hook for managing secure video access
 * Fetches time-limited secure video URLs and handles token refresh
 */
export const useSecureVideo = (lessonId) => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset state when lesson changes
  useEffect(() => {
    setVideoData(null);
    setError(null);
  }, [lessonId]);

  const fetchSecureVideo = useCallback(async () => {
    if (!lessonId) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get(`/lessons/${lessonId}/secure-video`);
      setVideoData(data.video);
    } catch (err) {
      console.error('Failed to fetch secure video:', err);
      setError(err.response?.data?.message || 'Failed to load video');
      setVideoData(null);
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  // Fetch video on mount and when lesson changes
  useEffect(() => {
    fetchSecureVideo();
  }, [fetchSecureVideo]);

  // Auto-refresh token before expiry (refresh 5 minutes before expiry)
  useEffect(() => {
    if (!videoData?.expires_at) return;

    const expiresAt = videoData.expires_at * 1000; // Convert to milliseconds
    const now = Date.now();
    const timeUntilExpiry = expiresAt - now;
    const refreshTime = timeUntilExpiry - (5 * 60 * 1000); // 5 minutes before expiry

    if (refreshTime > 0) {
      const timer = setTimeout(() => {
        console.log('Refreshing video token...');
        fetchSecureVideo();
      }, refreshTime);

      return () => clearTimeout(timer);
    } else {
      // Token already expired or about to expire, refresh immediately
      fetchSecureVideo();
    }
  }, [videoData, fetchSecureVideo]);

  return {
    videoData,
    loading,
    error,
    refresh: fetchSecureVideo,
  };
};
