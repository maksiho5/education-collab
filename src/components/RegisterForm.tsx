'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegister } from '../auth/hooks';

// Схема валидации
const registerSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: registerUser } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('root', { message: 'Файл слишком большой (максимум 5MB)' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);

      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      router.push('/dashboard');
    } catch (e: any) {
      setError('root', {
        message: e?.response?.data?.message || 'Ошибка регистрации',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F7F0] to-[#F5F5DC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-[#7CB342] to-[#558B2F] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <i className="ri-user-line text-white text-4xl"></i>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <i className="ri-add-line text-[#7CB342] text-lg font-bold"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Создать аккаунт</h1>
        <p className="text-center text-gray-600 mb-8">Присоединяйтесь к нашему сообществу</p>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ваше имя</label>
              <input
                {...register('name')}
                placeholder="Как к вам обращаться?"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                  errors.name
                    ? 'border-red-300 focus:ring-2 focus:ring-red-500'
                    : 'border-gray-200 focus:ring-2 focus:ring-[#7CB342] focus:border-transparent'
                }`}
                type="text"
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Электронная почта</label>
              <input
                {...register('email')}
                placeholder="your@email.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                  errors.email
                    ? 'border-red-300 focus:ring-2 focus:ring-red-500'
                    : 'border-gray-200 focus:ring-2 focus:ring-[#7CB342] focus:border-transparent'
                }`}
                type="email"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Пароль</label>
              <input
                {...register('password')}
                placeholder="Не менее 6 символов"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                  errors.password
                    ? 'border-red-300 focus:ring-2 focus:ring-red-500'
                    : 'border-gray-200 focus:ring-2 focus:ring-[#7CB342] focus:border-transparent'
                }`}
                type="password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Аватар профиля <span className="text-gray-400 font-normal">(по желанию)</span>
              </label>

              <div className="space-y-4">
                {avatarPreview && (
                  <div className="relative w-32 h-32 mx-auto">
                    <Image
                      src={avatarPreview}
                      alt="Предпросмотр аватара"
                      fill
                      className="rounded-full object-cover border-2 border-[#7CB342]"
                    />
                    <button
                      type="button"
                      onClick={() => setAvatarPreview(null)}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <i className="ri-close-line text-sm"></i>
                    </button>
                  </div>
                )}

                <label
                  className={`w-full px-4 py-3 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                    avatarPreview
                      ? 'border-2 border-solid border-[#7CB342] bg-[#F0F7E9]'
                      : 'border-2 border-dashed border-gray-300 hover:border-[#7CB342] hover:bg-[#F9FDF6]'
                  }`}
                >
                  <input
                    accept="image/*"
                    className="hidden"
                    type="file"
                    onChange={handleAvatarChange}
                  />
                  <i
                    className={`ri-image-line text-xl mb-2 ${
                      avatarPreview ? 'text-[#7CB342]' : 'text-gray-400'
                    }`}
                  ></i>
                  <span className="text-gray-500">
                    {avatarPreview ? 'Изменить изображение' : 'Выберите изображение'}
                  </span>
                </label>
              </div>
            </div>

            {errors.root && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.root.message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#7CB342] to-[#558B2F] text-white font-semibold py-4 rounded-lg hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Создание аккаунта...
                </div>
              ) : (
                'Создать аккаунт'
              )}
            </button>
          </form>

          {/* Ссылка на вход */}
          <p className="text-center mt-6 text-gray-600">
            Уже есть аккаунт?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-[#7CB342] font-semibold hover:underline transition-colors duration-200"
            >
              Войти
            </button>
          </p>
        </div>

        {/* Информация о безопасности */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <i className="ri-shield-check-line text-green-500"></i>
            Ваши данные защищены и не передаются третьим лицам
          </p>
        </div>
      </div>
    </div>
  );
}
