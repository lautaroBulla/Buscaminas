import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    username: string

    @IsString()
    @IsStrongPassword()
    @ApiProperty({ required: true })
    password: string
}
