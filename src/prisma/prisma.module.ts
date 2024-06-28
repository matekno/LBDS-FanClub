// sacado de https://medium.com/@rishabhgupta7210012474/practical-guide-to-integrating-prisma-with-nestjs-for-seamless-development-9f91e83cc990
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
    providers: [PrismaService],
    exports: [PrismaService], 
})
export class PrismaModule { }
