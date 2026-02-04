<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'instructor_id',
        'title',
        'title_my',
        'title_ja',
        'slug',
        'description',
        'description_my',
        'description_ja',
        'duration_weeks',
        'total_lessons',
        'enrolled_count',
        'price',
        'image',
        'thumbnail',
        'is_active',
    ];

    protected $casts = [
        'price' => 'integer',
        'is_active' => 'boolean',
    ];

    protected $with = ['category', 'instructor'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }

    public function curriculums()
    {
        return $this->hasMany(Curriculum::class)->orderBy('order');
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'course_user')
            ->withPivot('enrolled_at', 'completed_at', 'progress')
            ->withTimestamps();
    }

    /**
     * Boot the model and auto-generate slug
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($course) {
            if (empty($course->slug)) {
                $course->slug = static::generateUniqueSlug($course->title);
            }
        });

        static::updating(function ($course) {
            if ($course->isDirty('title') && empty($course->slug)) {
                $course->slug = static::generateUniqueSlug($course->title);
            }
        });
    }

    /**
     * Generate a unique slug
     */
    protected static function generateUniqueSlug($title)
    {
        $slug = \Illuminate\Support\Str::slug($title);
        $originalSlug = $slug;
        $count = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }

    /**
     * Get route key name for route model binding
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
