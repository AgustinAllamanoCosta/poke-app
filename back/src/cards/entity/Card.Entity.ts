import { PokeUser } from '../../auth/entity/pokeUser.entity';
import {
  CARD_TYPE,
  POKEMON_TYPE,
  Weakness,
  Resistance,
} from '../../types/cards';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class PokeCard {

  @Column()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToMany(() => PokeUser, (pokeUser) => pokeUser.cards)
  public pokeUser: PokeUser[];

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public hp: number;

  @Column({
    type: 'enum',
    enum: POKEMON_TYPE,
    default: POKEMON_TYPE.ELECTRIC,
  })
  public pokemonType: POKEMON_TYPE;

  @Column({
    type: 'enum',
    enum: CARD_TYPE,
    default: CARD_TYPE.COMMON,
  })
  public cardtype: CARD_TYPE;

  @Column({
    nullable: true,
    type: 'text',
    transformer: {
      to: (weakness: Weakness) => JSON.stringify(weakness),
      from: (value: string) => JSON.parse(value),
    },
  })
  public weakness: Weakness;

  @Column({
    nullable: true,
    type: 'text',
    transformer: {
      to: (resistance: Resistance) => JSON.stringify(resistance),
      from: (value: string) => JSON.parse(value),
    },
  })
  public resistance: Resistance;

  @Column({ nullable: false })
  public expansion: string;

  @Column({ nullable: false })
  public attack: number;
}
