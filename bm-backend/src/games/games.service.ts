import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client'; 

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

  async findBestTimes(id, rows, cols, mines) {
    const userBestTimeValue = await this.prisma.game.findFirst({
      where: { userId: id, rows, cols, mines },
      orderBy: { seconds: "asc" },
      select: { seconds: true }
    });
    const globalBestTimeValue = await this.prisma.game.findFirst({
      where: { rows, cols, mines },
      orderBy: { seconds: "asc" },
      select: { seconds: true }
    });

    return {
      userBestTime: userBestTimeValue ? userBestTimeValue.seconds : null,
      globalBestTime: globalBestTimeValue ? globalBestTimeValue.seconds : null
    };
  }
  
  async findByDifficulty(id, rows, cols, mines, page, take, orderByTime) {
    const skip = (page - 1) * take;

    const orderBy = orderByTime 
      ? [
          { seconds: Prisma.SortOrder.asc },
          { help: Prisma.SortOrder.asc },
          { efficiency: Prisma.SortOrder.desc }
        ]
      : [
          { efficiency: Prisma.SortOrder.desc },
          { n3BV: Prisma.SortOrder.desc },
          { seconds: Prisma.SortOrder.asc },
          { help: Prisma.SortOrder.asc }
        ];

    const [games, total] = await Promise.all([
      this.prisma.game.findMany({
        skip: skip,
        take: take,
        where: {
          rows,
          cols,
          mines
        },
        orderBy,
        select: {
          help: true,
          seconds: true,
          createdAt: true,
          clicks: true,
          n3BV: true,
          efficiency: true,
          user: {
            select: {
              username: true
            }
          }
        }
      }),

      this.prisma.game.count({
        where: {
          rows,
          cols,
          mines
        }
      })
    ]);

    const totalPages = Math.ceil(total / take);
    const myPosition = await this.findMyPosition(id, rows, cols, mines);

    return {
      games,
      totalPages,
      page,
      myPosition
    }
  }

  async findByDifficultyUser(id, rows, cols, mines, page, take, orderByTime) {
    const skip = (page - 1) * take;

    const orderBy = orderByTime 
    ? [
        { seconds: Prisma.SortOrder.asc },
        { help: Prisma.SortOrder.asc },
        { efficiency: Prisma.SortOrder.desc }
      ]
    : [
        { efficiency: Prisma.SortOrder.desc },
        { n3BV: Prisma.SortOrder.desc },
        { seconds: Prisma.SortOrder.asc },
        { help: Prisma.SortOrder.asc }
      ];

    const [games, total] = await Promise.all([
      this.prisma.game.findMany({
        skip: skip,
        take: take,
        where: {
          userId: id,
          rows,
          cols,
          mines
        },
        orderBy,
        select: {
          help: true,
          seconds: true,
          createdAt: true,
          clicks: true,
          n3BV: true,
          efficiency: true,
          user: {
            select: {
              username: true
            }
          }
        }
      }),

      this.prisma.game.count({
        where: {
          userId: id,
          rows,
          cols,
          mines
        }
      })
    ]);

    const totalPages = Math.ceil(total / take);
    const myPosition = await this.findMyPosition(id, rows, cols, mines);
    
    return {
      games,
      totalPages,
      page,
      myPosition
    }
  }

  //Funcion que me devuelva la mejor posicion de un usuario en el ranking de los games con esos valores
  async findMyPosition(id, rows, cols, mines) {
    const orderBy = [
        { seconds: Prisma.SortOrder.asc },
        { help: Prisma.SortOrder.asc },
        { efficiency: Prisma.SortOrder.desc }
    ];

    const games = await this.prisma.game.findMany({
      where: {
        rows,
        cols,
        mines
      },
      orderBy,
      select: {
        userId: true
      }
    });

    const position = games.findIndex(game => game.userId === id) + 1;

    return {
      position: position > 0 ? position : null,
      total: games.length > 0 ? games.length : null
    }
  }
}
