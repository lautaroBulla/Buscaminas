import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum Difficulty {
  easy = 'easy',
  intermediate = 'intermediate',
  expert = 'expert',
  custom = 'custom'
}

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.games)
  user: User;

  @Column()
  userId: number;

  @Column()
  help: number;

  @Column('decimal', { precision: 8, scale: 3 })
  seconds: number;

  @Column({ type: 'enum', enum: Difficulty })
  difficulty: Difficulty;

  @Column()
  rows: number;

  @Column()
  cols: number;

  @Column()
  mines: number;

  @Column()
  n3BV: number;

  @Column()
  clicks: number;

  @Column()
  efficiency: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
