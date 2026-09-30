# EducationCollab

Образовательная платформа: пользователь загружает запись урока, а сервис делает из неё конспект, викторину с проверкой ответов и развёрнутые вопросы для самопроверки.

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38)

## Возможности

- Лендинг платформы с блоками возможностей и FAQ
- Регистрация и вход (react-hook-form, JWT с автоматическим refresh)
- Личный кабинет: загрузка аудио/видео, генерация конспекта и тестов
- Викторина с подсчётом баллов и пояснениями к ответам
- Ключ LLM-API хранится только на сервере (Next.js Route Handler)

## Архитектура

```mermaid
flowchart LR
    User --> Pages[Next.js pages]
    Pages --> Store[Zustand: сессия]
    Pages -- axios --> Auth[Auth API :4000]
    Pages -- POST /api/generate --> Route[Route Handler]
    Route -- API key из .env --> LLM[LLM API]
```

## Карта проекта

```
education-collab/
├── app/
│   ├── page.tsx                  # Лендинг
│   ├── login/, register/         # Авторизация
│   ├── dashboard/                # Личный кабинет
│   └── api/generate/route.ts     # Серверный прокси к LLM (ключ не попадает в браузер)
└── src/
    ├── auth/
    │   ├── api.ts                # Запросы: login, register, refresh, getAccount
    │   ├── hooks.ts              # useAuthCheck: проверка и обновление сессии
    │   └── store.ts              # Zustand-стор авторизации
    ├── components/
    │   ├── DashboardComponent.tsx  # Загрузка файла, генерация, викторина
    │   ├── LoginForm.tsx, RegisterForm.tsx
    │   ├── Navigation.tsx
    │   └── FeatureItem.tsx
    └── layers/home.tsx           # Секции лендинга
```

## Запуск

```bash
cp .env.example .env.local   # укажи POLZA_API_KEY
npm install
npm run dev                  # http://localhost:3000
```

Для авторизации нужен API-сервер на `http://localhost:4000`.
