import { IsDateString, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateMatchDto {
    @IsDateString()
    DATE: Date;

    @IsNotEmpty()
    @IsString()
    OPPONENT: string;

    @IsNotEmpty()
    @IsString()
    FIELD: string;

    @IsInt()
    @Min(0)
    MAX_BORRACHOS: number;
}