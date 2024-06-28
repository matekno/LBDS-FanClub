import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUserDTO';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
