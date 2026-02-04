import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  article = null,
  noindex = false,
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://leadershipjapanese.com';
  const siteName = 'Leadership Japanese Language School';
  const defaultImage = `${siteUrl}/images/og-image.jpg`;
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image ? `${siteUrl}${image}` : defaultImage;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${url || ''}`} />
      <link rel="alternate" hrefLang="ja" href={`${siteUrl}/ja${url || ''}`} />
      <link rel="alternate" hrefLang="my" href={`${siteUrl}/my${url || ''}`} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLang === 'ja' ? 'ja_JP' : currentLang === 'my' ? 'my_MM' : 'en_US'} />
      
      {/* Article specific */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional SEO */}
      <meta name="author" content={siteName} />
      <meta name="theme-color" content="#1e40af" />
    </Helmet>
  );
};

export default SEO;
