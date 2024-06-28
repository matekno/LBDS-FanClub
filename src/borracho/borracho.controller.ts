import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { BorrachoService } from './borracho.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IsOwnerGuard } from 'src/auth/guards/isOwner.guard';


@Controller('borracho')
export class BorrachoController {
    constructor(private borrachoService: BorrachoService) { }


    @UseGuards(JwtAuthGuard, IsOwnerGuard)
    @Post("pay/:id")
    async pay(@Param('id') id: number){
        return await this.borrachoService.pay(+id); // TODO: como puedo hacer algun guard que sea tipo @IsOwner() o similar para que solo el usuario pueda pagar su propia deuda?
    }
}
