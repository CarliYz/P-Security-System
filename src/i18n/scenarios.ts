import { Language } from '../context/LanguageContext';
import { Scenario } from '../types/ontology';

export const SCENARIOS_I18N: Record<Language, Scenario[]> = {
  en: [
    { 
      id: 'police-assets', 
      name: 'Police Asset Management', 
      phase: 'PRE', 
      description: 'Full lifecycle management of internal police resources',
      children: [
        { id: 'police-vehicles', name: 'Official Vehicles', phase: 'PRE', description: 'Real-time location and status of official vehicles' },
        { id: 'police-personnel', name: 'Police Personnel', phase: 'PRE', description: 'On-duty status and distribution of police personnel' },
        { id: 'police-equipment', name: 'Police Equipment', phase: 'PRE', description: 'Inventory and usage of police equipment' },
        { id: 'traffic-network', name: 'Traffic Network', phase: 'PRE', description: 'Real-time traffic flow of city road network' },
        { id: 'anomaly-warning', name: 'Anomaly Warning', phase: 'PRE', description: 'Warning for abnormal asset usage' },
      ]
    },
    { 
      id: 'social-assets', 
      name: 'Social Asset Management', 
      phase: 'PRE', 
      description: 'Dynamic control of key social resources',
      children: [
        { id: 'key-vehicles', name: 'Key Vehicles', phase: 'PRE', description: 'Socially key controlled vehicles' },
        { id: 'key-persons', name: 'Key Persons', phase: 'PRE', description: 'Socially key controlled personnel' },
      ]
    },
    { id: 'global-opinion', name: 'Global Sentiment Monitoring', phase: 'DURING', description: 'Real-time monitoring of global internet sentiment' },
    { id: 'major-event-warning', name: 'Major Event Warning', phase: 'DURING', description: 'Early warning for major sudden events' },
    { id: 'key-intel', name: 'Key Intelligence Analysis', phase: 'DURING', description: 'Deep mining and analysis of core intelligence' },
    { id: 'emergency-cmd', name: 'Emergency Command', phase: 'DURING', description: 'Flat command and multi-police coordination' },
    { id: 'case-analysis', name: 'Executive Drafting Hub', phase: 'POST', description: 'Deep mining of spatio-temporal collisions and relationship graphs' },
    { id: 'performance-eval', name: 'Flow Trace & Evaluation', phase: 'POST', description: 'Full-process digital review and performance evaluation' },
  ],
  zh: [
    { 
      id: 'police-assets', 
      name: '警务资产管理', 
      phase: 'PRE', 
      description: '内部警务资源的全生命周期管理',
      children: [
        { id: 'police-vehicles', name: '公务车辆', phase: 'PRE', description: '公务车辆的实时位置和状态' },
        { id: 'police-personnel', name: '警务人员', phase: 'PRE', description: '警务人员的在岗状态和分布' },
        { id: 'police-equipment', name: '警用装备', phase: 'PRE', description: '警用装备的库存和使用情况' },
        { id: 'traffic-network', name: '交通网络', phase: 'PRE', description: '城市路网实时交通流量' },
        { id: 'anomaly-warning', name: '异常预警', phase: 'PRE', description: '资产异常使用预警' },
      ]
    },
    { 
      id: 'social-assets', 
      name: '社会资产管理', 
      phase: 'PRE', 
      description: '关键社会资源的动态管控',
      children: [
        { id: 'key-vehicles', name: '重点车辆', phase: 'PRE', description: '社会重点管控车辆' },
        { id: 'key-persons', name: '重点人员', phase: 'PRE', description: '社会重点管控人员' },
      ]
    },
    { id: 'global-opinion', name: '全球舆情监测', phase: 'DURING', description: '全球互联网舆情的实时监测' },
    { id: 'major-event-warning', name: '重大事件预警', phase: 'DURING', description: '重大突发事件的早期预警' },
    { id: 'key-intel', name: '关键情报分析', phase: 'DURING', description: '核心情报的深度挖掘和分析' },
    { id: 'emergency-cmd', name: '应急指挥', phase: 'DURING', description: '扁平化指挥和多警种协同' },
    { id: 'case-analysis', name: '文书起草中心', phase: 'POST', description: '时空碰撞和关系图谱的深度挖掘' },
    { id: 'performance-eval', name: '流程追踪与评估', phase: 'POST', description: '全过程数字化回顾和绩效评估' },
  ],
  kk: [
    { 
      id: 'police-assets', 
      name: 'Полиция активтерін басқару', 
      phase: 'PRE', 
      description: 'Ішкі полиция ресурстарын толық өмірлік циклін басқару',
      children: [
        { id: 'police-vehicles', name: 'Қызметтік көліктер', phase: 'PRE', description: 'Қызметтік көліктердің нақты уақыттағы орны мен күйі' },
        { id: 'police-personnel', name: 'Полиция қызметкерлері', phase: 'PRE', description: 'Полиция қызметкерлерінің кезекшілік күйі мен бөлінуі' },
        { id: 'police-equipment', name: 'Полиция жабдықтары', phase: 'PRE', description: 'Полиция жабдықтарының түгенделуі және пайдаланылуы' },
        { id: 'traffic-network', name: 'Көлік желісі', phase: 'PRE', description: 'Қалалық жол желісінің нақты уақыттағы көлік ағыны' },
        { id: 'anomaly-warning', name: 'Аномалия туралы ескерту', phase: 'PRE', description: 'Активтерді қалыпсыз пайдалану туралы ескерту' },
      ]
    },
    { 
      id: 'social-assets', 
      name: 'Әлеуметтік активтерді басқару', 
      phase: 'PRE', 
      description: 'Негізгі әлеуметтік ресурстарды динамикалық бақылау',
      children: [
        { id: 'key-vehicles', name: 'Негізгі көліктер', phase: 'PRE', description: 'Әлеуметтік маңызды бақыланатын көліктер' },
        { id: 'key-persons', name: 'Негізгі тұлғалар', phase: 'PRE', description: 'Әлеуметтік маңызды бақыланатын қызметкерлер' },
      ]
    },
    { id: 'global-opinion', name: 'Жаһандық пікір мониторингі', phase: 'DURING', description: 'Жаһандық интернет пікірін нақты уақыттағы мониторингі' },
    { id: 'major-event-warning', name: 'Маңызды оқиға туралы ескерту', phase: 'DURING', description: 'Маңызды кенеттен болатын оқиғалар туралы ерте ескерту' },
    { id: 'key-intel', name: 'Негізгі барлау талдауы', phase: 'DURING', description: 'Негізгі барлауды терең өндіру және талдау' },
    { id: 'emergency-cmd', name: 'Төтенше жағдайлар командасы', phase: 'DURING', description: 'Тегіс командалық және көп полициялық үйлестіру' },
    { id: 'case-analysis', name: 'Атқарушы жобалау хабы', phase: 'POST', description: 'Кеңістіктік-уақыттық соқтығыстар мен қарым-қатынас графиктерін терең өндіру' },
    { id: 'performance-eval', name: 'Ағынды қадағалау және бағалау', phase: 'POST', description: 'Толық процесті цифрлық шолу және өнімділікті бағалау' },
  ]
};
