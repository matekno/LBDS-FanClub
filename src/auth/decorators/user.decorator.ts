import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

export const User = createParamDecorator(
    async (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const jwtService = new JwtService({ secret: process.env.JWT_SECRET }); // Configura JwtService con tus opciones
        // TODO: ESTO ES HORRBILE, PERO NO SE ME OCURRE OTRA FORMA DE HACERLO
        // Quiza en retrospectiva, en lugar de hacer un BaseGuard y meter la logica ahi, podria haberlo hecho por composicion o con Strategy
        // era strategy me parece
        const prismaService = new PrismaService(); 
        const userService = new UserService(prismaService); 

        try {
            const token = request.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new UnauthorizedException('No token found');
            }

            const decoded = jwtService.decode(token);
            if (!decoded) {
                throw new UnauthorizedException('Invalid token');
            }

            const user = await userService.findByID(decoded.id);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    },
);
