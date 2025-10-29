import { useAuth } from "../contexts/AuthContext.tsx";

export function DashboardPage() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="mt-4">Bem-vindo! Você está autenticado.</p>
      <button
        onClick={logout}
        className="mt-8 rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
      >
        Sair
      </button>
    </div>
  );
}