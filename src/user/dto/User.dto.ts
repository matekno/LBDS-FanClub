import { IsEmail, IsNotEmpty, IsString, Matches, IsOptional, IsDateString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    NAME: string;

    @IsEmail()
    EMAIL: string;

    @IsNotEmpty()
    PASSWORD: string;

    @IsNotEmpty()
    ROLE: ROLES; // TODO: No anda esto me parece
}

enum ROLES {
    ADMIN = 'admin',
    BORRACHO = 'borracho'
}