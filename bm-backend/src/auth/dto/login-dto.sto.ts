import { IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    username: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    password: string
}
