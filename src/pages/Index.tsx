
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      console.log("Usuário autenticado na página inicial, redirecionando para o dashboard");
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-xl text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg text-center">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao CasuloClub</h1>
        <p className="text-xl text-gray-600 mb-8">
          O sistema completo para gerenciar seus pedidos, produtos e regiões de entrega.
        </p>
        <div className="space-x-4">
          <Button className="px-6" onClick={() => navigate('/auth')}>
            Acessar o Sistema
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
