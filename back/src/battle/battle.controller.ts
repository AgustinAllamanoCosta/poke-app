import { Controller, Get, Param, Query } from '@nestjs/common';
import { BattleService } from './battle.service';
import { CardsService } from '../cards/cards.service';
import { PokeCard } from '../cards/entity/Card.Entity';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BattlerResultDTO } from './BattleResultDTO';

@ApiHeader({
  name: 'Auhtorization',
  description: 'google auth header',
})
@ApiTags('Battle')
@Controller('battle')
export class BattleController {
  constructor(
    private readonly battleService: BattleService,
    private readonly cardService: CardsService,
  ) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get the result of a simulation of a battle between tow Cards' })
  @ApiResponse({ status: 201, description: 'Add a new user into the data base by email', type: BattlerResultDTO})
  @ApiResponse({ status: 401, description: 'Not Authorized'})
  @ApiResponse({ status: 500, description: 'App can not connect to the db'})
  public async getBattlerResult(
    @Param('id') challengesPokemonId: string,
    @Query('rival') rivalPokemonName: string,
  ) {
    try {
      console.group('Battle');
      const challengesPokemon: PokeCard | null =
        await this.cardService.getCardById(challengesPokemonId);
      const rivalPokemon: PokeCard | null =
        await this.cardService.getCardByName(rivalPokemonName);
      console.debug('challenger ', challengesPokemon);
      console.debug('rival', rivalPokemon);
      let response: BattlerResultDTO;

      if (challengesPokemon && rivalPokemon) {
        response = await this.battleService.fight(
          challengesPokemon,
          rivalPokemon,
        );
      } else {
        response = {
          challengerName: '',
          rivalName: '',
          challengerDefeatRival: false,
        };
      }
      console.groupEnd();
      return response;
    } catch (error: any) {
      console.error('an error ocurred when two pokeomg were fighting');
      console.error(error.message);
      console.error(error);
    }
  }
}
