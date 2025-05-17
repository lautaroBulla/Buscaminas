import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';  
import { validationSchema } from '../config/validation'
import databaseConfig from '../config/database.config';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';

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
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
