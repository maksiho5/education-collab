'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '../auth/hooks';

const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { mutateAsync: login } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      await login(data);

      router.push('/dashboard');
    } catch (e: any) {
      setError('root', {
        message: e?.response?.data?.message || 'Ошибка входа',
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
            <div className="w-24 h-24 bg-gradient-to-br from-[#7CB342] to-[#558B2F] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 group hover:-translate-y-1">
              <div className="relative">
                <i className="ri-login-box-line text-white text-4xl group-hover:scale-110 transition-transform duration-300"></i>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <i className="ri-arrow-right-line text-[#7CB342] text-sm font-bold"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Добро пожаловать</h1>
        <p className="text-center text-gray-600 mb-8">Войдите в свой аккаунт</p>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                placeholder="Ваш пароль"
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

            {errors.root && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <i className="ri-error-warning-line text-red-500"></i>
                  <p className="text-red-600 text-sm">{errors.root.message}</p>
                </div>
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
                  Вход...
                </div>
              ) : (
                <>
                  <i className="ri-login-box-line mr-2"></i>
                  Войти
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-gray-600">
              Еще нет аккаунта?{' '}
              <button
                onClick={() => router.push('/register')}
                className="text-[#7CB342] font-semibold hover:underline transition-colors duration-200"
              >
                Зарегистрироваться
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
