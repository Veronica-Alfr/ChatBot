import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

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
          uri: `/contacts?$skip=${skip}&$take=${take}`,
        },
        {
          headers: {
            Authorization: apiKey,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Contacts no back =>', response.data); // .items?
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        throw new UnauthorizedException('API Key is invalid');
      } else {
        throw new InternalServerErrorException(`Failed to fetch contacts: ${axiosError.message}`);
      }
    }
  }
}
