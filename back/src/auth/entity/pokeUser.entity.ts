import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class PokeUser {
  @PrimaryColumn()
  email: string;

  @Column({ nullable: true })
  lastConnection: Date;
}
