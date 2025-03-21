import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { getContacts, login } from '../api/requests';
import { useQueryClient } from '@tanstack/react-query';
import chatbotImage from '../assets/images/chatbot.png';

const Login: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  interface ErrorResponse {
    message: string;
  }

  const handleLogin = async () => {
    const firstSkip = 0;
    const firstTake = 10;

    try {
      const token = await login(apiKey);
      queryClient.setQueryData(['token'], token);
      
      const response = await getContacts(apiKey, firstSkip, firstTake);
      console.log('status =>', response.status);
      if (response.status === 201) {
        queryClient.setQueryData(['apiKey'], apiKey);
        navigate('/');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      setError(axiosError.response?.data?.message || 'An unexpected error has occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className='flex items-center justify-center flex-col pb-6'>
          <h1 className="text-3xl font-bold mb-6 text-gray-800 font-mulish">Login on your chatbot</h1>
          <img src={chatbotImage} alt="Chatbot Image" />
        </div>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => {
            console.log('API Key input changed:', e.target.value);
            setApiKey(e.target.value)
          }}
          placeholder="Enter your API key here"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={() => handleLogin()}
          className="w-full bg-purple-500 text-white hover:bg-purple-600 p-2 mt-1 rounded-md text-lg font-mulish text-500"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
