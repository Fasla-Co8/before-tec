import { StageInfo, VirtualAvatar, VirtualAudienceOption, AchievementBadge, SlideItem, StudentProfile, PracticeSession } from '../types';

export const ASSET_IMAGES = {
  hero: '/src/assets/images/hero_presentation_training_1790814887288.jpg',
  avatarCoach: '/src/assets/images/avatar_tutor_coach_1790814897237.jpg',
  audienceHall: '/src/assets/images/audience_hall_simulation_1790814907048.jpg',
  diagnostic: '/src/assets/images/student_diagnostic_test_1790814916267.jpg',
};

export const TRAINING_STAGES: StageInfo[] = [
  {
    id: 'voice',
    number: 1,
    title: 'المرحلة 1 — صوتك أولًا',
    subtitle: 'تسجيل صوتي بدون كاميرا لكسر حاجز البداية',
    tagline: 'صوتك أولًا 🎙️',
    description: 'سجّل شرحًا صوتيًا قصيرًا بدون كاميرا لتركز فقط على نبرتك، مخارج حروفك، وتدفق أفكارك دون تشتت بصري.',
    iconName: 'Mic',
    difficulty: 'مبتدئ',
    durationLabel: '60 - 90 ثانية',
    defaultDurationSec: 90,
    measuredMetrics: [
      'سرعة الكلام ومعدل الكلمات في الدقيقة',
      'عدد التوقفات والوقفات الصامتة',
      'مدة التحدث الفعالة',
      'الكلمات المتكررة ولزمات الحديث',
      'وضوح مخارج الحروف ونقاء الصوت',
      'مستوى الصوت واتزان النبرة'
    ],
    tips: [
      'تنفس بعمق من البطن قبل البدء',
      'لا تخف من الوقفات؛ الصمت الواعي أفضل من حشو الكلام بـ "آآآه"',
      'تحدث كأنك تشرح لزميل يجلس بجوارك'
    ]
  },
  {
    id: 'camera',
    number: 2,
    title: 'المرحلة 2 — أمام الكاميرا',
    subtitle: 'الآن حان وقت الظهور والتألف مع الشاشة',
    tagline: 'أمام الكاميرا 📹',
    description: 'الآن حان وقت الظهور. شغّل الكاميرا وسجّل شرحك لمدة 1 إلى 3 دقائق وتعرّف على تعبيرات وجهك وتواصلك.',
    iconName: 'Video',
    difficulty: 'متوسط',
    durationLabel: '1 - 3 دقائق',
    defaultDurationSec: 120,
    measuredMetrics: [
      'سرعة وتدفق الكلام',
      'وضوح الصوت والنبرة التفاعلية',
      'التواصل البصري مع عدسة الكاميرا',
      'تعبيرات الوجه وحيوية الملامح',
      'الثبات أمام الكاميرا وتجنب التململ',
      'التوقفات الطبيعية وتنسيق النفس',
      'لغة الجسد وحركة اليدين'
    ],
    tips: [
      'ضع عدسة الكاميرا في مستوى عينيك تمامًا',
      'انظر لعدسة الكاميرا مباشرة وليس لشاشتك فقط',
      'ابتسم ابتسامة طبيعية في بداية حديثك'
    ]
  },
  {
    id: 'avatar',
    number: 3,
    title: 'المرحلة 3 — أمام شخصية افتراضية',
    subtitle: 'تدرّب أمام مستمع افتراضي يتفاعل معك بلطف',
    tagline: 'أمام شخصية افتراضية 🤖',
    description: 'جرّب الشرح أمام جمهور افتراضي ذكي. اختر شخصية المستمع وتدرب على مخاطبتها ورؤية تفاعلها المباشر.',
    iconName: 'Bot',
    difficulty: 'متوسط',
    durationLabel: '2 - 4 دقائق',
    defaultDurationSec: 150,
    measuredMetrics: [
      'التواصل البصري المركز مع المستمع',
      'تفاعل النبرة وسرعة الاستجابة',
      'ثبات الحضور وتقليل التردد',
      'وضوح الفكرة وتسلسل الشرح',
      'إدارة الوقت المقترح للنقاط'
    ],
    tips: [
      'وجّه كلامك بالاسم للشخصية الافتراضية لخلق تفاعل حقيقي',
      'تابع إيماءات الرأس للتأكد من وصول فكرتك',
      'حافظ على نبرة نقاشية هادئة ومقنعة'
    ]
  },
  {
    id: 'audience',
    number: 4,
    title: 'المرحلة 4 — أمام مجموعة افتراضية',
    subtitle: 'دلوقتي الجمهور أكبر وأكثر تنوعًا',
    tagline: 'أمام مجموعة افتراضية 👥',
    description: 'دلوقتي الجمهور أكبر. اعرض محاكاة قاعة حقيقية تضم عدة مستمعين بمستويات تركيز وتفاعل واقعية.',
    iconName: 'Users',
    difficulty: 'متقدم',
    durationLabel: '3 - 5 دقائق',
    defaultDurationSec: 180,
    measuredMetrics: [
      'مستوى التوتر والقدرة على التماسك',
      'سرعة الكلام في المواقف المتعددة',
      'الثبات وتوزيع النظرات بين الحاضرين',
      'التواصل البصري الشامل للقاعة',
      'وضوح الشرح واستيعاب الجمهور'
    ],
    tips: [
      'وزّع نظرك في شكل حرف Z أو M عبر وجوه الحضور',
      'إذا شعرت بارتفاع نبضات قلبك، أبطئ سرعتك قليلًا',
      'تذكر أن الجميع هنا حريص على الاستفادة من علمك'
    ]
  },
  {
    id: 'presentation',
    number: 5,
    title: 'المرحلة 5 — العرض الحقيقي',
    subtitle: 'محاكاة كاملة مع الشرائح وقاعة المحاضرات',
    tagline: 'العرض الحقيقي 🎤',
    description: 'أنت جاهز للعرض الحقيقي. ارفع شرائحك، اضبط وقتك، وتدرّب في قاعة جامعية كاملة مع مؤقت العرض وتقرير ختامي.',
    iconName: 'Award',
    difficulty: 'احترافي',
    durationLabel: '5 - 10 دقائق',
    defaultDurationSec: 300,
    measuredMetrics: [
      'التكامل بين الحديث واستعراض الشرائح',
      'إدارة وقت العرض بدقة والانتقال بين الفقرات',
      'حضور المسرح وجذب انتباه القاعة',
      'قوة الخاتمة واستخلاص النتائج',
      'التقييم الشامل لجاهزية الإلقاء'
    ],
    tips: [
      'لا تقرأ من الشرائح؛ اجعلها سندًا بصريًا فقط',
      'ابدأ بخطاف قوي (قصة قصيرة، سؤال، أو إحصائية مفاجئة)',
      'اختم بملخص واضح ودعوة لاتخاذ خطوة عملية'
    ]
  }
];

