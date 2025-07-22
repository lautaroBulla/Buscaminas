import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';  
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validationSchema } from '../config/validation'
import databaseConfig from '../config/database.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { User } from './users/entities/user.entity';
import { Game } from './games/entities/game.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [databaseConfig],
      validationSchema
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [User, Game],
        synchronize: false,
      }),
    }),

    UsersModule,
    AuthModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
