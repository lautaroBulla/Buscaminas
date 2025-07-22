import { Controller, Get, Post, Body, Query, Patch, Param, Delete, UseGuards, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtOptionalAuthGuard } from 'src/auth/guards/jwt-optional.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: User, @Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(user.id, createGameDto);
  }

  @Get('myGames')
  @UseGuards(JwtAuthGuard)
  findMyGames(@CurrentUser() user: User) {
    return this.gamesService.findMyGames(user.id);
  }
  
  @Get('myBestTime')
  @UseGuards(JwtAuthGuard)
  findMyBestTime(
    @CurrentUser() user: User,
    @Query('rows', ParseIntPipe) rows: number, 
    @Query('cols', ParseIntPipe) cols: number,
    @Query('mines', ParseIntPipe) mines: number,
  ) {
    return this.gamesService.findMyBestTime(user.id, rows, cols, mines);
  }

  @Get('bestTimes')
  @UseGuards(JwtAuthGuard)
  findBestTimes(
    @CurrentUser() user: User,
    @Query('rows', ParseIntPipe) rows: number, 
    @Query('cols', ParseIntPipe) cols: number,
    @Query('mines', ParseIntPipe) mines: number,
  ) {
    return this.gamesService.findBestTimes(user.id, rows, cols, mines);
  }

  @Get('difficulty') 
  @UseGuards(JwtOptionalAuthGuard)
  findByDifficulty(
    @CurrentUser() user: User | null,
    @Query('rows', ParseIntPipe) rows: number, 
    @Query('cols', ParseIntPipe) cols: number,
    @Query('mines', ParseIntPipe) mines: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('orderByTime', ParseBoolPipe) orderByTime: boolean,
  ) {
    return this.gamesService.findByDifficulty(user?.id || null, rows, cols, mines, page, take, orderByTime);
  }

  @Get('difficultyUser') 
  @UseGuards(JwtAuthGuard)
  findByDifficultyUser(
    @CurrentUser() user: User,
    @Query('rows', ParseIntPipe) rows: number, 
    @Query('cols', ParseIntPipe) cols: number,
    @Query('mines', ParseIntPipe) mines: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('orderByTime', ParseBoolPipe) orderByTime: boolean,
  ) {
    return this.gamesService.findByDifficultyUser(user.id, rows, cols, mines, page, take, orderByTime);
  }
}
