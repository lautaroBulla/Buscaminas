import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsStrongPassword, IsEnum } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export enum Difficulty {
  easy = 'easy',
  intermediate = 'intermediate',
  expert = 'expert',
  custom = 'custom',
}

export class CreateGameDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  help: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  seconds: number

  @IsEnum(Difficulty)
  @IsNotEmpty()
  @ApiProperty({ required: true })
  difficulty: Difficulty

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  rows: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  cols: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  mines: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  n3BV: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  clicks: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  efficiency: number
}
