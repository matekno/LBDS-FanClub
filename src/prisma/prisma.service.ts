// sacado de https://medium.com/@rishabhgupta7210012474/practical-guide-to-integrating-prisma-with-nestjs-for-seamless-development-9f91e83cc990
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}
