import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { TypeORMExceptionFilter } from './common/filters/TypeORMExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  /*
    Se usa el ValidationPipe para validar los DTOs
  */
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      // Obtiene el primer mensaje de error
      const message = errors
        .map(err => Object.values(err.constraints || {}))
        .flat()[0] || 'Validation failed';
      return new BadRequestException(message);
    }
  }));

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new TypeORMExceptionFilter(httpAdapterHost));

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'https://buscaminassa.com',
      'https://www.buscaminassa.com',
      'http://localhost:5173',
      'http://localhost:3000'
    ],
    credentials: true
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
