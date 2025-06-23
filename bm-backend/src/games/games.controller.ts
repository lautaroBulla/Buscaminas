import { Controller, Get, Post, Body, Query, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from '@prisma/client';
import { skip } from 'rxjs';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
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

  @Get('difficulty') 
  findByDifficulty(
    @Query('rows', ParseIntPipe) rows: number, 
    @Query('cols', ParseIntPipe) cols: number,
    @Query('mines', ParseIntPipe) mines: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    return this.gamesService.findByDifficulty(rows, cols, mines, page, take);
  }

  
  /*-------------------------------------------------*/

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
