import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ){}

  async create(id, createGameDto) {
    const saveGame = { ...createGameDto, userId: id };
    return await this.gameRepository.save(saveGame);
  }
  
  async findMyGames(id) {
    return await this.gameRepository.find({ where: { userId: id } });
  }

  async findMyBestTime(id, rows, cols, mines) {
    const result = await this.gameRepository.findOne({
      where: { userId: id, rows, cols, mines },
      order: { seconds: 'ASC' },
      select: ['seconds']
    });
    return result ? result.seconds : null;
  }

  async findBestTimes(id, rows, cols, mines) {
    const userBestTimeValue = await this.gameRepository.findOne({
      where: { userId: id, rows, cols, mines },
      order: { seconds: 'ASC' },
      select: ['seconds']
    });
    const globalBestTimeValue = await this.gameRepository.findOne({
      where: { rows, cols, mines },
      order: { seconds: 'ASC' },
      select: ['seconds']
    });

    return {
      userBestTime: userBestTimeValue ? userBestTimeValue.seconds : null,
      globalBestTime: globalBestTimeValue ? globalBestTimeValue.seconds : null
    };
  }
  
  async findByDifficulty(
    id: number | null,
    rows: number,
    cols: number,
    mines: number,
    page: number,
    take: number,
    orderByTime: boolean,
  ) {
    const skip = (page - 1) * take;

    const order: any = {};
      if (orderByTime) {
        order.seconds = 'ASC';
        order.help = 'ASC';
        order.efficiency = 'DESC';
      } else {
        order.efficiency = 'DESC';
        order.n3BV = 'DESC';
        order.seconds = 'ASC';
        order.help = 'ASC';
      }

    const [games, total] = await Promise.all([
      this.gameRepository.find({
        where: { rows, cols, mines },
        relations: ['user'],
        order,
        skip,
        take,
        select: {
          id: true,
          help: true,
          seconds: true,
          createdAt: true,
          clicks: true,
          n3BV: true,
          efficiency: true,
          user: {
            username: true
          }
        },
      }),
      this.gameRepository.count({
        where: { rows, cols, mines }
      }),
    ]);

    const totalPages = Math.ceil(total / take);
    const myPosition = await this.findMyPosition(id, rows, cols, mines);

    return {
      rows,
      cols,
      mines,
      games,
      totalPages,
      page,
      myPosition
    }
  }

  async findByDifficultyUser(
    id: number,
    rows: number,
    cols: number,
    mines: number,
    page: number,
    take: number,
    orderByTime: boolean,
  ) {
    const skip = (page - 1) * take;

    const order: any = {};
      if (orderByTime) {
        order.seconds = 'ASC';
        order.help = 'ASC';
        order.efficiency = 'DESC';
      } else {
        order.efficiency = 'DESC';
        order.n3BV = 'DESC';
        order.seconds = 'ASC';
        order.help = 'ASC';
      }

    const [games, total] = await Promise.all([
      this.gameRepository.find({
        where: { userId: id, rows, cols, mines },
        relations: ['user'],
        order,
        skip: skip,
        take: take,
        select: {
          id: true,
          help: true,
          seconds: true,
          createdAt: true,
          clicks: true,
          n3BV: true,
          efficiency: true,
          user: {
            username: true
          }
        }
      }),

      this.gameRepository.count({
        where: { userId: id, rows, cols, mines }
      }),
    ]);

    const totalPages = Math.ceil(total / take);
    const myPosition = await this.findMyPosition(id, rows, cols, mines);
    
    return {
      rows,
      cols,
      mines,
      games,
      totalPages,
      page,
      myPosition
    }
  }

  //Funcion que me devuelva la mejor posicion de un usuario en el ranking de los games con esos valores
  async findMyPosition(
    id: number | null,
    rows: number,
    cols: number,
    mines: number
  ) {
    if (id === null) {
      const total = await this.gameRepository.count({
        where: { rows, cols, mines }
      });

      return {
        position: null,
        total: total > 0 ? total : 0
      };
    }

    const result = await this.gameRepository.query(`
      SELECT position, total FROM (
        SELECT 
          "userId",
          RANK() OVER (ORDER BY seconds ASC, help ASC, efficiency DESC) AS position,
          COUNT(*) OVER() AS total
        FROM games
        WHERE rows = $1 AND cols = $2 AND mines = $3
      ) ranked
      WHERE "userId" = $4
      LIMIT 1
    `, [rows, cols, mines, id]);

    return result.length
      ? { position: Number(result[0].position), total: Number(result[0].total) }
      : { position: null, total: 0 };
  }
}
