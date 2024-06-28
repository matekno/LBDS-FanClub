import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prismaService: PrismaService) { }

    async getBorrachos() {
        return await this.prismaService.user.findMany(
            {
                where: {
                    ROLE: 'borracho'
                }
            }
        );
    }

    async getDebtors() {
        // Invente esta regla de negocio que dice que tiene la cuota al dia el que pago durante este mes.
        // TODO: Repensar esta regla y centralizarla en una sola logica de negocio
        const firstDayMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const debtors = await this.prismaService.user.findMany({
            where: {
                LAST_PAYED: {
                    lt: firstDayMonth
                }
            }
        });
        return debtors;
    }
}
