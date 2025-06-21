/*
PrismaClientExceptionFilter persoanlizado, para editar los mensajes de error de Prisma
y darle un mensaje con mas sentido para el usuario
en este caso de usario ya existente en la bd
*/

import { ExceptionFilter, ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { Prisma } from '@prisma/client';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  constructor (private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const language = request.headers['lang'] || 'en';

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Manejo de errores conocidos
    switch (exception.code) {
      case 'P2002': // Unique constraint failed
        statusCode = HttpStatus.CONFLICT;
        let target = '';
        if (Array.isArray(exception.meta?.target)) {
          target = exception.meta.target.join(', ');
        } else if (typeof exception.meta?.target === 'string') {
          target = exception.meta.target;
        } 
        
        // Ejemplo: personalizar por campo
        if (target?.includes('username')) {
          if (language === 'es') {
            message = 'Nombre de usuario ya existente';
          } else if (language === 'en') {
            message = 'Username already exists';
          }
        } else {
          if (language === 'es') {
            message = `Valor duplicado en campo(s): ${target}`;
          } else if (language === 'en') {
            message = `Duplicate value in field(s): ${target}`
          }
        }
        break;

      default:
        // Si no es un código que queremos personalizar
        message = `[${exception.code}]: ${exception.message}`;
        break;
    }

    // Enviar respuesta
    httpAdapter.reply(ctx.getResponse(), {
      statusCode,
      message,
    }, statusCode);
  }
}