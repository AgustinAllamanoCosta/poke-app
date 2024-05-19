import { Controller, Get, Param, Query } from '@nestjs/common';
import { BattleService } from './battle.service';
import { CardsService } from '../cards/cards.service';
import { PokeCard } from '../cards/entity/Card.Entity';
import { BattleResult } from 'src/types/Battle';

@Controller('battle')
export class BattleController {
  constructor(
    private readonly battleService: BattleService,
    private readonly cardService: CardsService,
  ) {}

  @Get('/:id')
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
      let response: BattleResult;
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
