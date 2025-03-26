import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

@Injectable()
export class MessagesService {
  async getMessages(apiKey: string, contactId: string) {
    console.log('contactId on back =>', contactId);
    console.log('apiKey on back =>', apiKey);
    try {
      const response = await axios.post(
        'https://msging.net/commands',
        {
          id: 'random-guid',
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
      console.log('Messages of contact =>', response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        throw new UnauthorizedException('API Key is invalid');
      } else {
        throw new InternalServerErrorException(`Failed to fetch messages: ${axiosError.message}`);
      }
    }
  }
}
