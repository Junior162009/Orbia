import React, { useState } from 'react';
import { ModerationReport } from '../types';

interface CoordinacionViewProps {
  reports: ModerationReport[];
  onDismissReport: (id: string) => void;
  onHideContent: (id: string) => void;
  onWarnUser: (id: string, userName: string) => void;
  onVerifyTeacherContent: (id: string) => void;
  onShowToast: (msg: string) => void;
  onPublishCircular: (title: string, body: string) => void;
}

export const CoordinacionView: React.FC<CoordinacionViewProps> = ({
  reports,
  onDismissReport,
  onHideContent,
  onWarnUser,
  onVerifyTeacherContent,
  onShowToast,
  onPublishCircular
}) => {
  // Live preview synchronization states
  const [circTitle, setCircTitle] = useState(
    'Circular Rectoral No. 048 - Disposiciones del Simulacro Saber 11 y Ajuste Horario'
  );
  const [circBody, setCircBody] = useState(
    'Por medio del presente documento, la Dirección General informa las pautas para el despliegue del simulacro general de Estado el próximo jueves. Todos los estudiantes deben portar carné vigente y su kit de útiles reglamentario antes de las 06:45 hrs.'
  );
  const [audience, setAudience] = useState('Toda la Comunidad');
  const [newsTitle, setNewsTitle] = useState(
    'Estudiantes de Robótica triunfan en el Torneo Regional 2026'
  );
  const [newsSummary, setNewsSummary] = useState(
    'El semillero de tecnología liderado por el profesor Carlos Mendoza obtuvo el 1er puesto en prototipado autónomo.'
  );

  const handleDistribute = (e: React.FormEvent) => {
    e.preventDefault();
    onPublishCircular(circTitle, circBody);
    onShowToast('Comunicado distribuido a 1,240 estudiantes y comunidad académica.');
  };

  const handlePublishNews = () => {
    onShowToast(`Noticia "${newsTitle}" publicada en el portal estudiantil.`);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 flex flex-col gap-6">
        {/* Top Administrative Hero Bar */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#004ac6] via-[#3750a0] to-[#712ae2] p-6 md:p-8 shadow-md text-white">
          <div className="absolute -right-12 -top-12 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col gap-1 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 text-white backdrop-blur-md">
                  <span className="material-symbols-outlined text-[15px]">shield_person</span>
                  Nivel Ejecutivo • Rango de Superadministrador
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  En línea: Campus Sede Central
                </span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans'] text-[24px] md:text-[28px] font-bold tracking-tight text-white mt-1">
                Centro de Coordinación Académica y Convivencia 🧑‍💼
              </h1>
              <p className="text-[13px] text-white/90">
                Gestión centralizada, comunicaciones oficiales, moderación y supervisión institucional en tiempo real.
              </p>
            </div>

            {/* Quick Action CTA Group */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  const input = document.getElementById('input-title');
                  input?.focus();
                  input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white text-[#004ac6] text-[13px] font-bold shadow-sm hover:bg-[#f2f3ff] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">campaign</span>
                <span>Emitir Comunicado Oficial</span>
              </button>

              <button
                onClick={handlePublishNews}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/15 text-white text-[13px] font-bold backdrop-blur-sm hover:bg-white/25 transition-all cursor-pointer border border-white/20"
              >
                <span className="material-symbols-outlined text-[18px]">newspaper</span>
                <span>Publicar Noticia</span>
              </button>

              <button
                onClick={() => {
                  document.getElementById('moderation-table')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#712ae2] text-white text-[13px] font-bold shadow-sm hover:bg-[#8a4cfc] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Moderar Contenido</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold">
                  {reports.filter((r) => !r.isResolved).length}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Metrics Grid (Institutional Overview) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
            <div className="flex items-center justify-between text-[#737686] mb-1">
              <span className="text-[12px] font-bold">Estudiantes</span>
              <span className="material-symbols-outlined text-[#004ac6] text-[20px]">school</span>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#131b2e]">1,240</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold mt-1">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                <span>98% activos hoy</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
            <div className="flex items-center justify-between text-[#737686] mb-1">
              <span className="text-[12px] font-bold">Docentes</span>
              <span className="material-symbols-outlined text-[#712ae2] text-[20px]">co_present</span>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#131b2e]">68</div>
              <div className="text-[11px] text-[#434655] font-semibold mt-1">100% plantel cubierto</div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
            <div className="flex items-center justify-between text-[#737686] mb-1">
              <span className="text-[12px] font-bold">Noticias</span>
              <span className="material-symbols-outlined text-[#3750a0] text-[20px]">feed</span>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#131b2e]">34</div>
              <div className="text-[11px] text-[#004ac6] font-semibold mt-1">Periodo Q2 Activo</div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
            <div className="flex items-center justify-between text-[#737686] mb-1">
              <span className="text-[12px] font-bold">Foros Académicos</span>
              <span className="material-symbols-outlined text-[#8a4cfc] text-[20px]">forum</span>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#131b2e]">482</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">+42 nuevos temas</div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
            <div className="flex items-center justify-between text-[#737686] mb-1">
              <span className="text-[12px] font-bold">Circulares Vigentes</span>
              <span className="material-symbols-outlined text-[#2563eb] text-[20px]">mark_email_read</span>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#131b2e]">18</div>
              <div className="text-[11px] text-[#434655] font-semibold mt-1">3 expiran este viernes</div>
            </div>
          </div>

          <div className="rounded-xl bg-[#ffdad6]/40 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#ffdad6]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] text-[#93000a] font-bold">Moderación</span>
              <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">report</span>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#93000a]">
                {reports.filter((r) => !r.isResolved).length} Pendientes
              </div>
              <div className="text-[11px] text-[#ba1a1a] font-semibold mt-1">
                Prioridad alta requerida
              </div>
            </div>
          </div>
        </div>

        {/* Dual Layout: Publishing Hub & Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Official Direct Publishing Studio (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-xl bg-white p-6 shadow-sm border border-[#dae2fd]">
              <div className="flex items-center justify-between pb-3 mb-4 bg-[#f2f3ff] -mx-6 -mt-6 px-6 pt-4 rounded-t-xl border-b border-[#eaedff]">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#712ae2] text-[24px]">verified</span>
                  <div>
                    <h2 className="font-['Plus_Jakarta_Sans'] text-[18px] text-[#131b2e] font-bold">
                      Emisión Oficial de Rectoría y Coordinación
                    </h2>
                    <p className="text-[12px] text-[#737686]">
                      Canal prioritario con sello criptográfico institucional de veracidad.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] bg-[#eaddff] text-[#5a00c6] font-bold uppercase tracking-wider">
                  Prioridad Máxima
                </span>
              </div>

              <form className="flex flex-col gap-4" onSubmit={handleDistribute}>
                <div>
                  <label className="block text-[12px] font-semibold text-[#131b2e] mb-1">
                    Título del Comunicado o Resolución Institucional
                  </label>
                  <input
                    id="input-title"
                    value={circTitle}
                    onChange={(e) => setCircTitle(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-[13px] focus:bg-white focus:outline-none transition-all placeholder:text-[#737686] border border-[#dae2fd]"
                    type="text"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#131b2e] mb-1">
                      Destinatarios
                    </label>
                    <select
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-[12px] font-semibold focus:outline-none border border-[#dae2fd]"
                    >
                      <option value="Toda la Comunidad">Toda la Comunidad</option>
                      <option value="Grados 10° y 11°">Grados 10° y 11°</option>
                      <option value="Planta Docente">Planta Docente</option>
                      <option value="Padres de Familia">Padres de Familia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#131b2e] mb-1">
                      Categoría
                    </label>
                    <select className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-[12px] font-semibold focus:outline-none border border-[#dae2fd]">
                      <option>Normativa / Convivencia</option>
                      <option>Calendario Académico</option>
                      <option>Emergencias &amp; Simulacros</option>
                      <option>Transporte &amp; Rutas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#131b2e] mb-1">
                      Vigencia Hasta
                    </label>
                    <input
                      className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-[12px] focus:outline-none border border-[#dae2fd]"
                      type="date"
                      defaultValue="2026-11-20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#131b2e] mb-1">
                    Cuerpo del Comunicado (Con formato Markdown permitido)
                  </label>
                  <textarea
                    id="input-body"
                    value={circBody}
                    onChange={(e) => setCircBody(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-[13px] focus:bg-white focus:outline-none transition-all resize-y border border-[#dae2fd]"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        defaultChecked
                        className="w-4 h-4 rounded text-[#004ac6] accent-[#004ac6]"
                        type="checkbox"
                      />
                      <span className="text-[12px] font-semibold text-[#131b2e]">
                        Notificar por Push &amp; Correo
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        defaultChecked
                        className="w-4 h-4 rounded text-[#004ac6] accent-[#004ac6]"
                        type="checkbox"
                      />
                      <span className="text-[12px] font-semibold text-[#131b2e]">
                        Fijar al tope del Feed
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onShowToast('Borrador de resolución guardado.')}
                      className="px-4 py-2 rounded-lg bg-[#eaedff] text-[#131b2e] text-[13px] font-bold hover:bg-[#e2e7ff] transition-colors cursor-pointer"
                      type="button"
                    >
                      Guardar Borrador
                    </button>
                    <button
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#004ac6] to-[#712ae2] text-white text-[13px] font-bold shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
                      type="submit"
                    >
                      Distribuir Oficialmente
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* News Post Fast-Composer Tab */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-[#dae2fd]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#004ac6] text-[24px]">article</span>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-[17px] text-[#131b2e] font-bold">
                      Creador Rápido de Noticias de Campus
                    </h3>
                    <p className="text-[12px] text-[#737686]">
                      Publicación para el Portal Web público y el Muro Estudiantil.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-[#737686] font-bold uppercase tracking-wider">
                  Multiplataforma
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <input
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-[13px] focus:outline-none border border-[#dae2fd]"
                    placeholder="Titular de la noticia o logro institucional..."
                    type="text"
                  />
                  <textarea
                    value={newsSummary}
                    onChange={(e) => setNewsSummary(e.target.value)}
                    className="p-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-[13px] focus:outline-none resize-none border border-[#dae2fd]"
                    placeholder="Resumen informativo para tarjeta previa..."
                    rows={2}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onShowToast('Imagen adjuntada correctamente.')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eaedff] text-[#131b2e] hover:bg-[#e2e7ff] text-[11px] font-bold cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">add_photo_alternate</span>
                      Adjuntar Imagen HD
                    </button>
                    <span className="text-[11px] text-[#737686]">robotica_torneo_medalla.jpg (1.8 MB)</span>
                  </div>
                </div>

                {/* Quick Image Preview Box */}
                <div className="relative rounded-lg overflow-hidden bg-slate-900 group h-36 border border-[#c3c6d7]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Celebración robótica"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAf2n5vIcbzeAINY-5YYuenW0mbYQzLfJ8j6IDW2QKyXOfRhnm4e13_yRLjyadxcT8KYtf8CIj6272izWgMUTJFnza7WacrHwj03zVmOS3hcWfEzjG0nxgDPVur_PMgFdr0sVXGDznt8YhN8NYS1hampTqwO4u1UO5woFMr6tAQH__yxSUF_DhnqKx3TEnnHoAGFX6GAUTsUC4LGd_PT9-B3dtX4SGePMy-yQpopSXSJd6cE7dcy4JCQ"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-bold bg-[#004ac6] px-2 py-0.5 rounded w-max">
                      Categoría: Innovación
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[14px] font-bold truncate">
                      Copa Latinoamericana de Ciencias
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Live Visualizer Preview & Status (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-xl bg-white p-6 shadow-sm border border-[#dae2fd]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[13px] font-bold text-[#131b2e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#004ac6] text-[18px]">visibility</span>
                  Previsualización en Pantalla Estudiantil
                </h3>
                <span className="text-[11px] text-[#737686] font-semibold">Modo Render Real</span>
              </div>

              {/* The Verified Institutional Card Preview */}
              <div className="rounded-xl bg-gradient-to-b from-white to-[#f2f3ff] p-4 shadow-md relative overflow-hidden border border-[#dae2fd]">
                {/* Institutional Verification Banner */}
                <div className="flex items-center justify-between pb-3 border-b border-[#dae2fd] mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#8a4cfc] text-white flex items-center justify-center font-bold text-[12px]">
                      REC
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-bold text-[#131b2e]">
                          Rectoría &amp; Coordinación General
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-[#004ac6]">
                          verified
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737686]">Hoy a las 08:30 AM • Circular Oficial</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#dbe1ff] text-[#004ac6] text-[11px] font-bold">
                    Oficial
                  </span>
                </div>

                <h4 className="font-['Plus_Jakarta_Sans'] text-[15px] font-bold text-[#131b2e] mb-2 leading-snug">
                  {circTitle || 'Título del Comunicado Oficial'}
                </h4>

                <p className="text-[12px] text-[#434655] mb-4 leading-relaxed line-clamp-4">
                  {circBody || 'Cuerpo del comunicado institucional en tiempo real...'}
                </p>

                <div className="bg-white rounded-lg p-3 flex items-center justify-between mb-4 border border-[#eaedff]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#712ae2] text-[20px]">
                      attachment
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-semibold text-[#131b2e]">
                        itinerario_distribucion_salones.pdf
                      </span>
                      <span className="text-[10px] text-[#737686]">340 KB • Anexo Criptográfico</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Descargando anexo oficial...')}
                    className="p-1 rounded hover:bg-[#eaedff] text-[#004ac6] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </button>
                </div>

                {/* Interaction Mock Bar */}
                <div className="flex items-center justify-between text-[#737686] text-[11px] pt-2 border-t border-[#dae2fd]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 hover:text-[#004ac6] transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[15px]">thumb_up</span> 142 enterados
                    </span>
                    <span className="flex items-center gap-1 hover:text-[#004ac6] transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[15px]">chat_bubble_outline</span> 12 consultas
                    </span>
                  </div>
                  <span className="text-[#712ae2] font-bold">Fijado por Coordinación</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-[#737686]">
                <span>
                  Alcance proyectado: <strong>1,308 usuarios</strong>
                </span>
                <span className="text-emerald-700 font-bold">Tasa apertura habitual: 94.2%</span>
              </div>
            </div>

            {/* Institutional Pulse & Activity Mini Chart */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-[#dae2fd]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[13px] font-bold text-[#131b2e]">Actividad del Campus Semanal</h4>
                <span className="text-[11px] text-[#004ac6] font-bold">Semana 14 (Nov)</span>
              </div>

              <div className="w-full pt-1">
                <svg className="w-full h-24 text-[#004ac6]" preserveAspectRatio="none" viewBox="0 0 340 70">
                  <defs>
                    <linearGradient id="grad-bars-coord" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#004ac6" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#004ac6" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  <rect fill="url(#grad-bars-coord)" height="45" rx="4" width="28" x="15" y="25" />
                  <rect fill="url(#grad-bars-coord)" height="55" rx="4" width="28" x="65" y="15" />
                  <rect fill="url(#grad-bars-coord)" height="62" rx="4" width="28" x="115" y="8" />
                  <rect fill="#712ae2" height="68" rx="4" width="28" x="165" y="2" />
                  <rect fill="url(#grad-bars-coord)" height="52" rx="4" width="28" x="215" y="18" />
                  <rect fill="url(#grad-bars-coord)" height="22" rx="4" width="28" x="265" y="48" />
                  <rect fill="url(#grad-bars-coord)" height="15" rx="4" width="20" x="315" y="55" />
                </svg>
                <div className="flex justify-between text-[#737686] text-[10px] font-bold uppercase mt-1 px-1">
                  <span>Lun</span>
                  <span>Mar</span>
                  <span>Mié</span>
                  <span className="text-[#712ae2]">Jue (Hoy)</span>
                  <span>Vie</span>
                  <span>Sáb</span>
                  <span>Dom</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Moderation Queue (Central Academic Convivencia Table) */}
        <div id="moderation-table" className="rounded-xl bg-white p-6 shadow-sm border border-[#dae2fd]">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 gap-3 border-b border-[#eaedff]">
            <div>
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-[#ffdad6] text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[20px]">gavel</span>
                </span>
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#131b2e]">
                    Módulo de Moderación y Supervisión de Foros
                  </h2>
                  <p className="text-[12px] text-[#737686]">
                    Reportes de conducta, presunto spam y revisión de convivencia en tiempo real.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-lg bg-[#f2f3ff] p-0.5 border border-[#dae2fd]">
                <button
                  type="button"
                  className="px-3 py-1 rounded text-[11px] bg-white text-[#131b2e] shadow-2xs font-bold"
                >
                  Pendientes ({reports.filter((r) => !r.isResolved).length})
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Mostrando histórico de 45 sanciones aplicadas.')}
                  className="px-3 py-1 rounded text-[11px] text-[#434655] hover:text-[#131b2e] cursor-pointer"
                >
                  Historial de Sanciones
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Lista de 120 palabras clave bloqueadas por filtro antispam.')}
                  className="px-3 py-1 rounded text-[11px] text-[#434655] hover:text-[#131b2e] cursor-pointer"
                >
                  Filtros de Palabras
                </button>
              </div>
            </div>
          </div>

          {/* Realtime Incident Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#737686] text-[11px] uppercase tracking-wider border-b border-[#eaedff] pb-2">
                  <th className="py-2 px-3 font-bold">Infractor / Autor</th>
                  <th className="py-2 px-3 font-bold">Contenido Reportado &amp; Espacio</th>
                  <th className="py-2 px-3 font-bold">Motivo del Reporte</th>
                  <th className="py-2 px-3 font-bold">Estado Usuario</th>
                  <th className="py-2 px-3 font-bold text-right">Resolución de Coordinación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaedff] text-[13px]">
                {reports.map((rep) => (
                  <tr
                    key={rep.id}
                    className={`transition-colors ${
                      rep.isResolved
                        ? 'opacity-40 bg-slate-50'
                        : rep.actionTaken === 'hidden'
                        ? 'bg-amber-50/50'
                        : 'hover:bg-[#f2f3ff]/50'
                    }`}
                  >
                    <td className="py-4 px-3 align-top">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#dbe1ff] text-[#004ac6] font-bold flex items-center justify-center text-[12px]">
                          {rep.avatarText}
                        </div>
                        <div>
                          <div className="font-bold text-[#131b2e]">{rep.userName}</div>
                          <span className="inline-block px-2 py-0.2 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-800">
                            {rep.userGrade}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-3 max-w-sm align-top">
                      <span className="text-[11px] text-[#737686] block mb-0.5">
                        {rep.forumSpace}
                      </span>
                      <p className="text-[12px] text-[#131b2e] bg-[#f2f3ff] p-2.5 rounded-lg mb-1 leading-snug border border-[#dae2fd]">
                        {rep.reportedContent}
                      </p>
                      <span className="text-[10px] text-[#737686]">
                        Reportado por: {rep.reportedBy}
                      </span>
                    </td>

                    <td className="py-4 px-3 align-top">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          rep.reasonType === 'danger'
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : rep.reasonType === 'warning'
                            ? 'bg-[#dae2fd] text-[#004ac6]'
                            : 'bg-[#eaedff] text-[#434655]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {rep.reasonType === 'danger'
                            ? 'warning'
                            : rep.reasonType === 'warning'
                            ? 'record_voice_over'
                            : 'block'}
                        </span>
                        {rep.reason}
                      </span>
                      <span className="block text-[10px] text-[#737686] mt-1">{rep.timeAgo}</span>
                    </td>

                    <td className="py-4 px-3 align-top">
                      <select
                        defaultValue={rep.userStatus}
                        className="h-8 px-2 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-[11px] font-semibold focus:outline-none border border-[#dae2fd]"
                      >
                        <option>Activo (1ª Falta)</option>
                        <option>En Advertencia Formal</option>
                        <option>Suspendido 3 Días</option>
                        <option>Docente Autorizada</option>
                      </select>
                    </td>

                    <td className="py-4 px-3 align-top text-right">
                      {rep.isResolved ? (
                        <span className="text-[12px] font-bold text-emerald-700">
                          Resuelto ({rep.actionTaken})
                        </span>
                      ) : (
                        <div className="inline-flex items-center gap-1.5">
                          {rep.id === 'rep-3' ? (
                            <button
                              onClick={() => onVerifyTeacherContent(rep.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#004ac6] text-white text-[11px] font-bold hover:bg-[#2563eb] transition-colors flex items-center gap-1 cursor-pointer"
                              title="Validar contenido docente"
                            >
                              <span className="material-symbols-outlined text-[16px]">verified</span>
                              <span>Validar y Desbloquear</span>
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => onDismissReport(rep.id)}
                                className="p-1.5 rounded-lg bg-[#eaedff] text-[#434655] hover:bg-[#dae2fd] transition-colors cursor-pointer"
                                title="Desestimar reporte y mantener"
                              >
                                <span className="material-symbols-outlined text-[18px]">check</span>
                              </button>
                              <button
                                onClick={() => onHideContent(rep.id)}
                                className="p-1.5 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors cursor-pointer"
                                title="Ocultar de inmediato el post"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  visibility_off
                                </span>
                              </button>
                              <button
                                onClick={() => onWarnUser(rep.id, rep.userName)}
                                className="px-2.5 py-1.5 rounded-lg bg-[#ba1a1a] text-white text-[11px] font-bold hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  person_off
                                </span>
                                <span>Sancionar</span>
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Management Grid: Scheduled Announcements & Group Director Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Scheduled Institutional Calendar (7 cols) */}
          <div className="lg:col-span-7 rounded-xl bg-white p-6 shadow-sm border border-[#dae2fd]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6] text-[24px]">
                  calendar_month
                </span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[17px] font-bold text-[#131b2e]">
                  Circulares &amp; Anuncios Programados
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Módulo de programación de circulares abierto.')}
                className="text-[12px] text-[#004ac6] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add</span> Programar Nuevo
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors border border-[#dae2fd]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#e2e7ff] text-[#004ac6] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] uppercase font-bold">Jue</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold leading-none">
                      14
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#131b2e]">
                      Simulacro General Saber 11 (Grados 11°A y 11°B)
                    </h4>
                    <p className="text-[11px] text-[#737686]">
                      Publicación programada a las 06:00 AM • Estado: Listo para envío
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-bold">
                  Autodistribución
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors border border-[#dae2fd]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#eaddff] text-[#5a00c6] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] uppercase font-bold">Vie</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold leading-none">
                      15
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#131b2e]">
                      Entrega de Boletines Segundo Periodo &amp; Reunión de Padres
                    </h4>
                    <p className="text-[11px] text-[#737686]">
                      Convocatoria masiva a acudientes • Firma de actas digitales
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-100 text-purple-800 font-bold">
                  Reunión Oficial
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors border border-[#dae2fd]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-900 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] uppercase font-bold">Mar</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold leading-none">
                      19
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#131b2e]">
                      Circular No. 049: Actualización del Plan de Transporte Escolar
                    </h4>
                    <p className="text-[11px] text-[#737686]">
                      Modificación de paradas en Ruta Norte por obras viales
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold">
                  Logística
                </span>
              </div>
            </div>
          </div>

          {/* Quick Group Directors & Academic Roster (5 cols) */}
          <div className="lg:col-span-5 rounded-xl bg-white p-6 shadow-sm border border-[#dae2fd]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#712ae2] text-[24px]">contacts</span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[17px] font-bold text-[#131b2e]">
                  Directorio de Cursos y Tutores
                </h3>
              </div>
              <span className="text-[11px] text-[#737686] font-semibold">Nivel Bachillerato</span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f2f3ff] transition-colors">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-[#c3c6d7]"
                    alt="Lic. Patricia Restrepo"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7gTMonTvqKbK3X9dfgcx5Wo31cscNKoJ52Yx1yT9enM1EhJNct5WOoGqZ2mNgfbyqSDpyIsnz0sd7n0APsYekcD27MFhITeq-XK6Sokkx3tC5IWIY2Yp14oV4DpyjoFVSDbh96EHGaduo9sVd_vxIHE967hQ5idC5nMXFSBeqLADPbxwZBGx0A9iBPIIaBabe4CeBRREaY3aHLXTUtB6GrLkDMLtf80qFize9aBR72bIWzUWqI1rL_w"
                  />
                  <div>
                    <div className="text-[13px] font-bold text-[#131b2e]">
                      Lic. Patricia Restrepo
                    </div>
                    <span className="text-[11px] text-[#737686]">
                      Directora • Grado 10°A (38 Alumnos)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onShowToast('Abriendo mensajería con Lic. Patricia Restrepo.')}
                    className="p-1.5 rounded-lg bg-[#eaedff] text-[#434655] hover:bg-[#e2e7ff] transition-colors cursor-pointer"
                    title="Enviar mensaje directo"
                  >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                  </button>
                  <button
                    onClick={() => onShowToast('Descargando bitácora de convivencia de 10°A.')}
                    className="p-1.5 rounded-lg bg-[#eaedff] text-[#434655] hover:bg-[#e2e7ff] transition-colors cursor-pointer"
                    title="Ver bitácora de curso"
                  >
                    <span className="material-symbols-outlined text-[16px]">folder_shared</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f2f3ff] transition-colors">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-[#c3c6d7]"
                    alt="Prof. Carlos Mendoza"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz2IsLgkJUFxGQF92rmSjSizBcK3iZmmL59dY8nN4KcfvXo_W4QB3jdd5Z4Wog7BFNGynAr7uUpb9FVQZRzo0hRmNDuuOCGlKhWYiTwSu_l0xdRJB5fZsPHPyVz1S7ktvD5YfzHdmxt0jXZQRXIDlL0S1S4WWVLQ9ANzxkbY1QDxl7M7WZElGsRNwsMCyc5Odac6nMGtADpFzfmwIfS276w3eDrZna-YhCzIEpf7ZiSx0ys5ioThSx9g"
                  />
                  <div>
                    <div className="text-[13px] font-bold text-[#131b2e]">Prof. Carlos Mendoza</div>
                    <span className="text-[11px] text-[#737686]">
                      Director • Grado 10°B (36 Alumnos)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onShowToast('Abriendo mensajería con Prof. Carlos Mendoza.')}
                    className="p-1.5 rounded-lg bg-[#eaedff] text-[#434655] hover:bg-[#e2e7ff] transition-colors cursor-pointer"
                    title="Enviar mensaje directo"
                  >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                  </button>
                  <button
                    onClick={() => onShowToast('Descargando bitácora de convivencia de 10°B.')}
                    className="p-1.5 rounded-lg bg-[#eaedff] text-[#434655] hover:bg-[#e2e7ff] transition-colors cursor-pointer"
                    title="Ver bitácora de curso"
                  >
                    <span className="material-symbols-outlined text-[16px]">folder_shared</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f2f3ff] transition-colors">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-[#c3c6d7]"
                    alt="Dra. Martha Gómez"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDpXdqjYWJ_VEC7kBWorHc8cP5CwTc7hf-226RxYTVSdmCixf2cNHw26LiX7rT1KhyNJ-2BeBU-BFfh5vqCNq4F-Z7OQl_LTIOuTiAbUUfMd4sErZNOEKxCDWKwStPOesMjZo114PmeJDHEZasXO85_sNentusL9_goOmj-vpZliUm7SWaXsdxdIv9LQUajE_xVpw-7emiC2OUj7W9A2AOUj5y4UfSrfvSOfKNEVnYwIfaRwCBbR_oRg"
                  />
                  <div>
                    <div className="text-[13px] font-bold text-[#131b2e]">Dra. Martha Gómez</div>
                    <span className="text-[11px] text-[#737686]">
                      Directora • Grado 11°A (42 Alumnos)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onShowToast('Abriendo mensajería con Dra. Martha Gómez.')}
                    className="p-1.5 rounded-lg bg-[#eaedff] text-[#434655] hover:bg-[#e2e7ff] transition-colors cursor-pointer"
                    title="Enviar mensaje directo"
                  >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                  </button>
                  <button
                    onClick={() => onShowToast('Descargando bitácora de convivencia de 11°A.')}
                    className="p-1.5 rounded-lg bg-[#eaedff] text-[#434655] hover:bg-[#e2e7ff] transition-colors cursor-pointer"
                    title="Ver bitácora de curso"
                  >
                    <span className="material-symbols-outlined text-[16px]">folder_shared</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#eaedff] flex items-center justify-between text-[11px]">
              <span className="text-[#737686]">Soporte Convivencia: Ext. 104 / 105</span>
              <button
                type="button"
                onClick={() => onShowToast('Mostrando listado consolidado de los 32 grupos.')}
                className="text-[#712ae2] font-bold hover:underline cursor-pointer"
              >
                Ver los 32 Grupos →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
