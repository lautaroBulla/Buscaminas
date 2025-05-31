import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  /*
    Se usa el ValidationPipe para validar los DTOs
  */
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  /*
  Esto crea swagger, obtenido directamente de la documentacion
  */
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapterHost));

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
