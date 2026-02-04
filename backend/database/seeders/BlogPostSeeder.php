<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        BlogPost::create([
            'title' => 'Welcome to Our Leadership Blog',
            'title_my' => 'ကျွန်ုပ်တို့၏ ခေါင်းဆောင်မှု ဘလော့ဂ်သို့ ကြိုဆိုပါသည်',
            'title_ja' => 'リーダーシップブログへようこそ',
            'slug' => 'welcome-to-our-leadership-blog',
            'short_description' => 'Discover insights and strategies for effective leadership in the modern workplace.',
            'short_description_my' => 'ခေတ်သစ် လုပ်ငန်းခွင်တွင် ထိရောက်သော ခေါင်းဆောင်မှုအတွက် ထိုးထွင်းသိမြင်မှုများနှင့် မဟာဗျူဟာများကို ရှာဖွေပါ။',
            'short_description_ja' => '現代の職場における効果的なリーダーシップのための洞察と戦略を発見してください。',
            'content' => "Leadership is not just about managing people; it's about inspiring them to achieve their full potential. In today's rapidly changing business environment, effective leadership requires a combination of emotional intelligence, strategic thinking, and adaptability.\n\nKey principles of modern leadership include:\n\n1. Empathy and Understanding: Great leaders understand their team members' perspectives and challenges.\n\n2. Clear Communication: Articulating vision and expectations clearly helps align the team.\n\n3. Continuous Learning: The best leaders are always learning and growing.\n\n4. Empowerment: Giving team members autonomy and trust leads to better outcomes.\n\n5. Resilience: Leaders must navigate challenges with grace and determination.\n\nBy focusing on these principles, you can develop into a more effective leader and create a positive impact in your organization.",
            'content_my' => "ခေါင်းဆောင်မှုဆိုသည်မှာ လူများကို စီမံခန့်ခွဲခြင်းသာမက ၎င်းတို့၏ အပြည့်အဝ အလားအလာကို အောင်မြင်စေရန် လှုံ့ဆော်ပေးခြင်းဖြစ်သည်။ ယနေ့ခေတ် လျင်မြန်စွာ ပြောင်းလဲနေသော စီးပွားရေးပတ်ဝန်းကျင်တွင် ထိရောက်သော ခေါင်းဆောင်မှုသည် စိတ်ခံစားမှု ဉာဏ်ရည်၊ မဟာဗျူဟာ တွေးခေါ်မှုနှင့် လိုက်လျောညီထွေဖြစ်မှု ပေါင်းစပ်မှု လိုအပ်သည်။\n\nခေတ်သစ် ခေါင်းဆောင်မှု၏ အဓိက အခြေခံမူများမှာ:\n\n၁။ စာနာမှုနှင့် နားလည်မှု: ကြီးမြတ်သော ခေါင်းဆောင်များသည် ၎င်းတို့၏ အဖွဲ့ဝင်များ၏ အမြင်များနှင့် စိန်ခေါ်မှုများကို နားလည်သည်။\n\n၂။ ရှင်းလင်းသော ဆက်သွယ်မှု: အမြင်နှင့် မျှော်လင့်ချက်များကို ရှင်းလင်းစွာ ဖော်ပြခြင်းသည် အဖွဲ့ကို ညှိနှိုင်းရန် ကူညီသည်။\n\n၃။ စဉ်ဆက်မပြတ် သင်ယူမှု: အကောင်းဆုံး ခေါင်းဆောင်များသည် အမြဲတမ်း သင်ယူပြီး ကြီးထွားနေသည်။\n\n၄။ စွမ်းဆောင်ရည် မြှင့်တင်ပေးခြင်း: အဖွဲ့ဝင်များကို ကိုယ်ပိုင်အုပ်ချုပ်ခွင့်နှင့် ယုံကြည်မှု ပေးခြင်းသည် ပိုမိုကောင်းမွန်သော ရလဒ်များကို ဖြစ်ပေါ်စေသည်။\n\n၅။ ခံနိုင်ရည်: ခေါင်းဆောင်များသည် စိန်ခေါ်မှုများကို ကျေးဇူးတင်မှုနှင့် ဆုံးဖြတ်ချက်ဖြင့် ရှာဖွေရမည်။\n\nဤအခြေခံမူများကို အာရုံစိုက်ခြင်းဖြင့် သင်သည် ပိုမိုထိရောက်သော ခေါင်းဆောင်တစ်ဦးအဖြစ် ဖွံ့ဖြိုးနိုင်ပြီး သင့်အဖွဲ့အစည်းတွင် အပြုသဘောဆောင်သော သက်ရောက်မှုကို ဖန်တီးနိုင်သည်။",
            'content_ja' => "リーダーシップとは、単に人々を管理することではなく、彼らが最大限の可能性を発揮できるよう鼓舞することです。今日の急速に変化するビジネス環境において、効果的なリーダーシップには、感情的知性、戦略的思考、適応性の組み合わせが必要です。\n\n現代のリーダーシップの主要な原則には以下が含まれます：\n\n1. 共感と理解：優れたリーダーは、チームメンバーの視点と課題を理解します。\n\n2. 明確なコミュニケーション：ビジョンと期待を明確に表現することで、チームの方向性を揃えることができます。\n\n3. 継続的な学習：最高のリーダーは常に学び、成長しています。\n\n4. エンパワーメント：チームメンバーに自律性と信頼を与えることで、より良い結果につながります。\n\n5. レジリエンス：リーダーは、優雅さと決意を持って課題に対処しなければなりません。\n\nこれらの原則に焦点を当てることで、より効果的なリーダーに成長し、組織にポジティブな影響を与えることができます。",
            'author' => 'Leadership Team',
            'author_my' => 'ခေါင်းဆောင်မှု အဖွဲ့',
            'author_ja' => 'リーダーシップチーム',
            'is_published' => true,
            'published_at' => now(),
        ]);

        BlogPost::create([
            'title' => '5 Essential Skills for Future Leaders',
            'title_my' => 'အနာဂတ် ခေါင်းဆောင်များအတွက် မရှိမဖြစ် ကျွမ်းကျင်မှု ၅ ခု',
            'title_ja' => '未来のリーダーに必要な5つのスキル',
            'slug' => '5-essential-skills-for-future-leaders',
            'short_description' => 'Learn the critical skills that will define successful leadership in the coming decade.',
            'short_description_my' => 'လာမည့် ဆယ်စုနှစ်တွင် အောင်မြင်သော ခေါင်းဆောင်မှုကို သတ်မှတ်မည့် အရေးကြီးသော ကျွမ်းကျင်မှုများကို လေ့လာပါ။',
            'short_description_ja' => '今後10年間で成功するリーダーシップを定義する重要なスキルを学びましょう。',
            'content' => "As we move into an increasingly digital and interconnected world, the skills required for effective leadership are evolving. Here are five essential skills that future leaders must develop:\n\n1. Digital Literacy: Understanding technology and its impact on business is no longer optional.\n\n2. Emotional Intelligence: The ability to understand and manage emotions becomes more critical as teams become more diverse.\n\n3. Adaptability: Change is the only constant, and leaders must be comfortable with ambiguity.\n\n4. Cross-Cultural Competence: Global teams require leaders who can navigate different cultural contexts.\n\n5. Systems Thinking: Understanding how different parts of an organization interconnect is crucial for strategic decision-making.\n\nDeveloping these skills will prepare you for the challenges and opportunities of tomorrow's leadership landscape.",
            'content_my' => "ကျွန်ုပ်တို့သည် ပို၍ ဒစ်ဂျစ်တယ်နှင့် ချိတ်ဆက်ထားသော ကမ္ဘာသို့ ဝင်ရောက်လာသည်နှင့်အမျှ ထိရောက်သော ခေါင်းဆောင်မှုအတွက် လိုအပ်သော ကျွမ်းကျင်မှုများသည် ပြောင်းလဲနေသည်။ အနာဂတ် ခေါင်းဆောင်များ ဖွံ့ဖြိုးရမည့် မရှိမဖြစ် ကျွမ်းကျင်မှု ငါးခုမှာ:\n\n၁။ ဒစ်ဂျစ်တယ် စာတတ်မြောက်မှု: နည်းပညာနှင့် စီးပွားရေးအပေါ် ၎င်း၏ သက်ရောက်မှုကို နားလည်ခြင်းသည် ရွေးချယ်စရာ မဟုတ်တော့ပါ။\n\n၂။ စိတ်ခံစားမှု ဉာဏ်ရည်: အဖွဲ့များ ပိုမို ကွဲပြားလာသည်နှင့်အမျှ စိတ်ခံစားမှုများကို နားလည်ပြီး စီမံခန့်ခွဲနိုင်မှုသည် ပို၍ အရေးကြီးလာသည်။\n\n၃။ လိုက်လျောညီထွေဖြစ်မှု: ပြောင်းလဲမှုသည် တစ်ခုတည်းသော အမြဲတမ်းဖြစ်ပြီး ခေါင်းဆောင်များသည် မရေရာမှုနှင့် သက်တောင့်သက်သာ ရှိရမည်။\n\n၄။ ယဉ်ကျေးမှု ဖြတ်ကျော် ကျွမ်းကျင်မှု: ကမ္ဘာလုံးဆိုင်ရာ အဖွဲ့များသည် မတူညီသော ယဉ်ကျေးမှု အခြေအနေများကို ရှာဖွေနိုင်သော ခေါင်းဆောင်များ လိုအပ်သည်။\n\n၅။ စနစ်များ တွေးခေါ်မှု: အဖွဲ့အစည်း၏ မတူညီသော အစိတ်အပိုင်းများ မည်သို့ ချိတ်ဆက်သည်ကို နားလည်ခြင်းသည် မဟာဗျူဟာ ဆုံးဖြတ်ချက်ချရန် အရေးကြီးသည်။\n\nဤကျွမ်းကျင်မှုများကို ဖွံ့ဖြိုးခြင်းသည် မနက်ဖြန်၏ ခေါင်းဆောင်မှု ရှုခင်း၏ စိန်ခေါ်မှုများနှင့် အခွင့်အလမ်းများအတွက် သင့်ကို ပြင်ဆင်ပေးလိမ့်မည်။",
            'content_ja' => "ますますデジタル化され、相互接続された世界に移行するにつれて、効果的なリーダーシップに必要なスキルは進化しています。未来のリーダーが開発しなければならない5つの必須スキルは次のとおりです：\n\n1. デジタルリテラシー：テクノロジーとそのビジネスへの影響を理解することは、もはやオプションではありません。\n\n2. 感情的知性：チームがより多様化するにつれて、感情を理解し管理する能力がより重要になります。\n\n3. 適応性：変化は唯一の定数であり、リーダーは曖昧さに慣れている必要があります。\n\n4. 異文化能力：グローバルチームには、異なる文化的文脈をナビゲートできるリーダーが必要です。\n\n5. システム思考：組織のさまざまな部分がどのように相互接続しているかを理解することは、戦略的意思決定に不可欠です。\n\nこれらのスキルを開発することで、明日のリーダーシップの課題と機会に備えることができます。",
            'author' => 'Dr. Sarah Johnson',
            'author_my' => 'ဒေါက်တာ စာရာ ဂျွန်ဆင်',
            'author_ja' => 'サラ・ジョンソン博士',
            'is_published' => true,
            'published_at' => now()->subDays(3),
        ]);
    }
}
