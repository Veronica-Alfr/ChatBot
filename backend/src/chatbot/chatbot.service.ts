import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

@Injectable()
export class ChatbotService {
  private readonly apiUrl = `https://${process.env.CONTRACT_ID}.http.msging.net/messages`;
  private readonly headers = {
    Authorization: `${process.env.API_KEY}`,
    'Content-Type': 'application/json',
  };

  async sendMessage(content: string) {
    const data = {
      id: uuidv4(),
      to: `${process.env.CONTRACT_ID}.@msging.net`, // enviar mensagens entre bots e usuários cadastrados
      type: 'text/plain',
      content: content,
    };

    console.log('Data =>', data);

    try {
      const response = await axios.post(this.apiUrl, data, {
        headers: this.headers,
      });
      console.log('Response =>', response.data);
      return response.data;
      // fazer validações de erro como 401 e 400
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }
}
