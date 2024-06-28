import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/User.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async create(dto: CreateUserDto){
        // Validar que no exista
        const user = await this.prismaService.user.findUnique({
            where: {
                EMAIL: dto.EMAIL
            }
        });
        if (user) {
            throw new ConflictException('User already exists');
        }

        const newUser = await this.prismaService.user.create({
            data: {
                ...dto,
                PASSWORD: await hash(dto.PASSWORD, 10)
            }
        });

        const {PASSWORD,...result} = newUser;
        return result;
    }
    async findByEmail(email: string){
        return await this.prismaService.user.findUnique({
            where: {
                EMAIL: email,
            },
        });
    }

    async findByID(id: number){
        return await this.prismaService.user.findUnique({
            where: {
                ID: id,
            },
        });
    }
}
