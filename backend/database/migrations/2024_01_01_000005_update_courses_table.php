<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->string('title_my')->nullable()->after('title');
            $table->text('description_my')->nullable()->after('description');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null')->after('id');
            $table->foreignId('instructor_id')->nullable()->constrained()->onDelete('set null')->after('category_id');
            $table->string('thumbnail')->nullable()->after('image');
            $table->integer('total_lessons')->default(0)->after('duration_weeks');
            $table->integer('enrolled_count')->default(0)->after('total_lessons');
        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropForeign(['instructor_id']);
            $table->dropColumn([
                'title_my', 'description_my',
                'category_id', 'instructor_id', 'thumbnail', 'total_lessons', 'enrolled_count'
            ]);
        });
    }
};
