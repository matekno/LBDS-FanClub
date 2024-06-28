import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class BorrachoService {
    constructor(private prismaService: PrismaService) { }

    async pay(id: number): Promise<user> {
        // Debe actualizar el campo LAST_PAY a hoy
        const user = await this.prismaService.user.update({
            where: { ID: id },
            data: {
                LAST_PAYED: new Date()
            }
        });
        return user;
    }
}
