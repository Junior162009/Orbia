import React from 'react';
import { UserRole } from '../types';

interface MiPerfilViewProps {
  currentRole: UserRole;
  onShowToast: (msg: string) => void;
}

export const MiPerfilView: React.FC<MiPerfilViewProps> = ({ currentRole, onShowToast }) => {
  const getProfileData = () => {
    switch (currentRole) {
      case 'teacher':
        return {
          name: 'Prof. Carlos Mendoza',
          roleTitle: 'Docente Titular • Ciencias Naturales & Física',
          idNumber: 'DOC-4482',
          institution: 'I.E. Siglo XXI • Sede Central',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAy3N0K9ftWlnIuOgBvF66A46sk5NXJ7BizTvqY5dKJdBAR7AubAge4Ob81d4-cYp3fLscr_eYf7GOVKV6UqlN7lzy3fzZtBwskVzmIcTtrZslL14DFOdlDW0V8p_U4fs1u4VfxiJVOtRJcGntwJDDHrf3ehRyY2dyXEcDo5JZkIGlnO_ws7URGvmtFr8hmRedu_K87gNCZuZGrmfsmQQp_AX2pmmTfRnRq8srUKpL7OzOKY6Sj-98wKw',
          status: 'Activo • Tiempo Completo',
          metrics: [
            { label: 'Cursos Asignados', value: '3' },
            { label: 'Estudiantes', value: '94' },
            { label: 'Promedio Evaluativo', value: '4.4 / 5.0' },
            { label: 'Asistencia Docente', value: '100%' }
          ],
          subjects: [
            { code: 'FIS-10A', name: 'Física Mecánica 10°A', room: 'Lab 1', hours: '4 hrs/sem' },
            { code: 'FIS-10B', name: 'Física Mecánica 10°B', room: 'Lab 1', hours: '4 hrs/sem' },
            { code: 'FIS-11A', name: 'Física Avanzada 11°A', room: 'Lab 2', hours: '6 hrs/sem' }
          ]
        };
      case 'coordinator':
        return {
          name: 'Lic. Patricia Restrepo',
          roleTitle: 'Coordinación Académica & Convivencia Escolar',
          idNumber: 'ADM-1002',
          institution: 'I.E. Siglo XXI • Sede Central',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuA7gTMonTvqKbK3X9dfgcx5Wo31cscNKoJ52Yx1yT9enM1EhJNct5WOoGqZ2mNgfbyqSDpyIsnz0sd7n0APsYekcD27MFhITeq-XK6Sokkx3tC5IWIY2Yp14oV4DpyjoFVSDbh96EHGaduo9sVd_vxIHE967hQ5idC5nMXFSBeqLADPbxwZBGx0A9iBPIIaBabe4CeBRREaY3aHLXTUtB6GrLkDMLtf80qFize9aBR72bIWzUWqI1rL_w',
          status: 'Superadministrador Activo',
          metrics: [
            { label: 'Plantel Estudiantil', value: '1,240' },
            { label: 'Planta Docente', value: '68' },
            { label: 'Índice de Convivencia', value: '96%' },
            { label: 'Grupos Activos', value: '32' }
          ],
          subjects: [
            { code: 'CONV-ALL', name: 'Consejo de Convivencia y Mediación', room: 'Rectoría', hours: 'Diario' },
            { code: 'CURR-2026', name: 'Comité Curricular y Evaluación', room: 'Sala A', hours: 'Semanal' }
          ]
        };
      case 'student':
      default:
        return {
          name: 'Sofía Morales / Alejandro V.',
          roleTitle: 'Estudiante Regular • Grado 10°A Bachillerato',
          idNumber: 'EST-2026-8819',
          institution: 'I.E. Siglo XXI • Campus Digital',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCQNWKz0vsI2F26EfMctcPlhOhvRF39ZAeojAV-97Y0S9RiePswsoRhyVNC0JWvTI94AlPW5xJXbfF6vkkAqYE5YoRv8RBFfSu03zozoxNKxAMf17DZFtMjW5F2HCtSddUjVtrQQ-Bpc2Rstyk7FJMm3uMGBKiR3H76bsel4CC2XsyeIk2AjZA8VZliQ_3pystBVUf1OFVVkx4u9tS1sUvYQh_aIOcaKsNqk0byV842CLliX5dc4qTK7Q',
          status: 'Matrícula Vigente • Regular',
          metrics: [
            { label: 'Promedio Acumulado', value: '4.6 / 5.0' },
            { label: 'Puesto en Salón', value: '3° de 38' },
            { label: 'Asistencia Total', value: '98%' },
            { label: 'Puntos en Foro', value: '+480 pts' }
          ],
          subjects: [
            { code: 'MAT-101', name: 'Trigonometría & Álgebra', teacher: 'Prof. Mendoza', score: '4.8' },
            { code: 'FIS-102', name: 'Física Mecánica', teacher: 'Prof. Mendoza', score: '4.5' },
            { code: 'QUI-103', name: 'Química Analítica', teacher: 'Prof. Rojas', score: '4.7' },
            { code: 'ESP-104', name: 'Lengua Castellana & Lit.', teacher: 'Lic. Restrepo', score: '4.6' },
            { code: 'ING-105', name: 'Inglés Avanzado B2', teacher: 'Lic. Alvarado', score: '4.9' }
          ]
        };
    }
  };

  const profile = getProfileData();

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 space-y-6">
        {/* Profile Hero Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#eaedff] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#004ac6] shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold text-[#131b2e]">
                  {profile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#dbe1ff] text-[#004ac6] text-[11px] font-bold">
                  {profile.idNumber}
                </span>
              </div>
              <p className="text-[13px] text-[#434655] font-semibold">{profile.roleTitle}</p>
              <p className="text-[12px] text-[#737686] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">apartment</span>
                {profile.institution}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => onShowToast('Descargando carné digital con sello criptográfico...')}
              className="px-4 py-2 rounded-lg bg-[#004ac6] text-white text-[13px] font-bold hover:bg-[#2563eb] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px]">badge</span>
              <span>Carné Digital</span>
            </button>
            <button
              onClick={() => onShowToast('Generando certificado de notas oficiales 2026.')}
              className="px-4 py-2 rounded-lg bg-[#eaedff] text-[#131b2e] text-[13px] font-bold hover:bg-[#e2e7ff] transition-all flex items-center gap-1.5 cursor-pointer border border-[#dae2fd]"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Boletín Oficial</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {profile.metrics.map((m) => (
            <div
              key={m.label}
              className="bg-white p-5 rounded-xl shadow-sm border border-[#eaedff] flex flex-col justify-between"
            >
              <span className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">
                {m.label}
              </span>
              <div className="font-['Plus_Jakarta_Sans'] text-[24px] font-extrabold text-[#131b2e] mt-2">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Details & Subjects / Assignments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-xl p-6 shadow-sm border border-[#eaedff] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <h3 className="font-['Plus_Jakarta_Sans'] text-[17px] font-bold text-[#131b2e]">
                {currentRole === 'student' ? 'Materias y Calificaciones Parciales' : 'Cargas Académicas'}
              </h3>
              <span className="text-[12px] text-[#004ac6] font-bold">Periodo II • 2026</span>
            </div>

            <div className="divide-y divide-[#eaedff]">
              {profile.subjects.map((sub: any) => (
                <div key={sub.code} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#f2f3ff] text-[#004ac6]">
                        {sub.code}
                      </span>
                      <h4 className="text-[13px] font-bold text-[#131b2e]">{sub.name}</h4>
                    </div>
                    <span className="text-[11px] text-[#737686] mt-0.5 block">
                      {sub.teacher ? `Docente: ${sub.teacher}` : `${sub.room} • ${sub.hours}`}
                    </span>
                  </div>

                  {sub.score ? (
                    <div className="text-right">
                      <span className="text-[14px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        {sub.score}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[11px] font-semibold text-[#737686] bg-[#f2f3ff] px-2 py-1 rounded">
                      Titular
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Insignias y Logros Institucionales */}
          <div className="lg:col-span-4 bg-white rounded-xl p-6 shadow-sm border border-[#eaedff] space-y-4">
            <h3 className="font-['Plus_Jakarta_Sans'] text-[17px] font-bold text-[#131b2e] flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">workspace_premium</span>
              Insignias &amp; Méritos
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-center gap-3 border border-[#dae2fd]">
                <span className="text-2xl">🥇</span>
                <div>
                  <h4 className="text-[13px] font-bold text-[#131b2e]">Top Colaborador del Mes</h4>
                  <p className="text-[11px] text-[#737686]">24 aportes verificados en foros</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-center gap-3 border border-[#dae2fd]">
                <span className="text-2xl">📐</span>
                <div>
                  <h4 className="text-[13px] font-bold text-[#131b2e]">Excelencia Matemática</h4>
                  <p className="text-[11px] text-[#737686]">Taller de Trigonometría 100% resuelto</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-center gap-3 border border-[#dae2fd]">
                <span className="text-2xl">🤖</span>
                <div>
                  <h4 className="text-[13px] font-bold text-[#131b2e]">Semillero de Robótica</h4>
                  <p className="text-[11px] text-[#737686]">Torneo Regional 1er Puesto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
