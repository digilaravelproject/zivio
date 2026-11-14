<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('catalogues', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category'); // e.g. 'Full Range', 'Outdoor', 'Indoor', 'Technical', 'Company Profile'
            $table->string('file_path');
            $table->string('file_size'); // e.g. '48.2 MB'
            $table->string('pages')->nullable(); // e.g. '284 pages'
            $table->string('format')->default('PDF');
            $table->unsignedInteger('downloads_count')->default(0);
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catalogues');
    }
};
