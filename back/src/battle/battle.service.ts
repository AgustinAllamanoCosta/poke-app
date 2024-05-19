import { Injectable } from '@nestjs/common';
import { PokeCard } from '../cards/entity/Card.Entity';
import { BattleResult } from 'src/types/Battle';
import { POKEMON_TYPE } from 'src/types/cards';

@Injectable()
export class BattleService {

  public fight(challengesPokemon: PokeCard, rivalPokemon: PokeCard): BattleResult {
    const battleResult: BattleResult = {
      challengerName: challengesPokemon.name,
      rivalName: rivalPokemon.name,
      challengerDefeatRival: false,
    };
    let finalDamage: number = challengesPokemon.attack;

    if( rivalPokemon.weakness && rivalPokemon.weakness.type === challengesPokemon.pokemonType){
      finalDamage = finalDamage * rivalPokemon.weakness.multiplier;
    }else if ( rivalPokemon.resistance && rivalPokemon.resistance.type === challengesPokemon.pokemonType){
      if( finalDamage > rivalPokemon.resistance.points){
        finalDamage = finalDamage - rivalPokemon.resistance.points;
      }else{
        return battleResult;
      }
    }

    const rivalHPLefts: number = rivalPokemon.hp - finalDamage;
    battleResult.challengerDefeatRival = rivalHPLefts <= 0;

    return battleResult;

  };

  private getRivalWeaknessType(rival:PokeCard): string {
    return rival.weakness.type ? rival.weakness.type : '';
  }

}
