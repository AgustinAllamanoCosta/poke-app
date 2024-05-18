import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokeUser } from '../auth/entity/pokeUser.entity';
import { PokeCard } from './entity/Card.Entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PokeUser]),
    TypeOrmModule.forFeature([PokeCard]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
