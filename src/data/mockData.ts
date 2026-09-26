import { ForumPost, Assignment, ModerationReport, NotificationItem } from '../types';

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    author: 'Mateo Gómez',
    authorRole: 'Estudiante 10°A',
    authorAvatarText: 'MG',
    timeAgo: 'Hace 45 minutos',
    campusLocation: 'Campus Central',
    subjectBadge: '📐 Matemáticas - Trigonometría',
    subjectCategory: 'math',
    title: '¿Cómo despejar la variable en identidades trigonométricas del punto 5?',
    description: 'Hola a todos. Estoy revisando el taller preparatorio para el examen del viernes. En el ejercicio 5 me piden demostrar la identidad.',
    formulaBlock: '(tan(θ) + cot(θ)) ⋅ sen(θ) = sec(θ)',
    formulaNote: 'Fórmula N° 5.2',
    attachmentImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgVjdlgHvURbUOijpJcJINMtRuvCvhUgrAoGz3bcaafBjYzIShKuVPG83bdvBq22sidgyYaidFLpdYErxu12Rg2zWE-jf6zt7vdwyUFeTLZbsdpGn_KsaP72Sc4ncbcDMZV-DLxwFmmxxBMVR9ii5uW1ikjO-0W4SrHmQTb-M07-o_jZZZb7k_5K0uF8NBcaalH7b_eYJLsAHn2bNJlpB-bG0l_WLesZWHzd_9C_syLOskLStHPN3QCQ',
    attachmentName: 'taller_trigonometria_p5.png (840 KB)',
    attachmentSize: '840 KB',
    likes: 18,
    userLiked: true,
    repliesCount: 6,
    category: 'Academico',
    comments: [
      {
        id: 'c-1',
        author: 'Juan Pérez',
        roleBadge: '10°A',
        avatarText: 'JP',
        timeAgo: 'Hace 32m',
        content: 'Yo también tuve esa duda al principio, me daba un resultado negativo hasta que me di cuenta de los paréntesis en el libro.'
      },
      {
        id: 'c-2',
        author: 'María Fernández',
        roleBadge: '10°A',
        avatarText: 'MF',
        timeAgo: 'Hace 20m',
        content: 'El profesor explicó en clase que primero debemos pasar todo a senos y cosenos y sacar común denominador en la fracción izquierda. Recuerda que sen²(θ) + cos²(θ) = 1, ahí se cancela fácil.',
        highlightSolution: true
      },
      {
        id: 'c-3',
        author: 'Prof. Carlos Mendoza',
        roleBadge: 'Docente • Matemáticas',
        avatarText: 'CM',
        timeAgo: 'Hace 10m',
        content: '¡Excelente aporte de María! Recuerden además comprobar que el denominador sea distinto de cero para que la identidad sea válida en el dominio. Al simplificar obtienen 1/cos(θ) que por definición es sec(θ).',
        isVerifiedTeacher: true,
        upvotes: 14
      }
    ]
  },
  {
    id: 'post-2',
    author: 'Sofía Castro',
    authorRole: 'Estudiante 11°B',
    authorAvatarText: 'SC',
    timeAgo: 'Hace 2 horas',
    campusLocation: 'Club de Oratoria',
    subjectBadge: '💬 General • Extracurricular',
    subjectCategory: 'general',
    title: 'Club de Debate: Preparación para el torneo intercolegial de oratoria',
    description: 'Estamos organizando las rondas de práctica este miércoles a las 3:30 PM en el auditorio B. Buscamos a dos compañeros que quieran practicar refutación con límite de 3 minutos. ¡Cualquier curso de 9° a 11° es bienvenido!',
    likes: 12,
    userLiked: false,
    repliesCount: 4,
    category: 'General',
    comments: [
      {
        id: 'c-4',
        author: 'Camilo Torres',
        roleBadge: '10°B',
        avatarText: 'CT',
        timeAgo: 'Hace 1 hora',
        content: '¡Me apunto para refutación! ¿Llevamos los argumentos impresos o en tablet?'
      }
    ]
  },
  {
    id: 'post-3',
    author: 'Prof. Diana Rojas',
    authorRole: 'Docente • Química',
    authorAvatarText: 'DR',
    timeAgo: 'Hace 4 horas',
    campusLocation: 'Laboratorio 2',
    subjectBadge: '🧪 Química Orgánica',
    subjectCategory: 'chem',
    title: 'Dudas sobre el informe de laboratorio de soluciones ácidas y cálculo de pH',
    description: 'He subido las tablas de calibración al aula virtual. Por favor verifiquen que la corrección por temperatura esté calculada a 22°C antes de tabular las gráficas de titulación. Pueden dejar aquí cualquier inconsistencia que hayan visto con los electrodos.',
    likes: 29,
    userLiked: false,
    repliesCount: 11,
    category: 'Preguntas',
    comments: [
      {
        id: 'c-5',
        author: 'Valentina R.',
        roleBadge: '10°A',
        avatarText: 'VR',
        timeAgo: 'Hace 3 horas',
        content: 'Profesora, en la mesa 3 el pH-metro marcaba una variación de 0.2 al estabilizar. ¿Debemos promediar las 3 lecturas?'
      },
      {
        id: 'c-6',
        author: 'Prof. Diana Rojas',
        roleBadge: 'Docente • Química',
        avatarText: 'DR',
        timeAgo: 'Hace 2 horas',
        content: 'Sí Valentina, tomen la media aritmética descartando el valor extremo.',
        isVerifiedTeacher: true
      }
    ]
  },
  {
    id: 'post-4',
    author: 'Mateo Gómez',
    authorRole: '10°A',
    authorAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWCvbqtzJLWzRZl20jUjyUdzFGUdFVTiWvvUGlV-zMiYsbqTff5Ssiu1B1HJ2y22BhelTiKRJDVrNmKHBDgesD9toZ8IupClTeGxX2jM7z3XZS5kO89sl9yqinHd1WkSYRq4PzLEAIaBnsrM9v74qYHPPA0K_HkIOZ9TLLmex5H-4s6fvwCH-H4oshT3uY_JiRFgeHhq7ie4fZbgW_jDs-kMmBUW8eDC_VDwMFTxYoPUNfyLMdvnoLmQ',
    timeAgo: 'Hace 35 minutos',
    campusLocation: 'Campus Central',
    subjectBadge: 'Matemáticas (Cálculo)',
    subjectCategory: 'math',
    title: '¿Alguien entendió el ejercicio 4 del taller de Matemáticas (Cálculo de límites indeterminados)?',
    description: 'Estoy atascado en el paso donde queda 0/0. Ya intenté multiplicar por el conjugado de la raíz pero no logro simplificar la expresión. ¿Alguien tiene una pista del procedimiento?',
    likes: 12,
    userLiked: true,
    repliesCount: 8,
    category: 'Academico',
    comments: [
      {
        id: 'c-7',
        author: 'Juan Diego M.',
        roleBadge: '10°A',
        avatarText: 'J',
        timeAgo: 'Hace 28 min',
        content: 'Yo también tuve esa misma duda toda la tarde. Pensé que había un error en el signo del exponente.'
      },
      {
        id: 'c-8',
        author: 'María José',
        roleBadge: '10°A',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQNWKz0vsI2F26EfMctcPlhOhvRF39ZAeojAV-97Y0S9RiePswsoRhyVNC0JWvTI94AlPW5xJXbfF6vkkAqYE5YoRv8RBFfSu03zozoxNKxAMf17DZFtMjW5F2HCtSddUjVtrQQ-Bpc2Rstyk7FJMm3uMGBKiR3H76bsel4CC2XsyeIk2AjZA8VZliQ_3pystBVUf1OFVVkx4u9tS1sUvYQh_aIOcaKsNqk0byV842CLliX5dc4qTK7Q',
        timeAgo: 'Hace 14 min',
        content: 'El profesor explicó que primero debemos factorizar el denominador usando diferencia de cuadrados antes de conjugar. Así cancelas directamente el término (x - 3) y el límite da 1/6.',
        highlightSolution: true
      }
    ]
  },
  {
    id: 'post-5',
    author: 'Valentina R.',
    authorRole: '10°A',
    authorAvatarText: 'VR',
    timeAgo: 'Hace 2 horas',
    campusLocation: 'Laboratorio 1',
    subjectBadge: 'Química General',
    subjectCategory: 'chem',
    title: 'Guía de laboratorio de Química: materiales para la práctica del miércoles',
    description: 'Hola a todos, la profesora mencionó que debemos traer bata blanca, gafas de seguridad y un gotero por mesa. ¿Saben si los tubos de ensayo los suministra directamente el colegio o hay que pedirlos con anticipación?',
    likes: 5,
    userLiked: false,
    repliesCount: 3,
    category: 'Preguntas',
    comments: [
      {
        id: 'c-9',
        author: 'Santiago López',
        roleBadge: '10°A',
        avatarText: 'SL',
        timeAgo: 'Hace 1 hora',
        content: 'Los entrega el auxiliar de laboratorio al firmar la planilla al inicio de clase.'
      }
    ]
  }
];

