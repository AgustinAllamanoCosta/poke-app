import { IsString, IsInt, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { CARD_TYPE, POKEMON_TYPE } from '../types/cards';

export class UpdateCardDTO {
  @IsOptional()
  @IsUUID()
  public userId: string;

  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsInt()
  public hp: number;

  @IsOptional()
  @IsEnum(POKEMON_TYPE)
  public pokemonType: POKEMON_TYPE;

  @IsOptional()
  @IsEnum(CARD_TYPE)
  public cardtype: CARD_TYPE;

  @IsOptional()
  @IsString()
  public expansion: string;

  @IsOptional()
  @IsInt()
  public attack: number;

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

}