export const VIRTUAL_AVATARS: VirtualAvatar[] = [
  {
    id: 'dr_sara',
    name: 'د. سارة المنصور',
    role: 'أستاذة تكنولوجيا التعليم',
    description: 'شخصية أكاديمية متفهمة، تركز على عمق المحتوى وتماسك المصطلحات التربوية.',
    personality: 'أكاديمي',
    reactionStatus: 'مستمع باهتمام',
    imageUrl: ASSET_IMAGES.avatarCoach
  },
  {
    id: 'tutor_kareem',
    name: 'أ. كريم عبد الله',
    role: 'معيد ومدرّب مهارات عرض',
    description: 'شخصية ودودة ومشجعة، يبتسم كثيرًا ويومئ برأسه ليزيد من ثقتك بنفسك.',
    personality: 'ودود',
    reactionStatus: 'يبتسم',
    imageUrl: ASSET_IMAGES.avatarCoach
  },
  {
    id: 'peer_nour',
    name: 'نور الدين',
    role: 'طالب زميل بالفرقة الثالثة',
    description: 'طالب في نفس تخصصك، يستمع إليك باهتمام ويسجل بعض الملاحظات المفيدة.',
    personality: 'طالب زميل',
    reactionStatus: 'يدون ملاحظة',
    imageUrl: ASSET_IMAGES.avatarCoach
  },
  {
    id: 'committe_member',
    name: 'د. فاروق الأحمدي',
    role: 'عضو لجنة تحكيم ومشاريع',
    description: 'شخصية رسمية دقيقة، يراقب تنظيم الأفكار والالتزام بالوقت المحدد بدقة.',
    personality: 'لجنة تحكيم',
    reactionStatus: 'يومئ برأسه',
    imageUrl: ASSET_IMAGES.avatarCoach
  }
];