export const STUDENT_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Taller: Leyes de Newton y Fricción',
    subject: 'Física Mecánica',
    dueText: 'Mañana',
    dueTime: 'Entrega: 23:59 hrs',
    status: 'Sin enviar',
    statusType: 'danger'
  },
  {
    id: 'asg-2',
    title: 'Parcial: Vanguardias del Siglo XX',
    subject: 'Literatura',
    dueText: 'Jueves',
    dueTime: 'Presencial • 10:00 AM',
    status: 'Valor 25%',
    statusType: 'purple',
    weight: '25%'
  },
  {
    id: 'asg-3',
    title: 'Proyecto: Maqueta Civilizaciones Antiguas',
    subject: 'Historia Universal',
    dueText: 'Lunes próx.',
    dueTime: 'En parejas',
    status: 'En progreso',
    statusType: 'success'
  }
];

export const TEACHER_ASSIGNMENTS = [
  {
    id: 't-asg-1',
    title: 'Guía N° 4: Leyes de la Termodinámica',
    description: 'Resolución de problemas numéricos de entropía y ciclos de Carnot con desarrollo completo escaneado en PDF.',
    courses: ['10°A', '10°B'],
    submissions: 64,
    total: 70,
    percentage: 91,
    statusText: 'Vence en 2 días',
    type: 'Tarea Activa'
  },
  {
    id: 't-asg-2',
    title: 'Anuncio: Fechas de sustentación de proyectos de física',
    description: 'Se confirman los horarios por equipos para el laboratorio central. Revisar el archivo Excel adjunto en la plataforma institucional.',
    courses: ['11°A'],
    views: 38,
    comments: 5,
    statusText: 'Publicado ayer',
    type: 'Anuncio Oficial'
  },
  {
    id: 't-asg-3',
    title: 'Material complementario: Simulador PhET de circuitos',
    description: 'Laboratorio virtual interactivo de construcción de circuitos en serie y paralelo para preparar la práctica presencial.',
    link: 'phet.colorado.edu/sims/circuit-kit',
    courses: ['10°A', '10°B', '11°A'],
    clicks: 142,
    statusText: 'Recurso Permanente',
    type: 'Material Educativo'
  }
];

