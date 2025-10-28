import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext.tsx';
import type { RegisterFormData } from '../contexts/AuthContext.tsx';
import { useNavigate, Link } from 'react-router-dom';

// 1. Definir o schema de validação com Zod
const registerFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  email: z.string().email('Formato de email inválido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

// 2. Tipar os dados do formulário com base no schema
type RegisterFormInputs = z.infer<typeof registerFormSchema>;

export function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  // 3. Configurar o react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerFormSchema),
  });

  async function handleRegister(data: RegisterFormInputs) {
    try {
      // Os dados já estão validados pelo Zod
      await registerUser(data as RegisterFormData);
      alert('Conta criada com sucesso! Pode agora fazer login.');
      navigate('/'); // Redireciona para o login
    } catch (error) {
      // Substituir este alert() pelo seu sistema de toast (passo futuro)
      alert('Falha no registo. O email pode já estar em uso.');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-gray-800 p-10">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            Criar Conta - Audicon CQC
          </h2>
        </div>
        {/* 4. Usar o handleSubmit do hook-form */}
        <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Nome Completo
            </label>
            <div className="mt-1">
              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                className="w-full rounded-md border-gray-700 bg-gray-900 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                {...register('name')} // 5. Registar o campo
              />
              {/* 6. Exibir erro de validação */}
              {errors.name && (
                <span className="mt-1 text-sm text-red-400">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border-gray-700 bg-gray-900 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                {...register('email')}
              />
              {errors.email && (
                <span className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Senha
            </label>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full rounded-md border-gray-700 bg-gray-900 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                {...register('password')}
              />
              {errors.password && (
                <span className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting} // Desativa o botão durante o envio
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
            >
              {isSubmitting ? 'A criar...' : 'Criar conta'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <Link to="/" className="font-medium text-blue-400 hover:text-blue-300">
            Já tem uma conta? Fazer login
          </Link>
        </div>
      </div>
    </div>
  );
}