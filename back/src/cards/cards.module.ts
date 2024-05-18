import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokeCard } from './entity/Card.Entity';
import { PokeUser } from '../auth/entity/pokeUser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PokeCard, PokeUser]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
