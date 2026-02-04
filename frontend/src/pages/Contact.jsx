import { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../lib/axios";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import { generateBreadcrumbSchema } from "../utils/structuredDataHelpers";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/contact", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" }
  ];

  return (
    <>
      <SEO
        title={t("contact.title")}
        description="Get in touch with Leadership Japanese Language School. Contact us for course inquiries, enrollment information, or any questions about learning Japanese."
        keywords="contact us, Japanese school contact, course inquiry, enrollment, get in touch"
        url="/contact"
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

      {/* Hero Section - Enhanced User-Friendly Design */}
      <div className="relative bg-black text-white py-12 sm:py-14 md:py-16 overflow-hidden">
        {/* Floating gradient elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-lime-400/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-400/20 rounded-lg blur-md"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Enhanced Badge with Icon */}
            <div className="inline-flex items-center gap-3 bg-lime-400/20 border border-lime-400/30 rounded-full px-6 py-3 text-sm font-medium text-lime-400 mb-8 backdrop-blur-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              <span>Let's Connect</span>
            </div>
            
            {/* Enhanced Title with Better Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-lime-400 via-cyan-400 via-purple-500 via-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-gradient">
                {t('contact.title')}
              </span>
            </h1>
            
            {/* Enhanced Subtitle with Better Spacing */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light px-4 leading-relaxed mb-8">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content - Enhanced User-Friendly Design */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-900 relative overflow-hidden">
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
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Multiple Ways to Reach Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Choose Your Preferred Method
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We're here to help! Reach out through the form, give us a call, or visit our location.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Enhanced Contact Form */}
              <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-lime-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">
                      {t('contact.sendMessage')}
                    </h2>
                    <p className="text-gray-400 mt-1">Fill out the form below and we'll get back to you within 24 hours</p>
                  </div>
                </div>

                {success && (
                  <div className="mb-6 p-4 bg-green-500/20 border-l-4 border-green-500 text-green-400 rounded-lg backdrop-blur-sm">
                    <p className="font-medium">{t('contact.successTitle')}</p>
                    <p className="text-sm">{t('contact.successMessage')}</p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border-l-4 border-red-500 text-red-400 rounded-lg backdrop-blur-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                        <svg className="w-4 h-4 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {t('contact.form.name')} <span className="text-lime-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-700/50 border-2 border-gray-600/50 text-white rounded-2xl transition-all duration-300 hover:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none placeholder-gray-400 group-hover:bg-gray-700/70"
                        placeholder={t('contact.form.namePlaceholder')}
                      />
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {t('contact.form.email')} <span className="text-lime-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-700/50 border-2 border-gray-600/50 text-white rounded-2xl transition-all duration-300 hover:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none placeholder-gray-400 group-hover:bg-gray-700/70"
                        placeholder={t('contact.form.emailPlaceholder')}
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {t('contact.form.phone')} <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-700/50 border-2 border-gray-600/50 text-white rounded-2xl transition-all duration-300 hover:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none placeholder-gray-400 group-hover:bg-gray-700/70"
                      placeholder={t('contact.form.phonePlaceholder')}
                    />
                  </div>

                  {/* Message Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                      <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {t('contact.form.message')} <span className="text-lime-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-5 py-4 bg-gray-700/50 border-2 border-gray-600/50 text-white rounded-2xl transition-all duration-300 hover:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none resize-none placeholder-gray-400 group-hover:bg-gray-700/70"
                      placeholder={t('contact.form.messagePlaceholder')}
                    />
                    <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Please provide as much detail as possible to help us assist you better
                    </div>
                  </div>

                  {/* Enhanced Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 text-black font-bold py-5 px-8 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                    >
                      {/* Button Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-lime-500 via-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <span className="relative flex items-center justify-center gap-3 text-lg">
                        {loading ? (
                          <>
                            <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('contact.form.sending')}
                          </>
                        ) : (
                          <>
                            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            {t('contact.form.send')}
                          </>
                        )}
                      </span>
                    </button>
                    
                    {/* Privacy Notice */}
                    <p className="mt-4 text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Your information is secure and will never be shared with third parties
                    </p>
                  </div>
                </form>
              </div>

              {/* Enhanced Contact Information Sidebar */}
              <div className="space-y-8">
                {/* Quick Contact Card */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {t('contact.contactInformation')}
                      </h2>
                      <p className="text-gray-400 mt-1">Get in touch instantly</p>
                    </div>
                  </div>

                  {/* Enhanced Contact Methods */}
                  <div className="space-y-6">
                    {/* Address Card */}
                    <a 
                      href="https://maps.app.goo.gl/DtK8VgogLo1PhkU78"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group p-6 bg-gradient-to-r from-lime-400/10 to-lime-400/5 border border-lime-400/20 rounded-2xl hover:from-lime-400/20 hover:to-lime-400/10 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-lime-400/20 border border-lime-400/30 rounded-2xl flex items-center justify-center group-hover:bg-lime-400/30 group-hover:scale-110 transition-all duration-300">
                          <svg className="w-7 h-7 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
                            {t('contact.info.address')}
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            {t('contact.info.addressLine1')}
                            <br />
                            {t('contact.info.addressLine2')}
                          </p>
                          <div className="mt-3 text-sm text-lime-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to view on map ↗
                          </div>
                        </div>
                      </div>
                    </a>

                    {/* Email Card */}
                    <div className="group p-6 bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 border border-cyan-400/20 rounded-2xl hover:from-cyan-400/20 hover:to-cyan-400/10 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-cyan-400/20 border border-cyan-400/30 rounded-2xl flex items-center justify-center group-hover:bg-cyan-400/30 group-hover:scale-110 transition-all duration-300">
                          <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                            {t('contact.info.email')}
                          </h3>
                          <a
                            href="mailto:info@leadership.com"
                            className="text-gray-300 hover:text-cyan-400 transition-colors text-lg font-medium"
                          >
                            info@leadership.com
                          </a>
                          <div className="mt-2 text-sm text-gray-400">
                            We typically respond within 2-4 hours
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phone Card */}
                    <div className="group p-6 bg-gradient-to-r from-purple-400/10 to-purple-400/5 border border-purple-400/20 rounded-2xl hover:from-purple-400/20 hover:to-purple-400/10 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-purple-400/20 border border-purple-400/30 rounded-2xl flex items-center justify-center group-hover:bg-purple-400/30 group-hover:scale-110 transition-all duration-300">
                          <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                            {t('contact.info.phone')}
                          </h3>
                          <a
                            href="tel:+95123456789"
                            className="text-gray-300 hover:text-purple-400 transition-colors text-lg font-medium"
                          >
                            +95 123 456 789
                          </a>
                          <div className="mt-2 text-sm text-gray-400">
                            Available Mon-Fri, 9AM-6PM (GMT+6:30)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                {/* Social Media Links */}
                <div className="mt-8 pt-8 border-t border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {t('contact.followUs')}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400 hover:from-blue-500/40 hover:to-blue-600/40 transition-all transform hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-cyan-500/20 border border-cyan-400/30 rounded-xl flex items-center justify-center text-cyan-400 hover:from-cyan-400/40 hover:to-cyan-500/40 transition-all transform hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-red-500/20 border border-pink-500/30 rounded-xl flex items-center justify-center text-pink-400 hover:from-pink-500/40 hover:to-red-500/40 transition-all transform hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400 hover:from-purple-500/40 hover:to-blue-600/40 transition-all transform hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
