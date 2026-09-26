import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<string | null>(null);

  return (
    <>
      <footer className="w-full bg-white mt-12 border-t border-[#e2e7ff] py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-['Plus_Jakarta_Sans'] text-[16px] text-[#004ac6] font-bold">
              ORBIA
            </span>
            <span className="text-[12px] text-[#737686]">
              Plataforma Educativa Institucional © 2026 • Campus Digital Integrado
            </span>
          </div>

          <div className="flex items-center gap-6 text-[12px] text-[#434655]">
            <button
              onClick={() => setModalContent('reglamento')}
              className="hover:text-[#004ac6] transition-colors cursor-pointer"
            >
              Reglamento Estudiantil
            </button>
            <button
              onClick={() => setModalContent('soporte')}
              className="hover:text-[#004ac6] transition-colors cursor-pointer"
            >
              Soporte Campus
            </button>
            <button
              onClick={() => setModalContent('privacidad')}
              className="hover:text-[#004ac6] transition-colors cursor-pointer"
            >
              Privacidad &amp; Seguridad
            </button>
          </div>
        </div>
      </footer>

      {/* Footer Info Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-[#dae2fd]">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] text-[#131b2e]">
                {modalContent === 'reglamento' && 'Reglamento Estudiantil Institucional'}
                {modalContent === 'soporte' && 'Mesa de Soporte Tecnológico Campus'}
                {modalContent === 'privacidad' && 'Política de Privacidad y Protección de Datos'}
              </h3>
              <button
                onClick={() => setModalContent(null)}
                className="text-[#737686] hover:text-[#131b2e] p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="py-4 text-[13px] text-[#434655] leading-relaxed space-y-2">
              {modalContent === 'reglamento' && (
                <>
                  <p>
                    <strong>Artículo 1:</strong> El respeto y la honestidad académica son pilares de la
                    comunidad ORBIA. Está estrictamente prohibido el comercio de evaluaciones y el
                    ciberacoso.
                  </p>
                  <p>
                    <strong>Artículo 2:</strong> Las entregas digitales a través de la plataforma son
                    vinculantes con registro horario del servidor escolar.
                  </p>
                  <p>
                    <strong>Artículo 3:</strong> La interacción docente-alumno en foros oficiales goza
                    de acompañamiento de coordinación y auditoría pedagógica.
                  </p>
                </>
              )}
              {modalContent === 'soporte' && (
                <>
                  <p>
                    <strong>Canal de Atención Institucional:</strong> Lun a Vie, 7:00 AM - 5:00 PM.
                  </p>
                  <p>
                    <strong>Línea Interna:</strong> Extensión 104 / 105 (Módulo de Coordinación).
                  </p>
                  <p>
                    <strong>Correo Electrónico:</strong> soporte.campus@orbia.edu
                  </p>
                  <p>
                    Para restablecimiento de credenciales o reporte de fallas en aulas virtuales, acércate
                    al laboratorio central de sistemas.
                  </p>
                </>
              )}
              {modalContent === 'privacidad' && (
                <>
                  <p>
                    Toda la información académica, calificaciones y publicaciones dentro del Campus
                    Digital ORBIA se rigen por la Ley de Protección de Datos Personales de Menores y
                    Comunidad Educativa.
                  </p>
                  <p>
                    Los accesos se autentican de manera cifrada y las notas se archivan con sello oficial
                    institucional.
                  </p>
                </>
              )}
            </div>
            <div className="flex justify-end pt-3 border-t border-[#eaedff]">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 rounded-lg bg-[#004ac6] text-white text-[13px] font-semibold hover:bg-[#2563eb]"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
