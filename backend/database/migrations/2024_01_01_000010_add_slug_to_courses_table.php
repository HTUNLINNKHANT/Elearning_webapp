<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('title');
        });

        // Generate slugs for existing courses
        $courses = DB::table('courses')->get();
        foreach ($courses as $course) {
            $slug = \Illuminate\Support\Str::slug($course->title);
            $originalSlug = $slug;
            $count = 1;

            // Ensure unique slug
            while (DB::table('courses')->where('slug', $slug)->where('id', '!=', $course->id)->exists()) {
                $slug = $originalSlug . '-' . $count;
                $count++;
            }

            DB::table('courses')->where('id', $course->id)->update(['slug' => $slug]);
        }

        // Make slug required after populating
        Schema::table('courses', function (Blueprint $table) {
            $table->string('slug')->unique()->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