export const VIRTUAL_AUDIENCE_OPTIONS: VirtualAudienceOption[] = [
  {
    id: 'small_group',
    title: 'مجموعة صغيرة (5 طلاب)',
    count: 5,
    label: '5 طلاب من زملائك',
    difficulty: 'سهل',
    stressLevel: 'منخفض',
    description: 'بيئة مريحة ودافئة للتجربة والمناقشة غير الرسمية.'
  },
  {
    id: 'medium_class',
    title: 'فصل دراسي متوسط (10 طلاب)',
    count: 10,
    label: '10 طلاب بقاعة سمنار',
    difficulty: 'متوسط',
    stressLevel: 'متوسط',
    description: 'قاعة سمنار نموذجية تتطلب توزيع النظر والصوت.'
  },
  {
    id: 'full_lecture',
    title: 'مدرج المحاضرات (25 طالب)',
    count: 25,
    label: 'فصل دراسي كامل',
    difficulty: 'متقدم',
    stressLevel: 'مرتفع',
    description: 'محاكاة لجمهور متنوع به طلاب متفاعلون وآخرون مشتتون.'
  },
  {
    id: 'evaluation_board',
    title: 'لجنة تقييم مشاريع التخرج (4 أساتذة + قاعة)',
    count: 15,
    label: 'لجنة التقييم والمناقشة',
    difficulty: 'العرض الحقيقي',
    stressLevel: 'مرتفع',
    description: 'محاكاة لمناقشة مشروع التخرج أو العرض التقييمي النهائي.'
  }
];

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'أحمد محمد',
  major: 'تكنولوجيا التعليم والحاسب الآلي',
  university: 'كلية التربية النوعية — جامعة القاهرة',
  academicYear: 'الفرقة الثالثة',
  overallSkillScore: 72,
  skills: {
    confidence: 68,
    voiceClarity: 84,
    speakingRate: 75,
    eyeContact: 61,
    structure: 79
  },
  level: 2,
  levelTitle: 'أمام الكاميرا',
  progressToNextLevel: 68,
  baselineScore: 58,
  baselineCompleted: true
};

