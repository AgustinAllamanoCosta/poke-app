import { IsString, IsInt, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { CARD_TYPE, POKEMON_TYPE } from '../types/cards';

export class UpdateCardDTO {
  @IsOptional()
  @IsUUID()
  public userId: string;

  @IsOptional()
  @IsUUID()
  @IsString()
  public name: string;

  @IsOptional()
  @IsUUID()
  @IsInt()
  public hp: number;

  @IsOptional()
  @IsUUID()
  @IsEnum(POKEMON_TYPE)
  public pokemonType: POKEMON_TYPE;

  @IsOptional()
  @IsUUID()
  @IsEnum(CARD_TYPE)
  public cardtype: CARD_TYPE;

  @IsOptional()
  @IsUUID()
  @IsString()
  public expansion: string;

  @IsOptional()
  @IsUUID()
  @IsInt()
  public attack: number;
}
