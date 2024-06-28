import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get(":id")
    async getUserProfile(@Param("id") id: string) {
        return await this.userService.findByID(+id);
    }

}
