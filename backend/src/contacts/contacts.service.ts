import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ContactsService {
  async getContacts(apiKey: string, skip: number, take: number) {
    try {
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
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch contacts: ${error.message}`);
    }
  }
}
