import { IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @ApiProperty({ required: true })
    username: string

    @IsString()
    @ApiProperty({ required: true })
    password: string
}
