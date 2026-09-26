import { useState, useEffect } from 'react';
import { UserRole, NavTab, ForumPost, ModerationReport, NotificationItem } from './types';
import {
  INITIAL_FORUM_POSTS,
  STUDENT_ASSIGNMENTS,
  INITIAL_MODERATION_REPORTS,
  INITIAL_NOTIFICATIONS
} from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import {
  CreatePostModal,
  WeeklyScheduleModal,
  AnnouncementModal,
  GradingModal
} from './components/Modals';

// Views
import { HomeStudentView } from './views/HomeStudentView';
import { ForoAcademicoView } from './views/ForoAcademicoView';
import { PanelDocenteView } from './views/PanelDocenteView';
import { CoordinacionView } from './views/CoordinacionView';
import { NoticiasView } from './views/NoticiasView';
import { MiPerfilView } from './views/MiPerfilView';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<NavTab>('inicio');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Core Data States
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [assignments] = useState(STUDENT_ASSIGNMENTS);
  const [moderationReports, setModerationReports] =
    useState<ModerationReport[]>(INITIAL_MODERATION_REPORTS);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals States
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [isGradingOpen, setIsGradingOpen] = useState(false);

  // Show toast helper with auto-clear
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Handle keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          'input[placeholder*="Buscar noticias"]'
        );
        searchInput?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Post Actions
  const handleAddPost = (
    newPostData: Omit<ForumPost, 'id' | 'likes' | 'repliesCount' | 'comments'>
  ) => {
    const newPost: ForumPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      likes: 1,
      userLiked: true,
      repliesCount: 0,
      comments: []
    };
    setForumPosts([newPost, ...forumPosts]);
    showToast('¡Tu publicación o duda académica ha sido compartida en el Foro!');
  };

  const handleLikePost = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const userLiked = !p.userLiked;
          const likes = userLiked ? p.likes + 1 : Math.max(0, p.likes - 1);
          return { ...p, likes, userLiked };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string, commentText: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      author:
        currentRole === 'teacher'
          ? 'Prof. Carlos Mendoza'
          : currentRole === 'coordinator'
          ? 'Lic. Patricia Restrepo'
          : 'Alejandro V.',
      roleBadge:
        currentRole === 'teacher'
          ? 'Docente • Ciencias'
          : currentRole === 'coordinator'
          ? 'Coordinación'
          : '10°A',
      avatarText:
        currentRole === 'teacher' ? 'CM' : currentRole === 'coordinator' ? 'PR' : 'AV',
      timeAgo: 'Justo ahora',
      content: commentText,
      isVerifiedTeacher: currentRole === 'teacher',
      upvotes: currentRole === 'teacher' ? 1 : 0
    };

    setForumPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            repliesCount: p.repliesCount + 1,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      })
    );
    showToast('Tu respuesta ha sido enviada al hilo de discusión.');
  };

  // Moderation Actions
  const handleDismissReport = (id: string) => {
    setModerationReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isResolved: true, actionTaken: 'dismissed' } : r
      )
    );
    showToast('Reporte desestimado. Publicación marcada como conforme al manual.');
  };

  const handleHideContent = (id: string) => {
    setModerationReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isResolved: true, actionTaken: 'hidden' } : r
      )
    );
    showToast('Contenido retirado temporalmente de los foros públicos.');
  };

  const handleWarnUser = (id: string, userName: string) => {
    setModerationReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              isResolved: true,
              actionTaken: 'warned',
              userStatus: 'Sancionado (Advertencia Formal)'
            }
          : r
      )
    );
    showToast(`Amonestación enviada a ${userName}. Registro ingresado en Convivencia.`);
  };

  const handleVerifyTeacherContent = (id: string) => {
    setModerationReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isResolved: true, actionTaken: 'verified' } : r
      )
    );
    showToast('Recurso docente validado y habilitado en el muro de anuncios.');
  };

  const handlePublishCircular = (title: string, _body: string) => {
    showToast(`Circular "${title}" emitida oficialmente a toda la institución.`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Inter']">
      {/* Global Fixed Top Navigation */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notifications={notifications}
        onMarkNotificationRead={markNotificationRead}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Screen Router with pt-28 to offset sticky header */}
      <main className="w-full pt-28 flex-1">
        {activeTab === 'inicio' && (
          <HomeStudentView
            onOpenSchedule={() => setIsScheduleOpen(true)}
            onOpenCreatePost={() => setIsCreatePostOpen(true)}
            onOpenAnnouncement={() => setIsAnnouncementOpen(true)}
            onNavigateTab={setActiveTab}
            assignments={assignments}
            forumPosts={forumPosts}
            onReplyToPost={handleAddComment}
            onLikePost={handleLikePost}
            searchFilter={searchQuery}
          />
        )}

        {activeTab === 'noticias' && <NoticiasView />}

        {activeTab === 'foro-academico' && (
          <ForoAcademicoView
            posts={forumPosts}
            onAddPost={handleAddPost}
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
          />
        )}

        {activeTab === 'academico-y-tareas' && (
          <PanelDocenteView
            onOpenGrading={() => setIsGradingOpen(true)}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'anuncios-oficiales' && (
          <CoordinacionView
            reports={moderationReports}
            onDismissReport={handleDismissReport}
            onHideContent={handleHideContent}
            onWarnUser={handleWarnUser}
            onVerifyTeacherContent={handleVerifyTeacherContent}
            onShowToast={showToast}
            onPublishCircular={handlePublishCircular}
          />
        )}

        {activeTab === 'mi-perfil' && (
          <MiPerfilView currentRole={currentRole} onShowToast={showToast} />
        )}
      </main>

      {/* Institutional Global Footer */}
      <Footer />

      {/* Interactive Modals */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={(title, subject, description) => {
          handleAddPost({
            author:
              currentRole === 'teacher'
                ? 'Prof. Carlos Mendoza'
                : currentRole === 'coordinator'
                ? 'Lic. Patricia Restrepo'
                : 'Alejandro V.',
            authorRole:
              currentRole === 'teacher'
                ? 'Docente • Ciencias'
                : currentRole === 'coordinator'
                ? 'Coordinación'
                : 'Estudiante 10°A',
            authorAvatarText:
              currentRole === 'teacher' ? 'CM' : currentRole === 'coordinator' ? 'PR' : 'AV',
            timeAgo: 'Justo ahora',
            campusLocation: 'Campus Central',
            subjectBadge: `📐 ${subject}`,
            subjectCategory: 'math',
            title,
            description,
            category: 'Academico',
            attachmentName: 'ejercicio_geometria.pdf (1.2 MB)'
          });
        }}
      />

      <WeeklyScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />

      <AnnouncementModal
        isOpen={isAnnouncementOpen}
        onClose={() => setIsAnnouncementOpen(false)}
      />

      <GradingModal
        isOpen={isGradingOpen}
        onClose={() => setIsGradingOpen(false)}
        onNotifyStudent={(name) => {
          showToast(`Calificación guardada y notificada a ${name}.`);
        }}
      />

      {/* Global Floating Action Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
