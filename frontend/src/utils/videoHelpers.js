/**
 * Video Helper Functions
 * Supports Vimeo video URLs and embed codes
 */

/**
 * Extract Vimeo video ID from various URL formats
 * Supports:
 * - https://vimeo.com/123456789
 * - https://vimeo.com/123456789?fl=tl&fe=ec (with query params)
 * - https://player.vimeo.com/video/123456789
 * - Vimeo embed iframe code
 * - Just the video ID: 123456789
 */
export const extractVimeoId = (url) => {
  if (!url) return null;

  // If it's an iframe embed code, extract the src
  const iframeMatch = url.match(/src=["']([^"']+)["']/);
  if (iframeMatch) {
    url = iframeMatch[1];
  }

  // Extract video ID from various Vimeo URL formats
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
    /vimeo\.com\/channels\/[\w-]+\/(\d+)/,
    /vimeo\.com\/groups\/[\w-]+\/videos\/(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // If it's just a number, assume it's the video ID
  if (/^\d+$/.test(url.trim())) {
    return url.trim();
  }

  return null;
};

/**
 * Get Vimeo embed URL with privacy and security settings
 */
export const getVimeoEmbedUrl = (videoId, options = {}) => {
  if (!videoId) return null;

  const {
    autoplay = false,
    loop = false,
    muted = false,
    controls = true,
    title = false,
    byline = false,
    portrait = false,
    badge = false, // Hide Vimeo logo (security)
    transparent = false, // Disable transparent mode
    color = '00adef', // Vimeo blue
  } = options;

  const params = new URLSearchParams({
    badge: badge ? '1' : '0', // Hide Vimeo logo to prevent click-through
    autopause: '0',
    player_id: '0',
    app_id: '58479',
    autoplay: autoplay ? '1' : '0',
    loop: loop ? '1' : '0',
    muted: muted ? '1' : '0',
    controls: controls ? '1' : '0',
    title: title ? '1' : '0',
    byline: byline ? '1' : '0',
    portrait: portrait ? '1' : '0',
    transparent: transparent ? '1' : '0',
    color: color.replace('#', ''),
  });

  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
};

/**
 * Validate if a URL is a valid Vimeo URL
 */
export const isValidVimeoUrl = (url) => {
  return extractVimeoId(url) !== null;
};
