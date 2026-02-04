import { useState, useEffect } from 'react';
import { extractVimeoId, getVimeoEmbedUrl } from '../utils/videoHelpers';

/**
 * Secure Vimeo Video Player Component
 * Supports Vimeo URLs and embed codes with privacy controls
 */
export default function VimeoPlayer({ 
  videoUrl, 
  title = 'Video Lesson',
  className = '',
  autoplay = false,
  controls = true,
  showTitle = false,
}) {
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (videoUrl) {
      const id = extractVimeoId(videoUrl);
      if (id) {
        setVideoId(id);
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [videoUrl]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg
          className="w-12 h-12 text-red-400 mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-red-700 font-medium">Invalid Vimeo URL</p>
        <p className="text-red-600 text-sm mt-1">
          Please check the video URL or embed code
        </p>
      </div>
    );
  }

  if (!videoId) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <svg
          className="w-12 h-12 text-gray-400 mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <p className="text-gray-600">No video available</p>
      </div>
    );
  }

  const embedUrl = getVimeoEmbedUrl(videoId, {
    autoplay,
    controls,
    title: showTitle,
    byline: false,
    portrait: false,
    badge: false, // Hide Vimeo logo for security
  });

  return (
    <div className={`relative ${className}`}>
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
      {showTitle && title && (
        <div className="mt-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
    </div>
  );
}
