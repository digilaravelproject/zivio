<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'headline',
        'sub',
        'location',
        'type',
        'image',
        'video',
        'poster',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'headline' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