export const INITIAL_MODERATION_REPORTS: ModerationReport[] = [
  {
    id: 'rep-1',
    userName: 'Mateo Salazar R.',
    userGrade: '11°B',
    avatarText: 'MS',
    forumSpace: 'Foro: Física Cuántica & Laboratorios',
    reportedContent: '"Vendo las respuestas del taller 4 resueltas al inbox de WhatsApp, no paguen asesorías caras..."',
    reportedBy: 'Prof. Daniel Arismendi + 2 alumnos',
    reason: 'Comercio no autorizado / Fraude',
    reasonType: 'danger',
    timeAgo: 'Hace 24 minutos',
    userStatus: 'Activo (1ª Falta)'
  },
  {
    id: 'rep-2',
    userName: 'Julián Corredor',
    userGrade: '9°C',
    avatarText: 'JC',
    forumSpace: 'Debate: Convivencia y Elección de Personería',
    reportedContent: '"El candidato de la lista B es un mediocre que no sabe nada de propuestas no voten por él gente..."',
    reportedBy: 'Sistema Automático (Lenguaje ofensivo)',
    reason: 'Falta al manual de convivencia',
    reasonType: 'warning',
    timeAgo: 'Hace 1 hora',
    userStatus: 'En Advertencia Formal'
  },
  {
    id: 'rep-3',
    userName: 'Valeria Alvarado',
    userGrade: 'Docente Tutor • Inglés',
    avatarText: 'VA',
    forumSpace: 'Muro de Anuncios: Asignación de Speaking Club',
    reportedContent: '"Enlace externo repetido 6 veces para descarga masiva de podcasts no verificados."',
    reportedBy: 'Bot Antispam de Campus',
    reason: 'Spam de enlaces masivos',
    reasonType: 'neutral',
    timeAgo: 'Hace 2 horas',
    userStatus: 'Docente Autorizada'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Coordinación Académica',
    description: 'Publicó una nueva circular informativa sobre matrículas extraordinarias.',
    timeAgo: 'Hace 10 min',
    type: 'coord',
    read: false
  },
  {
    id: 'notif-2',
    title: 'María José',
    description: 'Respondió tu comentario en el Foro de Matemáticas (Límites indeterminados).',
    timeAgo: 'Hace 25 min',
    type: 'student',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Prof. Carlos Mendoza',
    description: 'Asignó la nueva rúbrica para el informe de Termodinámica.',
    timeAgo: 'Hace 1 hora',
    type: 'teacher',
    read: false
  }
];
