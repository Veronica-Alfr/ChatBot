import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import * as dotenv from 'dotenv';

// async function bootstrap() {
//   dotenv.config();

//   const app = await NestFactory.create(AppModule);
//   app.enableCors();

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   await app.listen(process.env.PORT || 3001);
// }
// bootstrap();
