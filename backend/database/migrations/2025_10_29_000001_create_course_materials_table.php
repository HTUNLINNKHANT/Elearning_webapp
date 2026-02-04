<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('course_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained('lessons')->onDelete('cascade');
            $table->string('title');
            $table->string('title_my')->nullable();
            $table->text('description')->nullable();
            $table->text('description_my')->nullable();
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type'); // pdf, doc, zip, etc.
            $table->integer('file_size'); // in bytes
            $table->integer('download_count')->default(0);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_materials');
    }
};
