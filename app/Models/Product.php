<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'image',
        'gallery',
        'short_description',
        'description',
        'specs',
        'technical_specs',
        'applications',
        'brochure_file',
        'ies_file',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'gallery' => 'array',
        'specs' => 'array',
        'technical_specs' => 'array',
        'applications' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(ContactInquiry::class);
    }
}
