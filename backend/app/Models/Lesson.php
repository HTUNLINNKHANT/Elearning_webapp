<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'curriculum_id',
        'title',
        'title_my',
        'title_ja',
        'content',
        'content_my',
        'content_ja',
        'type',
        'video_url',
        'duration_minutes',
        'order',
        'is_free',
    ];

    protected $casts = [
        'is_free' => 'boolean',
    ];

    public function curriculum()
    {
        return $this->belongsTo(Curriculum::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'lesson_user')
            ->withPivot('completed', 'completed_at')
            ->withTimestamps();
    }

    public function materials()
    {
        return $this->hasMany(CourseMaterial::class)->orderBy('order');
    }
}
