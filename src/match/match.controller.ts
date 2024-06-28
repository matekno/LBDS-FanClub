import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/CreateMatch.dto';
import { UpdateMatchDto } from './dto/UpdateMatch.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { IsOwnerGuard } from 'src/auth/guards/isOwner.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { user } from '@prisma/client';

@Controller('match')
export class MatchController {
    constructor(private readonly matchService: MatchService) {}

    @Get()
    getMatches(){
        return this.matchService.getMatches();
    }

    @Get(':id')
    getMatchByID(@Param('id') id: number){
        return this.matchService.getMatchByID(id);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post()
    createMatch(@Body() newMatch: CreateMatchDto){
        return this.matchService.createMatch(newMatch);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Put(':id')
    updateMatch(@Body() updatedMatch: UpdateMatchDto, @Param('id') id: number){
        return this.matchService.updateMatch(id, updatedMatch);
    }

    @UseGuards(JwtAuthGuard)
    @Post('register/:id')
    registerToMatch(@Param('id') matchId: number, @User() user: user) {
        return this.matchService.registerToMatch(matchId, user);
    }


}
