import {
  IsString,
  IsInt,
  IsEnum,
  IsNotEmpty,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { CARD_TYPE, POKEMON_TYPE, Resistance, Weakness } from '../types/cards';
import { ApiProperty } from '@nestjs/swagger';
import { PokeUser } from 'src/auth/entity/pokeUser.entity';

export class CreateCardsDTO {
  @ApiProperty({ description: 'user id', name: 'userId' })
  @IsNotEmpty()
  @IsUUID()
  public userId: string;

  @ApiProperty({ description: 'card name', name: 'name' })
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty({ description: 'HP of the pokemon', name: 'hp' })
  @IsNotEmpty()
  @IsInt()
  public hp: number;

  @ApiProperty({ description: 'Type of the pokemon', name: 'pokemonType' })
  @IsNotEmpty()
  @IsEnum(POKEMON_TYPE)
  public pokemonType: POKEMON_TYPE;

  @ApiProperty({ description: 'Rarity of the card', name: 'cardType' })
  @IsNotEmpty()
  @IsEnum(CARD_TYPE)
  public cardtype: CARD_TYPE;

  @ApiProperty({
    description: 'Type of pokemon for which this card has a weakness',
    name: 'weaknesType',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsEnum(POKEMON_TYPE)
  public weaknesType: POKEMON_TYPE;

  @ApiProperty({
    description: 'Weakness multiplier',
    name: 'weaknessMultiplier',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsInt()
  public weaknessMultiplier: number;

  @ApiProperty({
    description: 'Type of pokemon for which this card has a resistance',
    name: 'resistanceType',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsEnum(POKEMON_TYPE)
  public resistanceType: POKEMON_TYPE;

  @ApiProperty({
    description: 'Resistance point',
    name: 'resistancePoint',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsInt()
  public resistancePoint: number;

  @ApiProperty({
    description: 'Expasion',
    name: 'expansion',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  public expansion: string;

  @ApiProperty({ description: 'Base attack of the card', name: 'attack' })
  @IsNotEmpty()
  @IsInt()
  public attack: number;
}

export class PokeCardDTO {
  @ApiProperty({ description: 'Card id', name: 'id' })
  public id: string;

  @ApiProperty({
    description: 'Users owning the card',
    name: 'pokeUser',
    nullable: true,
    required: false,
  })
  public pokeUser: PokeUser[];

  @ApiProperty({ description: 'Card name', name: 'name' })
  public name: string;

  @ApiProperty({ description: 'Card hp', name: 'hp' })
  public hp: number;

  @ApiProperty({ description: 'Card pokemon type', name: 'pokemonType' })
  public pokemonType: POKEMON_TYPE;

  @ApiProperty({ description: 'Card type', name: 'cardtype' })
  public cardtype: CARD_TYPE;

  @ApiProperty({
    description: 'Card weakness',
    name: 'weakness',
    nullable: true,
  })
  public weakness: Weakness;

  @ApiProperty({
    description: 'Card resistance',
    name: 'resistance',
    nullable: true,
  })
  public resistance: Resistance;

  @ApiProperty({ description: 'Card expansion', name: 'expnasion' })
  public expansion: string;

  @ApiProperty({ description: 'Card base attack', name: 'attack' })
  public attack: number;
}

export class CardRivalsDTO {
  @ApiProperty({ description: 'List of Cards', type: [PokeCardDTO] })
  resistanceAgains: PokeCardDTO[];

  @ApiProperty({ description: 'List of weakness', type: [PokeCardDTO] })
  weaknessAgains: PokeCardDTO[];
}