export const INITIAL_RECENT_SESSIONS: PracticeSession[] = [
  {
    id: 'ses-005',
    stageId: 'camera',
    stageTitle: 'أمام الكاميرا — شرح تصميم بيئات التعلم الرقمية',
    timestamp: 'اليوم، 04:15 م',
    durationSeconds: 135,
    overallScore: 78,
    metrics: {
      speakingRate: {
        score: 78,
        label: 'سرعة الكلام',
        valueDisplay: '132 ك/د',
        feedback: 'سرعتك مناسبة، لكن حاول التمهل قليلًا عند تقديم المصطلحات الجديدة.',
        status: 'جيد'
      },
      pauses: {
        score: 82,
        label: 'التوقفات والوقفات',
        valueDisplay: '4 وقفات واعية',
        feedback: 'استخدمت توقفات طبيعية ساعدت على استيعاب الشرح وإراحة أنفاسك.',
        status: 'ممتاز'
      },
      voiceClarity: {
        score: 88,
        label: 'وضوح الصوت',
        valueDisplay: '88% نقاء',
        feedback: 'الصوت واضح ومسموع بنبرة واثقة ومخارج حروف سليمة جدًا.',
        status: 'ممتاز'
      },
      eyeContact: {
        score: 64,
        label: 'التواصل البصري',
        valueDisplay: '64% ثبات',
        feedback: 'حاول النظر إلى الكاميرا لفترة أطول بدلًا من التركيز على ملاحظاتك السفلية.',
        status: 'يحتاج تحسين'
      },
      bodyPosture: {
        score: 72,
        label: 'لغة الجسد والثبات',
        valueDisplay: '72% استقرار',
        feedback: 'حركات يديك كانت طبيعية، حافظ على استقامة الظهر دون توتر.',
        status: 'جيد'
      },
      structure: {
        score: 76,
        label: 'تنظيم العرض',
        valueDisplay: '76% ترابط',
        feedback: 'المحتوى منظم، لكن يمكنك تحسين الانتقال اللفظي بين الشريحة والأخرى.',
        status: 'جيد'
      }
    },
    aiCoachTips: [
      'أداؤك تحسن بنسبة 14% مقارنة بأول جلسة تدريب لك.',
      'لاحظنا أنك تتحدث بسرعة أكبر عندما تبدأ في شرح مفهوم جديد.',
      'جرّب أخذ وقفة لمدة ثانية ونصف قبل الانتقال للنقطة التالية لتمنح المستمع فرصة للتفكير.'
    ],
    topic: 'تصميم بيئات التعلم الرقمية المصغرة'
  },
  {
    id: 'ses-004',
    stageId: 'avatar',
    stageTitle: 'أمام شخصية افتراضية — تجربة د. سارة المنصور',
    timestamp: 'أمس، 06:30 م',
    durationSeconds: 150,
    overallScore: 74,
    metrics: {
      speakingRate: {
        score: 72,
        label: 'سرعة الكلام',
        valueDisplay: '140 ك/د',
        feedback: 'تحدثت بتدفق جيد مع بعض التسارع عند مناقشة نظريات التعلم.',
        status: 'جيد'
      },
      pauses: {
        score: 75,
        label: 'التوقفات',
        valueDisplay: '3 وقفات',
        feedback: 'الوقفات كانت كافية، ولكن لا تتعجل الصمت عند التفكير.',
        status: 'جيد'
      },
      voiceClarity: {
        score: 85,
        label: 'وضوح الصوت',
        valueDisplay: '85%',
        feedback: 'مستوى صوت متزن دون انخفاض مفاجئ في نهايات الجمل.',
        status: 'ممتاز'
      },
      eyeContact: {
        score: 60,
        label: 'التواصل البصري',
        valueDisplay: '60%',
        feedback: 'ركز على التحديق في عيني الشخصية الافتراضية أثناء النقاط الجوهرية.',
        status: 'يحتاج تحسين'
      },
      bodyPosture: {
        score: 70,
        label: 'لغة الجسد',
        valueDisplay: '70%',
        feedback: 'حافظ على إيماءات مفتوحة ومريحة.',
        status: 'جيد'
      },
      structure: {
        score: 78,
        label: 'تنظيم العرض',
        valueDisplay: '78%',
        feedback: 'مقدمة ممتازة وربط ذكي بأهداف الدرس.',
        status: 'جيد'
      }
    },
    aiCoachTips: [
      'تفاعلك مع إيماءات د. سارة كان إيجابيًا ورفع من مصداقية العرض.',
      'انتبه لتقليل استخدام "يعني" و "أممم" في بداية كل جملة.'
    ],
    topic: 'تطبيقات الواقع المعزز في المناهج المدرسية'
  },
  {
    id: 'ses-003',
    stageId: 'camera',
    stageTitle: 'أمام الكاميرا — مقدمة عن التعليم المدمج',
    timestamp: 'منذ 3 أيام',
    durationSeconds: 110,
    overallScore: 68,
    metrics: {
      speakingRate: {
        score: 65,
        label: 'سرعة الكلام',
        valueDisplay: '148 ك/د',
        feedback: 'أسرع من المتوسط المطلوب قليلاً، حاول التنفس بين الفقرات.',
        status: 'يحتاج تحسين'
      },
      pauses: {
        score: 70,
        label: 'التوقفات',
        valueDisplay: '2 وقفات',
        feedback: 'حاول إضافة وقفات مقصودة للتأكيد على النقاط المفتاحية.',
        status: 'جيد'
      },
      voiceClarity: {
        score: 82,
        label: 'وضوح الصوت',
        valueDisplay: '82%',
        feedback: 'الصوت جهوري وواضح ومريح للأذن.',
        status: 'ممتاز'
      },
      eyeContact: {
        score: 55,
        label: 'التواصل البصري',
        valueDisplay: '55%',
        feedback: 'كنت تنظر بعيدًا عن الكاميرا في أول دقيقة.',
        status: 'يحتاج تحسين'
      },
      bodyPosture: {
        score: 68,
        label: 'لغة الجسد',
        valueDisplay: '68%',
        feedback: 'تحريك الكتفين باستمرار عكس بعض التوتر البسيط.',
        status: 'جيد'
      },
      structure: {
        score: 74,
        label: 'تنظيم العرض',
        valueDisplay: '74%',
        feedback: 'تسلسل منطقي ممتاز من المشكلة إلى الحل.',
        status: 'جيد'
      }
    },
    aiCoachTips: [
      'تدرجك من التدريب الصوتي إلى الكاميرا أظهر تطورًا واعدًا.',
      'تدرب أمام المرآة لمدة دقيقة لضبط ثبات الكتفين.'
    ],
    topic: 'التعليم المدمج: المزايا والتحديات'
  },
  {
    id: 'ses-002',
    stageId: 'voice',
    stageTitle: 'جلسة صوتية — تلخيص معايير تصميم المواد الرقمية',
    timestamp: 'منذ 5 أيام',
    durationSeconds: 95,
    overallScore: 62,
    metrics: {
      speakingRate: {
        score: 60,
        label: 'سرعة الكلام',
        valueDisplay: '152 ك/د',
        feedback: 'تحدثت بسرعة تحت وطأة الرغبة في إنهاء التسجيل سريعًا.',
        status: 'يحتاج تحسين'
      },
      pauses: {
        score: 64,
        label: 'التوقفات',
        valueDisplay: '1 وقفة',
        feedback: 'قلة التوقفات أدت إلى نقص الهواء في نهاية الجمل.',
        status: 'يحتاج تحسين'
      },
      voiceClarity: {
        score: 79,
        label: 'وضوح الصوت',
        valueDisplay: '79%',
        feedback: 'وضوح جيد في أغلب الكلمات ومخارج مناسبة.',
        status: 'جيد'
      },
      eyeContact: {
        score: 50,
        label: 'التواصل البصري',
        valueDisplay: 'غير متاح',
        feedback: 'جلسة صوتية بدون كاميرا.',
        status: 'جيد'
      },
      bodyPosture: {
        score: 60,
        label: 'لغة الجسد',
        valueDisplay: 'غير متاح',
        feedback: 'جلسة صوتية.',
        status: 'جيد'
      },
      structure: {
        score: 68,
        label: 'تنظيم العرض',
        valueDisplay: '68%',
        feedback: 'الأفكار واضحة ولكن تحتاج تلخيصًا نهائيًا.',
        status: 'جيد'
      }
    },
    aiCoachTips: [
      'البداية الصوتية كانت ممتازة لكسر حاجز الخوف الأول.',
      'تذكر أن الشرح ليس سباقًا سرعة؛ الهدف هو الفهم.'
    ],
    topic: 'معايير جودة الوسائط التعليمية'
  },
  {
    id: 'ses-001',
    stageId: 'voice',
    stageTitle: 'الاختبار المبدئي — التعريف بالتخصص والاهتمامات',
    timestamp: 'منذ أسبوع',
    durationSeconds: 60,
    overallScore: 52,
    metrics: {
      speakingRate: {
        score: 58,
        label: 'سرعة الكلام',
        valueDisplay: '158 ك/د',
        feedback: 'توتر البداية ظهر في شكل وتيرة متسارعة وقلق ملحوظ.',
        status: 'يحتاج تحسين'
      },
      pauses: {
        score: 48,
        label: 'التوقفات',
        valueDisplay: 'وقفات متوترة',
        feedback: 'وقفات ناتجة عن التردد وليس التنسيق الخطابي.',
        status: 'يحتاج تحسين'
      },
      voiceClarity: {
        score: 71,
        label: 'وضوح الصوت',
        valueDisplay: '71%',
        feedback: 'صوت مسموع ولديك إمكانيات صوتية ممتازة تحتاج لصقل.',
        status: 'جيد'
      },
      eyeContact: {
        score: 42,
        label: 'التواصل البصري',
        valueDisplay: '42%',
        feedback: 'تجنب النظر للأمام في الاختبار المبدئي.',
        status: 'يحتاج تحسين'
      },
      bodyPosture: {
        score: 45,
        label: 'الثقة والثبات',
        valueDisplay: '45%',
        feedback: 'مؤشر طبيعي لأي طالب في جلسته الأولى.',
        status: 'يحتاج تحسين'
      },
      structure: {
        score: 55,
        label: 'تنظيم العرض',
        valueDisplay: '55%',
        feedback: 'بداية مقبولة كخط أساس لمتابعة التطور.',
        status: 'يحتاج تحسين'
      }
    },
    aiCoachTips: [
      'أحسنت باتخاذ الخطوة الأولى وتجاوز الرهبة المبدئية.',
      'سنستخدم هذه النتيجة كخط أساس نقيس به قفزات تقدمك المستمرة.'
    ],
    topic: 'التعريف بالنفس والاهتمامات البحثية'
  }
];

