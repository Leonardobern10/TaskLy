import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades não declaradas no DTO
      forbidNonWhitelisted: true, // lança erro se tiver propriedades extras
      transform: true, // transforma payload para instâncias de DTO
      exceptionFactory: (errors) => {
        console.error(errors); // mostra exatamente qual campo falhou
        return new BadRequestException(errors);
      },
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('API_GATEWAY_PORT') ?? 3000;
  const origin =
    configService.get<string>('FRONTEND_ORIGIN') ?? 'http://localhost:5173';

  app.use(cookieParser());

  app.enableCors({
    origin: origin,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API GATEWAY')
    .setDescription('Documentação do GATEWAY das rotas para a aplicação')
    .setVersion('1.0')
    .addGlobalResponse({
      status: 500,
      description: 'Error on processing request. Try again later.',
    })
    .addGlobalResponse({
      // Muitas requisições
      status: 429,
      description: 'Too Many Requests - Rate limit exceeded',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');

  await app.listen(port);
}
bootstrap();
