# Backend - Japanese Language School Platform API

Laravel-based REST API for the Japanese Language School Platform.

## Tech Stack

- **Framework**: Laravel 12.x
- **Database**: PostgreSQL
- **Authentication**: Laravel Sanctum
- **PHP Version**: 8.2+

## Prerequisites

- PHP 8.2 or higher
- Composer
- PostgreSQL database

## Installation

1. Install dependencies:
```bash
composer install
```

2. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

3. Update `.env` with your PostgreSQL database credentials:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

4. Run migrations and seeders:
```bash
php artisan migrate
php artisan db:seed
```

5. Start the development server:
```bash
php artisan serve
```

API will be available at: `http://localhost:8000`

## Database Setup

Make sure PostgreSQL is installed and running on your system. Create a database for the application before running migrations.

## Default Credentials

**Admin Account:**
- Email: admin@japanese-school.com
- Password: password

**Student Account:**
- Email: student@example.com
- Password: password

## API Documentation

### Public Endpoints

#### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/password/email` - Request password reset
- `POST /api/password/reset` - Reset password

#### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/{id}` - Get course details

### Protected Endpoints (Requires Authentication)

#### User
- `POST /api/logout` - Logout user
- `GET /api/me` - Get current user profile

#### Enrollments
- `POST /api/enrollments` - Enroll in a course
- `GET /api/my-enrollments` - Get user's enrolled courses
- `PUT /api/enrollments/{id}/progress` - Update course progress

### Admin Endpoints (Admin Role Required)

#### Course Management
- `POST /api/courses` - Create new course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course

#### Enrollment Management
- `GET /api/admin/enrollments` - List all enrollments

## Project Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/          # API controllers
│   └── Middleware/       # Custom middleware
├── Models/               # Eloquent models
└── Notifications/        # Email notifications

database/
├── migrations/           # Database migrations
└── seeders/             # Database seeders

routes/
└── api.php              # API routes
```

## Testing

Run tests with:
```bash
php artisan test
```

## Common Commands

```bash
# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Run migrations
php artisan migrate
php artisan migrate:fresh --seed

# Create new controller
php artisan make:controller Api/YourController

# Create new model
php artisan make:model YourModel -m
```

## CORS Configuration

CORS is configured in `config/cors.php`. Update allowed origins for production deployment.

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL credentials in `.env`
- Ensure PostgreSQL service is running
- Check database exists: `psql -U postgres -l`

### Authentication Issues
- Clear config cache: `php artisan config:clear`
- Regenerate app key: `php artisan key:generate`


