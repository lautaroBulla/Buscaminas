import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    const httpAdapter = this.httpAdapterHost.httpAdapter;

    const language = request.headers['lang'] || 'en';

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    const err: any = exception;

    if (err?.code === '23505') {
      // Unique constraint violation
      statusCode = HttpStatus.CONFLICT;

      // Detectar campo desde el detalle
      const detail: string = err.detail || '';
      const match = detail.match(/\((.*?)\)=/); // extrae el nombre del campo
      const target = match ? match[1] : '';

      if (target.includes('username')) {
        message = language === 'es'
          ? 'Nombre de usuario ya existente'
          : 'Username already exists';
      } else {
        message = language === 'es'
          ? `Valor duplicado en campo: ${target}`
          : `Duplicate value in field: ${target}`;
      }
    }

    httpAdapter.reply(response, { statusCode, message }, statusCode);
  }
}
