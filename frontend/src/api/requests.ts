import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const login = async (apiKey: string) => {
  try {
    const response = await axios.post(
      '/auth/login',
      { apiKey },
      { withCredentials: true }
    );

    const { token } = response.data;
    return token;
    
  } catch (error) {
    throw error;
  }
};

export const validateApiKey = async (apiKey: string) => {
  try {
    const response = await axios.get('/auth/validate-token', {
      headers: {
        Authorization: apiKey,
      },
      withCredentials: true,
    });
    return response.data.apiKey;
  } catch (error) {
    throw new Error('Invalid API Key');
  }
};

export const getContacts = async (apiKey: string, skip: number, take: number) => {
  try {
    const response = await axios.post(
      `/contacts?skip=${skip}&take=${take}`,
      {},
      {
        headers: {
          Authorization: apiKey,
        },
        withCredentials: true
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const useContacts = (apiKey: string, skip: number, take: number) => {
  return useQuery({
    queryKey: ['contacts', apiKey, skip, take],
    queryFn: () => getContacts(apiKey, skip, take),
    enabled: !!apiKey,
  });
};

export const getMessages = async (apiKey: string, contactId: string) => {
  try {
    const response = await axios.post(
      `/contacts/${contactId}`,
      {apiKey, contactId},
      // {
      //   headers: {
      //     Authorization: apiKey,
      //   },
      //   withCredentials: true
      // }
    );
    console.log('data em getMessages =>', response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const useMessages = (apiKey: string, contactId: string) => {
  return useQuery({
    queryKey: ['messages', apiKey, contactId],
    queryFn: () => getMessages(apiKey, contactId),
    enabled: !!apiKey,
  });
};
