import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    // @UseGuards(JwtAuthGuard, AdminGuard)
    // @Get(":id")
    // async getUserProfile(@Param("id") id: string) {
    //     const user = await this.userService.findByID(+id);
    //     return {isAdmin: user.ROLE === "admin"}
    // }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get("adminCheck")
    async checkAdmin() {
        return {message: "Bienvenido ADMIN!!!"}
    }



}
