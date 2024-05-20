import { IsString, IsInt, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { CARD_TYPE, POKEMON_TYPE } from '../types/cards';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  public userId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  public name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  public hp: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(POKEMON_TYPE)
  public pokemonType: POKEMON_TYPE;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(CARD_TYPE)
  public cardtype: CARD_TYPE;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  public expansion: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  public attack: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(POKEMON_TYPE)
  public weaknesType: POKEMON_TYPE;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  public weaknessMultiplier: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(POKEMON_TYPE)
  public resistanceType: POKEMON_TYPE;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  public resistancePoint: number;
}
