import { IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    username: string

    @IsString()
    password: string
}
