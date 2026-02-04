import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../lib/axios';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { generateBreadcrumbSchema } from '../utils/structuredDataHelpers';

export default function Blog() {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/blog');
      setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedContent = (post, field) => {
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

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" }
  ];

  return (
    <>
      <SEO
        title="Blog - Japanese Learning Tips & News"
        description="Read our latest articles about Japanese language learning, JLPT tips, cultural insights, and student success stories."
        keywords="Japanese learning blog, JLPT tips, Japanese culture, language learning tips, study guides"
        url="/blog"
      />
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
      <div className="relative bg-black text-white py-12 sm:py-14 md:py-16 overflow-hidden">
        {/* Floating gradient elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-lime-400/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-400/20 rounded-lg blur-md"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* ART OF LWIN Badge */}
            <div className="inline-flex items-center gap-2 bg-lime-400/20 border border-lime-400/30 rounded-full px-4 py-2 text-sm font-medium text-lime-400 mb-6">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              <span>{i18n.language === 'ja' ? 'ブログ' : i18n.language === 'my' ? 'ဘလော့ဂ်' : 'Blog'}</span>
            </div>
            
            {/* Main Title with ART OF LWIN gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-wide">
              <span className="bg-gradient-to-r from-lime-400 via-cyan-400 via-purple-500 via-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-gradient">
                {i18n.language === 'ja' ? 'ブログ & インサイト' : i18n.language === 'my' ? 'ဘလော့ဂ်နှင့် အသိပညာ' : 'Blog & Insights'}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-light px-4 leading-relaxed">
              {i18n.language === 'ja' ? '洞察、ストーリー、知識' : i18n.language === 'my' ? 'အသိပညာ၊ ဇာတ်လမ်းများနှင့် အသိပညာ' : 'Insights, Stories & Knowledge'}
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid - Dark Theme */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900 relative overflow-hidden">
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

        {/* Gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/10 via-cyan-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/10 via-orange-500/10 to-yellow-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {posts.length === 0 ? (
            <div className="text-center py-12 sm:py-16 md:py-20 animate-fadeIn">
              <div className="inline-block p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p className="text-base sm:text-lg md:text-xl text-gray-300">
                  {i18n.language === 'ja' ? 'まだブログ投稿はありません' : i18n.language === 'my' ? 'ဘလော့ဂ်ပို့စ်များ မရှိသေးပါ' : 'No blog posts available yet'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post, index) => {
                const gradients = [
                  {
                    bg: "from-yellow-400 via-orange-500 to-pink-500",
                    badge: "bg-orange-500/80"
                  },
                  {
                    bg: "from-blue-400 via-purple-500 to-pink-500", 
                    badge: "bg-purple-500/80"
                  },
                  {
                    bg: "from-green-400 via-teal-500 to-blue-500",
                    badge: "bg-teal-500/80"
                  },
                  {
                    bg: "from-pink-400 via-red-500 to-orange-500",
                    badge: "bg-red-500/80"
                  },
                  {
                    bg: "from-lime-400 via-cyan-500 to-blue-500",
                    badge: "bg-cyan-500/80"
                  },
                  {
                    bg: "from-purple-400 via-pink-500 to-red-500",
                    badge: "bg-pink-500/80"
                  }
                ];

                const postGradient = gradients[index % gradients.length];

                return (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group"
                  >
                    <div className="bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-gray-800">
                      {/* Thumbnail */}
                      <div className={`relative h-56 bg-gradient-to-br ${postGradient.bg} overflow-hidden`}>
                        {post.thumbnail ? (
                          <div className="relative h-full">
                            <img
                              src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${post.thumbnail}`}
                              alt={getLocalizedContent(post, 'title')}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Light overlay for better text readability */}
                            <div className="absolute inset-0 bg-black/20"></div>
                          </div>
                        ) : (
                          <div className="relative h-full">
                            {/* Abstract gradient shapes */}
                            <div className="absolute inset-0 opacity-60">
                              <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                              <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/30 rounded-lg blur-lg"></div>
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg className="w-20 h-20 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                            </div>
                          </div>
                        )}
                        
                        {/* Date Badge */}
                        <div className={`absolute top-4 left-4 ${postGradient.badge} backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-bold text-white`}>
                          {formatDate(post.published_at)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Author */}
                        <div className="flex items-center text-sm text-gray-400 mb-3">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{getLocalizedContent(post, 'author')}</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors line-clamp-2">
                          {getLocalizedContent(post, 'title')}
                        </h2>

                        {/* Short Description */}
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">
                          {getLocalizedContent(post, 'short_description')}
                        </p>

                        {/* Read More Button */}
                        <button className={`w-full bg-gradient-to-r ${postGradient.bg} text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:scale-105 group-hover:shadow-xl flex items-center justify-center gap-2`}>
                          <span>
                            {i18n.language === 'ja' ? '続きを読む' : i18n.language === 'my' ? 'ပိုမိုဖတ်ရှုရန်' : 'Read More'}
                          </span>
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  );
}
