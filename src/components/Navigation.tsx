import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../auth/store';
import { LogOut, User, Settings, HelpCircle } from 'lucide-react';

function Navigation() {
  const { ok, user, clear } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitial = () => {
    if (!user?.name) return 'U';
    return user.name.charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        clear();

        localStorage.removeItem('accessToken');

        window.location.href = '/';
      } else {
        console.error('Logout failed:', await response.text());
        alert('Ошибка при выходе. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Logout error:', error);

      clear();
      localStorage.removeItem('accessToken');
      window.location.href = '/';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a className="flex items-center gap-2 cursor-pointer group" href="/">
          <div className="w-10 h-10 bg-gradient-to-br from-[#7ED321] to-[#4CAF50] rounded-lg flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
            {/* Иконка мозга */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold">
            <span className="transition-colors duration-300 text-gray-900">Edu</span>
            <span className="text-[#7ED321]">Collab</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className="font-medium transition-colors duration-300 cursor-pointer hover:text-[#7ED321] text-gray-700"
          >
            Возможности
          </a>
          <a
            href="/"
            className="font-medium transition-colors duration-300 cursor-pointer hover:text-[#7ED321] text-gray-700"
          >
            Вопросы
          </a>

          <a
            href="/"
            className="font-medium transition-colors duration-300 cursor-pointer hover:text-[#7ED321] text-gray-700"
          >
            FAQ
          </a>
          {ok ? (
            <a
              href="/dashboard"
              className="font-medium transition-colors duration-300 cursor-pointer hover:text-[#7ED321] text-gray-700"
            >
              Личный кобинет
            </a>
          ) : (
            ''
          )}
        </div>

        {ok ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#7ED321] to-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold text-lg">
                {getInitial()}
              </div>
              <div className="hidden md:block text-left">
                <p className="font-medium text-gray-900">{user?.name || 'Пользователь'}</p>
                <p className="text-sm text-gray-500">{user?.email || ''}</p>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <div className="md:hidden px-4 py-3 border-b border-gray-100">
                  <p className="font-medium text-gray-900">{user?.name || 'Пользователь'}</p>
                  <p className="text-sm text-gray-500 truncate">{user?.email || ''}</p>
                </div>

                {/* Пункты меню
                <a
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <span>Профиль</span>
                </a>
                
                <a
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span>Настройки</span>
                </a>
                
                <a
                  href="/help"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <span>Помощь</span>
                </a> */}

                {/* Разделитель */}
                <div className="border-t border-gray-100 my-2"></div>

                {/* Кнопка выхода */}
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Выйти</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 text-gray-700 font-medium hover:text-[#7ED321] transition-colors duration-300 cursor-pointer whitespace-nowrap">
              <a href="/login" className="font-medium transition-colors">
                Войти
              </a>
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-[#7ED321] to-[#4CAF50] text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap">
              <a href="/register" className="font-medium transition-colors">
                Регистрация
              </a>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
