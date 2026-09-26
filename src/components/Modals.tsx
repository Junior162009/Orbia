import React, { useState } from 'react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, subject: string, description: string) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Matemáticas (Trigonometría)');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl flex flex-col gap-4 border border-[#dae2fd]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[24px]">edit_square</span>
            <h3 className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#131b2e]">
              Nueva Publicación
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#737686] hover:text-[#131b2e] p-1 rounded-lg cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-[13px] text-[#434655]">
          Comparte una duda académica o un aporte constructivo con tu salón (10°A) o comunidad escolar.
        </p>

        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (title.trim() && description.trim()) {
              onSubmit(title, subject, description);
              setTitle('');
              setDescription('');
              onClose();
            }
          }}
        >
          <div>
            <label className="block text-[12px] font-semibold text-[#131b2e] mb-1">
              Materia o Tema
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[13px] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#004ac6]/25 border border-[#dae2fd]"
            >
              <option value="Matemáticas (Trigonometría)">📐 Matemáticas (Trigonometría)</option>
              <option value="Física Mecánica">⚡ Física Mecánica</option>
              <option value="Química Orgánica">🧪 Química Orgánica</option>
              <option value="Lengua Castellana">📖 Lengua Castellana</option>
              <option value="Inglés B2">🇬🇧 Inglés B2</option>
              <option value="Ciencias Sociales">🌍 Ciencias Sociales</option>
              <option value="General & Extracurricular">💬 General &amp; Extracurricular</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#131b2e] mb-1">
              Título de la duda o consulta
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[13px] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#004ac6]/25 border border-[#dae2fd]"
              placeholder="Ej: ¿Cómo despejar la variable en identidades del punto 5?"
              required
              type="text"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#131b2e] mb-1">
              Descripción detallada
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#f2f3ff] text-[13px] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#004ac6]/25 border border-[#dae2fd] resize-none"
              placeholder="Explica claramente dónde te trabaste para que tus compañeros o profesores puedan orientarte..."
              required
              rows={4}
            />
          </div>

          {/* Attachment preview simulation */}
          <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-1.5 rounded-lg border border-[#dae2fd]">
            <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">picture_as_pdf</span>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-semibold text-[#131b2e]">ejercicio_geometria.pdf</span>
              <span className="text-[11px] text-[#737686]">1.2 MB • Adjunto preparado</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-[#737686]">
              <button
                type="button"
                className="p-1.5 hover:bg-[#eaedff] rounded-lg transition-colors"
                title="Adjuntar archivo"
              >
                <span className="material-symbols-outlined text-[18px]">attach_file</span>
              </button>
              <button
                type="button"
                className="p-1.5 hover:bg-[#eaedff] rounded-lg transition-colors"
                title="Insertar fórmula"
              >
                <span className="material-symbols-outlined text-[18px]">functions</span>
              </button>
              <button
                type="button"
                className="p-1.5 hover:bg-[#eaedff] rounded-lg transition-colors"
                title="Añadir foto"
              >
                <span className="material-symbols-outlined text-[18px]">image</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 rounded-lg text-[#131b2e] text-[13px] font-semibold hover:bg-[#e2e7ff] transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#004ac6] to-[#712ae2] text-white text-[13px] font-semibold hover:opacity-95 shadow transition-all cursor-pointer"
              >
                Publicar duda
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

interface WeeklyScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeeklyScheduleModal: React.FC<WeeklyScheduleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl flex flex-col gap-4 border border-[#dae2fd]">
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[24px]">schedule</span>
            <h3 className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#131b2e]">
              Horario Semanal — Grado 10°A
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#737686] hover:text-[#131b2e] p-1 rounded-lg cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center pt-1">
          <div className="p-2 bg-[#f2f3ff] rounded-lg text-[13px] font-bold text-[#004ac6]">Lunes</div>
          <div className="p-2 bg-[#f2f3ff] rounded-lg text-[13px] font-bold text-[#004ac6]">Martes</div>
          <div className="p-2 bg-[#f2f3ff] rounded-lg text-[13px] font-bold text-[#004ac6]">Miércoles</div>
          <div className="p-2 bg-[#f2f3ff] rounded-lg text-[13px] font-bold text-[#004ac6]">Jueves</div>
          <div className="p-2 bg-[#f2f3ff] rounded-lg text-[13px] font-bold text-[#004ac6]">Viernes</div>

          {/* Row 1 (07:00) */}
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Matemáticas
            <br />
            <span className="text-[#737686] text-[11px] font-normal">07:00 • Aula 14</span>
          </div>
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Física
            <br />
            <span className="text-[#737686] text-[11px] font-normal">07:00 • Lab 1</span>
          </div>
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Química
            <br />
            <span className="text-[#737686] text-[11px] font-normal">07:00 • Lab 2</span>
          </div>
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Literatura
            <br />
            <span className="text-[#737686] text-[11px] font-normal">07:00 • Aula 14</span>
          </div>
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Filosofía
            <br />
            <span className="text-[#737686] text-[11px] font-normal">07:00 • Aula 14</span>
          </div>

          {/* Row 2 (09:00) */}
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Inglés B2
            <br />
            <span className="text-[#737686] text-[11px] font-normal">09:00 • Idiomas</span>
          </div>
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Matemáticas
            <br />
            <span className="text-[#737686] text-[11px] font-normal">09:00 • Aula 14</span>
          </div>
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Historia
            <br />
            <span className="text-[#737686] text-[11px] font-normal">09:00 • Aula 14</span>
          </div>
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Biología
            <br />
            <span className="text-[#737686] text-[11px] font-normal">09:00 • Lab Bio</span>
          </div>
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Educación F.
            <br />
            <span className="text-[#737686] text-[11px] font-normal">09:00 • Canchas</span>
          </div>

          {/* Row 3 (11:00) */}
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Tecnología
            <br />
            <span className="text-[#737686] text-[11px] font-normal">11:00 • Cómputo</span>
          </div>
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Sociales
            <br />
            <span className="text-[#737686] text-[11px] font-normal">11:00 • Aula 14</span>
          </div>
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Cálculo
            <br />
            <span className="text-[#737686] text-[11px] font-normal">11:00 • Aula 14</span>
          </div>
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Inglés B2
            <br />
            <span className="text-[#737686] text-[11px] font-normal">11:00 • Idiomas</span>
          </div>
          <div className="p-2.5 bg-[#eaedff] rounded text-[12px] font-semibold text-[#131b2e]">
            Artística
            <br />
            <span className="text-[#737686] text-[11px] font-normal">11:00 • Taller</span>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#eaedff]">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-lg bg-[#004ac6] text-white text-[13px] font-semibold hover:bg-[#2563eb] cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl flex flex-col gap-4 border border-[#dae2fd]">
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[24px]">campaign</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#131b2e]">
              Circular Oficial No. 042
            </span>
          </div>
          <button onClick={onClose} className="text-[#737686] hover:text-[#131b2e] p-1 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-3 text-[13px] text-[#434655] leading-relaxed">
          <div className="p-3 bg-[#f2f3ff] rounded-lg">
            <p className="font-semibold text-[#004ac6]">
              Asunto: Suspensión de actividades presenciales por Jornada Pedagógica Institucional
            </p>
            <p className="text-[11px] text-[#737686] mt-1">
              Emitido por: Rectoría &amp; Consejo Directivo • 07:30 AM
            </p>
          </div>

          <p>
            Se comunica a toda la comunidad educativa que el próximo viernes se llevará a cabo la
            Jornada Pedagógica Docente programada en el calendario ministerial.
          </p>

          <p>
            <strong>Disposiciones:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Las clases se realizarán de manera asincrónica a través de la plataforma ORBIA.</li>
            <li>Los foros temáticos contarán con guardias docentes de 8:00 AM a 1:00 PM.</li>
            <li>Las entregas de talleres programadas para esa fecha se mantienen en horario habitual.</li>
          </ul>

          <div className="p-2.5 rounded-lg bg-[#eaedff] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004ac6]">description</span>
              <span className="text-[12px] font-semibold text-[#131b2e]">Circular_Oficial_042.pdf</span>
            </div>
            <button
              onClick={() => alert('Descarga iniciada: Circular_Oficial_042.pdf')}
              className="px-3 py-1 bg-[#004ac6] text-white rounded text-[11px] font-semibold hover:bg-[#2563eb]"
            >
              Descargar
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#eaedff]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#004ac6] text-white text-[13px] font-semibold hover:bg-[#2563eb]"
          >
            Aceptar y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

interface GradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotifyStudent: (student: string) => void;
}

export const GradingModal: React.FC<GradingModalProps> = ({ isOpen, onClose, onNotifyStudent }) => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Sofía Morales', grade: '10°A', score: '4.8', file: 'Guia4_Termo_Sofia.pdf', status: 'Calificado' },
    { id: 2, name: 'Mateo Gómez', grade: '10°A', score: '4.5', file: 'Taller_Termodinamica_MG.pdf', status: 'Calificado' },
    { id: 3, name: 'Juan Diego Martínez', grade: '10°A', score: '4.0', file: 'Entrega_Fisica_JDM.pdf', status: 'Calificado' },
    { id: 4, name: 'María Fernández', grade: '10°A', score: '5.0', file: 'Termo_MariaFernandez.pdf', status: 'Calificado' },
    { id: 5, name: 'Valentina Ríos', grade: '10°A', score: '4.2', file: 'Guia_4_VRios.pdf', status: 'Calificado' },
    { id: 6, name: 'Andrés Londoño', grade: '10°B', score: '', file: 'Entregable_AndresL.pdf', status: 'Pendiente' }
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl flex flex-col gap-4 border border-[#dae2fd]">
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#131b2e]">
              Calificar: Guía N° 4: Leyes de la Termodinámica
            </h3>
            <p className="text-[12px] text-[#737686]">64 entregas recibidas de 70 estudiantes (91%)</p>
          </div>
          <button onClick={onClose} className="text-[#737686] hover:text-[#131b2e] p-1 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-[#eaedff]">
          {students.map((st) => (
            <div key={st.id} className="py-2.5 flex items-center justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold text-[#131b2e]">{st.name}</p>
                <p className="text-[11px] text-[#737686]">{st.grade} • {st.file}</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nota (1-5)"
                  defaultValue={st.score}
                  className="w-16 h-8 text-center text-[12px] font-bold bg-[#f2f3ff] border border-[#c3c6d7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004ac6]"
                  onChange={(e) => {
                    const val = e.target.value;
                    setStudents(students.map((s) => (s.id === st.id ? { ...s, score: val } : s)));
                  }}
                />
                <button
                  onClick={() => onNotifyStudent(st.name)}
                  className="px-2.5 py-1 rounded bg-[#004ac6] text-white text-[11px] font-semibold hover:bg-[#2563eb]"
                >
                  Guardar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-[#eaedff]">
          <span className="text-[12px] text-[#737686]">Ponderación: 20% Periodo II</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#004ac6] text-white text-[13px] font-semibold hover:bg-[#2563eb]"
          >
            Cerrar Calificaciones
          </button>
        </div>
      </div>
    </div>
  );
};
