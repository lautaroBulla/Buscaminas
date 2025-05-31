import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';  
import { validationSchema } from '../config/validation'
import databaseConfig from '../config/database.config';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { I18nModule, HeaderResolver } from 'nestjs-i18n';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true ,
      load: [databaseConfig],
      validationSchema
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(process.cwd(), 'src/i18n'),
        watch: true,
      },
      resolvers: [
        { use: HeaderResolver, options: ['language'] }, // <-- ESTE es el que usás con tu header 'language'
      ],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
