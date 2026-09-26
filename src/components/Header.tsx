import React, { useState } from 'react';
import { UserRole, NavTab, NotificationItem } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead?: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  notifications,
  onMarkNotificationRead,
  searchQuery,
  onSearchChange
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getUserDetails = () => {
    switch (currentRole) {
      case 'teacher':
        return {
          name: 'Prof. Carlos Mendoza',
          subtitle: 'Dpto. Ciencias Naturales',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAy3N0K9ftWlnIuOgBvF66A46sk5NXJ7BizTvqY5dKJdBAR7AubAge4Ob81d4-cYp3fLscr_eYf7GOVKV6UqlN7lzy3fzZtBwskVzmIcTtrZslL14DFOdlDW0V8p_U4fs1u4VfxiJVOtRJcGntwJDDHrf3ehRyY2dyXEcDo5JZkIGlnO_ws7URGvmtFr8hmRedu_K87gNCZuZGrmfsmQQp_AX2pmmTfRnRq8srUKpL7OzOKY6Sj-98wKw'
        };
      case 'coordinator':
        return {
          name: 'Lic. Patricia Restrepo',
          subtitle: 'Dirección & Convivencia',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuA7gTMonTvqKbK3X9dfgcx5Wo31cscNKoJ52Yx1yT9enM1EhJNct5WOoGqZ2mNgfbyqSDpyIsnz0sd7n0APsYekcD27MFhITeq-XK6Sokkx3tC5IWIY2Yp14oV4DpyjoFVSDbh96EHGaduo9sVd_vxIHE967hQ5idC5nMXFSBeqLADPbxwZBGx0A9iBPIIaBabe4CeBRREaY3aHLXTUtB6GrLkDMLtf80qFize9aBR72bIWzUWqI1rL_w'
        };
      case 'student':
      default:
        return {
          name: 'Alejandro V.',
          subtitle: '10° Bachillerato',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB1VKBZdupUD-t4WL8chwM7AzH-Wbq2sPjxsJ3GlXvzw7Uf8bwLRTNwVDgm4PpbNb0mZenDbcAJyqKTKRgQQNcAJic0NrRaU3_sIEzBm1wr9Ia13ErHxmReRDY_fCbYmIp-dW6c2oi8Q_KZqDyxJ__AuWnC5GrfB-oPOFqoAhyMj7peQFZ4YCSOvI8JCnWsTz_Jueiui6pR8TrGywSmXIjwCqk2mLT5gtB0cNzLOpDGo824nz7Q9QvkXQ'
        };
    }
  };

  const user = getUserDetails();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eaedff]">
      <div className="h-28 max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-between pt-3 pb-2">
        {/* Top bar row */}
        <div className="flex items-center justify-between gap-4 md:gap-6">
          {/* Logo Section */}
          <button
            onClick={() => onTabChange('inicio')}
            className="flex items-center gap-3 shrink-0 text-left cursor-pointer group"
          >
            {/* SVG Vector Logo matching brand specifications */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#004ac6] to-[#712ae2] flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
                <circle cx="50" cy="50" r="16" />
                <ellipse
                  cx="50"
                  cy="50"
                  rx="38"
                  ry="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  transform="rotate(-28 50 50)"
                />
                <circle cx="78" cy="30" r="6" fill="white" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-[#004ac6] leading-none tracking-tight">
                ORBIA
              </span>
              <span className="text-[11px] text-[#737686] tracking-wider uppercase font-semibold">
                Campus Digital
              </span>
            </div>
          </button>

          {/* Quick Search */}
          <div className="flex-1 max-w-xl mx-2 md:mx-4 hidden md:block">
            <div className="relative flex items-center bg-[#f2f3ff] rounded-xl px-4 py-1.5 transition-all focus-within:ring-2 focus-within:ring-[#004ac6]/25 focus-within:bg-white border border-transparent focus-within:border-[#004ac6]/20">
              <span className="material-symbols-outlined text-[#737686] text-[20px] mr-2 select-none">
                search
              </span>
              <input
                className="w-full bg-transparent border-0 p-0 text-[14px] text-[#131b2e] placeholder:text-[#737686] focus:outline-none focus:ring-0"
                placeholder="Buscar noticias, publicaciones, materias..."
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-[#737686] bg-[#eaedff] rounded border border-[#c3c6d7]/40 shadow-2xs">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Actions & Role Switcher */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Interactive Role Switcher dropdown */}
            <div className="relative">
              <select
                value={currentRole}
                onChange={(e) => {
                  const newRole = e.target.value as UserRole;
                  onRoleChange(newRole);
                  if (newRole === 'teacher') {
                    onTabChange('academico-y-tareas');
                  } else if (newRole === 'coordinator') {
                    onTabChange('anuncios-oficiales');
                  } else {
                    onTabChange('inicio');
                  }
                }}
                className="appearance-none bg-[#f2f3ff] text-[#131b2e] text-[13px] font-semibold py-2 pl-3 pr-8 rounded-lg cursor-pointer transition-colors hover:bg-[#e2e7ff] focus:outline-none focus:ring-2 focus:ring-[#004ac6]/25 border border-[#dae2fd]"
                title="Cambiar vista de rol"
              >
                <option value="student">🧑‍🎓 Estudiante (10°A)</option>
                <option value="teacher">👨‍🏫 Profesor (Ciencias)</option>
                <option value="coord">🧑‍💼 Coordinación</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-[#737686] text-[18px]">
                expand_more
              </span>
            </div>

            {/* Notification Center button with unread popover */}
            <div className="relative">
              <button
                aria-label="Centro de Notificaciones"
                className="relative p-2 rounded-lg text-[#434655] hover:bg-[#e2e7ff] hover:text-[#131b2e] transition-colors cursor-pointer"
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ba1a1a] text-[10px] font-bold text-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#dae2fd] p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#eaedff]">
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-[#131b2e] text-[14px]">
                      Notificaciones de Campus
                    </span>
                    <span className="text-[11px] text-[#004ac6] font-semibold">
                      {unreadCount} nuevas
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onMarkNotificationRead?.(item.id)}
                        className={`p-2.5 rounded-lg text-left transition-colors cursor-pointer flex items-start gap-2.5 ${
                          item.read
                            ? 'bg-transparent hover:bg-[#f2f3ff]'
                            : 'bg-[#f2f3ff] hover:bg-[#eaedff]'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                            item.type === 'teacher'
                              ? 'bg-[#712ae2]'
                              : item.type === 'coord'
                              ? 'bg-[#004ac6]'
                              : 'bg-emerald-500'
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-[13px] font-semibold text-[#131b2e]">{item.title}</p>
                          <p className="text-[12px] text-[#434655] leading-snug">{item.description}</p>
                          <span className="text-[10px] text-[#737686] mt-1 block">{item.timeAgo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="w-full mt-2 py-1.5 text-center text-[12px] text-[#004ac6] font-semibold hover:underline"
                  >
                    Cerrar notificaciones
                  </button>
                </div>
              )}
            </div>

            {/* Profile Avatar & Info */}
            <button
              onClick={() => onTabChange('mi-perfil')}
              className="flex items-center gap-2 pl-1 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-[#c3c6d7]"
                src={user.avatarUrl}
              />
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-[12px] font-semibold text-[#131b2e] leading-tight">
                  {user.name}
                </span>
                <span className="text-[11px] text-[#737686]">{user.subtitle}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Navigation Links Row */}
        <nav className="flex items-center gap-6 overflow-x-auto pt-1 no-scrollbar">
          <button
            onClick={() => onTabChange('inicio')}
            className={`text-[13px] transition-colors py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'inicio'
                ? 'text-[#004ac6] font-bold border-b-2 border-[#004ac6]'
                : 'text-[#434655] font-semibold hover:text-[#131b2e]'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onTabChange('noticias')}
            className={`text-[13px] transition-colors py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'noticias'
                ? 'text-[#004ac6] font-bold border-b-2 border-[#004ac6]'
                : 'text-[#434655] font-semibold hover:text-[#131b2e]'
            }`}
          >
            Noticias
          </button>
          <button
            onClick={() => onTabChange('foro-academico')}
            className={`text-[13px] transition-colors py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'foro-academico'
                ? 'text-[#004ac6] font-bold border-b-2 border-[#004ac6]'
                : 'text-[#434655] font-semibold hover:text-[#131b2e]'
            }`}
          >
            Foro Académico
          </button>
          <button
            onClick={() => onTabChange('academico-y-tareas')}
            className={`text-[13px] transition-colors py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'academico-y-tareas'
                ? 'text-[#004ac6] font-bold border-b-2 border-[#004ac6]'
                : 'text-[#434655] font-semibold hover:text-[#131b2e]'
            }`}
          >
            {currentRole === 'teacher' ? 'Panel Docente & Tareas' : 'Académico & Tareas'}
          </button>
          <button
            onClick={() => onTabChange('anuncios-oficiales')}
            className={`text-[13px] transition-colors py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'anuncios-oficiales'
                ? 'text-[#004ac6] font-bold border-b-2 border-[#004ac6]'
                : 'text-[#434655] font-semibold hover:text-[#131b2e]'
            }`}
          >
            {currentRole === 'coordinator' ? 'Centro de Coordinación' : 'Anuncios Oficiales'}
          </button>
          <button
            onClick={() => onTabChange('mi-perfil')}
            className={`text-[13px] transition-colors py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'mi-perfil'
                ? 'text-[#004ac6] font-bold border-b-2 border-[#004ac6]'
                : 'text-[#434655] font-semibold hover:text-[#131b2e]'
            }`}
          >
            Mi Perfil
          </button>
        </nav>
      </div>
    </header>
  );
};
