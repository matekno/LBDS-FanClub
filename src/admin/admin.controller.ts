import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get("borrachos")
    async getBorrachos(){
        return await this.adminService.getBorrachos();
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get("debtors")
    async getDebtors(){
        return await this.adminService.getDebtors();
    }

}
