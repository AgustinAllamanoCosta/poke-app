import { PokeCard } from '../../cards/entity/Card.Entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class PokeUser {
  @Column()
  @Generated('uuid')
  public id: string;

  @PrimaryColumn()
  public email: string;

  @Column({ nullable: true })
  public lastConnection: Date;

  @ManyToMany(() => PokeCard, (pokeCard) => pokeCard.pokeUser)
  @JoinTable()
  public cards: PokeCard[];
}
