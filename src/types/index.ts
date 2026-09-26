export type UserRole = 'student' | 'teacher' | 'coordinator';

export type NavTab = 'inicio' | 'noticias' | 'foro-academico' | 'academico-y-tareas' | 'anuncios-oficiales' | 'mi-perfil';

export interface ForumComment {
  id: string;
  author: string;
  roleBadge: string;
  grade?: string;
  avatarText?: string;
  avatarUrl?: string;
  timeAgo: string;
  content: string;
  isVerifiedTeacher?: boolean;
  upvotes?: number;
  highlightSolution?: boolean;
}

export interface ForumPost {
  id: string;
  author: string;
  authorRole: string;
  authorAvatarText?: string;
  authorAvatarUrl?: string;
  timeAgo: string;
  campusLocation: string;
  subjectBadge: string;
  subjectCategory: 'math' | 'phys' | 'chem' | 'lang' | 'soc' | 'general' | 'inst';
  title: string;
  description: string;
  formulaBlock?: string;
  formulaNote?: string;
  attachmentImage?: string;
  attachmentName?: string;
  attachmentSize?: string;
  likes: number;
  userLiked?: boolean;
  repliesCount: number;
  category: 'Academico' | 'General' | 'Preguntas' | 'Institucional';
  comments: ForumComment[];
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueText: string;
  dueTime: string;
  status: 'Sin enviar' | 'Valor 25%' | 'En progreso' | 'Calificado';
  statusType: 'danger' | 'purple' | 'info' | 'success';
  weight?: string;
  courses?: string[];
  submissionsCount?: number;
  totalStudents?: number;
  percentage?: number;
}

export interface ModerationReport {
  id: string;
  userName: string;
  userGrade: string;
  avatarText: string;
  forumSpace: string;
  reportedContent: string;
  reportedBy: string;
  reason: string;
  reasonType: 'danger' | 'warning' | 'neutral';
  timeAgo: string;
  userStatus: string;
  isResolved?: boolean;
  actionTaken?: 'dismissed' | 'hidden' | 'warned' | 'verified';
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: 'coord' | 'student' | 'teacher';
  read: boolean;
}
