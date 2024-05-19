import { Module } from '@nestjs/common';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokeCard } from '../cards/entity/Card.Entity';
import { PokeUser } from '../auth/entity/pokeUser.entity';
import { CardsService } from '../cards/cards.service';

@Module({
  imports: [TypeOrmModule.forFeature([PokeCard, PokeUser])],
  controllers: [BattleController],
  providers: [BattleService, CardsService],
})
export class BattleModule {}
