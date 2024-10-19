import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const getContacts = async (apiKey: string, skip: number, take: number) => {
  const response = await axios.post(
    'https://msging.net/commands',
    {
      id: 'random-guid',
      to: 'postmaster@crm.msging.net',
      method: 'get',
      uri: `/contacts?$skip=${skip}&$take=${take}`
    },
    {
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};

export const getMessages = async (apiKey: string, contactId: string) => {
  const response = await axios.post(
    'https://msging.net/commands',
    {
      id: uuidv4(),
      method: 'get',
      uri: `/threads/${contactId}?refreshExpiredMedia=true`,
    },
    {
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};
