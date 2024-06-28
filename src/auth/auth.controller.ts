import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/User.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,
        private authService: AuthService
    ){}
    
    @Post('register')
    async registUser(@Body() dto: CreateUserDto){
        return await this.userService.create(dto);
    }

    @Post('login')
    async login(@Body() dto: CreateUserDto){
        return await this.authService.login(dto);
    }

}
