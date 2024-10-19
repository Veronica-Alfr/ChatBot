import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatbotModule } from './chatbot/chatbot.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ChatbotModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
