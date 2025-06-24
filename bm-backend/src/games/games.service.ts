import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService){}

  async create(id, createGameDto) {
    const saveGame = { ...createGameDto, userId: id };
    return await this.prisma.game.create({ data:saveGame });
  }
  
  async findMyGames(id) {
    return await this.prisma.game.findMany({ where: {userId: id} })
  }

  async findMyBestTime(id, rows, cols, mines) {
    const result = await this.prisma.game.findFirst({
      where: { userId: id, rows, cols, mines },
      orderBy: { seconds: "asc" },
      select: { seconds: true }
    });
    return result ? result.seconds : null;
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


  async findAll() {
    return await this.prisma.game.findMany();
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
