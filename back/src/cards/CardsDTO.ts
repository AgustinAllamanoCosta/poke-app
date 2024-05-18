import { IsString, IsInt, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { CARD_TYPE, POKEMON_TYPE } from '../types/cards';

export class CreateCardsDTO {
  @IsNotEmpty()
  @IsUUID()
  public userId: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsInt()
  public hp: number;

  @IsNotEmpty()
  @IsEnum(POKEMON_TYPE)
  public pokemonType: POKEMON_TYPE;

  @IsNotEmpty()
  @IsEnum(CARD_TYPE)
  public cardtype: CARD_TYPE;

  @IsNotEmpty()
  @IsString()
  public expansion: string;

  @IsNotEmpty()
  @IsInt()
  public attack: number;
}
