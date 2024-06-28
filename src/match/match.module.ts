import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MatchService, PrismaService],
  controllers: [MatchController]
})
export class MatchModule {}
