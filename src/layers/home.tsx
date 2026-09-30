'use client';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';

export default function HomePage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  useEffect(() => {
    const faqElements = document.querySelectorAll('.faq-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 },
    );

    faqElements.forEach((el) => observer.observe(el));

    return () => {
      faqElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* SEO Meta Tags */}
        <title>
          EduCollab - Платформа для создания интерактивных учебных материалов и совместного обучения
        </title>
        <meta
          name="description"
          content="EduCollab - современная платформа для преподавателей и учебных заведений. Создавайте интерактивные учебные материалы, работайте совместно с коллегами, отслеживайте прогресс студентов. Безопасно, быстро и эффективно."
        />
        <meta
          name="keywords"
          content="EduCollab, образовательная платформа, учебные материалы, онлайн обучение, интерактивное обучение"
        />
        <meta name="last-modified" content="2024-01-01" />
        <link rel="canonical" href="https://educollab.ru/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="EduCollab - Платформа для создания интерактивных учебных материалов"
        />
        <meta
          property="og:description"
          content="Создавайте интерактивные учебные материалы и организуйте совместное обучение с EduCollab"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://educollab.ru/" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="EduCollab - Платформа для создания интерактивных учебных материалов"
        />
        <meta
          name="twitter:description"
          content="Создавайте интерактивные учебные материалы и организуйте совместное обучение с EduCollab"
        />

        {/* Remix Icon */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css"
          rel="stylesheet"
        />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        body {
          font-family:
            'Inter',
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            sans-serif;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }

        /* FAQ анимации */
        .faq-enter {
          max-height: 0;
          opacity: 0;
        }

        .faq-enter-active {
          max-height: 500px;
          opacity: 1;
          transition:
            max-height 0.5s ease-in-out,
            opacity 0.5s ease-in-out;
        }

        .faq-exit {
          max-height: 500px;
          opacity: 1;
        }

        .faq-exit-active {
          max-height: 0;
          opacity: 0;
          transition:
            max-height 0.5s ease-in-out,
            opacity 0.5s ease-in-out;
        }
      `}</style>

      <div className="min-h-screen">
        <Navigation />

        {/* Герой секция */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfff8] via-[#f5fce8] to-[#e8f5e0] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#7ED321] rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-[#4CAF50] rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: '1s' }}
            ></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-20">
            <div className="inline-block mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm animate-fade-in">
              <span className="text-[#7ED321] font-semibold text-sm">Новая эра образования</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
              Добро пожаловать в<br />
              <span className="text-[#7ED321]">EduCollab</span>
            </h1>

            <p
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              Платформа для создания интерактивных учебных материалов и совместного обучения
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
              style={{ animationDelay: '0.4s' }}
            >
              <a
                href="/register"
                className="px-8 py-3.5 rounded-lg font-medium text-base whitespace-nowrap cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-[#7ED321] to-[#4CAF50] text-white hover:shadow-lg hover:scale-105 hover:from-[#6BC019] hover:to-[#3D9142]"
              >
                Начать сейчас
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>

              <a
                href="/login"
                className="px-8 py-3.5 rounded-lg font-medium text-base whitespace-nowrap cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 bg-white text-gray-700 border-2 border-gray-200 hover:border-[#7ED321] hover:text-[#7ED321] hover:shadow-md"
              >
                Войти
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </a>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                  title: 'Безопасно',
                  desc: 'Ваши данные защищены современными методами шифрования',
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  ),
                  title: 'Быстро',
                  desc: 'Мгновенное создание конспектов из аудио и видео материалов',
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  ),
                  title: 'Совместно',
                  desc: 'Работайте вместе с коллегами над учебными материалами',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#e8f5e0] to-[#d4ecc4] rounded-2xl flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <div className="text-[#7ED321]">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#e8f5e0] to-[#d4ecc4] rounded-full">
                <span className="text-[#7ED321] font-semibold text-sm">ВОЗМОЖНОСТИ</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Всё для эффективного обучения
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Мощные инструменты для создания, управления и распространения учебных материалов
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  color: 'from-[#7ED321] to-[#6BC019]',
                  title: 'Видео материалы',
                  desc: 'Создавайте и делитесь обучающими видео с интерактивными элементами и тестами',
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  ),
                  color: 'from-[#4CAF50] to-[#3D9142]',
                  title: 'Аудио лекции',
                  desc: 'Записывайте лекции и автоматически преобразуйте их в текстовые конспекты',
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  ),
                  color: 'from-[#8BC34A] to-[#7CB342]',
                  title: 'Конспекты',
                  desc: 'Создавайте структурированные конспекты с поддержкой форматирования и медиа',
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  color: 'from-[#9CCC65] to-[#8BC34A]',
                  title: 'Тесты и опросы',
                  desc: 'Проверяйте знания студентов с помощью интерактивных тестов и опросов',
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  ),
                  color: 'from-[#7ED321] to-[#6BC019]',
                  title: 'Совместная работа',
                  desc: 'Работайте над материалами вместе с коллегами в режиме реального времени',
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  ),
                  color: 'from-[#4CAF50] to-[#3D9142]',
                  title: 'Аналитика',
                  desc: 'Отслеживайте прогресс студентов и эффективность учебных материалов',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-[#fdfff8] rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-16 h-16 mb-6 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg`}
                  >
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#7ED321] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#e8f5e0] to-[#d4ecc4] rounded-full">
                <span className="text-[#7ED321] font-semibold text-sm">FAQ</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Часто задаваемые вопросы
              </h2>
              <p className="text-xl text-gray-600">Ответы на популярные вопросы о платформе</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: 'Что такое EduCollab?',
                  answer:
                    'EduCollab — это современная платформа для создания интерактивных учебных материалов и организации совместного обучения. Мы помогаем преподавателям создавать качественный контент и эффективно взаимодействовать со студентами.',
                },
                {
                  question: 'Как начать работу с платформой?',
                  answer:
                    'Начать очень просто! Зарегистрируйтесь на платформе, выберите подходящий тариф (есть бесплатный план) и начните создавать свои первые учебные материалы. Мы предоставляем подробные инструкции и обучающие материалы для быстрого старта.',
                },
                {
                  question: 'Какие форматы материалов поддерживаются?',
                  answer:
                    'Платформа поддерживает широкий спектр форматов: видео, аудио, текстовые документы, презентации, интерактивные тесты и опросы. Вы также можете комбинировать различные форматы в одном учебном материале.',
                },
                {
                  question: 'Можно ли работать над материалами совместно?',
                  answer:
                    'Да! Одна из ключевых возможностей EduCollab — совместная работа в режиме реального времени. Вы можете приглашать коллег для совместного создания и редактирования учебных материалов.',
                },
                {
                  question: 'Как защищены мои данные?',
                  answer:
                    'Безопасность данных — наш приоритет. Мы используем современные методы шифрования, регулярно проводим аудит безопасности и соблюдаем все требования по защите персональных данных. Ваши материалы надежно защищены.',
                },
                {
                  question: 'Есть ли мобильное приложение?',
                  answer: 'Нет, пока что нету. Есть только сайт',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="faq-item bg-gradient-to-br from-white to-[#fdfff8] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-[#7ED321] transition-colors duration-300">
                      {item.question}
                    </h4>
                    <div
                      className={`w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#e8f5e0] to-[#d4ecc4] rounded-full flex-shrink-0 transition-transform duration-300 ${activeFAQ === index ? 'rotate-180' : ''}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-[#7ED321]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${activeFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-gradient-to-br from-[#f8fdf4] to-[#e8f5e0] pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <a className="flex items-center gap-2 mb-4 cursor-pointer group" href="/">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7ED321] to-[#4CAF50] rounded-lg flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
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
                    <span className="text-gray-900">Edu</span>
                    <span className="text-[#7ED321]">Collab</span>
                  </span>
                </a>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Платформа для создания интерактивных учебных материалов и совместного обучения
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Продукт</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#features"
                      className="text-gray-600 hover:text-[#7ED321] transition-colors duration-300 cursor-pointer"
                    >
                      Возможности
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="text-gray-600 hover:text-[#7ED321] transition-colors duration-300 cursor-pointer"
                    >
                      Тарифы
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#7ED321] transition-colors duration-300 cursor-pointer"
                    >
                      Обновления
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#7ED321] transition-colors duration-300 cursor-pointer"
                    >
                      Документация
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Компания</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#7ED321] transition-colors duration-300 cursor-pointer"
                    >
                      О нас
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#7ED321] transition-colors duration-300 cursor-pointer"
                    >
                      Блог
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#7ED321] transition-colors duration-300 cursor-pointer"
                    >
                      Карьера
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-gray-600 hover:text-[#7ED321] transition-colors duration-300 cursor-pointer"
                    >
                      Контакты
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Поддержка</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#faq"
                      className="text-gray-600 hover:text-[#7ED321] transition-colors duration-300 cursor-pointer"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#7ED321] transition-colors duration-300 cursor-pointer"
                    >
                      Помощь
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#7ED321] transition-colors duration-300 cursor-pointer"
                    >
                      Политика
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#7ED321] transition-colors duration-300 cursor-pointer"
                    >
                      Условия
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                © 2026 EduCollab. Все права защищены.
                <a
                  href="https://readdy.ai/?ref=logo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7ED321] hover:underline cursor-pointer ml-1"
                >
                  Powered by Readdy
                </a>
              </p>

              <div className="flex items-center gap-4">
                {[
                  <svg
                    key="facebook"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>,
                  <svg
                    key="twitter"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>,
                  <svg
                    key="linkedin"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>,
                  <svg
                    key="instagram"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>,
                ].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-gray-600 hover:text-[#7ED321] hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
