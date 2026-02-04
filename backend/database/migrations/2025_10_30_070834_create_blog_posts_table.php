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
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('title_my')->nullable();
            $table->string('slug')->unique();
            $table->text('short_description');
            $table->text('short_description_my')->nullable();
            $table->longText('content');
            $table->longText('content_my')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('author');
            $table->string('author_my')->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
