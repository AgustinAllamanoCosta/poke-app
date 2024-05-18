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
  id: string;

  @PrimaryColumn()
  email: string;

  @Column({ nullable: true })
  lastConnection: Date;

  @ManyToMany(() => PokeCard, (card) => card.pokeUser)
  @JoinTable()
  cards: PokeCard[];
}
