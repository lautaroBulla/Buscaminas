import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Game } from './src/games/entities/game.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Game],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
