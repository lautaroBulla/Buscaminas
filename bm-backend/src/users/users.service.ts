import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Logger } from '@nestjs/common';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await hash(createUserDto.password, 10);
    return await this.prisma.user.create({ data:createUserDto });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async getProfile(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const { id: _id, password, refreshToken, updatedAt, createdAt, ...result} = user;

    return result;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const { password, ...result} = user;

    return result;
  }

  async findOneForAuth(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
        return null; // No tirar excepción
    }

    const { password, ...result} = user;
    return result;
  }

  async findOneUsername(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
