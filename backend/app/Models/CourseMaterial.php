<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CourseMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson_id',
        'title',
        'title_my',
        'title_ja',
        'description',
        'description_my',
        'description_ja',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'download_count',
        'order',
    ];

    protected $casts = [
        'file_size' => 'integer',
        'download_count' => 'integer',
        'order' => 'integer',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function getFileSizeFormattedAttribute()
    {
        $bytes = $this->file_size;
        if ($bytes >= 1073741824) {
            return number_format($bytes / 1073741824, 2) . ' GB';
        } elseif ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        } else {
            return $bytes . ' bytes';
        }
    }

    public function getDownloadUrlAttribute()
    {
        return Storage::url($this->file_path);
    }

    public function incrementDownloadCount()
    {
        $this->increment('download_count');
    }
}