export const INITIAL_BADGES: AchievementBadge[] = [
  {
    id: 'first_record',
    title: 'أول تسجيل 🏆',
    description: 'سجلت أول تدريب بنجاح وكسرت حاجز الرهبة الأولى.',
    icon: 'Trophy',
    unlocked: true,
    unlockedAt: 'منذ أسبوع',
    category: 'بدايات'
  },
  {
    id: 'full_minute',
    title: 'أول دقيقة كاملة 🎙️',
    description: 'تحدثت لمدة دقيقة كاملة متواصلة بوضوح وسلاسة.',
    icon: 'Mic',
    unlocked: true,
    unlockedAt: 'منذ أسبوع',
    category: 'بدايات'
  },
  {
    id: 'camera_debut',
    title: 'أول ظهور أمام الكاميرا 📹',
    description: 'فتحت الكاميرا وواجهت صورتك بشجاعة وثبات.',
    icon: 'Video',
    unlocked: true,
    unlockedAt: 'منذ 3 أيام',
    category: 'استمرار'
  },
  {
    id: 'avatar_sim',
    title: 'أول محاكاة افتراضية 🤖',
    description: 'ألقيت شرحك أمام شخصية افتراضية تفاعلية.',
    icon: 'Bot',
    unlocked: true,
    unlockedAt: 'أمس',
    category: 'إتقان'
  },
  {
    id: 'five_sessions',
    title: '5 جلسات تدريب 🔥',
    description: 'أتممت 5 جلسات تدريبية متكاملة وأظهرت التزامًا ملهمًا.',
    icon: 'Flame',
    unlocked: true,
    unlockedAt: 'اليوم',
    category: 'استمرار'
  },
  {
    id: 'noticeable_progress',
    title: 'تحسن ملحوظ 📈',
    description: 'ارتفعت درجتك الإجمالية بأكثر من 20 نقطة عن الاختبار المبدئي.',
    icon: 'TrendingUp',
    unlocked: true,
    unlockedAt: 'اليوم',
    category: 'إتقان'
  },
  {
    id: 'face_the_crowd',
    title: 'واجه الجمهور 👥',
    description: 'أنهِ جلسة تدريبية أمام مجموعة طلاب افتراضية.',
    icon: 'Users',
    unlocked: false,
    category: 'تحدي'
  },
  {
    id: 'ready_for_stage',
    title: 'جاهز للعرض 🎤',
    description: 'أتمم المحاكاة الكاملة مع الشرائح واحصل على تقييم تفوق.',
    icon: 'Award',
    unlocked: false,
    category: 'تحدي'
  }
];

