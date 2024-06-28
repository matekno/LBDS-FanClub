import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { match, user } from '@prisma/client';
import { CreateMatchDto } from './dto/CreateMatch.dto';
import { UpdateMatchDto } from './dto/UpdateMatch.dto';
import { log } from 'console';

@Injectable()
export class MatchService {
    constructor(private prismaService: PrismaService) { }

    private async validateMatch(date: Date, opponent: string, existingMatchId?: number): Promise<void> {
        const matchDate = new Date(date);
        matchDate.setHours(0, 0, 0, 0);
        const matchId = existingMatchId ? parseInt(existingMatchId as any, 10) : undefined;

        // #region No pueden haber dos partidos el mismo dia
        const existingMatchOnDate = await this.prismaService.match.findFirst({
            where: {
                DATE: matchDate,
                ...(matchId && { NOT: { ID: matchId } }) // Exclude the current match ID in update case
            },
        });

        if (existingMatchOnDate) {
            throw new BadRequestException('A match is already scheduled for this date.');
        }
        // #endregion

        // #region No pueden haber dos partidos contra el mismo equipo en un mes
        const oneMonthAgo = new Date(matchDate);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const recentMatchWithOpponent = await this.prismaService.match.findFirst({
            where: {
                OPPONENT: opponent,
                DATE: {
                    gte: oneMonthAgo,
                    lt: matchDate,
                },
                ...(matchId && { NOT: { ID: matchId } }) // Exclude the current match ID in update case
            },
        });

        if (recentMatchWithOpponent) {
            throw new BadRequestException('A match against this opponent was already played within the last month.');
        }
        // #endregion

        // #region No pueden haber dos partidos con menos de tres dias de diferencia
        const threeDaysBefore = new Date(matchDate);
        threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);
        const threeDaysAfter = new Date(matchDate);
        threeDaysAfter.setDate(threeDaysAfter.getDate() + 3);

        const matchWithinRestPeriod = await this.prismaService.match.findFirst({
            where: {
                OR: [
                    {
                        DATE: {
                            gte: threeDaysBefore,
                            lt: matchDate,
                        },
                    },
                    {
                        DATE: {
                            gt: matchDate,
                            lte: threeDaysAfter,
                        },
                    },
                ],
                ...(matchId && { NOT: { ID: matchId } }) // Exclude the current match ID in update case
            },
        });

        if (matchWithinRestPeriod) {
            throw new BadRequestException('There must be at least three days of rest between matches.');
        }
        // #endregion
    }

    async getMatches(): Promise<match[]> {
        return await this.prismaService.match.findMany();
    }

    async getMatchByID(matchId: number): Promise<match> {
        return await this.prismaService.match.findUnique({
            where: {
                ID: +matchId
            }
        });
    }

    async createMatch(data: CreateMatchDto): Promise<match> {
        await this.validateMatch(data.DATE, data.OPPONENT);

        return this.prismaService.match.create({
            data
        });

    }

    async updateMatch(id: number, data: UpdateMatchDto): Promise<match> {
        await this.validateMatch(data.DATE, data.OPPONENT, id); //TODO: Me parece que si creo modifico la fecha del partido, cae aca y no me deja cambiarla. 
        return this.prismaService.match.update({
            where: {
                ID: +id
            },
            data
        });
    }

    async isUserAuthorizedToRegister(matchId: number, user: user): Promise<{isAuthorized: boolean, message: string}> {
        const match = await this.prismaService.match.findUnique({
            where: { ID: +matchId }, // TODO: revisar que esta pasando con los string, numbers. Tiene que haber un pipe que lo haga solo.
            include: {
                USERS: true,
            }
        });
        
        if (!match) {
            throw new NotFoundException(`Match with ID ${matchId} not found`);
        }

        // Ya esta registrado?
        const isAlreadyRegistered = match.USERS.some(u => u.ID === user.ID);
        console.log(isAlreadyRegistered);
        
        if (isAlreadyRegistered) {
            return { isAuthorized: false, message: "User is already registered for this match" };
        }

        // Supera el maximo de borrachos?
        if (match.USERS.length >= match.MAX_BORRACHOS) {
            return { isAuthorized: false, message: "Maximum number of participants reached" };
        }

        // Tiene la cuota al dia?
        const oneMonthAgo = new Date(user.LAST_PAYED);
        oneMonthAgo.setMonth((oneMonthAgo.getMonth() - 1 - 1) % 12 + 1); // TODO: Separar esta logica de negocio de "1 mes"
        if (!user.LAST_PAYED || new Date(user.LAST_PAYED) < oneMonthAgo) {
            return { isAuthorized: false, message: "Membership fee payment is not up to date" };
        }

        return { isAuthorized: true, message: "User is authorized to register" };

    }

    async registerToMatch(matchId: number, user: user): Promise<match> {
        const isAuthorized = await this.isUserAuthorizedToRegister(matchId, user);
        
        if (isAuthorized.isAuthorized === false) {
            throw new UnauthorizedException(isAuthorized.message);
        }
        return this.prismaService.match.update({
            where: {
                ID: +matchId
            },
            data: {
                USERS: {
                    connect: {
                        ID: user.ID
                    }
                }
            }
        });
    }
}