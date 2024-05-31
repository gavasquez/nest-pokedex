import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuracion para que tome las validaciones del DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remover la data basura
      forbidNonWhitelisted: true,
      transform: true, // transforme la información que va en los DTO
      transformOptions: {
        enableImplicitConversion: true
      }
    }) 
  )
  app.setGlobalPrefix('api/v2')
  await app.listen(process.env.PORT);
}
bootstrap();