export const SAMPLE_PRESENTATION_SLIDES: SlideItem[] = [
  {
    id: 1,
    title: 'مقدمة: الذكاء الاصطناعي في تكنولوجيا التعليم',
    bullets: [
      'تطور أدوات التعلم التكيفي ودور المعلم الحديث',
      'تخصيص مسارات التعلم لكل طالب وفق قدراته وسرعته',
      'إحصائيات استجابة الطلاب للفصول التفاعلية الذكية'
    ],
    note: 'ابدأ بسؤال تفاعلي للجمهور: كم واحد فيكم حس إن المحتوى التعليمي العام مش موجه لاحتياجاته الخاصة؟'
  },
  {
    id: 2,
    title: 'المشكلة: الفجوة بين الشرح النظري والتطبيق التفاعلي',
    bullets: [
      'انخفاض معدلات التركيز بعد الدقيقة العاشرة في المحاضرات التقليدية',
      'غياب التغذية الراجعة الفورية للمتعلم',
      'الحاجة لبيئات تعلم مصغرة تحاكي الواقع'
    ],
    note: 'وجّه نظرك لأطراف القاعة وأظهر إيماءة تؤكد حجم المشكلة في البيئات الصفية.'
  },
  {
    id: 3,
    title: 'الحل المقترح: بيئة التدريب الآمنة "قبل ما أشرح"',
    bullets: [
      'التدرج النفسي من الصوت إلى الكاميرا ثم الجمهور الكامل',
      'تحليلات فورية لسرعة الإلقاء والتواصل البصري والثبات',
      'إتاحة تكرار المحاولة بلا قلق أو إحراج اجتماعي'
    ],
    note: 'ارفع نبرة صوتك هنا بحماس؛ أنت الآن تقدم الحل الذي طورته بنفسك!'
  },
  {
    id: 4,
    title: 'النتائج والتوصيات المستقبلية',
    bullets: [
      'ارتفاع ثقة الطلاب بنسبة 42% بعد 5 جلسات تدريبية متتالية',
      'توصية بدمج محاكيات العرض في مشاريع تخرج كليات التربية',
      'الخطوة القادمة: ربط الأداء بتحليلات الذكاء الاصطناعي اللحظية'
    ],
    note: 'اختم بنبرة هادئة وحاسمة، واشكر الحضور وادعُ اللجنة لطرح أسئلتهم الكريمة.'
  }
];
