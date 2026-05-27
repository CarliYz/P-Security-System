import { Language } from '../context/LanguageContext';

export const DURING_EVENT_I18N: Record<Language, any> = {
  en: {
    topics: [
      { id: 1, title: "Zeekr 'Grey Market' Locking & Al-Farabi Avenue Fatal Crash", keywords: "#ZeekrLocking #AlFarabiCrash #AlmatyPoliceCorruption #JusticeForVictims #GreyMarketRisk", type: 'Traffic Safety' },
      { id: 2, title: "Aviation Safety: Aktau E190 Crash & 'Tail Hole' Mystery", keywords: "#AktauCrash #E190Kazakhstan #AviationMystery #PlaneCrash", type: 'Aviation Safety' },
      { id: 3, title: "Financial Fraud: Kaspi Bank Telegram Deepfake Scam Wave", keywords: "#KaspiBankFraud #DeepfakeScamKZ #StopScamKZ #TelegramFraud", type: 'Financial Security' },
      { id: 4, title: "Traffic Safety: Accidents Surge Past 31,000 & Ride-hailing Risks", keywords: "#RoadSafetyKZ #YandexTaxiKZ #InDriveSafety #TrafficAccident", type: 'Traffic Safety' },
      { id: 5, title: "Human Rights & Law: Anti-Domestic Violence Law Implementation Controversy", keywords: "#JusticeForSaltanat #DomesticViolenceLawKZ #NeMolchiKZ #WomenSafety", type: 'Social Rule of Law' },
      { id: 6, title: "Economy & Policy: 2026 Digital Nomad Visa & Almaty Tourism Boom", keywords: "#DigitalNomadKZ #AlmatyTravel #Visa-freeKazakhstan #VisitKZ", type: 'Economic Policy' },
      { id: 7, title: "Geopolitics: 'Middle Corridor' Railway Transit & Trade Artery", keywords: "#MiddleCorridor #Trans-Caspian #KazakhstanGeopolitics #TradeRoute", type: 'Geopolitics' },
      { id: 8, title: "Business & Tech: TikTok Social E-commerce & Local Craft Startups", keywords: "#AtamekenTikTok #MadeInKazakhstan #KZStartups #Handicraft", type: 'Business & Tech' },
      { id: 9, title: "Sports & Culture: Nomad Culture & 'Kokpar' Storm", keywords: "#WorldNomadGames #Kokpar #EagleHunting #NomadCulture", type: 'Sports & Culture' },
      { id: 10, title: "Pop Culture: 'I'm Not Kazakh, But...' Global Music & Q-Pop Challenge", keywords: "#ImNotKazakhBut #DimashKudaibergen #Q-pop #MusicChallenge", type: 'Pop Culture' },
      { id: 11, title: "Urban Planning: Almaty '15-Minute City' Vision & Community Renewal", keywords: "#Almaty15MinCity #UrbanPlanningKZ #CommunityRevival #SmartCity", type: 'Urban Livelihood' }
    ],
    trends: ['Security', 'Military', 'Politics', 'Economy', 'Livelihood', 'Tech', 'Education'],
    ui: {
      socialMediaFeed: 'Social Media Feed',
      sentimentLedger: 'Sentiment Ledger',
      search: 'Search',
      topicAnalysis: '8-Week Topic Analysis',
      sentimentHeat: 'Sentiment Heat (K-Line)',
      interactionVolume: 'Interaction Volume',
      overallSentiment: 'Overall Sentiment Tone',
      coreTarget: 'Core Target of Anger',
      negative: 'Negative',
      neutral: 'Neutral',
      positive: 'Positive',
      emotionBreakdown: 'Negative Emotion Breakdown',
      emotionGranularity: 'Emotion Granularity',
      assistantGreeting: 'Hello! I am your Sentiment Analysis Assistant. I can help you dig deep into the connections behind the data. You can try asking me:\n1. Analyze the propagation path of this event on TikTok\n2. Uncover the network of associated persons behind the racing case\n3. Predict the sentiment trend for the next 48 hours',
      kolTitle: 'Key Opinion Leaders (KOLs)',
      hotTopics: 'Hot Topics & Hashtags',
      postsTitle: 'High-Impact Social Posts',
    },
    detailed: {
      highPriority: 'High Priority',
      caseId: 'CASE ID',
      participants: 'Participants',
      lastUpdate: 'Last Update',
      participantsList: 'Kazakh middle-class car owners, legal professionals, MIA internal affairs officers, international analysts',
      summary: 'Evolved from simple "consumer rights protection" into a comprehensive social event involving "public safety + elite crime + police department earthquake". Cumulative interaction volume across the network exceeded',
      topKol: 'Top 10 Opinion Leaders (KOL)',
      topPosts: 'TOP 10 Topic Posts',
      postDetailAnalysis: 'Post Detail Analysis',
      verifiedEntry: 'VERIFIED ENTRY',
      subscribers: 'Subscribers',
      likes: 'Likes',
      views: 'Views',
      comments: 'Comments',
      daysAgo: 'days ago',
      reply: 'Reply',
      volumeTrend: 'Volume Trend',
      topKeywords: 'Top Keywords',
      demographics: 'Demographics',
      male: 'MALE',
      platformShare: 'Platform Share',
      impactAssessment: 'Impact Assessment',
      dismissedOfficers: 'Dismissed Officers',
      salesImpact: 'Sales Impact',
      analysisEngine: 'ANALYSIS ENGINE',
      overallSentimentTone: 'Overall Sentiment Tone',
      coreTargetOfAnger: 'Core Target of Anger (Drill-down)',
      targetOfAngerBreakdown: 'Target of Anger Breakdown',
      overallSentimentRatio: 'Overall Sentiment Ratio',
      negativeEmotionGranularity: 'Negative Emotion Granularity',
      selectMetric: 'Select a metric card above to view detailed analysis',
      aiDataMining: 'AI Data Mining',
      askAi: 'Ask AI to analyze data...',
      suggestions: [
        "Analyze the propagation path of this event on TikTok",
        "Uncover the network of associated persons behind the racing case",
        "Identify core negative keywords in this sentiment wave"
      ],
      analysisTitles: {
        volume: 'Propagation Heat & Time Dimension (Volume & Timeline)',
        sentiment: 'Sentiment Tendency & Emotion Evolution (Sentiment & Emotion)',
        content: 'Content Semantics & Keyword Analysis (Content & Semantics)',
        actors: 'Participant Groups & Profiling (Actors & Demographics)',
        channels: 'Propagation Channels & Platform Distribution (Channels & Platforms)',
        risk: 'Risk Assessment & Social Impact (Risk & Impact)'
      },
      analysisStatus: {
        sentimentDrilled: 'Analyzing: Specific targets of negative sentiment',
        sentimentOverall: 'Analyzing: Sentiment distribution across the network'
      },
      emotionLabels: {
        corruption: 'Corruption Anger',
        safety: 'Safety Panic',
        ev: 'EV Helplessness',
        grief: 'Victim Grief'
      },
      chartMarkers: {
        kolOutburst: 'KOL Sudden Outburst',
        miaDismissal: 'MIA Announces Dismissal',
        officialReport: 'Official Report Released'
      },
      sentimentTargets: {
        police: 'Almaty Police & Protection',
        perpetrator: 'Perpetrator & Family',
        dealers: 'Parallel Import Dealers',
        brand: 'Car Brand (OTA Locking)'
      },
      keywords: {
        corruption: 'Corruption',
        justice: 'Justice',
        locking: 'Locking'
      }
    },
    kolData: [
      { name: '@almaty_kris_p', platform: 'Telegram/Instagram', desc: 'Almaty\'s largest breaking news account, holding first-hand scene videos.', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
      { name: '@OlegChernov_Lawyer', platform: 'Instagram', desc: 'Lawyer for the victim\'s family, standing firm against the perpetrator\'s family and refusing "private settlement" bribes.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop' },
      { name: '@EgovPress', platform: 'Telegram', desc: 'Famous insider exposure channel, first to release evidence of police high-level involvement in protecting street racers.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
      { name: '@Sadenov_Yerzhan', platform: 'Instagram/Official', desc: 'Minister of Internal Affairs of Kazakhstan, directly announced the decision to purge police high-levels via social media.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop' },
      { name: '@Dias_Auto', platform: 'YouTube/TikTok', desc: 'Senior car reviewer, professionally interpreting Zeekr locking technical details and safety hazards of parallel imports.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    ],
    postData: [
      { type: 'VIDEO', platform: 'Telegram', title: '1. Video (Telegram) —— Moment of Impact', content: 'Content: @almaty_kris_p released surveillance and dashcam clips showing a Zeekr crashing into a Mercedes at over 200 km/h on Al-Farabi Avenue, bursting into flames.', interaction: 'Interaction: 4.2M views, 150K shares', source: 'Source: t.me/kris_p_almaty', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=400' },
      { type: 'TEXT', platform: 'Facebook', title: '2. Text (Facebook) —— Lawyer\'s "No Compromise" Declaration', content: 'Content: Lawyer Oleg Chernov published a long post revealing the perpetrator\'s family tried to buy off the victim\'s life with tens of millions of Tenge. He declared on behalf of the family: "Justice only, no money."', interaction: 'Interaction: 92K likes, 15K comments', source: 'Source: facebook.com/oleg.chernov.law', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400' },
      { type: 'IMAGE', platform: 'Instagram', title: '3. Image (Instagram) —— "Locking" Warning Popup', content: 'Content: A car owner photographed the Zeekr central screen, which was pitch black with red Russian text in the middle: "Unauthorized area use detected, vehicle functions locked."', interaction: 'Interaction: 150K likes, sparking a huge debate on "digital asset ownership"', source: 'Source: instagram.com/kz_car_owners', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  zh: {
    topics: [
      { id: 1, title: "极氪“灰色市场”锁车与 Al-Farabi 大道致命车祸", keywords: "#极氪锁车 #AlFarabi车祸 #阿拉木图警察腐败 #为受害者伸张正义 #灰色市场风险", type: '交通安全' },
      { id: 2, title: "航空安全：阿克套 E190 坠毁与“机尾洞”之谜", keywords: "#阿克套坠机 #E190哈萨克斯坦 #航空之谜 #坠机", type: '航空安全' },
      { id: 3, title: "金融诈骗：Kaspi 银行 Telegram 深度伪造诈骗浪潮", keywords: "#Kaspi银行诈骗 #深度伪造诈骗KZ #停止诈骗KZ #Telegram诈骗", type: '金融安全' },
      { id: 4, title: "交通安全：事故激增超过 31,000 起与网约车风险", keywords: "#哈萨克斯坦道路安全 #Yandex出租车KZ #InDrive安全 #交通事故", type: '交通安全' },
      { id: 5, title: "人权与法律：反家庭暴力法实施争议", keywords: "#为Saltanat伸张正义 #反家暴法KZ #NeMolchiKZ #女性安全", type: '社会法治' },
      { id: 6, title: "经济与政策：2026 数字游民签证与阿拉木图旅游热潮", keywords: "#数字游民KZ #阿拉木图旅行 #哈萨克斯坦免签 #访问哈萨克斯坦", type: '经济政策' },
      { id: 7, title: "地缘政治：“中间走廊”铁路运输与贸易动脉", keywords: "#中间走廊 #跨里海 #哈萨克斯坦地缘政治 #贸易路线", type: '地缘政治' },
      { id: 8, title: "商业与技术：TikTok 社交电商与当地手工艺创业", keywords: "#AtamekenTikTok #哈萨克斯坦制造 #KZ创业 #手工艺", type: '商业与技术' },
      { id: 9, title: "体育与文化：游牧文化与“Kokpar”风暴", keywords: "#世界游牧运动会 #Kokpar #猎鹰 #游牧文化", type: '体育与文化' },
      { id: 10, title: "流行文化：“我不是哈萨克人，但是...”全球音乐与 Q-Pop 挑战", keywords: "#我不是哈萨克人但是 #迪玛希 #Q-pop #音乐挑战", type: '流行文化' },
      { id: 11, title: "城市规划：阿拉木图“15分钟城市”愿景与社区更新", keywords: "#阿拉木图15分钟城市 #城市规划KZ #社区复兴 #智慧城市", type: '城市民生' }
    ],
    trends: ['安全', '军事', '政治', '经济', '民生', '技术', '教育'],
    ui: {
      socialMediaFeed: '社交媒体动态',
      sentimentLedger: '舆情账本',
      search: '搜索',
      topicAnalysis: '8周话题分析',
      sentimentHeat: '情绪热度 (K线)',
      interactionVolume: '互动量',
      overallSentiment: '整体情绪基调',
      coreTarget: '核心愤怒目标',
      negative: '负面',
      neutral: '中立',
      positive: '正面',
      emotionBreakdown: '负面情绪分解',
      emotionGranularity: '情绪粒度',
      assistantGreeting: '您好！我是您的舆情分析助手。我可以帮您深入挖掘数据背后的联系。您可以尝试问我：\n1. 分析该事件在 TikTok 上的传播路径\n2. 揭露赛车案背后的关联人物网络\n3. 预测未来 48 小时的情绪趋势',
      kolTitle: '关键意见领袖 (KOLs)',
      hotTopics: '热点话题与标签',
      postsTitle: '高影响力社交帖子',
    },
    detailed: {
      highPriority: '高优先级',
      caseId: '案例 ID',
      participants: '参与者',
      lastUpdate: '最后更新',
      participantsList: '哈萨克中产车主、法律专业人士、内务部内部事务官员、国际分析师',
      summary: '从简单的“消费者权益保护”演变为涉及“公共安全 + 精英犯罪 + 警务部门地震”的综合性社会事件。全网累计互动量超过',
      topKol: '前 10 名意见领袖 (KOL)',
      topPosts: '前 10 名话题帖子',
      postDetailAnalysis: '帖子详情分析',
      verifiedEntry: '已验证条目',
      subscribers: '订阅者',
      likes: '点赞',
      views: '浏览',
      comments: '评论',
      daysAgo: '天前',
      reply: '回复',
      volumeTrend: '声量趋势',
      topKeywords: '热门关键词',
      demographics: '人口统计',
      male: '男性',
      platformShare: '平台份额',
      impactAssessment: '影响评估',
      dismissedOfficers: '被解职官员',
      salesImpact: '销售影响',
      analysisEngine: '分析引擎',
      overallSentimentTone: '整体情绪基调',
      coreTargetOfAnger: '核心愤怒目标 (下钻)',
      targetOfAngerBreakdown: '愤怒目标分解',
      overallSentimentRatio: '整体情绪比例',
      negativeEmotionGranularity: '负面情绪粒度',
      selectMetric: '选择上方指标卡以查看详细分析',
      aiDataMining: 'AI 数据挖掘',
      askAi: '向 AI 提问以分析数据...',
      suggestions: [
        "分析该事件在 TikTok 上的传播路径",
        "揭露赛车案背后的关联人物网络",
        "识别此情绪浪潮中的核心负面关键词"
      ],
      analysisTitles: {
        volume: '传播热度与时间维度 (声量与时间轴)',
        sentiment: '情绪倾向与情感演变 (情绪与情感)',
        content: '内容语义与关键词分析 (内容与语义)',
        actors: '参与群体与画像 (参与者与人口统计)',
        channels: '传播渠道与平台分布 (渠道与平台)',
        risk: '风险评估与社会影响 (风险与影响)'
      },
      analysisStatus: {
        sentimentDrilled: '正在分析：负面情绪的具体目标',
        sentimentOverall: '正在分析：全网情绪分布'
      },
      emotionLabels: {
        corruption: '对腐败的愤怒',
        safety: '对安全的恐慌',
        ev: '无助感 (电动车)',
        grief: '对受害者的哀悼'
      },
      chartMarkers: {
        kolOutburst: 'KOL 舆论爆发',
        miaDismissal: '内务部宣布撤职',
        officialReport: '官方报告发布'
      },
      sentimentTargets: {
        police: '阿拉木图警察与保护',
        perpetrator: '肇事者与家属',
        dealers: '平行进口经销商',
        brand: '汽车品牌 (OTA 锁车)'
      },
      keywords: {
        corruption: '腐败',
        justice: '正义',
        locking: '锁车'
      }
    },
    kolData: [
      { name: '@almaty_kris_p', platform: 'Telegram/Instagram', desc: '阿拉木图最大的突发新闻账号，持有第一手现场视频。', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
      { name: '@OlegChernov_Lawyer', platform: 'Instagram', desc: '受害者家属律师，坚决抵制肇事者家属的“私下和解”贿赂。', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop' },
      { name: '@EgovPress', platform: 'Telegram', desc: '著名的内部曝光频道，率先发布警察高层参与保护街头赛车手的证据。', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
      { name: '@Sadenov_Yerzhan', platform: 'Instagram/官方', desc: '哈萨克斯坦内务部长，直接通过社交媒体宣布清洗警察高层的决定。', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop' },
      { name: '@Dias_Auto', platform: 'YouTube/TikTok', desc: '资深汽车评论员，专业解读极氪锁车技术细节及灰色进口的安全隐患。', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    ],
    postData: [
      { type: 'VIDEO', platform: 'Telegram', title: '1. 视频 (Telegram) —— 碰撞瞬间', content: '内容：@almaty_kris_p 发布了监控和行车记录仪片段，显示一辆极氪在 Al-Farabi 大道上以超过 200 公里/小时的速度撞上一辆梅赛德斯，并起火燃烧。', interaction: '互动：420万次观看，15万次分享', source: '来源：t.me/kris_p_almaty', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=400' },
      { type: 'TEXT', platform: 'Facebook', title: '2. 文字 (Facebook) —— 律师“不妥协”宣言', content: '内容：律师 Oleg Chernov 发表长文，透露肇事者家属试图用数千万坚戈买断受害者的生命。他代表家属宣布：“只要正义，不要钱。”', interaction: '互动：9.2万次点赞，1.5万条评论', source: '来源：facebook.com/oleg.chernov.law', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400' },
      { type: 'IMAGE', platform: 'Instagram', title: '3. 图片 (Instagram) —— “锁车”警告弹窗', content: '内容：一名车主拍下了极氪中控屏，屏幕漆黑，中间有红色俄语文字：“探测到未经授权的区域使用，车辆功能已锁定。”', interaction: '互动：15万次点赞，引发关于“数字资产所有权”的巨大辩论', source: '来源：instagram.com/kz_car_owners', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  kk: {
    topics: [
      { id: 1, title: "Zeekr 'Grey Market' бұғаттау және Al-Farabi даңғылындағы қайғылы апат", keywords: "#ZeekrLocking #AlFarabiCrash #AlmatyPoliceCorruption #JusticeForVictims #GreyMarketRisk", type: 'Жол қауіпсіздігі' },
      { id: 2, title: "Авиациялық қауіпсіздік: Ақтаудағы E190 апаты және 'Tail Hole' жұмбағы", keywords: "#AktauCrash #E190Kazakhstan #AviationMystery #PlaneCrash", type: 'Авиациялық қауіпсіздік' },
      { id: 3, title: "Қаржылық алаяқтық: Kaspi Bank Telegram Deepfake алаяқтық толқыны", keywords: "#KaspiBankFraud #DeepfakeScamKZ #StopScamKZ #TelegramFraud", type: 'Қаржылық қауіпсіздік' },
      { id: 4, title: "Жол қауіпсіздігі: Апаттар саны 31 000-нан асты және такси қызметінің қауіптері", keywords: "#RoadSafetyKZ #YandexTaxiKZ #InDriveSafety #TrafficAccident", type: 'Жол қауіпсіздігі' },
      { id: 5, title: "Адам құқықтары және заң: Тұрмыстық зорлық-зомбылыққа қарсы заңның орындалуындағы қайшылықтар", keywords: "#JusticeForSaltanat #DomesticViolenceLawKZ #NeMolchiKZ #WomenSafety", type: 'Әлеуметтік құқықтық тәртіп' },
      { id: 6, title: "Экономика және саясат: 2026 жылғы Digital Nomad визасы және Алматыдағы туризм серпіні", keywords: "#DigitalNomadKZ #AlmatyTravel #Visa-freeKazakhstan #VisitKZ", type: 'Экономикалық саясат' },
      { id: 7, title: "Геосаясат: 'Орта дәліз' теміржол транзиті және сауда артериясы", keywords: "#MiddleCorridor #Trans-Caspian #KazakhstanGeopolitics #TradeRoute", type: 'Геосаясат' },
      { id: 8, title: "Бизнес және технология: TikTok әлеуметтік электронды коммерциясы және жергілікті қолөнер стартаптары", keywords: "#AtamekenTikTok #MadeInKazakhstan #KZStartups #Handicraft", type: 'Бизнес және технология' },
      { id: 9, title: "Спорт және мәдениет: Көшпенділер мәдениеті және 'Көкпар' дауы", keywords: "#WorldNomadGames #Kokpar #EagleHunting #NomadCulture", type: 'Спорт және мәдениет' },
      { id: 10, title: "Поп-мәдениет: 'Мен қазақ емеспін, бірақ...' жаһандық музыка және Q-Pop челленджі", keywords: "#ImNotKazakhBut #DimashKudaibergen #Q-pop #MusicChallenge", type: 'Поп-мәдениет' },
      { id: 11, title: "Қала құрылысы: Алматы '15 минуттық қала' тұжырымдамасы және қауымдастықты жаңарту", keywords: "#Almaty15MinCity #UrbanPlanningKZ #CommunityRevival #SmartCity", type: 'Қалалық тыныс-тіршілік' }
    ],
    trends: ['Қауіпсіздік', 'Әскери', 'Саясат', 'Экономика', 'Тұрмыс', 'Технология', 'Білім'],
    ui: {
      socialMediaFeed: 'Әлеуметтік медиа таспасы',
      sentimentLedger: 'Көңіл-күй журналы',
      search: 'Іздеу',
      topicAnalysis: '8 апталық тақырыптық талдау',
      sentimentHeat: 'Көңіл-күй жылуы (K-Line)',
      interactionVolume: 'Өзара әрекеттесу көлемі',
      overallSentiment: 'Жалпы көңіл-күй тоны',
      coreTarget: 'Ашу-ызаның негізгі нысанасы',
      negative: 'Теріс',
      neutral: 'Бейтарап',
      positive: 'Оң',
      emotionBreakdown: 'Теріс эмоциялардың жіктелуі',
      emotionGranularity: 'Эмоцияның егжей-тегжейлілігі',
      assistantGreeting: 'Сәлем! Мен сіздің көңіл-күйді талдау бойынша көмекшіңізбін. Мен сізге деректердің артындағы байланыстарды тереңірек зерттеуге көмектесе аламын. Менен сұрап көріңіз:\n1. Осы оқиғаның TikTok-та таралу жолын талдаңыз\n2. Жарыс ісінің артындағы байланысты тұлғалар желісін анықтаңыз\n3. Алдағы 48 сағатқа арналған көңіл-күй тенденциясын болжаңыз',
      kolTitle: 'Негізгі пікір көшбасшылары (KOLs)',
      hotTopics: 'Өзекті тақырыптар мен хэштегтер',
      postsTitle: 'Ықпалды әлеуметтік жазбалар',
    },
    kolData: [
      { name: '@almaty_kris_p', platform: 'Telegram/Instagram', desc: 'Алматыдағы ең ірі жедел жаңалықтар аккаунты, оқиға орнынан бейнежазбаларды бірінші болып таратады.', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
      { name: '@OlegChernov_Lawyer', platform: 'Instagram', desc: 'Зардап шеккен отбасының адвокаты, кінәлі тараптың пара беру әрекеттеріне қарамастан әділдікті талап етуде.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop' },
      { name: '@EgovPress', platform: 'Telegram', desc: 'Атақты инсайдерлік арна, полиция басшылығының көше жарыстарын қорғауға қатысы бар екендігі туралы дәлелдерді бірінші болып жариялады.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
      { name: '@Sadenov_Yerzhan', platform: 'Instagram/Ресми', desc: 'Қазақстанның Ішкі істер министрі, әлеуметтік желілер арқылы полиция басшылығын тазарту туралы шешімін тікелей жариялады.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop' },
      { name: '@Dias_Auto', platform: 'YouTube/TikTok', desc: 'Автокөліктер бойынша аға сарапшы, Zeekr бұғаттаудың техникалық егжей-тегжейлерін және параллель импорттың қауіптерін кәсіби түрде түсіндіреді.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    ],
    postData: [
      { type: 'VIDEO', platform: 'Telegram', title: '1. Бейне (Telegram) —— Соқтығысу сәті', content: 'Мазмұны: @almaty_kris_p Al-Farabi даңғылында Zeekr көлігінің 200 км/сағ жылдамдықпен Mercedes-ке соғылып, өртенген сәті түсірілген бейнежазбаны жариялады.', interaction: 'Өзара әрекеттесу: 4.2 млн қаралым, 150 мың бөлісу', source: 'Дереккөз: t.me/kris_p_almaty', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=400' },
      { type: 'TEXT', platform: 'Facebook', title: '2. Мәтін (Facebook) —— Адвокаттың "Мәмілеге келмейміз" деген мәлімдемесі', content: 'Мазмұны: Адвокат Олег Чернов кінәлі тараптың зардап шеккендердің өмірін ондаған миллион теңгеге сатып алуға тырысқанын әшкереледі. Ол отбасы атынан: "Бізге ақша емес, тек әділдік керек" деп мәлімдеді.', interaction: 'Өзара әрекеттесу: 92 мың лайк, 15 мың пікір', source: 'Дереккөз: facebook.com/oleg.chernov.law', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400' },
      { type: 'IMAGE', platform: 'Instagram', title: '3. Сурет (Instagram) —— "Бұғаттау" туралы ескерту', content: 'Мазмұны: Көлік иесі Zeekr орталық экранын суретке түсірген, онда қара экранда қызыл орысша мәтін: "Рұқсат етілмеген аймақты пайдалану анықталды, көлік функциялары бұғатталды" деп жазылған.', interaction: 'Өзара әрекеттесу: 150 мың лайк, "цифрлық активтерге иелік ету" туралы үлкен пікірталас тудырды', source: 'Дереккөз: instagram.com/kz_car_owners', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=400' },
    ],
    detailed: {
      highPriority: 'Жоғары басымдық',
      caseId: 'ІС ID',
      participants: 'Қатысушылар',
      lastUpdate: 'Соңғы жаңарту',
      participantsList: 'Қазақстандық орта тап өкілдері, заңгерлер, ІІМ ішкі істер қызметкерлері, халықаралық сарапшылар',
      summary: 'Қарапайым "тұтынушылардың құқықтарын қорғаудан" "қоғамдық қауіпсіздік + элиталық қылмыс + полиция департаментіндегі сілкініс" қамтитын кешенді әлеуметтік оқиғаға айналды. Желідегі жиынтық өзара әрекеттесу көлемі асты',
      topKol: 'Үздік 10 пікір көшбасшысы (KOL)',
      topPosts: 'Үздік 10 тақырыптық жазба',
      postDetailAnalysis: 'Жазбаны егжей-тегжейлі талдау',
      verifiedEntry: 'РАСТАЛҒАН ЖАЗБА',
      subscribers: 'Жазылушылар',
      likes: 'Лайктар',
      views: 'Қаралымдар',
      comments: 'Пікірлер',
      daysAgo: 'күн бұрын',
      reply: 'Жауап беру',
      volumeTrend: 'Көлем тенденциясы',
      topKeywords: 'Негізгі түйін сөздер',
      demographics: 'Демография',
      male: 'ЕРЛЕР',
      platformShare: 'Платформа үлесі',
      impactAssessment: 'Әсерді бағалау',
      dismissedOfficers: 'Жұмыстан босатылған қызметкерлер',
      salesImpact: 'Сатуға әсері',
      analysisEngine: 'ТАЛДАУ ҚОЗҒАЛТҚЫШЫ',
      overallSentimentTone: 'Жалпы көңіл-күй тоны',
      coreTargetOfAnger: 'Ашу-ызаның негізгі нысанасы (тереңдетілген)',
      targetOfAngerBreakdown: 'Ашу-ыза нысаналарының жіктелуі',
      overallSentimentRatio: 'Жалпы көңіл-күй қатынасы',
      negativeEmotionGranularity: 'Теріс эмоциялардың егжей-тегжейлілігі',
      selectMetric: 'Егжей-тегжейлі талдауды көру үшін жоғарыдағы метрикалық картаны таңдаңыз',
      aiDataMining: 'AI деректерді өңдеу',
      askAi: 'Деректерді талдау үшін AI-дан сұраңыз...',
      suggestions: [
        "Осы оқиғаның TikTok-та таралу жолын талдаңыз",
        "Жарыс ісінің артындағы байланысты тұлғалар желісін анықтаңыз",
        "Осы көңіл-күй толқынындағы негізгі теріс түйін сөздерді анықтаңыз"
      ],
      analysisTitles: {
        volume: 'Таралу қарқындылығы және уақыт өлшемі (Көлем және хронология)',
        sentiment: 'Көңіл-күй тенденциясы және эмоция эволюциясы (Көңіл-күй және эмоция)',
        content: 'Мазмұн семантикасы және түйін сөздерді талдау (Мазмұн және семантика)',
        actors: 'Қатысушы топтар және профильдеу (Қатысушылар және демография)',
        channels: 'Таралу арналары және платформалардың таралуы (Арналар және платформалар)',
        risk: 'Тәуекелдерді бағалау және әлеуметтік әсер (Тәуекел және әсер)'
      },
      analysisStatus: {
        sentimentDrilled: 'Талдануда: Теріс көңіл-күйдің нақты нысаналары',
        sentimentOverall: 'Талдануда: Желідегі көңіл-күйдің таралуы'
      },
      emotionLabels: {
        corruption: 'Жемқорлыққа ашулану',
        safety: 'Қауіпсіздік үрейі',
        ev: 'Электр көлігінің дәрменсіздігі',
        grief: 'Зардап шеккендерге қайғыру'
      },
      chartMarkers: {
        kolOutburst: 'KOL-дардың кенеттен белсенділігі',
        miaDismissal: 'ІІМ жұмыстан босату туралы хабарлайды',
        officialReport: 'Ресми есеп жарияланды'
      },
      sentimentTargets: {
        police: 'Алматы полициясы және қорғау',
        perpetrator: 'Кінәлі және отбасы',
        dealers: 'Параллель импорт дилерлері',
        brand: 'Автокөлік бренді (OTA бұғаттау)'
      },
      keywords: {
        corruption: 'Жемқорлық',
        justice: 'Әділдік',
        locking: 'Бұғаттау'
      }
    }
  }
};
