<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Catalogue extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'file_path',
        'file_size',
        'pages',
        'format',
        'downloads_count',
        'sort_order',
        'is_active',
        'description',
        'cover_image',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'downloads_count' => 'integer',
        'sort_order' => 'integer',
    ];

    protected $appends = [
        'file_url',
        'cover_image_url',
    ];

    public function getFileUrlAttribute(): string
    {
        if (empty($this->file_path)) {
            return '';
        }

        if (str_starts_with($this->file_path, 'http://') || str_starts_with($this->file_path, 'https://') || str_starts_with($this->file_path, '/')) {
            return $this->file_path;
        }

        return '/' . ltrim($this->file_path, '/');
    }

    public function getCoverImageUrlAttribute(): string
    {
        if (empty($this->cover_image)) {
            return '';
        }

        if (str_starts_with($this->cover_image, 'http://') || str_starts_with($this->cover_image, 'https://') || str_starts_with($this->cover_image, '/')) {
            return $this->cover_image;
        }

        // If it's an Unsplash photo ID
        return "https://images.unsplash.com/photo-{$this->cover_image}?auto=format&fit=crop&w=800&q=80";
    }
}
