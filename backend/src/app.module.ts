import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [LoginModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
