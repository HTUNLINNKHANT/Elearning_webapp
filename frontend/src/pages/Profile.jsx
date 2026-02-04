import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useToast } from '../contexts/ToastContext';
import api from '../lib/axios';

export default function Profile() {
  const { user, updateUser } = useAuth();
  
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      });
      
      if (user.avatar) {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const baseUrl = apiUrl.replace('/api', '');
        setAvatarPreview(baseUrl + user.avatar);
      }
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      
      Object.keys(formData).forEach((key) => {
        if (formData[key] && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      if (avatarFile) {
        submitData.append('avatar', avatarFile);
      }

      const response = await api.post('/profile', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      updateUser(response.data);
      showSuccess('Profile updated successfully! 🎉');
      
      // Clear password fields
      setFormData({
        ...formData,
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      showError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-8 px-4">
      {/* Dotted Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '25px 25px'
          }}
        ></div>
      </div>

      {/* Vibrant gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/20 via-cyan-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/20 via-orange-500/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400/15 via-orange-500/15 to-red-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with modern gradient design */}
        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-t-3xl p-8 overflow-hidden border border-gray-700/50">
          {/* Animated gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 via-cyan-400/10 via-purple-500/10 to-pink-500/10 rounded-t-3xl"></div>
          
          {/* Floating gradient elements */}
          <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-lime-400/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-lg"></div>
          
          <div className="relative z-10 flex items-center gap-6">
            <div className="relative group">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-lime-400/50 shadow-xl shadow-lime-400/20"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-lime-400 via-cyan-400 to-purple-500 flex items-center justify-center border-4 border-lime-400/50 shadow-xl shadow-lime-400/20">
                  <span className="text-3xl font-bold text-black">
                    {getInitials(user?.name)}
                  </span>
                </div>
              )}
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <svg className="w-8 h-8 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-lime-400/20 border border-lime-400/30 rounded-full px-4 py-1 text-xs font-medium text-lime-400 mb-2">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                <span>Your Profile</span>
              </div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {user?.name}
              </h1>
              <p className="text-gray-300 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-b-3xl shadow-2xl p-8 border-x border-b border-gray-700/50">

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-lime-400 via-cyan-400 to-purple-500 rounded-full"></div>
                <span className="bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">
                  Personal Information
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <svg className="w-4 h-4 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700/50 text-white rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all hover:border-gray-600"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700/50 text-white rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all hover:border-gray-600"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700/50 text-white rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all hover:border-gray-600"
                    placeholder="+95 9 123 456 789"
                  />
                </div>
              </div>

              <div className="mt-6 group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                  <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows="4"
                  maxLength="500"
                  className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700/50 text-white rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none hover:border-gray-600"
                  placeholder="Tell us about yourself..."
                />
                <p className="mt-2 text-xs text-gray-400 text-right">
                  {formData.bio?.length || 0}/500 characters
                </p>
              </div>
            </div>

            {/* Change Password Section */}
            <div className="pt-6 border-t-2 border-gray-800/50">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 rounded-full"></div>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Change Password
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={formData.current_password}
                    onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700/50 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all hover:border-gray-600"
                    placeholder="••••••••"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    New Password
                  </label>
                  <input
                    type="password"
                    value={formData.new_password}
                    onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700/50 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all hover:border-gray-600"
                    placeholder="••••••••"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.new_password_confirmation}
                    onChange={(e) => setFormData({ ...formData, new_password_confirmation: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700/50 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all hover:border-gray-600"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Leave password fields empty if you don't want to change your password
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className="group relative px-8 py-4 bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 text-black font-bold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/40 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-lime-500 via-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
