import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsEmail()
    EMAIL: string;

    @IsNotEmpty()
    PASSWORD: string;
}