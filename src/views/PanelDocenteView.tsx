import React, { useState, useRef } from 'react';

interface PanelDocenteViewProps {
  onOpenGrading: () => void;
  onShowToast: (msg: string) => void;
}

export const PanelDocenteView: React.FC<PanelDocenteViewProps> = ({
  onOpenGrading,
  onShowToast
}) => {
  const [postType, setPostType] = useState<'task' | 'announcement' | 'material' | 'news'>('task');
  const [targetCourses, setTargetCourses] = useState({
    '10A': true,
    '10B': true,
    '10C': false,
    '11A': false,
    '11B': false
  });
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [deadline, setDeadline] = useState('2026-10-15T23:59');
  const [weight, setWeight] = useState(20);
  const [hasRubric, setHasRubric] = useState(true);

  // Quick reply modal or inline state for student doubts
  const [answeringDoubt, setAnsweringDoubt] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');

  const createSectionRef = useRef<HTMLDivElement>(null);

  const scrollToCreate = () => {
    createSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    createSectionRef.current?.classList.add('ring-2', 'ring-[#712ae2]', 'transition-all');
    setTimeout(() => {
      createSectionRef.current?.classList.remove('ring-2', 'ring-[#712ae2]');
    }, 1500);
  };

  const selectAllCourses = () => {
    setTargetCourses({
      '10A': true,
      '10B': true,
      '10C': true,
      '11A': true,
      '11B': true
    });
    onShowToast('Todos los cursos seleccionados como destinatarios.');
  };

  const handlePublishAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      onShowToast('Por favor escribe un título para la asignación.');
      return;
    }
    onShowToast(`Tarea "${title}" publicada y sincronizada con el calendario escolar.`);
    setTitle('');
    setInstructions('');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 flex flex-col gap-6">
        {/* Docente Hero Header Panel */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#e2e7ff] via-[#eaedff] to-[#f2f3ff] shadow-sm p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-[#dae2fd]">
          <div className="relative z-10 flex items-start gap-4 max-w-3xl">
            <div className="relative shrink-0">
              <div
                className="w-16 h-16 rounded-xl bg-cover bg-center shadow-sm border-2 border-white"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAy3N0K9ftWlnIuOgBvF66A46sk5NXJ7BizTvqY5dKJdBAR7AubAge4Ob81d4-cYp3fLscr_eYf7GOVKV6UqlN7lzy3fzZtBwskVzmIcTtrZslL14DFOdlDW0V8p_U4fs1u4VfxiJVOtRJcGntwJDDHrf3ehRyY2dyXEcDo5JZkIGlnO_ws7URGvmtFr8hmRedu_K87gNCZuZGrmfsmQQp_AX2pmmTfRnRq8srUKpL7OzOKY6Sj-98wKw')"
                }}
              />
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#712ae2] text-white shadow-sm">
                <span className="material-symbols-outlined text-[13px]">school</span>
              </span>
            </div>

            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] font-bold">
                  Profesor Titular
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#004ac6] font-bold">
                  ID #DOC-4482
                </span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans'] text-[24px] md:text-[28px] font-bold text-[#131b2e] tracking-tight leading-tight">
                Panel Docente — Prof. Carlos Mendoza 👨‍🏫
              </h1>
              <p className="text-[13px] text-[#434655] flex items-center gap-1.5 flex-wrap">
                <span className="material-symbols-outlined text-[#3750a0] text-[18px]">science</span>
                <span className="font-bold text-[#131b2e]">Física y Ciencias Naturales</span>
                <span className="text-[#737686]">•</span>
                <span>Grados 9°, 10° y 11° • Periodo Lectivo II</span>
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={scrollToCreate}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#712ae2] text-white hover:bg-[#8a4cfc] transition-all shadow-sm active:scale-95 text-[13px] font-bold cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">campaign</span>
              <span>Crear Anuncio / Tarea</span>
            </button>
            <button
              onClick={onOpenGrading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#131b2e] hover:bg-[#f2f3ff] transition-all shadow-sm text-[13px] font-bold border border-[#dae2fd] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[#004ac6] text-[18px]">analytics</span>
              <span>Reporte de Entregas</span>
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-[#004ac6]/5 blur-3xl pointer-events-none" />
        </div>

        {/* KPIs de Productividad Docente */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#eaedff] flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#737686] font-bold uppercase tracking-wider">
                Cursos Asignados
              </span>
              <span className="w-10 h-10 rounded-lg bg-[#dbe1ff] text-[#003ea8] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">class</span>
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-[36px] font-extrabold text-[#131b2e] leading-none">
                3
              </span>
              <span className="text-[12px] text-[#737686] font-medium">grupos lectivos</span>
            </div>
            <p className="text-[12px] text-[#434655] mt-2">10°A, 10°B y 11°A activos</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#eaedff] flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#737686] font-bold uppercase tracking-wider">
                Estudiantes Totales
              </span>
              <span className="w-10 h-10 rounded-lg bg-[#eaddff] text-[#5a00c6] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-[36px] font-extrabold text-[#131b2e] leading-none">
                94
              </span>
              <span className="text-[12px] text-[#712ae2] font-bold">+4 inscritos</span>
            </div>
            <p className="text-[12px] text-[#434655] mt-2">100% matrícula confirmada</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#eaedff] flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#737686] font-bold uppercase tracking-wider">
                Tasa de Entrega
              </span>
              <span className="w-10 h-10 rounded-lg bg-[#e2e7ff] text-[#004ac6] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">task_alt</span>
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-['Plus_Jakarta_Sans'] text-[36px] font-extrabold text-[#004ac6] leading-none">
                88%
              </span>
              <div className="w-16 h-2 bg-[#eaedff] rounded-full overflow-hidden self-center">
                <div className="bg-[#004ac6] h-full rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <p className="text-[12px] text-[#434655] mt-2">+6% respecto al mes anterior</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#eaedff] flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#737686] font-bold uppercase tracking-wider">
                Dudas Pendientes
              </span>
              <span className="w-10 h-10 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">forum</span>
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-[36px] font-extrabold text-[#ba1a1a] leading-none">
                12
              </span>
              <span className="text-[12px] text-[#ba1a1a] font-bold">Requieren respuesta</span>
            </div>
            <p className="text-[12px] text-[#434655] mt-2">Promedio respuesta: 3.2 horas</p>
          </div>
        </div>

        {/* Layout Dividido Principal: Creación y Panel de Tareas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Columna Izquierda: Formulario de Creación (7 cols) */}
          <div
            ref={createSectionRef}
            className="lg:col-span-7 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-[#dae2fd] flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#712ae2] font-bold">
                  Consola Pedagógica
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#eaedff] text-[#737686]">
                  Borrador auto-guardado
                </span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold text-[#131b2e]">
                Crear Publicación o Asignación
              </h2>
              <p className="text-[13px] text-[#434655]">
                Publica consignas, recursos o comunicados oficiales sincronizados instantáneamente con el calendario del alumno.
              </p>
            </div>

            {/* Selector de Tipo de Publicación */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] text-[#131b2e] font-semibold">Tipo de Publicación</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'task', label: 'Tarea / Eval.', icon: 'assignment' },
                  { id: 'announcement', label: 'Anuncio', icon: 'campaign' },
                  { id: 'material', label: 'Material', icon: 'folder_open' },
                  { id: 'news', label: 'Noticia', icon: 'newspaper' }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPostType(type.id as any)}
                    className={`cursor-pointer p-3 rounded-lg flex flex-col items-center justify-center transition-colors text-center border ${
                      postType === type.id
                        ? 'bg-[#004ac6] text-white border-[#004ac6]'
                        : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] border-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] mb-1">{type.icon}</span>
                    <span className="text-[12px] font-bold">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cursos Destinatarios Multi-select */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[12px] text-[#131b2e] font-semibold">
                  Cursos Destinatarios
                </label>
                <span
                  onClick={selectAllCourses}
                  className="text-[12px] text-[#004ac6] cursor-pointer hover:underline font-semibold"
                >
                  Seleccionar todos
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: '10A', label: '10°A (Ciencias)' },
                  { key: '10B', label: '10°B (Ciencias)' },
                  { key: '10C', label: '10°C (Optativa)' },
                  { key: '11A', label: '11°A (Física Avanzada)' },
                  { key: '11B', label: '11°B (Laboratorio)' }
                ].map((c) => (
                  <label
                    key={c.key}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer select-none border transition-colors ${
                      targetCourses[c.key as keyof typeof targetCourses]
                        ? 'bg-[#eaddff] text-[#25005a] border-[#712ae2]/30 font-bold'
                        : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#434655] border-transparent font-medium'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={targetCourses[c.key as keyof typeof targetCourses]}
                      onChange={(e) =>
                        setTargetCourses({ ...targetCourses, [c.key]: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#712ae2] accent-[#712ae2]"
                    />
                    <span className="text-[12px]">{c.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Título e Instrucciones */}
            <form onSubmit={handlePublishAssignment} className="flex flex-col gap-4">
              <div>
                <label className="text-[12px] text-[#131b2e] font-semibold block mb-1">
                  Título de la Asignación
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] placeholder:text-[#737686] text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004ac6]/25 border border-[#dae2fd]"
                  placeholder="Ej: Laboratorio N° 5: Ondas Mecánicas y Resonancia Acústica"
                  type="text"
                  required
                />
              </div>

              <div>
                <label className="text-[12px] text-[#131b2e] font-semibold block mb-1">
                  Instrucciones y Pauta de Trabajo
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] placeholder:text-[#737686] text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004ac6]/25 resize-none border border-[#dae2fd]"
                  placeholder="Describe los objetivos, criterios de evaluación y especificaciones de entrega..."
                  rows={3}
                  required
                />
              </div>

              {/* Fecha límite, Ponderación */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] text-[#131b2e] font-semibold">Fecha y Hora Límite</label>
                  <div className="flex items-center bg-[#f2f3ff] rounded-lg px-3 py-2 border border-[#dae2fd]">
                    <span className="material-symbols-outlined text-[#737686] text-[18px] mr-2">
                      event
                    </span>
                    <input
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full bg-transparent text-[#131b2e] text-[13px] focus:outline-none"
                      type="datetime-local"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] text-[#131b2e] font-semibold">Ponderación en Calificación</label>
                  <div className="flex items-center bg-[#f2f3ff] rounded-lg px-3 py-2 border border-[#dae2fd]">
                    <span className="material-symbols-outlined text-[#737686] text-[18px] mr-2">
                      percent
                    </span>
                    <input
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full bg-transparent text-[#131b2e] text-[13px] font-bold focus:outline-none"
                      max={100}
                      min={0}
                      type="number"
                    />
                    <span className="text-[12px] text-[#737686] font-bold whitespace-nowrap">
                      % Periodo
                    </span>
                  </div>
                </div>
              </div>

              {/* Adjuntar Archivos Pedagógicos y Recursos */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] text-[#131b2e] font-semibold">Recursos y Archivos Adjuntos</label>
                <div
                  onClick={() => alert('Selecciona documentos para adjuntar a la guía')}
                  className="p-6 rounded-xl bg-[#f2f3ff] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#eaedff] transition-colors border border-dashed border-[#c3c6d7] group"
                >
                  <div className="w-12 h-12 rounded-full bg-white text-[#004ac6] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform mb-2">
                    <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                  </div>
                  <p className="text-[13px] font-bold text-[#131b2e]">
                    Arrastra guías pedagógicas, rúbricas en PDF o presentaciones
                  </p>
                  <p className="text-[11px] text-[#737686]">
                    Formatos soportados: PDF, DOCX, MP4, enlaces a GeoGebra o PhET (Máx. 45MB)
                  </p>
                </div>

                {hasRubric && (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#e2e7ff] border border-[#dae2fd]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">
                        picture_as_pdf
                      </span>
                      <span className="text-[12px] text-[#131b2e] font-medium truncate max-w-xs">
                        Rubrica_Laboratorio_Termodinamica_2024.pdf
                      </span>
                      <span className="text-[11px] text-[#737686]">(1.4 MB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setHasRubric(false)}
                      className="p-1 text-[#737686] hover:text-[#ba1a1a] transition-colors rounded-full cursor-pointer"
                      title="Eliminar archivo"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Barra inferior de acciones */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#eaedff]">
                <div className="flex items-center gap-2 text-[#737686] text-[11px]">
                  <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                  <span>Notificar vía correo institucional y app móvil</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => onShowToast('Borrador guardado correctamente.')}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#eaedff] text-[#131b2e] hover:bg-[#e2e7ff] transition-colors text-[13px] font-bold cursor-pointer"
                    type="button"
                  >
                    Guardar Borrador
                  </button>
                  <button
                    className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#004ac6] text-white hover:bg-[#2563eb] transition-all shadow-sm text-[13px] font-bold flex items-center justify-center gap-2 cursor-pointer"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Publicar Tarea</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Columna Derecha: Dudas Académicas y Resumen Diario (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Dudas Académicas Directas al Profesor */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dae2fd] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#712ae2] text-[22px]">
                    question_answer
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[17px] text-[#131b2e] font-bold">
                    Dudas de Estudiantes
                  </h3>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-bold">
                  12 sin leer
                </span>
              </div>
              <p className="text-[12px] text-[#434655]">
                Preguntas realizadas en foros de curso o mensajes directos pendientes de resolución.
              </p>

              {/* Lista de Consultas */}
              <div className="flex flex-col gap-3">
                {/* Duda 1 */}
                <div className="p-4 rounded-xl bg-[#f2f3ff] flex flex-col gap-2 hover:bg-[#eaedff] transition-colors border border-[#dae2fd]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full bg-cover bg-center border border-[#c3c6d7]"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQKTpUvwa3UPQyxxOLLqJwcMLbYBjfpoFF0W4Eve9DOGv-QUCwU8gCkAf30T8yRkFG26WcVJm2LJZr9rt6puGHbaWLHxptKKx1W6H1FajoC__KS1GDdkNDV0w7pI_omoVP7ZyXMWhDItwezArbbvqCWLKwwQZ7KDBk0ydXjEMUb8iXa_p4-GZemsB4eRdXxUKA8nL2uAv8glqCd0gmCxMaNhlIg5tuhoO_MXgE28KxHMcujV5821azXQ')"
                        }}
                      />
                      <div>
                        <span className="text-[13px] text-[#131b2e] font-bold block leading-tight">
                          Sofía Morales
                        </span>
                        <span className="text-[11px] text-[#737686]">10°A • Hace 24 min</span>
                      </div>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#dae2fd] text-[#004ac6] font-semibold">
                      Guía N°4
                    </span>
                  </div>

                  <p className="text-[12px] text-[#434655] leading-relaxed">
                    "Profesor, en el ejercicio 3 sobre la expansión adiabática, ¿el trabajo realizado se asume positivo si el gas se expande contra el pistón?"
                  </p>

                  <div className="pt-1 flex items-center justify-end gap-2">
                    <button
                      onClick={() => setAnsweringDoubt(answeringDoubt === 'sofia' ? null : 'sofia')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#712ae2] text-white hover:bg-[#8a4cfc] transition-all text-[12px] font-semibold shadow-2xs cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px]">reply</span>
                      <span>Responder en Foro</span>
                    </button>
                  </div>

                  {answeringDoubt === 'sofia' && (
                    <div className="pt-2 animate-in fade-in flex items-center gap-2">
                      <input
                        type="text"
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder="Escribe la respuesta pedagógica..."
                        className="flex-1 px-3 py-1.5 rounded bg-white text-[12px] border border-[#c3c6d7] focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (answerText.trim()) {
                            onShowToast(`Respuesta enviada a Sofía Morales.`);
                            setAnswerText('');
                            setAnsweringDoubt(null);
                          }
                        }}
                        className="px-3 py-1.5 rounded bg-[#004ac6] text-white text-[12px] font-bold hover:bg-[#2563eb]"
                      >
                        Enviar
                      </button>
                    </div>
                  )}
                </div>

                {/* Duda 2 */}
                <div className="p-4 rounded-xl bg-[#f2f3ff] flex flex-col gap-2 hover:bg-[#eaedff] transition-colors border border-[#dae2fd]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full bg-cover bg-center border border-[#c3c6d7]"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDGDF_lY8wZO-d-d9CEnO7pCmmbtaEbt1fusoZWp3fl4jAK0zYkpX5qDJxcXkJ3aJScCEx3-owWtWTjM3Wg3dHERBbb4lCIpPrc5Y2KbH_RJxVGZXhsyo2YHD-o-FSIwNmvraRPgb6uU7JtkbRqVsIehMonDMyNDRYbrBdAMh470B6KRlsVKcvfDBQyO3hHeYK0ThMY8-dez0zCtb2RsnCr7odBqvX0FcsfKv_Lf1HeB2gvUH9IoRY2A')"
                        }}
                      />
                      <div>
                        <span className="text-[13px] text-[#131b2e] font-bold block leading-tight">
                          Mateo Ríos
                        </span>
                        <span className="text-[11px] text-[#737686]">11°A • Hace 1 hora</span>
                      </div>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#eaddff] text-[#25005a] font-semibold">
                      Sustentaciones
                    </span>
                  </div>

                  <p className="text-[12px] text-[#434655] leading-relaxed">
                    "Buen día Prof. Carlos, ¿podemos llevar la maqueta física de bobina de Tesla o solo se presenta el informe y video del prototipo?"
                  </p>

                  <div className="pt-1 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        onShowToast('Mensaje directo enviado a Mateo Ríos.');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#dae2fd] text-[#004ac6] hover:bg-[#dbe1ff] transition-all text-[12px] font-semibold cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px]">send</span>
                      <span>Enviar Mensaje Rápido</span>
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onShowToast('Abriendo bandeja de consultas pedagógicas...')}
                className="w-full py-2 text-center text-[12px] font-bold text-[#004ac6] hover:underline transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Ver las 10 dudas restantes</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Próximos Vencimientos y Agenda Docente */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dae2fd] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-['Plus_Jakarta_Sans'] text-[17px] text-[#131b2e] font-bold">
                  Próximas Fechas Críticas
                </h3>
                <span className="material-symbols-outlined text-[#737686]">calendar_month</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f2f3ff] border border-[#eaedff]">
                  <div className="w-10 h-10 rounded-lg bg-white flex flex-col items-center justify-center text-[#131b2e] shrink-0 border border-[#dae2fd]">
                    <span className="text-[10px] uppercase font-bold text-[#ba1a1a]">OCT</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold leading-none">
                      15
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] text-[#131b2e] font-bold truncate">
                      Cierre Entrega: Guía N°4 Termodinámica
                    </span>
                    <span className="text-[11px] text-[#737686]">10°A y 10°B • 23:59 hrs</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f2f3ff] border border-[#eaedff]">
                  <div className="w-10 h-10 rounded-lg bg-white flex flex-col items-center justify-center text-[#131b2e] shrink-0 border border-[#dae2fd]">
                    <span className="text-[10px] uppercase font-bold text-[#004ac6]">OCT</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold leading-none">
                      18
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] text-[#131b2e] font-bold truncate">
                      Sustentación Física de Proyectos
                    </span>
                    <span className="text-[11px] text-[#737686]">
                      11°A • Bloque 3 y 4 (Laboratorio)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección: Mis Publicaciones Activas y Gestión Docente */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#004ac6] font-bold">
                Gestión Curricular
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-[22px] text-[#131b2e] font-bold">
                Mis Publicaciones Activas
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select className="appearance-none bg-[#f2f3ff] text-[#131b2e] text-[13px] font-semibold py-2 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none border border-[#dae2fd]">
                  <option>Todos los cursos</option>
                  <option>Solo 10°A</option>
                  <option>Solo 10°B</option>
                  <option>Solo 11°A</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-[#737686] text-[18px]">
                  expand_more
                </span>
              </div>
              <button
                className="p-2 rounded-lg bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff] transition-colors border border-[#dae2fd] cursor-pointer"
                title="Filtrar"
              >
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
              </button>
            </div>
          </div>

          {/* Tarjetas de Gestión de Contenido */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tarjeta 1: Guía N° 4 (Tarea con entregas) */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#eaedff] flex flex-col justify-between hover:shadow-md transition-all group">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#004ac6] animate-pulse"></span>
                    <span className="text-[11px] uppercase font-bold text-[#004ac6]">
                      Tarea Activa
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#e2e7ff] text-[#131b2e] font-semibold">
                    Vence en 2 días
                  </span>
                </div>

                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#131b2e] font-bold group-hover:text-[#004ac6] transition-colors">
                    Guía N° 4: Leyes de la Termodinámica
                  </h3>
                  <p className="text-[12px] text-[#434655] mt-1 line-clamp-2">
                    Resolución de problemas numéricos de entropía y ciclos de Carnot con desarrollo completo escaneado en PDF.
                  </p>
                </div>

                {/* Cursos destinatarios chips */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-[#737686]">Destinatarios:</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] font-bold">
                    10°A
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] font-bold">
                    10°B
                  </span>
                </div>

                {/* Barra de Entregas */}
                <div className="bg-[#f2f3ff] p-3 rounded-lg flex flex-col gap-1.5 mt-1 border border-[#dae2fd]">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <span className="text-[#131b2e] font-bold">Entregas recibidas</span>
                    <span className="text-[#004ac6] font-bold">64 / 70 (91%)</span>
                  </div>
                  <div className="w-full h-2 bg-[#eaedff] rounded-full overflow-hidden">
                    <div
                      className="bg-[#004ac6] h-full rounded-full transition-all duration-500"
                      style={{ width: '91%' }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-[#737686]">
                    6 estudiantes aún no han subido archivo
                  </span>
                </div>
              </div>

              {/* Acciones Rápidas */}
              <div className="pt-4 mt-4 flex items-center justify-between gap-2 border-t border-[#eaedff]">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onShowToast('Editando parámetros de la guía.')}
                    className="p-2 rounded-lg text-[#737686] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                    title="Editar consigna"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    onClick={() => onShowToast('La recepción de entregas ha sido bloqueada.')}
                    className="p-2 rounded-lg text-[#737686] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors cursor-pointer"
                    title="Cerrar entrega anticipada"
                  >
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  </button>
                </div>
                <button
                  onClick={onOpenGrading}
                  className="px-3.5 py-1.5 rounded-lg bg-[#004ac6] text-white hover:bg-[#2563eb] transition-all text-[12px] font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">grading</span>
                  <span>Calificar (64)</span>
                </button>
              </div>
            </div>

            {/* Tarjeta 2: Anuncio Oficial */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#eaedff] flex flex-col justify-between hover:shadow-md transition-all group">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#712ae2]"></span>
                    <span className="text-[11px] uppercase font-bold text-[#712ae2]">
                      Anuncio Oficial
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#e2e7ff] text-[#131b2e] font-semibold">
                    Publicado ayer
                  </span>
                </div>

                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#131b2e] font-bold group-hover:text-[#712ae2] transition-colors">
                    Anuncio: Fechas de sustentación de proyectos de física
                  </h3>
                  <p className="text-[12px] text-[#434655] mt-1 line-clamp-2">
                    Se confirman los horarios por equipos para el laboratorio central. Revisar el archivo Excel adjunto en la plataforma institucional.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-[#737686]">Destinatarios:</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#dbe1ff] text-[#004ac6] font-bold">
                    11°A
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex items-center gap-2 border border-[#dae2fd]">
                    <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
                      visibility
                    </span>
                    <div className="flex flex-col">
                      <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold text-[#131b2e] leading-tight">
                        38
                      </span>
                      <span className="text-[10px] text-[#737686]">Visto por alumnos</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex items-center gap-2 border border-[#dae2fd]">
                    <span className="material-symbols-outlined text-[#712ae2] text-[20px]">
                      forum
                    </span>
                    <div className="flex flex-col">
                      <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold text-[#131b2e] leading-tight">
                        5
                      </span>
                      <span className="text-[10px] text-[#737686]">Comentarios resueltos</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 flex items-center justify-between gap-2 border-t border-[#eaedff]">
                <span className="text-[11px] text-[#737686] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#712ae2]">
                    check_circle
                  </span>
                  Todos notificados
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onShowToast('Borrador de anuncio cargado.')}
                    className="px-3 py-1.5 rounded-lg bg-[#eaedff] text-[#131b2e] hover:bg-[#e2e7ff] transition-colors text-[12px] font-semibold cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onShowToast('Abriendo hilo de comentarios...')}
                    className="px-3 py-1.5 rounded-lg bg-[#eaddff] text-[#25005a] hover:bg-[#d2bbff] transition-colors text-[12px] font-bold cursor-pointer"
                  >
                    Ver Hilo (5)
                  </button>
                </div>
              </div>
            </div>

            {/* Tarjeta 3: Material complementario PhET */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#eaedff] flex flex-col justify-between hover:shadow-md transition-all group">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3750a0]"></span>
                    <span className="text-[11px] uppercase font-bold text-[#3750a0]">
                      Material Educativo
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#e2e7ff] text-[#131b2e] font-semibold">
                    Recurso Permanente
                  </span>
                </div>

                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#131b2e] font-bold group-hover:text-[#004ac6] transition-colors">
                    Material complementario: Simulador PhET de circuitos
                  </h3>
                  <p className="text-[12px] text-[#434655] mt-1 line-clamp-2">
                    Laboratorio virtual interactivo de construcción de circuitos en serie y paralelo para preparar la práctica presencial.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-center gap-3 mt-1 border border-[#dae2fd]">
                  <div className="w-10 h-10 rounded-lg bg-[#dce1ff] text-[#00164e] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[12px] font-semibold text-[#131b2e] truncate">
                      phet.colorado.edu/sims/circuit-kit
                    </span>
                    <span className="text-[10px] text-[#737686]">Enlace interactivo compartido</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-[#737686]">Destinatarios:</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#eaedff] text-[#131b2e] font-bold">
                    10°A, 10°B, 11°A
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-4 flex items-center justify-between gap-2 border-t border-[#eaedff]">
                <span className="text-[11px] text-[#737686] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#004ac6]">
                    touch_app
                  </span>
                  142 clics registrados
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText('https://phet.colorado.edu/sims/circuit-kit');
                      onShowToast('Enlace copiado al portapapeles.');
                    }}
                    className="p-2 rounded-lg text-[#737686] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                    title="Compartir enlace"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </button>
                  <button
                    onClick={() => {
                      window.open('https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_es.html', '_blank');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#eaedff] text-[#131b2e] hover:bg-[#e2e7ff] transition-colors text-[12px] font-bold cursor-pointer"
                  >
                    Abrir Simulador
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
