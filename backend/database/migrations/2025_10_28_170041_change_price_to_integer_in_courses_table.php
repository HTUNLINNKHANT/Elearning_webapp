<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, round all existing prices to integers
        DB::statement('UPDATE courses SET price = ROUND(price)');

        // Then change the column type to integer
        Schema::table('courses', function (Blueprint $table) {
            $table->integer('price')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            // Revert back to decimal
            $table->decimal('price', 10, 2)->change();
        });
    }
};
