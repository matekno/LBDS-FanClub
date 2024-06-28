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

        // validar que el rol sea o admin o borracho
        // Obvio que no esta bueno que todos puedan registrarse como admins, pero esto es un ejercicio
        if (dto.ROLE !== 'admin' && dto.ROLE !== 'borracho') {
            throw new ConflictException('Invalid Role');
        } 


        const newUser = await this.prismaService.user.create({
            data: {
                ...dto,
                LAST_PAYED: new Date(),
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
