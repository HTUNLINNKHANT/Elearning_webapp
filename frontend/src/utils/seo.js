// SEO utility functions

export const truncateText = (text, maxLength = 160) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const generateMetaDescription = (text, maxLength = 160) => {
  return truncateText(text, maxLength);
};

export const generateKeywords = (tags) => {
  if (!tags || !Array.isArray(tags)) return '';
  return tags.join(', ');
};

export const getPageTitle = (pageName, siteName = 'Leadership Japanese Language School') => {
  return pageName ? `${pageName} | ${siteName}` : siteName;
};

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Sitemap generation helper
export const generateSitemapUrls = () => {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://leadershipjapanese.com';
  const languages = ['en', 'ja', 'my'];
  
  const routes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/courses', priority: '0.9', changefreq: 'weekly' },
    { path: '/blog', priority: '0.7', changefreq: 'weekly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  ];
  
  const urls = [];
  
  routes.forEach(route => {
    languages.forEach(lang => {
      urls.push({
        loc: `${baseUrl}/${lang}${route.path}`,
        priority: route.priority,
        changefreq: route.changefreq,
        lastmod: new Date().toISOString().split('T')[0]
      });
    });
  });
  
  return urls;
};
