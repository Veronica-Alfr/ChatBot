import { Controller, Get, Headers, Query, BadRequestException, UseGuards, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async getContacts(
    @Headers('Authorization') apiKey: string,
    @Query('skip') skip: string,
    @Query('take') take: string,
  ) {
    if (!apiKey) {
      throw new BadRequestException('API key is required');
    }
  
    const skipNumber = this.validateQueryParam(skip, 0);
    const takeNumber = this.validateQueryParam(take, 10);
  
    return this.contactsService.getContacts(apiKey, skipNumber, takeNumber);
  }

  private validateQueryParam(param: string, defaultValue: number): number {
    const number = parseInt(param, 10);
  
    if (isNaN(number) || number < 0) {
      return defaultValue;
    }
  
    return number;
  }
}
