import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    NAME: string;

    @IsEmail()
    EMAIL: string;

    @IsNotEmpty()
    PASSWORD: string;

    @IsNotEmpty()
    ROLE: ROLES;
}

enum ROLES {
    ADMIN = 'admin',
    BORRACHO = 'borracho'
}