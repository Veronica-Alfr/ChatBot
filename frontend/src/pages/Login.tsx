import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getContacts } from '../api/requests';

const Login: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const firstSkip = 0;
    const firstTake = 10;
    try {
      const response = await getContacts(apiKey, firstSkip, firstTake);
      if (response.status === 200) {
        localStorage.setItem('token', apiKey);
        navigate('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError('A chave da API é inválida');
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Coloque aqui a sua API Key"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-purple-500 text-white hover:bg-purple-600 p-2 mt-1 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
