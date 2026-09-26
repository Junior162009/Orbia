import React, { useState, useRef } from 'react';
import { ForumPost } from '../types';

interface ForoAcademicoViewProps {
  posts: ForumPost[];
  onAddPost: (post: Omit<ForumPost, 'id' | 'likes' | 'repliesCount' | 'comments'>) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

export const ForoAcademicoView: React.FC<ForoAcademicoViewProps> = ({
  posts,
  onAddPost,
  onLikePost,
  onAddComment
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterTeacherVerified, setFilterTeacherVerified] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<'recent' | 'popular'>('recent');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formSubject, setFormSubject] = useState('Matemáticas (Trigonometría)');
  const [formContent, setFormContent] = useState('');
  const [hasAttachment, setHasAttachment] = useState(true);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  const publishCardRef = useRef<HTMLDivElement>(null);

  const scrollToPublish = () => {
    publishCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    onAddPost({
      author: 'Alejandro V.',
      authorRole: 'Estudiante 10°A',
      authorAvatarText: 'AV',
      timeAgo: 'Justo ahora',
      campusLocation: 'Campus Central',
      subjectBadge: `📐 ${formSubject}`,
      subjectCategory: 'math',
      title: formTitle,
      description: formContent,
      category: 'Academico',
      attachmentName: hasAttachment ? 'ejercicio_geometria.pdf (1.2 MB)' : undefined
    });

    setFormTitle('');
    setFormContent('');
  };

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    if (filterTeacherVerified && !post.comments.some((c) => c.isVerifiedTeacher)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.subjectBadge.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8">
        {/* 1. Encabezado del Foro Heroico & Buscador Asimétrico */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#004ac6] via-[#2563eb] to-[#712ae2] p-6 md:p-8 shadow-xl text-white">
          <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-[#8a4cfc]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[12px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Comunidad Activa • 142 Estudiantes &amp; 18 Docentes en línea</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans'] text-[28px] md:text-[38px] text-white font-extrabold tracking-tight">
                Foro Académico y Estudiantil
              </h1>
              <p className="text-[15px] text-[#eeefff] max-w-xl leading-relaxed">
                Pregunta, colabora y resuelve dudas con tus compañeros y docentes en tiempo real con respaldo institucional.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={scrollToPublish}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#004ac6] hover:bg-white/90 text-[14px] font-bold shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>+ Crear Publicación</span>
              </button>
            </div>
          </div>

          {/* Barra de Filtro Rápido Integrada */}
          <div className="mt-6 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#737686] text-[20px]">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-[#131b2e] text-[14px] placeholder:text-[#737686] focus:outline-none shadow-sm"
                placeholder="Filtrar por tema, materia, profesor o palabra clave..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSortOrder(sortOrder === 'recent' ? 'popular' : 'recent')}
                className={`px-3 py-2 rounded-lg backdrop-blur text-[13px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  sortOrder === 'recent' ? 'bg-white/30 text-white' : 'bg-white/15 text-white/90'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[17px]">sort</span>
                <span>{sortOrder === 'recent' ? 'Más recientes' : 'Más votados'}</span>
              </button>

              <button
                onClick={() => setFilterTeacherVerified(!filterTeacherVerified)}
                className={`px-3 py-2 rounded-lg backdrop-blur text-[13px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  filterTeacherVerified ? 'bg-white text-[#004ac6] shadow' : 'bg-white/15 text-white'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[17px]">verified</span>
                <span>Solo Respuestas de Docentes</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Navegación por Categorías con Pills Dinámicas y Métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            onClick={() => setSelectedCategory(selectedCategory === 'Academico' ? 'all' : 'Academico')}
            className={`cursor-pointer p-4 rounded-xl transition-all shadow-sm group border ${
              selectedCategory === 'Academico'
                ? 'bg-[#dbe1ff] border-[#004ac6]'
                : 'bg-[#f2f3ff] hover:bg-[#e2e7ff] border-transparent'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-[#dbe1ff] text-[#004ac6] font-bold">
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#004ac6] text-white text-[11px] font-bold">
                48 activas
              </span>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#131b2e] group-hover:text-[#004ac6] transition-colors">
              Académico
            </h3>
            <p className="text-[12px] text-[#434655]">Matemáticas, Ciencias, Tecnología, Lengua</p>
          </div>

          <div
            onClick={() => setSelectedCategory(selectedCategory === 'General' ? 'all' : 'General')}
            className={`cursor-pointer p-4 rounded-xl transition-all shadow-sm group border ${
              selectedCategory === 'General'
                ? 'bg-[#eaddff] border-[#712ae2]'
                : 'bg-white hover:bg-[#f2f3ff] border-[#eaedff]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-[#eaddff] text-[#712ae2] font-bold">
                <span className="material-symbols-outlined text-[20px]">forum</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#131b2e] text-[11px] font-bold">
                26 temas
              </span>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#131b2e] group-hover:text-[#712ae2] transition-colors">
              General
            </h3>
            <p className="text-[12px] text-[#434655]">Proyectos de grado, tertulias, colaboración</p>
          </div>

          <div
            onClick={() => setSelectedCategory(selectedCategory === 'Preguntas' ? 'all' : 'Preguntas')}
            className={`cursor-pointer p-4 rounded-xl transition-all shadow-sm group border ${
              selectedCategory === 'Preguntas'
                ? 'bg-[#dce1ff] border-[#3750a0]'
                : 'bg-white hover:bg-[#f2f3ff] border-[#eaedff]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-[#dce1ff] text-[#3750a0] font-bold">
                <span className="material-symbols-outlined text-[20px]">live_help</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold">
                12 sin resolver
              </span>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#131b2e] group-hover:text-[#3750a0] transition-colors">
              Preguntas &amp; Dudas
            </h3>
            <p className="text-[12px] text-[#434655]">Talleres guiados con verificación docente</p>
          </div>

          <div
            onClick={() => setSelectedCategory(selectedCategory === 'Institucional' ? 'all' : 'Institucional')}
            className={`cursor-pointer p-4 rounded-xl transition-all shadow-sm group border ${
              selectedCategory === 'Institucional'
                ? 'bg-[#eaedff] border-[#004ac6]'
                : 'bg-white hover:bg-[#f2f3ff] border-[#eaedff]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-[#dae2fd] text-[#131b2e] font-bold">
                <span className="material-symbols-outlined text-[20px]">campaign</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#434655] text-[11px] font-bold">
                Oficial
              </span>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#131b2e] group-hover:text-[#004ac6] transition-colors">
              Institucional
            </h3>
            <p className="text-[12px] text-[#434655]">Debates académicos, convocatorias y ferias</p>
          </div>
        </div>

        {/* 3. Formulario Expandible / Módulo 'Crear Publicación' */}
        <section
          ref={publishCardRef}
          className="bg-white rounded-xl shadow-md p-6 border border-[#dae2fd] transition-all duration-300"
          id="publish-card"
        >
          <div className="flex items-center justify-between pb-2 mb-4 border-b border-[#eaedff]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] font-bold">
                <span className="material-symbols-outlined text-[22px]">edit_note</span>
              </div>
              <div>
                <h2 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#131b2e]">
                  Crear una nueva publicación o consulta
                </h2>
                <p className="text-[12px] text-[#434655]">
                  Tu pregunta será visible para todo tu grado y profesores tutores
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#004ac6]/10 text-[#004ac6] text-[11px] font-bold">
              Tutoría abierta
            </span>
          </div>

          <form className="space-y-4" onSubmit={handleCreatePost}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[12px] font-semibold text-[#131b2e] mb-1">
                  Título claro y descriptivo de la duda
                </label>
                <input
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f2f3ff] rounded-lg text-[#131b2e] text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20 transition-all border border-[#dae2fd]"
                  placeholder="Ej: ¿Cómo resolver la derivada implícita en el punto 3?"
                  type="text"
                  required
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#131b2e] mb-1">
                  Materia o Asignatura
                </label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f2f3ff] rounded-lg text-[#131b2e] text-[13px] font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20 border border-[#dae2fd]"
                >
                  <option value="Matemáticas (Trigonometría)">📐 Matemáticas (Trigonometría)</option>
                  <option value="Física Mecánica">⚡ Física Mecánica</option>
                  <option value="Química Orgánica">🧪 Química Orgánica</option>
                  <option value="Lengua Castellana">📖 Lengua Castellana</option>
                  <option value="Inglés B2">🇬🇧 Inglés B2</option>
                  <option value="Ciencias Sociales">🌍 Ciencias Sociales</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#131b2e] mb-1">
                Detalle de la consulta o contenido
              </label>
              <div className="rounded-lg bg-[#f2f3ff] p-3 border border-[#dae2fd]">
                <div className="flex items-center gap-1 pb-2 mb-2 border-b border-[#dae2fd] text-[#434655]">
                  <button
                    type="button"
                    onClick={() => setFormContent((c) => c + ' **negrita** ')}
                    className="p-1 rounded hover:bg-[#eaedff] cursor-pointer"
                    title="Negrita"
                  >
                    <span className="material-symbols-outlined text-[18px]">format_bold</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormContent((c) => c + ' *cursiva* ')}
                    className="p-1 rounded hover:bg-[#eaedff] cursor-pointer"
                    title="Cursiva"
                  >
                    <span className="material-symbols-outlined text-[18px]">format_italic</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormContent((c) => c + ' (tan(θ) + cot(θ)) ')}
                    className="p-1 rounded hover:bg-[#eaedff] cursor-pointer"
                    title="Fórmula matemática"
                  >
                    <span className="material-symbols-outlined text-[18px]">functions</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormContent((c) => c + '\n- ')}
                    className="p-1 rounded hover:bg-[#eaedff] cursor-pointer"
                    title="Lista con viñetas"
                  >
                    <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormContent((c) => c + ' `código` ')}
                    className="p-1 rounded hover:bg-[#eaedff] cursor-pointer"
                    title="Código"
                  >
                    <span className="material-symbols-outlined text-[18px]">code</span>
                  </button>
                </div>
                <textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full bg-transparent text-[#131b2e] text-[14px] focus:outline-none resize-none px-1"
                  placeholder="Explica detalladamente dónde te trabaste o cuál ha sido tu avance previo para que otros puedan ayudarte con precisión..."
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Archivo Adjunto Preview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
              {hasAttachment ? (
                <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-1.5 rounded-lg border border-[#dae2fd]">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">
                    picture_as_pdf
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-[12px] font-semibold text-[#131b2e]">
                      ejercicio_geometria.pdf
                    </span>
                    <span className="text-[11px] text-[#737686]">1.2 MB • Listo para subir</span>
                  </div>
                  <button
                    onClick={() => setHasAttachment(false)}
                    className="text-[#737686] hover:text-[#ba1a1a] ml-2 cursor-pointer"
                    title="Eliminar adjunto"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setHasAttachment(true)}
                  className="text-[12px] text-[#004ac6] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">attach_file</span>
                  Añadir archivo de ejemplo
                </button>
              )}

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => alert('Selector de archivo: PDF, JPG, PNG soportados.')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#eaedff] text-[#434655] hover:text-[#131b2e] text-[12px] font-semibold transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">attach_file</span>
                  Adjuntar otro archivo
                </button>
                <button
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#004ac6] to-[#712ae2] text-white text-[13px] font-bold shadow hover:opacity-95 transition-opacity cursor-pointer"
                  type="submit"
                >
                  Publicar duda
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Layout Asimétrico Principal: Feed (8 cols) + Lateral (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* FEED DE PUBLICACIONES (8 Columnas) */}
          <div className="lg:col-span-8 space-y-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm p-6 space-y-4 border border-[#eaedff] transition-all hover:shadow-md"
              >
                {/* Meta del autor & Categoría */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center font-bold text-[13px]">
                      {post.authorAvatarText || post.author.slice(0, 2)}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-['Plus_Jakarta_Sans'] text-[15px] font-bold text-[#131b2e]">
                          {post.author}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#004ac6]/10 text-[#004ac6] text-[11px] font-semibold">
                          {post.authorRole}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737686]">
                        {post.timeAgo} • {post.campusLocation}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#eaddff] text-[#5a00c6] text-[12px] font-semibold">
                      {post.subjectBadge}
                    </span>
                    <button className="text-[#737686] hover:text-[#131b2e] p-1 rounded-lg">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </div>
                </div>

                {/* Contenido Central */}
                <div className="space-y-2.5">
                  <h2 className="font-['Plus_Jakarta_Sans'] text-[18px] md:text-[20px] text-[#131b2e] font-bold hover:text-[#004ac6] transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-[14px] text-[#434655] leading-relaxed">
                    {post.description}
                  </p>

                  {/* Formula Block Highlight */}
                  {post.formulaBlock && (
                    <div className="p-3.5 rounded-lg bg-[#f2f3ff] font-mono text-[14px] text-[#004ac6] font-bold flex items-center justify-between border border-[#dae2fd]">
                      <span>{post.formulaBlock}</span>
                      {post.formulaNote && (
                        <span className="text-[11px] text-[#737686] font-normal">
                          {post.formulaNote}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Previsualización de Imagen Adjunta */}
                  {post.attachmentImage && (
                    <div className="relative rounded-xl overflow-hidden shadow-sm bg-[#eaedff] max-h-72">
                      <img
                        className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                        alt={post.title}
                        src={post.attachmentImage}
                      />
                      <div className="absolute bottom-2 left-2 px-3 py-1 bg-[#283044]/80 backdrop-blur-md rounded-lg text-white text-[11px] flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-[14px]">attachment</span>
                        <span>{post.attachmentName}</span>
                      </div>
                    </div>
                  )}

                  {/* Sub-block for specific progress like Diana Rojas Chemistry guide */}
                  {post.id === 'post-3' && (
                    <div className="p-4 rounded-lg bg-[#f2f3ff] flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#dae2fd]">
                      <div className="flex items-center gap-3">
                        <svg className="w-12 h-12 -rotate-90 text-[#004ac6]" viewBox="0 0 36 36">
                          <path
                            className="text-[#dae2fd]"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="72, 100"
                            strokeLinecap="round"
                            strokeWidth="4"
                          />
                        </svg>
                        <div>
                          <div className="text-[13px] font-bold text-[#131b2e]">
                            72% de estudiantes han consultado la guía
                          </div>
                          <div className="text-[11px] text-[#737686]">
                            Plazo de entrega límite: Viernes 11:59 PM
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => alert('Descarga iniciada: Guia_Laboratorio_pH.pdf')}
                        className="px-3 py-1.5 rounded-lg bg-white text-[#004ac6] text-[12px] font-semibold hover:bg-[#eaedff] transition-colors shadow-2xs border border-[#dae2fd] cursor-pointer"
                      >
                        Descargar guía .PDF
                      </button>
                    </div>
                  )}
                </div>

                {/* Barra de Interacciones */}
                <div className="flex items-center justify-between pt-2 border-t border-[#eaedff] text-[#434655] text-[12px]">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onLikePost(post.id)}
                      className="flex items-center gap-1.5 hover:text-[#ba1a1a] transition-colors group cursor-pointer"
                      type="button"
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] transition-transform group-hover:scale-110 ${
                          post.userLiked ? 'text-[#ba1a1a]' : 'text-[#737686]'
                        }`}
                      >
                        favorite
                      </span>
                      <span className="font-bold text-[#131b2e]">{post.likes}</span> Me gusta
                    </button>

                    <button
                      className="flex items-center gap-1.5 text-[#004ac6] font-bold transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                      <span>{post.comments.length} Respuestas</span>
                    </button>

                    <button
                      onClick={() => alert('Enlace del foro copiado al portapapeles.')}
                      className="flex items-center gap-1.5 hover:text-[#131b2e] transition-colors hidden sm:flex cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                      Compartir
                    </button>
                  </div>

                  <button
                    onClick={() => alert('Publicación guardada en tus marcadores de estudio.')}
                    className="flex items-center gap-1 hover:text-[#712ae2] transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">bookmark</span>
                    <span className="hidden sm:inline">Guardar</span>
                  </button>
                </div>

                {/* Hilo de Comentarios Estructurado */}
                <div className="pt-3 space-y-3 bg-[#f2f3ff]/60 rounded-xl p-4 border border-[#eaedff]">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-[#131b2e]">
                      Respuestas del curso ({post.comments.length} comentarios)
                    </span>
                    {post.comments.some((c) => c.isVerifiedTeacher) && (
                      <span className="text-[11px] text-[#004ac6] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">check_circle</span>
                        1 Verificada por Docente
                      </span>
                    )}
                  </div>

                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-2.5">
                      {comment.isVerifiedTeacher ? (
                        <div className="w-8 h-8 rounded-full bg-[#8a4cfc] flex items-center justify-center text-white font-bold text-[12px] shrink-0">
                          <span className="material-symbols-outlined text-[16px]">school</span>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#dae2fd] flex items-center justify-center font-bold text-[#434655] text-[11px] shrink-0">
                          {comment.avatarText || comment.author.slice(0, 2)}
                        </div>
                      )}

                      <div
                        className={`flex-1 p-3 rounded-xl rounded-tl-none shadow-2xs ${
                          comment.isVerifiedTeacher
                            ? 'bg-[#eaddff]/30 border border-[#712ae2]/30'
                            : 'bg-white border border-[#eaedff]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-bold text-[#131b2e]">
                              {comment.author}
                            </span>
                            {comment.isVerifiedTeacher ? (
                              <span className="px-2 py-0.5 rounded-full bg-[#712ae2] text-white text-[10px] flex items-center gap-1 font-bold">
                                <span className="material-symbols-outlined text-[11px]">verified</span>
                                Docente
                              </span>
                            ) : (
                              <span className="text-[#737686] text-[11px]">
                                • {comment.roleBadge}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#737686]">{comment.timeAgo}</span>
                        </div>

                        <p className="text-[13px] text-[#131b2e] leading-relaxed">
                          {comment.content}
                        </p>

                        {comment.upvotes && (
                          <div className="mt-2 flex items-center gap-2 text-[11px] text-[#712ae2] font-semibold">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                              {comment.upvotes} personas útil
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Caja de Respuesta Rápida */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      value={replyInputs[post.id] || ''}
                      onChange={(e) =>
                        setReplyInputs({ ...replyInputs, [post.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && (replyInputs[post.id] || '').trim()) {
                          onAddComment(post.id, replyInputs[post.id]);
                          setReplyInputs({ ...replyInputs, [post.id]: '' });
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-white rounded-lg text-[13px] text-[#131b2e] placeholder:text-[#737686] focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20 shadow-2xs border border-[#dae2fd]"
                      placeholder="Escribe una respuesta o pregunta algo sobre este paso..."
                      type="text"
                    />
                    <button
                      onClick={() => {
                        const text = (replyInputs[post.id] || '').trim();
                        if (text) {
                          onAddComment(post.id, text);
                          setReplyInputs({ ...replyInputs, [post.id]: '' });
                        }
                      }}
                      className="px-4 py-2 rounded-lg bg-[#004ac6] text-white text-[12px] font-bold hover:bg-[#2563eb] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                      type="button"
                    >
                      Responder
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* BARRA LATERAL DERECHA (4 Columnas) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Tarjeta 1: Materias Más Activas con Indicadores */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 border border-[#eaedff]">
              <div className="flex items-center justify-between">
                <h3 className="font-['Plus_Jakarta_Sans'] text-[17px] font-bold text-[#131b2e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004ac6]">local_fire_department</span>
                  Materias Más Activas
                </h3>
                <span className="text-[11px] text-[#737686]">Esta semana</span>
              </div>

              <div className="space-y-2.5">
                <div className="p-2.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#004ac6] text-white flex items-center justify-center font-bold text-[11px]">
                      MT
                    </span>
                    <div>
                      <div className="text-[13px] text-[#131b2e] font-semibold">
                        Trigonometría &amp; Cálculo
                      </div>
                      <div className="text-[11px] text-[#737686]">10° y 11° Bachillerato</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] text-[#004ac6] font-bold">+38 dudas</span>
                    <div className="w-16 h-1.5 rounded-full bg-[#dae2fd] mt-1 overflow-hidden">
                      <div className="w-4/5 h-full bg-[#004ac6] rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#712ae2] text-white flex items-center justify-center font-bold text-[11px]">
                      QM
                    </span>
                    <div>
                      <div className="text-[13px] text-[#131b2e] font-semibold">
                        Química Analítica
                      </div>
                      <div className="text-[11px] text-[#737686]">10° A y B</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] text-[#712ae2] font-bold">+24 dudas</span>
                    <div className="w-16 h-1.5 rounded-full bg-[#dae2fd] mt-1 overflow-hidden">
                      <div className="w-3/5 h-full bg-[#712ae2] rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#3750a0] text-white flex items-center justify-center font-bold text-[11px]">
                      FS
                    </span>
                    <div>
                      <div className="text-[13px] text-[#131b2e] font-semibold">
                        Física: Termodinámica
                      </div>
                      <div className="text-[11px] text-[#737686]">11° Grado</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] text-[#3750a0] font-bold">+19 dudas</span>
                    <div className="w-16 h-1.5 rounded-full bg-[#dae2fd] mt-1 overflow-hidden">
                      <div className="w-1/2 h-full bg-[#3750a0] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta 2: Top Colaboradores Estudiantiles del Mes */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 border border-[#eaedff]">
              <div className="flex items-center justify-between">
                <h3 className="font-['Plus_Jakarta_Sans'] text-[17px] font-bold text-[#131b2e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500">military_tech</span>
                  Top Colaboradores
                </h3>
                <span className="text-[11px] text-[#004ac6] font-bold">Mayo 2026</span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[13px]">
                        MF
                      </div>
                      <span className="absolute -top-1 -right-1 text-base">🥇</span>
                    </div>
                    <div>
                      <div className="text-[13px] text-[#131b2e] font-bold">María Fernández</div>
                      <div className="text-[11px] text-[#434655]">24 respuestas verificadas</div>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-amber-600">+480 pts</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2f3ff]">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-[#c3c6d7] text-[#131b2e] flex items-center justify-center font-bold text-[13px]">
                        AL
                      </div>
                      <span className="absolute -top-1 -right-1 text-base">🥈</span>
                    </div>
                    <div>
                      <div className="text-[13px] text-[#131b2e] font-semibold">Andrés Londoño</div>
                      <div className="text-[11px] text-[#737686]">18 respuestas verificadas</div>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-[#434655]">+350 pts</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2f3ff]">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-[#dce1ff] text-[#00164e] flex items-center justify-center font-bold text-[13px]">
                        VR
                      </div>
                      <span className="absolute -top-1 -right-1 text-base">🥉</span>
                    </div>
                    <div>
                      <div className="text-[13px] text-[#131b2e] font-semibold">Valeria Ríos</div>
                      <div className="text-[11px] text-[#737686]">14 respuestas verificadas</div>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-[#434655]">+290 pts</span>
                </div>
              </div>
            </div>

            {/* Tarjeta 3: Normas de Convivencia Académica */}
            <div className="bg-[#f2f3ff] rounded-xl p-6 space-y-2 border border-[#dae2fd]">
              <div className="flex items-center gap-2 text-[#004ac6] font-bold">
                <span className="material-symbols-outlined text-[20px]">gavel</span>
                <h4 className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#131b2e] font-bold">
                  Código de Convivencia
                </h4>
              </div>
              <p className="text-[12px] text-[#434655]">
                Para garantizar un entorno seguro, riguroso y respetuoso, ten en cuenta las normas oficiales:
              </p>
              <ul className="space-y-1.5 pt-1 text-[12px] text-[#131b2e]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#004ac6] text-[16px] shrink-0 mt-0.5">
                    check
                  </span>
                  <span>
                    <strong>Respeto mutuo:</strong> Cero tolerancia al ciberacoso o comentarios denigrantes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#004ac6] text-[16px] shrink-0 mt-0.5">
                    check
                  </span>
                  <span>
                    <strong>Claridad académica:</strong> Comparte el razonamiento, no solo la respuesta final.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#004ac6] text-[16px] shrink-0 mt-0.5">
                    check
                  </span>
                  <span>
                    <strong>Fuentes confiables:</strong> Cita libros, fórmulas o enlaces pedagógicos.
                  </span>
                </li>
              </ul>
              <div className="pt-2">
                <a
                  className="text-[12px] text-[#004ac6] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Reglamento Estudiantil: Versión 2026 consultable en biblioteca.');
                  }}
                >
                  Leer reglamento estudiantil institucional →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
