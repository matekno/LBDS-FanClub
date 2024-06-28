import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    NAME: string;

    @IsEmail()
    @IsNotEmpty()
    EMAIL: string;

    @IsNotEmpty()
    @IsString()
    PASSWORD: string;

    @IsEnum(['admin', 'borracho']) 
    @IsNotEmpty()
    ROLE: string;
}
