# 🎓 E-Learning Platform

A modern, full-stack e-learning platform built with Laravel and React, featuring course management, student enrollment, progress tracking, and multi-language support.

![Platform Preview](https://via.placeholder.com/800x400/1f2937/ffffff?text=E-Learning+Platform)

## ✨ Features

### 🎯 Core Features
- **Course Management** - Create, edit, and organize courses with rich content
- **Student Enrollment** - Easy registration and course enrollment system
- **Progress Tracking** - Real-time learning progress monitoring
- **Multi-language Support** - English, Myanmar, and Japanese localization
- **Responsive Design** - Mobile-first design with modern UI/UX
- **Admin Dashboard** - Comprehensive admin panel for platform management

### 🔐 Authentication & Security
- **JWT Authentication** - Secure token-based authentication
- **Role-based Access** - Admin and student role management
- **OAuth Integration** - Google and Facebook login support
- **Password Reset** - Secure password recovery system

### 🎨 Modern UI/UX
- **Dark Theme** - Modern dark theme with vibrant gradients
- **Glass Morphism** - Contemporary glass-effect design elements
- **Animations** - Smooth transitions and micro-interactions
- **SEO Optimized** - Meta tags, structured data, and sitemap

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 12.x
- **Database**: PostgreSQL
- **Authentication**: Laravel Sanctum
- **API**: RESTful API architecture
- **PHP**: 8.2+

### Frontend
- **Framework**: React 19.x
- **Build Tool**: Vite (Rolldown)
- **Styling**: Tailwind CSS 4.x
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Internationalization**: i18next
- **SEO**: React Helmet Async

## 🚀 Quick Start

### Prerequisites
- PHP 8.2+
- Node.js 18+
- PostgreSQL
- Composer
- npm/yarn

### 1. Clone Repository
```bash
git clone 
cd Elearning_webapp
```

### 2. Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

**Configure Database:**
Update `.env` with your PostgreSQL credentials:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=elearning_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

**Run Migrations:**
```bash
php artisan migrate --seed
php artisan serve
```
Backend runs on: `http://localhost:8000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev
```
Frontend runs on: `http://localhost:5173`

## 📱 Default Credentials

**Admin Account:**
- Email: `admin@elearning.com`
- Password: `password`

**Student Account:**
- Email: `student@example.com`
- Password: `password`

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/register          # Register new user
POST /api/login             # User login
POST /api/logout            # User logout
POST /api/password/email    # Request password reset
POST /api/password/reset    # Reset password
```

### Course Endpoints
```
GET    /api/courses         # List all courses
GET    /api/courses/{id}    # Get course details
POST   /api/courses         # Create course (Admin)
PUT    /api/courses/{id}    # Update course (Admin)
DELETE /api/courses/{id}    # Delete course (Admin)
```

### Enrollment Endpoints
```
POST /api/enrollments              # Enroll in course
GET  /api/my-enrollments          # User's enrolled courses
PUT  /api/enrollments/{id}/progress # Update progress
GET  /api/admin/enrollments       # All enrollments (Admin)
```

## 🏗️ Project Structure

```
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   ├── Models/
│   │   └── Notifications/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/api.php
├── frontend/               # React SPA
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── i18n/          # Internationalization
│   │   └── utils/         # Utility functions
│   └── public/
└── README.md
```

## 🌍 Internationalization

The platform supports multiple languages:
- **English** (en) - Default
- **Myanmar** (my) - မြန်မာ

Translation files are located in `frontend/src/i18n/locales/`.

## 🎨 Design System

### Color Palette
- **Primary**: Lime (#84cc16) to Cyan (#06b6d4)
- **Secondary**: Purple (#8b5cf6) to Pink (#ec4899)
- **Accent**: Orange (#f97316) to Yellow (#eab308)
- **Background**: Black (#000000) with glass morphism
- **Text**: White (#ffffff) with gray variants

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable fonts
- **UI Elements**: Medium weight for clarity

## 🚀 Deployment

### Backend Deployment
1. Set `APP_ENV=production` in `.env`
2. Configure production database
3. Run `php artisan config:cache`
4. Deploy to your server (DigitalOcean, AWS, etc.)

### Frontend Deployment
1. Build for production: `npm run build`
2. Deploy to Vercel, Netlify, or static hosting
3. Update `VITE_API_URL` for production API

### Environment Variables
Ensure all sensitive data is in `.env` files and not committed to git.

## 🧪 Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

### Development Guidelines
- Follow PSR-12 coding standards for PHP
- Use ESLint and Prettier for JavaScript
- Write tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Htun Linn Khant**
- GitHub: [@HTUNLINNKHANT](https://github.com/HTUNLINNKHANT)
- Email: htunlynnkhant.mixz@gmail.com

## 🙏 Acknowledgments

- Laravel community for the amazing framework
- React team for the powerful frontend library
- Tailwind CSS for the utility-first CSS framework
- All contributors and testers

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/HTUNLINNKHANT/Elearning_webapp/issues) page
2. Create a new issue if your problem isn't already reported

---

⭐ **Star this repository if you find it helpful!**