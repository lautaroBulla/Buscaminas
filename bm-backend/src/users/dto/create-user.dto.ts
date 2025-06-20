import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
    // @IsString({ message: i18nValidationMessage('validation.username.isString') })
    // @IsNotEmpty({ message: i18nValidationMessage('validation.username.isNotEmpty') })
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    username: string

    @IsString()
    // @IsStrongPassword({}, { message: i18nValidationMessage('validation.password.isStrongPassword') })
    @IsStrongPassword()
    @ApiProperty({ required: true })
    password: string
}
