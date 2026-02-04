// Helper functions to generate structured data

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Leadership Japanese Language School",
  "alternateName": ["日本語学校", "ဂျပန်ဘာသာစကား ကျောင်း"],
  "url": import.meta.env.VITE_SITE_URL || "https://leadershipjapanese.com",
  "logo": `${import.meta.env.VITE_SITE_URL || "https://leadershipjapanese.com"}/images/logo.png`,
  "description": "Learn Japanese with expert instructors. JLPT preparation courses from N5 to N1.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MM"
  },
  "sameAs": [
    // Add social media links here
  ]
});

export const generateCourseSchema = (course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.title,
  "description": course.description,
  "provider": {
    "@type": "Organization",
    "name": "Leadership Japanese Language School",
    "sameAs": import.meta.env.VITE_SITE_URL || "https://leadershipjapanese.com"
  },
  "offers": {
    "@type": "Offer",
    "price": course.price,
    "priceCurrency": "MMK",
    "availability": "https://schema.org/InStock"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "duration": `P${course.duration_weeks}W`
  }
});

export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const generateArticleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.excerpt,
  "image": article.image,
  "datePublished": article.publishedAt,
  "dateModified": article.updatedAt,
  "author": {
    "@type": "Person",
    "name": article.author || "Leadership Japanese Language School"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Leadership Japanese Language School",
    "logo": {
      "@type": "ImageObject",
      "url": `${import.meta.env.VITE_SITE_URL || "https://leadershipjapanese.com"}/images/logo.png`
    }
  }
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Leadership Japanese Language School",
  "url": import.meta.env.VITE_SITE_URL || "https://leadershipjapanese.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${import.meta.env.VITE_SITE_URL || "https://leadershipjapanese.com"}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});
