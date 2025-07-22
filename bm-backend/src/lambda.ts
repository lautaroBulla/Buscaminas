import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { TypeORMExceptionFilter } from './common/filters/TypeORMExceptionFilter';

import serverlessExpress from '@vendia/serverless-express';
import { CallBack, Context, Handler } from 'aws-lambda';


let server: Handler;

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
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: CallBack
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
}


