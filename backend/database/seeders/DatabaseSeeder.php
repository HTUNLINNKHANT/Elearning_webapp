<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@artoflwin.com'],
            [
                'name' => 'ART OF LWIN Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Create sample student
        $student = User::firstOrCreate(
            ['email' => 'student@example.com'],
            [
                'name' => 'Student Demo',
                'password' => Hash::make('password'),
                'role' => 'student',
            ]
        );

        // Create sample courses (updated for ART OF LWIN Creative Academy)
        $course1 = Course::create([
            'title' => 'Graphic Design Fundamentals',
            'title_my' => 'ဂရပ်ဖစ်ဒီဇိုင်း အခြေခံများ',
            'description' => 'Perfect for absolute beginners. Learn design principles, color theory, typography, and essential design tools.',
            'description_my' => 'လုံးဝ အခြေခံမှ စတင်သူများအတွက် ပြီးပြည့်စုံပါသည်။ ဒီဇိုင်း နိယာမများ၊ အရောင်သီအိုရီ၊ စာလုံးပုံစံနှင့် မရှိမဖြစ် ဒီဇိုင်း ကိရိယာများကို သင်ယူပါ။',
            'duration_weeks' => 8,
            'price' => 9900, // in cents
            'total_lessons' => 0,
            'is_active' => true,
        ]);

        $course2 = Course::create([
            'title' => 'Advanced Design Techniques',
            'title_my' => 'အဆင့်မြင့် ဒီဇိုင်း နည်းပညာများ',
            'description' => 'Advance your skills with complex layouts, branding, illustration, and professional design workflows.',
            'description_my' => 'ရှုပ်ထွေးသော လေးအောက်များ၊ အမှတ်တံဆိပ်ဖန်တီးခြင်း၊ ပုံဖော်ခြင်းနှင့် ပရော်ဖက်ရှင်နယ် ဒီဇိုင်း လုပ်ငန်းစဉ်များဖြင့် သင့်ကျွမ်းကျင်မှုကို မြှင့်တင်ပါ။',
            'duration_weeks' => 12,
            'price' => 14900,
            'total_lessons' => 0,
            'is_active' => true,
        ]);

        $course3 = Course::create([
            'title' => 'Master Designer Course',
            'title_my' => 'မာစတာ ဒီဇိုင်နာ သင်တန်း',
            'description' => 'Master advanced design with motion graphics, UI/UX design, and portfolio development for professional work.',
            'description_my' => 'လှုပ်ရှားမှု ဂရပ်ဖစ်များ၊ UI/UX ဒီဇိုင်းနှင့် ပရော်ဖက်ရှင်နယ် အလုပ်အတွက် ပေါ့ဖိုလီယို ဖွံ့ဖြိုးတိုးတက်မှုဖြင့် အဆင့်မြင့် ဒီဇိုင်းကို ကျွမ်းကျင်အောင် လုပ်ပါ။',
            'duration_weeks' => 16,
            'price' => 19900,
            'total_lessons' => 0,
            'is_active' => true,
        ]);

        $course4 = Course::create([
            'title' => 'Brand Identity Design',
            'title_my' => 'အမှတ်တံဆိပ် အထောက်အထား ဒီဇိုင်း',
            'description' => 'Learn professional branding and identity design, including logo creation, brand guidelines, and visual systems.',
            'description_my' => 'လိုဂို ဖန်တီးခြင်း၊ အမှတ်တံဆိပ် လမ်းညွှန်ချက်များနှင့် မြင်ကွင်း စနစ်များ အပါအဝင် ပရော်ဖက်ရှင်နယ် အမှတ်တံဆိပ်နှင့် အထောက်အထား ဒီဇိုင်းကို သင်ယူပါ။',
            'duration_weeks' => 10,
            'price' => 12900,
            'total_lessons' => 0,
            'is_active' => true,
        ]);

        // Enroll student in the first course
        $student->courses()->attach($course1->id, [
            'enrolled_at' => now(),
            'progress' => 0,
        ]);
    }
}
