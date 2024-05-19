import {
  IsString,
  IsInt,
  IsEnum,
  IsNotEmpty,
  IsUUID,
  IsOptional,
} from 'class-validator';
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

  @IsOptional()
  @IsEnum(POKEMON_TYPE)
  public weaknesType: POKEMON_TYPE;

  @IsOptional()
  @IsInt()
  public weaknessMultiplier: number;

  @IsOptional()
  @IsEnum(POKEMON_TYPE)
  public resistanceType: POKEMON_TYPE;

  @IsOptional()
  @IsInt()
  public resistancePoint: number;

  @IsOptional()
  @IsString()
  public expansion: string;

  @IsNotEmpty()
  @IsInt()
  public attack: number;
}
