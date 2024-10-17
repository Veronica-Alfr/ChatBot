import { ChatbotService } from './chatbot.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('send-message')
  async sendMessage(@Body('content') content: string) {
    return this.chatbotService.sendMessage(content);
  }
}
