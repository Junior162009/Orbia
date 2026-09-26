import React, { useState } from 'react';

interface ArticleItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  department: string;
  tags: string[];
  imageUrl: string;
  content: string;
  commentsCount: number;
}

export const NoticiasView: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('todos');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  const articles: ArticleItem[] = [
    {
      id: 'art-1',
      title: 'Inauguración de la Semana de la Ciencia y Tecnología 2026',
      subtitle:
        'Damos apertura oficial al evento académico más esperado del ciclo escolar con proyectos de energías limpias, robótica aplicada y biotecnología escolar.',
      date: 'Publicado hoy, 08:00 AM',
      author: 'Prof. Carlos Mendoza',
      department: 'Dpto. de Ciencias Naturales',
      tags: ['Ciencias', 'Innovacion', 'Feria2026'],
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAiPmaWwfTj_Xc_6da4rexpcB4yvE7-6-0p6XNDqHrFW241cWNgBtEh6kS6fQTuXChZDZRFaA1TalwOFCMqZdoZmAIYCtoRY6DHIxl4oh39Yzmi--PMdDC3c3-V9i1BOjRRb35ywr3w7HIxpyF01-wT9vy_8O0fo9s2Oamhgxm36wnBRb0MD0wHKnNnrLHBRmDf9rPM0AA7t8UmNjju6DF_f7mLy0eDCzligxN-dHEUhcqh6WTyNqDosQ',
      content: `La comunidad académica de la Institución Educativa Siglo XXI celebra la inauguración formal de la XII edición de la Semana de la Ciencia y Tecnología. Durante los próximos cuatro días, más de 300 estudiantes desde grado 6° hasta 11° expondrán prototipos interactivos, investigaciones de campo y experimentos de vanguardia en los pabellones de laboratorios.\n\nEntre las propuestas más sobresalientes de este año destacan los biodigestores a pequeña escala diseñados por 10°A, los sistemas autónomos de riego solar creados por el Club de Robótica y las investigaciones microbianas de suelos del entorno local guiadas por la profesora Diana Rojas.\n\n"La experimentación científica no es una asignatura aislada, sino una mentalidad de rigor, curiosidad y compromiso social que transforma a nuestros jóvenes", expresó el profesor Carlos Mendoza durante el discurso inaugural en el auditorio central.`,
      commentsCount: 14
    },
    {
      id: 'art-2',
      title: 'Estudiantes de Robótica triunfan en el Torneo Regional 2026',
      subtitle:
        'El semillero de tecnología liderado por estudiantes de 10° y 11° obtuvo el 1er puesto en prototipado autónomo y navegación por sensores ultrasónicos.',
      date: 'Ayer, 03:30 PM',
      author: 'Comité de Innovación STEM',
      department: 'Área de Tecnología',
      tags: ['Innovacion', 'Robótica', 'Torneo'],
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDAf2n5vIcbzeAINY-5YYuenW0mbYQzLfJ8j6IDW2QKyXOfRhnm4e13_yRLjyadxcT8KYtf8CIj6272izWgMUTJFnza7WacrHwj03zVmOS3hcWfEzjG0nxgDPVur_PMgFdr0sVXGDznt8YhN8NYS1hampTqwO4u1UO5woFMr6tAQH__yxSUF_DhnqKx3TEnnHoAGFX6GAUTsUC4LGd_PT9-B3dtX4SGePMy-yQpopSXSJd6cE7dcy4JCQ',
      content: `El representativo institucional logró alzarse con el trofeo mayor en la Copa Latinoamericana de Ciencias y Robótica Juvenil. El vehículo autónomo desarrollado por los alumnos Mateo Gómez, Sofía Morales y Andrés Londoño completó el laberinto de rescate en un tiempo récord de 1 minuto y 14 segundos, superando a delegaciones de más de 20 instituciones de la región.`,
      commentsCount: 22
    },
    {
      id: 'art-3',
      title: 'Reunión General de Padres de Familia — II Periodo',
      subtitle:
        'Se informa a toda la comunidad estudiantil que el encuentro presencial con acudientes se llevará a cabo en el auditorio central este sábado 24 de marzo.',
      date: 'Hace 2 días',
      author: 'Coordinación Académica',
      department: 'Gestión Directiva',
      tags: ['Institucional', 'Padres', 'Notas'],
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCQNWKz0vsI2F26EfMctcPlhOhvRF39ZAeojAV-97Y0S9RiePswsoRhyVNC0JWvTI94AlPW5xJXbfF6vkkAqYE5YoRv8RBFfSu03zozoxNKxAMf17DZFtMjW5F2HCtSddUjVtrQQ-Bpc2Rstyk7FJMm3uMGBKiR3H76bsel4CC2XsyeIk2AjZA8VZliQ_3pystBVUf1OFVVkx4u9tS1sUvYQh_aIOcaKsNqk0byV842CLliX5dc4qTK7Q',
      content: `El corte cualitativo y de notas parciales de mitad de ciclo lectivo será entregado de forma personalizada por los directores de grupo. Se solicita puntualidad y la asistencia obligatoria del acudiente titular para la firma de actas de acompañamiento pedagógico.`,
      commentsCount: 8
    }
  ];

  const filtered = articles.filter((a) => {
    if (selectedTag === 'todos') return true;
    return a.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
  });

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#004ac6] via-[#2563eb] to-[#3750a0] p-6 md:p-8 text-white shadow-md">
          <div className="max-w-2xl space-y-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
              Portal Informativo Institucional
            </span>
            <h1 className="font-['Plus_Jakarta_Sans'] text-[28px] md:text-[34px] font-bold text-white tracking-tight">
              Noticias &amp; Acontecimientos de Campus
            </h1>
            <p className="text-[14px] text-[#eeefff]">
              Conoce los logros, eventos curriculares, ferias científicas y comunicados oficiales de la comunidad ORBIA.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
            {['todos', 'ciencias', 'innovacion', 'institucional', 'robótica'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-bold capitalize transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-white text-[#004ac6] shadow'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article Hero */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white rounded-xl overflow-hidden shadow-sm border border-[#eaedff] flex flex-col">
              <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
                <img
                  src={filtered[0].imageUrl}
                  alt={filtered[0].title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-amber-300">
                      Noticia Principal
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-[20px] md:text-[24px] font-bold leading-tight">
                      {filtered[0].title}
                    </h3>
                  </div>
                  <span className="text-[11px] bg-black/40 px-2.5 py-1 rounded backdrop-blur">
                    {filtered[0].date}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <p className="text-[14px] text-[#434655] leading-relaxed">
                  {filtered[0].subtitle}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#eaedff]">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-[#131b2e]">{filtered[0].author}</span>
                    <span className="text-[11px] text-[#737686]">• {filtered[0].department}</span>
                  </div>

                  <button
                    onClick={() => setActiveArticle(filtered[0])}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#004ac6] text-white text-[13px] font-semibold hover:bg-[#2563eb] cursor-pointer"
                  >
                    <span>Leer artículo completo</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Other news items */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold text-[#131b2e]">
                Más Titulares de Campus
              </h3>
              {filtered.slice(1).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveArticle(item)}
                  className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-2 group"
                >
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f2f3ff] text-[#004ac6]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans'] text-[15px] font-bold text-[#131b2e] group-hover:text-[#004ac6] transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-[#434655] line-clamp-2">{item.subtitle}</p>
                  <div className="flex items-center justify-between text-[11px] text-[#737686] pt-1">
                    <span>{item.date}</span>
                    <span className="text-[#004ac6] font-semibold">Leer más →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Article Full Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-[#dae2fd] max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <span className="text-[11px] font-bold text-[#004ac6] uppercase">
                  {activeArticle.department}
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1 rounded-lg text-[#737686] hover:text-[#131b2e] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>

              <div className="py-4 space-y-4">
                <h2 className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold text-[#131b2e] leading-snug">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-2 text-[12px] text-[#737686]">
                  <span>{activeArticle.author}</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                </div>

                <div className="rounded-xl overflow-hidden h-60 bg-slate-900">
                  <img
                    src={activeArticle.imageUrl}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-[14px] text-[#434655] leading-relaxed whitespace-pre-line space-y-2">
                  {activeArticle.content}
                </div>
              </div>

              <div className="pt-4 border-t border-[#eaedff] flex items-center justify-between">
                <span className="text-[12px] text-[#737686]">
                  {activeArticle.commentsCount} comentarios registrados
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 rounded-lg bg-[#004ac6] text-white text-[13px] font-bold hover:bg-[#2563eb] cursor-pointer"
                >
                  Cerrar Noticia
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
