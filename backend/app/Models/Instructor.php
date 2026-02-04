<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_my',
        'name_ja',
        'email',
        'bio',
        'bio_my',
        'bio_ja',
        'avatar',
        'expertise',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
