import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';  
import { validationSchema } from '../config/validation'
import databaseConfig from '../config/database.config';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import * as path from 'path';
import { I18nModule, HeaderResolver, AcceptLanguageResolver } from 'nestjs-i18n';

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
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [{ use: HeaderResolver, options: ['lang'] }],
    }),
    UsersModule,
    AuthModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
