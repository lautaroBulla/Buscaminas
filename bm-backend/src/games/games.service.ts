import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService){}

  async create(createGameDto: CreateGameDto) {
    return await this.prisma.game.create({ data:createGameDto });
  }

  async findAll() {
    return await this.prisma.game.findMany();
  }

  async findByDifficulty(rows, cols, mines, page, take) {
    const skip = (page - 1) * take;

    return await this.prisma.game.findMany({
      skip: skip,
      take: take,
      where: {
        rows,
        cols,
        mines
      },
      orderBy: {
        seconds: "asc"
      }
    })
  }

  async findMyGames(id) {
    return await this.prisma.game.findMany({ where: {userId: id} })
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
