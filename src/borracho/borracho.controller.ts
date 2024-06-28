import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { BorrachoService } from './borracho.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from 'src/user/user.service';


@Controller('borracho')
export class BorrachoController {
    constructor(private borrachoService: BorrachoService, private userService: UserService) { }


    @UseGuards(JwtAuthGuard)
    @Post("pay/:id")
    async pay(@Param('id') id: number){
        return await this.borrachoService.pay(+id); // TODO: como puedo hacer algun guard que sea tipo @IsOwner() o similar para que solo el usuario pueda pagar su propia deuda?
    }
}