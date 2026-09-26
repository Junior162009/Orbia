import React, { useState } from 'react';
import { ForumPost, Assignment } from '../types';

interface HomeStudentViewProps {
  onOpenSchedule: () => void;
  onOpenCreatePost: () => void;
  onOpenAnnouncement: () => void;
  onNavigateTab: (tab: any) => void;
  assignments: Assignment[];
  forumPosts: ForumPost[];
  onReplyToPost: (postId: string, text: string) => void;
  onLikePost: (postId: string) => void;
  searchFilter?: string;
}

export const HomeStudentView: React.FC<HomeStudentViewProps> = ({
  onOpenSchedule,
  onOpenCreatePost,
  onOpenAnnouncement,
  onNavigateTab,
  assignments,
  forumPosts,
  onReplyToPost,
  onLikePost,
  searchFilter = ''
}) => {
  const [forumFilter, setForumFilter] = useState<'mis-materias' | 'todo-el-grado'>('mis-materias');
  const [replyInputOpen, setReplyInputOpen] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Filter posts based on search and tab
  const displayPosts = forumPosts.filter((p) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.subjectBadge.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pb-8 pt-4">
        {/* 1. Header de bienvenida personalizada & Contexto Institucional */}
        <section className="mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#eaedff] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbe1ff] text-[#004ac6] text-[12px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#004ac6]"></span>
                  Estudiante — Grado 10°A
                </span>
                <span className="text-[11px] text-[#737686] flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[15px]">school</span>
                  I.E. Siglo XXI
                </span>
                <span className="text-[11px] text-[#c3c6d7] hidden sm:inline">•</span>
                <span className="text-[11px] text-[#c3c6d7] hidden sm:inline">Año Lectivo 2026</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans'] text-[28px] md:text-[32px] font-bold text-[#131b2e] tracking-tight mt-1">
                Hola, Sofía <span className="inline-block hover:rotate-12 transition-transform cursor-default">™</span>👋
              </h1>
              <p className="text-[14px] text-[#434655] max-w-2xl">
                Aquí encontrarás las noticias, anuncios y conversaciones importantes de tu comunidad académica.
              </p>
            </div>

            {/* Quick actions */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              <button
                onClick={onOpenSchedule}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#eaedff] text-[#131b2e] text-[13px] font-semibold hover:bg-[#e2e7ff] transition-colors shadow-2xs cursor-pointer border border-[#dae2fd]"
                type="button"
              >
                <span className="material-symbols-outlined text-[19px] text-[#3750a0]">
                  calendar_view_week
                </span>
                <span>Ver horario semanal</span>
              </button>
              <button
                onClick={onOpenCreatePost}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#712ae2] text-white text-[13px] font-semibold hover:opacity-95 shadow-sm transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[19px]">add_circle</span>
                <span>+ Crear publicación</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. Banner de Anuncio Urgente / Oficial Destacado */}
        <section className="mb-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#004ac6] to-[#3750a0] text-white p-4 md:p-6 shadow-md">
            {/* Ambient decorative shapes */}
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
            <div className="absolute left-1/3 -top-12 w-32 h-32 rounded-full bg-[#8a4cfc]/20 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md text-white shrink-0 hidden sm:flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">campaign</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[11px] font-bold uppercase tracking-wider">
                      Oficial Urgente
                    </span>
                    <span className="text-[11px] text-[#dbe1ff] opacity-90 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      Publicado hoy, 07:30 AM
                    </span>
                  </div>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-[18px] md:text-[20px] text-white font-semibold leading-snug">
                    Suspensión de actividades presenciales este viernes por jornada pedagógica
                  </h2>
                  <p className="text-[13px] text-[#eeefff] leading-relaxed">
                    Todas las clases se desarrollarán de manera asincrónica en la plataforma ORBIA. La entrega de talleres asignados para esa fecha se mantiene en horario regular.
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={onOpenAnnouncement}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#004ac6] text-[13px] font-semibold hover:bg-[#f2f3ff] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                  type="button"
                >
                  <span>Ver detalles</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Grid Principal (8 cols feed / 4 cols panel lateral) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ================= COLUMNA IZQUIERDA / CENTRAL (Feed 8 columnas) ================= */}
          <main className="lg:col-span-8 flex flex-col gap-6">
            {/* SECCIÓN NOTICIAS */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004ac6] text-[22px]">newspaper</span>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#131b2e]">
                    Noticias Recientes
                  </h2>
                </div>
                <button
                  onClick={() => onNavigateTab('noticias')}
                  className="text-[12px] text-[#004ac6] hover:text-[#2563eb] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                >
                  Explorar archivo
                  <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                </button>
              </div>

              {/* Tarjeta Noticia 1 (Con foto & tags) */}
              <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#eaedff] flex flex-col">
                <div className="relative w-full h-56 md:h-64 overflow-hidden bg-slate-900">
                  <img
                    alt="Semana de la Ciencia y Tecnologia"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiPmaWwfTj_Xc_6da4rexpcB4yvE7-6-0p6XNDqHrFW241cWNgBtEh6kS6fQTuXChZDZRFaA1TalwOFCMqZdoZmAIYCtoRY6DHIxl4oh39Yzmi--PMdDC3c3-V9i1BOjRRb35ywr3w7HIxpyF01-wT9vy_8O0fo9s2Oamhgxm36wnBRb0MD0wHKnNnrLHBRmDf9rPM0AA7t8UmNjju6DF_f7mLy0eDCzligxN-dHEUhcqh6WTyNqDosQ"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#712ae2] text-white flex items-center justify-center font-bold text-[12px]">
                        CM
                      </div>
                      <div>
                        <p className="text-[12px] text-white leading-tight font-semibold">
                          Prof. Carlos Mendoza
                        </p>
                        <p className="text-[11px] text-slate-200">Dpto. de Ciencias Naturales</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md text-[#131b2e] text-[11px] font-semibold">
                      Hace 2 horas
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#004ac6] text-[11px] font-semibold">
                      #Ciencias
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#712ae2] text-[11px] font-semibold">
                      #Innovacion
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#3750a0] text-[11px] font-semibold">
                      #Feria2026
                    </span>
                  </div>

                  <h3
                    onClick={() => onNavigateTab('noticias')}
                    className="font-['Plus_Jakarta_Sans'] text-[20px] md:text-[22px] text-[#131b2e] font-bold leading-tight hover:text-[#004ac6] transition-colors cursor-pointer"
                  >
                    Inauguración de la Semana de la Ciencia y Tecnología 2026
                  </h3>

                  <p className="text-[14px] text-[#434655] leading-relaxed">
                    Damos apertura oficial al evento académico más esperado del ciclo escolar. Este año contaremos con proyectos de energías limpias, robótica aplicada y biotecnología escolar dirigidos por estudiantes de 9° a 11°. ¡Revisa el cronograma de exposiciones y asiste a las ponencias invitadas!
                  </p>

                  <div className="flex items-center justify-between pt-2 mt-1">
                    <button
                      onClick={() => onNavigateTab('noticias')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#004ac6] text-white text-[13px] font-semibold hover:bg-[#2563eb] transition-colors shadow-2xs cursor-pointer"
                      type="button"
                    >
                      <span>Leer noticia completa</span>
                      <span className="material-symbols-outlined text-[16px]">article</span>
                    </button>
                    <button
                      onClick={() => onNavigateTab('noticias')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#434655] text-[12px] font-semibold transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
                      <span>14 comentarios</span>
                    </button>
                  </div>
                </div>
              </article>

              {/* Tarjeta Noticia 2 (Institucional) */}
              <article className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col gap-2 border border-[#eaedff]">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#712ae2]"></div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#eaddff] text-[#5a00c6] flex items-center justify-center font-bold text-[13px]">
                      CA
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#131b2e]">
                          Coordinación Académica
                        </span>
                        <span className="px-2 py-0.2 rounded-full bg-[#eaddff] text-[#712ae2] text-[11px] font-semibold">
                          Gestión
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737686]">Ayer, 04:15 PM</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#737686]">bookmark_border</span>
                </div>

                <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] text-[#131b2e] font-bold mt-1">
                  Reunión General de Padres de Familia — II Periodo
                </h3>

                <p className="text-[14px] text-[#434655] leading-relaxed">
                  Se informa a toda la comunidad estudiantil que el encuentro presencial con padres y tutores se llevará a cabo en el auditorio central este sábado 24 de marzo. Se hará entrega del informe cualitativo y corte de notas parciales de 10° grado.
                </p>

                <div className="flex items-center justify-between pt-2 mt-1">
                  <div className="flex items-center gap-3 text-[#737686] text-[11px]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">location_on</span>
                      Auditorio Mayor
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">group</span>
                      Padres y Acudientes
                    </span>
                  </div>
                  <button
                    onClick={() => alert('Descargando: Circular_Citacion_Padres_II_Periodo.pdf')}
                    className="text-[12px] text-[#712ae2] hover:text-[#5a00c6] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    type="button"
                  >
                    Descargar citación PDF
                    <span className="material-symbols-outlined text-[16px]">download</span>
                  </button>
                </div>
              </article>
            </section>

            {/* SECCIÓN FORO Y PREGUNTAS (Feed Preview) */}
            <section className="flex flex-col gap-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#712ae2] text-[22px]">forum</span>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#131b2e]">
                    Conversaciones y Foro Académico
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#737686]">Filtrar:</span>
                  <button
                    onClick={() => setForumFilter('mis-materias')}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                      forumFilter === 'mis-materias'
                        ? 'bg-[#004ac6] text-white'
                        : 'bg-[#eaedff] text-[#434655] hover:bg-[#e2e7ff]'
                    }`}
                    type="button"
                  >
                    Mis materias
                  </button>
                  <button
                    onClick={() => setForumFilter('todo-el-grado')}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                      forumFilter === 'todo-el-grado'
                        ? 'bg-[#004ac6] text-white'
                        : 'bg-[#eaedff] text-[#434655] hover:bg-[#e2e7ff]'
                    }`}
                    type="button"
                  >
                    Todo el grado
                  </button>
                </div>
              </div>

              {/* Feed items */}
              {displayPosts.slice(0, 2).map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-[#eaedff] flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {post.authorAvatarUrl ? (
                        <img
                          alt={post.author}
                          className="w-10 h-10 rounded-full object-cover"
                          src={post.authorAvatarUrl}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center font-bold text-[13px]">
                          {post.authorAvatarText || post.author.slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[14px] font-bold text-[#131b2e]">
                            {post.author}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-semibold">
                            {post.authorRole}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6] text-[11px] font-semibold">
                            {post.subjectBadge}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#737686]">{post.timeAgo}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigateTab('foro-academico')}
                      className="text-[#737686] hover:text-[#131b2e] p-1 cursor-pointer"
                      title="Ver en foro"
                    >
                      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    </button>
                  </div>

                  <div>
                    <h4
                      onClick={() => onNavigateTab('foro-academico')}
                      className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#131b2e] font-bold mb-1 hover:text-[#004ac6] transition-colors cursor-pointer"
                    >
                      {post.title}
                    </h4>
                    <p className="text-[14px] text-[#434655] leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  {/* Micro comments thread preview */}
                  {post.comments.length > 0 && (
                    <div className="bg-[#f2f3ff] rounded-xl p-4 flex flex-col gap-2.5">
                      <div className="text-[11px] text-[#737686] font-bold uppercase tracking-wider">
                        Respuestas destacadas de compañeros
                      </div>

                      {post.comments.slice(0, 2).map((comment) => (
                        <div
                          key={comment.id}
                          className="flex items-start gap-2.5 bg-white p-3 rounded-lg shadow-2xs"
                        >
                          <div className="w-7 h-7 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                            {comment.avatarText || comment.author.slice(0, 1)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[12px] font-bold text-[#131b2e]">
                                  {comment.author}{' '}
                                  <span className="font-normal text-[#737686] text-[11px]">
                                    ({comment.roleBadge})
                                  </span>
                                </span>
                                {comment.highlightSolution && (
                                  <span className="px-1.5 py-0.2 rounded bg-green-100 text-green-800 text-[10px] font-bold">
                                    Aportó solución
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-[#737686]">{comment.timeAgo}</span>
                            </div>
                            <p className="text-[12px] text-[#434655] mt-0.5 leading-relaxed">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action bar */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => onLikePost(post.id)}
                        className={`inline-flex items-center gap-1.5 text-[12px] font-semibold cursor-pointer transition-colors ${
                          post.userLiked ? 'text-[#004ac6]' : 'text-[#434655] hover:text-[#004ac6]'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                        <span>{post.likes} útil</span>
                      </button>

                      <span className="text-[11px] text-[#737686] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        {post.comments.length} respuestas
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setReplyInputOpen(replyInputOpen === post.id ? null : post.id)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eaedff] hover:bg-[#e2e7ff] text-[#004ac6] text-[12px] font-bold transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">reply</span>
                      <span>Responder a la duda</span>
                    </button>
                  </div>

                  {/* Expandable quick reply box */}
                  {replyInputOpen === post.id && (
                    <div className="pt-2 animate-in fade-in">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && replyText.trim()) {
                              onReplyToPost(post.id, replyText);
                              setReplyText('');
                              setReplyInputOpen(null);
                            }
                          }}
                          className="flex-1 px-3 py-2 rounded-lg bg-[#f2f3ff] text-[13px] text-[#131b2e] placeholder:text-[#737686] focus:outline-none focus:ring-2 focus:ring-[#004ac6]/25 border border-[#dae2fd]"
                          placeholder="Escribe tu explicación o sugerencia..."
                        />
                        <button
                          onClick={() => {
                            if (replyText.trim()) {
                              onReplyToPost(post.id, replyText);
                              setReplyText('');
                              setReplyInputOpen(null);
                            }
                          }}
                          className="px-3 py-2 rounded-lg bg-[#004ac6] text-white text-[12px] font-semibold hover:bg-[#2563eb] cursor-pointer"
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>
          </main>

          {/* ================= COLUMNA DERECHA (Widgets de gestión académica) ================= */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* PRÓXIMAS ENTREGAS */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-[#eaedff] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004ac6] text-[22px]">assignment</span>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#131b2e]">
                    Próximas Entregas
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold">
                  {assignments.length} pendientes
                </span>
              </div>

              {/* Timeline de tareas */}
              <div className="flex flex-col gap-2.5">
                {assignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="p-3 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors flex items-start gap-3"
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        asg.statusType === 'danger'
                          ? 'bg-red-100 text-[#ba1a1a]'
                          : asg.statusType === 'purple'
                          ? 'bg-purple-100 text-[#712ae2]'
                          : 'bg-blue-100 text-[#004ac6]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {asg.statusType === 'danger'
                          ? 'warning'
                          : asg.statusType === 'purple'
                          ? 'quiz'
                          : 'group_work'}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-[12px] font-bold uppercase tracking-wider truncate ${
                            asg.statusType === 'danger'
                              ? 'text-[#ba1a1a]'
                              : asg.statusType === 'purple'
                              ? 'text-[#712ae2]'
                              : 'text-[#004ac6]'
                          }`}
                        >
                          {asg.subject}
                        </span>
                        <span className="text-[11px] text-[#737686] font-semibold shrink-0">
                          {asg.dueText}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#131b2e] font-semibold truncate mt-0.5">
                        {asg.title}
                      </p>
                      <div className="flex items-center justify-between text-[#737686] text-[11px] mt-1">
                        <span>{asg.dueTime}</span>
                        <span
                          className={`px-2 py-0.2 rounded-full font-semibold ${
                            asg.status === 'Sin enviar'
                              ? 'bg-amber-100 text-amber-900'
                              : asg.status === 'En progreso'
                              ? 'bg-green-100 text-green-900'
                              : 'bg-blue-100 text-[#004ac6]'
                          }`}
                        >
                          {asg.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigateTab('academico-y-tareas')}
                className="w-full py-2.5 rounded-lg bg-[#eaedff] hover:bg-[#e2e7ff] text-[#131b2e] text-[12px] font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[17px]">event_note</span>
                <span>Ver calendario académico completo</span>
              </button>
            </section>

            {/* ACTIVIDAD EN VIVO */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-[#eaedff] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#712ae2] text-[22px]">
                    notifications_active
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#131b2e]">
                    Actividad en Vivo
                  </h3>
                </div>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#712ae2] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#712ae2]"></span>
                </span>
              </div>
              <p className="text-[11px] text-[#737686]">Actualizado en tiempo real</p>

              <div className="flex flex-col gap-2">
                <div className="p-2.5 rounded-lg hover:bg-[#f2f3ff] transition-colors flex items-start gap-2.5 cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-[#712ae2] mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[12px] text-[#131b2e] leading-snug">
                      <span className="font-semibold text-[#712ae2]">Coordinación</span> publicó una nueva circular informativa sobre matrículas extraordinarias.
                    </p>
                    <span className="text-[10px] text-[#737686]">Hace 10 min</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg hover:bg-[#f2f3ff] transition-colors flex items-start gap-2.5 cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-[#004ac6] mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[12px] text-[#131b2e] leading-snug">
                      <span className="font-semibold text-[#004ac6]">María José</span> respondió tu comentario en el Foro de Matemáticas.
                    </p>
                    <span className="text-[10px] text-[#737686]">Hace 25 min</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg hover:bg-[#f2f3ff] transition-colors flex items-start gap-2.5 cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-[#c3c6d7] mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[12px] text-[#131b2e] leading-snug">
                      <span className="font-semibold text-[#131b2e]">Prof. Ramírez</span> asignó la nueva rúbrica para el informe de Biología Celular.
                    </p>
                    <span className="text-[10px] text-[#737686]">Hace 1 hora</span>
                  </div>
                </div>
              </div>
            </section>

            {/* PRÓXIMOS EVENTOS ESCOLARES & ASISTENCIA */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-[#eaedff] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#3750a0] text-[22px]">event</span>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#131b2e]">
                    Próximos Eventos
                  </h3>
                </div>
                <span className="material-symbols-outlined text-[#737686] text-[18px]">
                  calendar_today
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f2f3ff]">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-[#eaedff] text-[#004ac6] shrink-0">
                    <span className="text-[11px] uppercase font-bold leading-none">MAR</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold leading-none mt-0.5">
                      26
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#131b2e] truncate">
                      Club de Robótica &amp; STEM
                    </p>
                    <p className="text-[11px] text-[#737686] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      Martes • 3:00 PM (Lab 2)
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[#737686] hover:text-[#004ac6] cursor-pointer text-[18px]">
                    notifications_none
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f2f3ff]">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-[#eaddff] text-[#712ae2] shrink-0">
                    <span className="text-[11px] uppercase font-bold leading-none">MAR</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold leading-none mt-0.5">
                      29
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#131b2e] truncate">
                      Simulacro Pruebas Saber 10°
                    </p>
                    <p className="text-[11px] text-[#737686] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      Viernes • 8:00 AM (Salones 10A-B)
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[#737686] hover:text-[#712ae2] cursor-pointer text-[18px]">
                    notifications_none
                  </span>
                </div>
              </div>

              {/* Asistencia Semanal */}
              <div className="mt-1 p-3 rounded-lg bg-[#dbe1ff]/30 flex flex-col gap-1.5 border border-[#dae2fd]">
                <div className="flex items-center justify-between text-[#131b2e] text-[11px]">
                  <span className="font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#004ac6]">
                      verified
                    </span>
                    Asistencia acumulada: 98%
                  </span>
                  <span className="text-[#004ac6] font-bold">Excelente</span>
                </div>
                <div className="w-full bg-[#eaedff] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#004ac6] h-full rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};
