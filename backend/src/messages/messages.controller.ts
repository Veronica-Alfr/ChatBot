import { Controller, Get, Param, Headers, BadRequestException } from '@nestjs/common';
import { MessagesService } from './messages.services';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Get(':contactId')
    async getMessages(
        @Param('contactId') contactId: string, 
        @Headers('Authorization') apiKey: string
    ) {
        if (!apiKey) {
            throw new BadRequestException('API key is required');
        }

        const messages = await this.messagesService.getMessages(apiKey, contactId);
        return { success: true, data: messages };
    }
}
