import { useState, FormEvent } from 'react';
import api from '../services/api'; // Importa a nossa instância do Axios

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event: FormEvent) {
    event.preventDefault(); // Impede que a página recarregue

    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: password,
      });

      console.log('Login bem-sucedido!', response.data);
      // Próximo passo: guardar o token e redirecionar
      
    } catch (error) {
      console.error('Falha no login:', error);
      alert('Email ou senha incorretos.');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-gray-800 p-10">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            Login - Audicon CQC
          </h2>
        </div>
        {/* Conecta a função handleLogin ao evento onSubmit do formulário */}
        <form className="space-y-6" onSubmit={handleLogin}>
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
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border-gray-700 bg-gray-900 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                // Conecta o valor do input ao estado 'email'
                value={email}
                // Atualiza o estado 'email' sempre que o utilizador digita
                onChange={(e) => setEmail(e.target.value)}
              />
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
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-md border-gray-700 bg-gray-900 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                // Conecta o valor do input ao estado 'password'
                value={password}
                // Atualiza o estado 'password' sempre que o utilizador digita
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}