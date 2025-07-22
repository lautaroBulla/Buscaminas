import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsStrongPassword, IsEnum } from "class-validator"

export enum Difficulty {
  easy = 'easy',
  intermediate = 'intermediate',
  expert = 'expert',
  custom = 'custom',
}

export class CreateGameDto {
  @IsNumber()
  @IsNotEmpty()
  help: number

  @IsNumber()
  @IsNotEmpty()
  seconds: number

  @IsEnum(Difficulty)
  @IsNotEmpty()
  difficulty: Difficulty

  @IsNumber()
  @IsNotEmpty()
  rows: number

  @IsNumber()
  @IsNotEmpty()
  cols: number

  @IsNumber()
  @IsNotEmpty()
  mines: number

  @IsNumber()
  @IsNotEmpty()
  n3BV: number

  @IsNumber()
  @IsNotEmpty()
  clicks: number

  @IsNumber()
  @IsNotEmpty()
  efficiency: number
}
