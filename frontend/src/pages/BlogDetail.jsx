import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../lib/axios';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils/structuredDataHelpers';
import { generateMetaDescription } from '../utils/seo';

export default function BlogDetail() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/blog/${slug}`);
      setPost(data);
    } catch (err) {
      setError(err.response?.status === 404 ? 'Blog post not found' : 'Error loading blog post');
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedContent = (field) => {
    if (!post) return '';
    const lang = i18n.language;
    if (lang === 'my' && post[`${field}_my`]) return post[`${field}_my`];
    if (lang === 'ja' && post[`${field}_ja`]) return post[`${field}_ja`];
    return post[field];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: '25px 25px'
            }}
          ></div>
        </div>

        {/* Gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/20 via-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="text-center relative z-10">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent"></div>
          <p className="mt-4 text-gray-300 font-medium">
            {i18n.language === 'ja' ? '読み込み中...' : i18n.language === 'my' ? 'တင်နေသည်...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: '25px 25px'
            }}
          ></div>
        </div>

        {/* Gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/20 via-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-12">
              <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-white mb-4">{error}</h2>
              <Link to="/blog" className="inline-block px-6 py-3 bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:scale-105">
                {i18n.language === 'ja' ? 'ブログに戻る' : i18n.language === 'my' ? 'ဘလော့ဂ်သို့ပြန်သွားရန်' : 'Back to Blog'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: getLocalizedContent('title'), url: `/blog/${slug}` }
  ];

  const articleData = {
    title: getLocalizedContent('title'),
    excerpt: generateMetaDescription(getLocalizedContent('excerpt')),
    image: post.image ? `${import.meta.env.VITE_SITE_URL || 'https://leadershipjapanese.com'}${post.image}` : null,
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
    author: post.author || 'Leadership Japanese Language School'
  };

  return (
    <>
      <SEO
        title={getLocalizedContent('title')}
        description={generateMetaDescription(getLocalizedContent('excerpt'))}
        keywords={post.tags || 'Japanese learning, JLPT, blog'}
        url={`/blog/${slug}`}
        type="article"
        image={post.image}
        article={{
          publishedTime: post.published_at,
          modifiedTime: post.updated_at,
          author: post.author || 'Leadership Japanese Language School',
          tags: post.tags ? post.tags.split(',') : []
        }}
      />
      <StructuredData data={generateArticleSchema(articleData)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dotted Pattern Background - matching ART OF LWIN theme */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '25px 25px'
          }}
        ></div>
      </div>

      {/* Vibrant gradient orbs matching ART OF LWIN theme */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/20 via-cyan-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/20 via-orange-500/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400/15 via-orange-500/15 to-red-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section - ART OF LWIN Dark Theme */}
      <div className="relative bg-black text-white overflow-hidden py-12 sm:py-16">
        {/* Floating gradient elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-lime-400/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-400/20 rounded-lg blur-md"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-gray-300 hover:text-lime-400 mb-8 transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {i18n.language === 'ja' ? 'ブログに戻る' : i18n.language === 'my' ? 'ဘလော့ဂ်သို့ပြန်သွားရန်' : 'Back to Blog'}
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-lime-400/20 border border-lime-400/30 rounded-full px-4 py-2 text-sm font-medium text-lime-400">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                {i18n.language === 'ja' ? '記事' : i18n.language === 'my' ? 'ဆောင်းပါး' : 'Article'}
              </span>
            </div>

            {/* Title with gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-lime-400 via-cyan-400 via-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                {getLocalizedContent('title')}
              </span>
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{getLocalizedContent('author')}</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(post.published_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section - Dark Theme */}
      <section className="py-12 sm:py-16 bg-gray-900 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {post.thumbnail && (
              <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
                <img
                  src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${post.thumbnail}`}
                  alt={getLocalizedContent('title')}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Article Content */}
            <article className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-8 md:p-12">
              {/* Short Description */}
              <div className="mb-8 pb-8 border-b-2 border-gradient-to-r from-lime-400/20 via-cyan-400/20 to-purple-500/20">
                <p className="text-xl text-gray-300 leading-relaxed italic">
                  {getLocalizedContent('short_description')}
                </p>
              </div>

              {/* Main Content */}
              <div className="prose prose-lg prose-invert max-w-none">
                <div 
                  className="text-gray-300 leading-relaxed whitespace-pre-wrap"
                  style={{
                    lineHeight: '1.8',
                    fontSize: '1.125rem'
                  }}
                >
                  {getLocalizedContent('content')}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="mt-12 pt-8 border-t-2 border-gradient-to-r from-lime-400/20 via-cyan-400/20 to-purple-500/20">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </article>

            {/* Back to Blog Button */}
            <div className="mt-12 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:scale-105 group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {i18n.language === 'ja' ? 'すべての投稿に戻る' : i18n.language === 'my' ? 'ပို့စ်အားလုံးသို့ပြန်သွားရန်' : 'Back to All Posts'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
