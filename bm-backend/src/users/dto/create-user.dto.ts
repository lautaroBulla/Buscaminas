import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    id: number

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string
}
